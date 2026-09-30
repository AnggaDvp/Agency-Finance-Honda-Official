import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { ChatMessage, Conversation, ConversationMode } from "@/types/chat";
import { processCustomerMessage } from "@/lib/chatbot/engine";

type Client = SupabaseClient<Database>;

export async function getOrCreateConversation(
  client: Client,
  options: {
    conversationId?: string;
    customerId?: string | null;
    applicationId?: string | null;
    guestName?: string;
    guestPhone?: string;
    initialMode?: ConversationMode;
  },
) {
  if (options.conversationId) {
    const { data, error } = await client
      .from("conversations")
      .select("*")
      .eq("id", options.conversationId)
      .maybeSingle();
    if (error) throw error;
    if (data) return data as Conversation;
  }

  if (options.applicationId) {
    const { data: existingByApp, error: errByApp } = await client
      .from("conversations")
      .select("*")
      .eq("application_id", options.applicationId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!errByApp && existingByApp) return existingByApp as Conversation;
  }

  const mode: ConversationMode = options.initialMode ?? "bot";
  const convPayload = {
    customer_id: options.customerId ?? null,
    application_id: options.applicationId ?? null,
    guest_name: options.guestName ?? "Pengunjung",
    guest_phone: options.guestPhone ?? null,
    status: "BOT_ACTIVE" as const,
    mode,
    last_message_at: new Date().toISOString(),
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (client.from("conversations") as any).insert(convPayload).select("*").single();
  if (error) throw error;
  return data as Conversation;
}

export async function listMessages(client: Client, conversationId: string) {
  const { data, error } = await client
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as ChatMessage[];
}

export async function insertMessage(
  client: Client,
  input: {
    conversationId: string;
    senderType: "customer" | "bot" | "admin";
    senderId?: string | null;
    message: string;
    metadata?: Record<string, unknown>;
  },
) {
  const msgPayload = {
    conversation_id: input.conversationId,
    sender_type: input.senderType,
    sender_id: input.senderId ?? null,
    message: input.message,
    metadata: input.metadata ?? null,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (client.from("messages") as any).insert(msgPayload).select("*").single();
  if (error) throw error;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (client.from("conversations") as any)
    .update({ last_message_at: new Date().toISOString() })
    .eq("id", input.conversationId)
    .catch(() => null);

  return data as ChatMessage;
}

export async function handleCustomerChat(
  client: Client,
  input: {
    conversationId?: string;
    message: string;
    customerId?: string | null;
    guestName?: string;
    applicationId?: string | null;
  },
) {
  const conversation = await getOrCreateConversation(client, input);

  await insertMessage(client, {
    conversationId: conversation.id,
    senderType: "customer",
    senderId: input.customerId,
    message: input.message,
  });

  const isAdminActive = conversation.mode === "admin" || conversation.mode === "ADMIN_ACTIVE" || conversation.status === "ADMIN_ACTIVE";
  if (isAdminActive) {
    return { conversation, botReplied: false };
  }

  const result = await processCustomerMessage(client, input.message);

  if (result.escalate) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (client.from("conversations") as any)
      .update({ mode: "waiting_admin", status: "open" })
      .eq("id", conversation.id);
  }

  await insertMessage(client, {
    conversationId: conversation.id,
    senderType: "bot",
    message: result.reply,
    metadata: { intent: result.intent, escalate: result.escalate },
  });

  const nextMode = result.escalate ? "waiting_admin" : conversation.mode;
  return {
    conversation: { ...conversation, mode: nextMode },
    botReplied: true,
  };
}

export async function takeOverConversation(client: Client, conversationId: string, adminId: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (client.from("conversations") as any)
    .update({
      mode: "ADMIN_ACTIVE",
      status: "ADMIN_ACTIVE",
      assigned_admin_id: adminId,
    })
    .eq("id", conversationId);
  if (error) throw error;
}

export async function returnConversationToBot(client: Client, conversationId: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (client.from("conversations") as any)
    .update({ mode: "BOT_ACTIVE", status: "BOT_ACTIVE", assigned_admin_id: null })
    .eq("id", conversationId);
  if (error) throw error;
}

export async function listConversations(client: Client) {
  const { data, error } = await client
    .from("conversations")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Conversation[];
}

export async function setConversationMode(client: Client, conversationId: string, mode: ConversationMode) {
  const status = mode === "ADMIN_ACTIVE" || mode === "admin" ? "ADMIN_ACTIVE"
    : mode === "BOT_ACTIVE" || mode === "bot" ? "BOT_ACTIVE"
    : "open";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (client.from("conversations") as any)
    .update({ mode, status })
    .eq("id", conversationId);
  if (error) throw error;
}
