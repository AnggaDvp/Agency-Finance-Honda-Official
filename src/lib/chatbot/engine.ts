import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { detectIntent, extractContext } from "@/lib/chatbot/intent";
import { shouldEscalate, HANDOVER_REPLY } from "@/lib/chatbot/escalation";
import { staticReplyFor } from "@/lib/chatbot/response";
import { formatSimulationReply } from "@/lib/chatbot/rules";
import { searchMotorcycles } from "@/lib/services/motor-service";
import { getMotorcycleSimulation } from "@/lib/services/simulation-service";
import { RATE_UNAVAILABLE_MESSAGE } from "@/lib/utils/constants";

type Client = SupabaseClient<Database>;

export async function processCustomerMessage(client: Client, message: string) {
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
        return { intent, reply: "Motor tersebut belum ada di katalog kami kak.", escalate: false, context };
      }
      const simulation = await getMotorcycleSimulation(client, {
        motorcycleId: motor.id,
        dp: context.dp,
        tenor: context.tenor,
      });
      if (!simulation.available) {
        return { intent, reply: RATE_UNAVAILABLE_MESSAGE, escalate: false, context };
      }
      return {
        intent,
        reply: formatSimulationReply(context, Number(simulation.rate.installment)),
        escalate: false,
        context,
      };
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

  return {
    intent,
    reply: knowledge?.response_text ?? staticReplyFor(intent, context),
    escalate: false,
    context,
  };
}

export async function generateReply(
  message: string,
  opts?: { conversation_id?: string; supabaseClient?: Client | null },
): Promise<string> {
  void opts?.conversation_id;
  const client = opts?.supabaseClient;

  const intent = detectIntent(message);
  const context = extractContext(message);
  if (shouldEscalate(intent, message)) {
    return HANDOVER_REPLY;
  }

  if (client) {
    try {
      const result = await processCustomerMessage(client, message);
      return result.reply;
    } catch {
      return staticReplyFor(intent, context);
    }
  }

  return staticReplyFor(intent, context);
}
