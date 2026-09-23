import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { ChatMessage, Conversation, ConversationMode } from "@/types/chat";
import { processCustomerMessage } from "@/lib/chatbot/engine";

type Client = SupabaseClient<Database>;

export async function getOrCreateConversation(
  client: Client,
  options: { conversationId?: string; customerId?: string | null; guestName?: string },
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

  const { data, error } = await client
    .from("conversations")
    .insert({
      customer_id: options.customerId ?? null,
      guest_name: options.guestName ?? "Pengunjung",
      status: "open",
      mode: "bot",
    })
    .select("*")
    .single();
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
  const { data, error } = await client
    .from("messages")
    .insert({
      conversation_id: input.conversationId,
      sender_type: input.senderType,
      sender_id: input.senderId ?? null,
      message: input.message,
      metadata: input.metadata ?? null,
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as ChatMessage;
}

export async function handleCustomerChat(
  client: Client,
  input: { conversationId?: string; message: string; customerId?: string | null; guestName?: string },
) {
  const conversation = await getOrCreateConversation(client, input);
  await insertMessage(client, {
    conversationId: conversation.id,
    senderType: "customer",
    senderId: input.customerId,
    message: input.message,
  });

  if (conversation.mode === "admin") {
    return { conversation, botReplied: false };
  }

  const result = await processCustomerMessage(client, input.message);

  if (result.escalate) {
    await client.from("conversations").update({ mode: "waiting_admin" }).eq("id", conversation.id);
  }

  await insertMessage(client, {
    conversationId: conversation.id,
    senderType: "bot",
    message: result.reply,
    metadata: { intent: result.intent, escalate: result.escalate },
  });

  return { conversation: { ...conversation, mode: result.escalate ? "waiting_admin" : conversation.mode }, botReplied: true };
}

export async function takeOverConversation(client: Client, conversationId: string, adminId: string) {
  const { error } = await client
    .from("conversations")
    .update({ mode: "admin", assigned_admin_id: adminId })
    .eq("id", conversationId);
  if (error) throw error;
}

export async function returnConversationToBot(client: Client, conversationId: string) {
  const { error } = await client
    .from("conversations")
    .update({ mode: "bot" })
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
  const { error } = await client.from("conversations").update({ mode }).eq("id", conversationId);
  if (error) throw error;
}
