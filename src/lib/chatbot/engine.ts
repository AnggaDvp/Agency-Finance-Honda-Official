import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { detectIntent, extractContext } from "@/lib/chatbot/intent";
import { shouldEscalate, HANDOVER_REPLY } from "@/lib/chatbot/escalation";
import { staticReplyFor } from "@/lib/chatbot/response";
import { formatSimulationReply } from "@/lib/chatbot/rules";
import { searchMotorcycles } from "@/lib/services/motor-service";
import { getMotorcycleSimulation } from "@/lib/services/simulation-service";
import { isLlmAvailable, naturalizeWithLlm } from "@/lib/services/llm-service";
import { RATE_UNAVAILABLE_MESSAGE } from "@/lib/utils/constants";

type Client = SupabaseClient<Database>;

type CustomerMessageResult = {
  intent: string;
  reply: string;
  escalate: boolean;
  context: Record<string, unknown>;
};

async function loadRecentConversation(
  client: Client,
  conversationId?: string | null,
): Promise<Array<{ role: "user" | "assistant"; content: string }>> {
  if (!conversationId) return [];
  try {
    const { data } = await client
      .from("messages")
      .select("sender_type, message")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: false })
      .limit(12);
    const rows = (data ?? []) as Array<{ sender_type: string; message: string }>;
    return rows
      .slice()
      .reverse()
      .map((row) => ({
        role: row.sender_type === "bot" || row.sender_type === "admin"
          ? "assistant" as const
          : "user" as const,
        content: row.message ?? "",
      }))
      .filter((r) => r.content.length > 0);
  } catch {
    return [];
  }
}

async function naturalizeIfAvailable(input: {
  userMessage: string;
  result: CustomerMessageResult;
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }>;
}): Promise<CustomerMessageResult> {
  if (!isLlmAvailable() || input.result.escalate) return input.result;

  const llmResult = await naturalizeWithLlm({
    userMessage: input.userMessage,
    detectedIntent: input.result.intent,
    context: input.result.context,
    systemDraftReply: input.result.reply,
    conversationHistory: input.conversationHistory,
  }).catch(() => null);

  if (llmResult && llmResult.ok && llmResult.text.length > 0) {
    return {
      ...input.result,
      reply: llmResult.text,
    };
  }
  return input.result;
}

export async function processCustomerMessage(
  client: Client,
  message: string,
  opts?: { conversation_id?: string | null },
): Promise<CustomerMessageResult> {
  const intent = detectIntent(message);
  const context = extractContext(message);

  if (shouldEscalate(intent, message)) {
    return { intent, reply: HANDOVER_REPLY, escalate: true, context };
  }

  if (intent === "REQUEST_SIMULATION" || intent === "NEW_MOTOR_INSTALLMENT") {
    if (context.motorcycleQuery && context.dp && context.tenor) {
      const motors = await searchMotorcycles(client, context.motorcycleQuery);
      const motor = motors[0];
      if (!motor) {
        const base = { intent, reply: "Motor tersebut belum ada di katalog kami kak.", escalate: false, context };
        const history = await loadRecentConversation(client, opts?.conversation_id);
        return naturalizeIfAvailable({ userMessage: message, result: base, conversationHistory: history });
      }
      const simulation = await getMotorcycleSimulation(client, {
        motorcycleId: motor.id,
        dp: context.dp,
        tenor: context.tenor,
      });
      if (!simulation.available) {
        const base = { intent, reply: RATE_UNAVAILABLE_MESSAGE, escalate: false, context };
        const history = await loadRecentConversation(client, opts?.conversation_id);
        return naturalizeIfAvailable({ userMessage: message, result: base, conversationHistory: history });
      }
      const base = {
        intent,
        reply: formatSimulationReply(context, Number(simulation.rate.installment)),
        escalate: false,
        context,
      };
      const history = await loadRecentConversation(client, opts?.conversation_id);
      return naturalizeIfAvailable({ userMessage: message, result: base, conversationHistory: history });
    }
  }

  const { data: kb } = await client
    .from("chatbot_intents")
    .select("id, intent_key, chatbot_responses(response_text, priority, active)")
    .eq("intent_key", intent)
    .eq("active", true)
    .maybeSingle();

  const kbRecord = kb as unknown as { chatbot_responses: Array<{ response_text: string; priority: number; active: boolean }> } | null;
  const rows = kbRecord?.chatbot_responses ?? [];
  const knowledge = rows.filter((row) => row.active).sort((a, b) => a.priority - b.priority)[0];

  const baseResult: CustomerMessageResult = {
    intent,
    reply: knowledge?.response_text ?? staticReplyFor(intent as never, context),
    escalate: false,
    context,
  };

  const history = await loadRecentConversation(client, opts?.conversation_id);
  return naturalizeIfAvailable({ userMessage: message, result: baseResult, conversationHistory: history });
}

export async function generateReply(
  message: string,
  opts?: { conversation_id?: string; supabaseClient?: Client | null },
): Promise<string> {
  const client = opts?.supabaseClient;

  const intent = detectIntent(message);
  const context = extractContext(message);
  if (shouldEscalate(intent, message)) {
    return HANDOVER_REPLY;
  }

  if (client) {
    try {
      const result = await processCustomerMessage(client, message, { conversation_id: opts?.conversation_id ?? null });
      return result.reply;
    } catch {
      return staticReplyFor(intent as never, context);
    }
  }

  return staticReplyFor(intent as never, context);
}

