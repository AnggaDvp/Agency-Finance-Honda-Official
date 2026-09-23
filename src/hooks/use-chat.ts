"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ChatMessage, Conversation } from "@/types/chat";

export function useChat(initialConversationId?: string) {
  const [conversationId, setConversationId] = useState(initialConversationId);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMessages = useCallback(async (id: string) => {
    const supabase = createClient();
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", id)
      .order("created_at");
    setMessages((data ?? []) as ChatMessage[]);
  }, []);

  useEffect(() => {
    if (!conversationId) return;
    void loadMessages(conversationId);

    const supabase = createClient();
    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${conversationId}` },
        (payload) => {
          setMessages((current) => [...current, payload.new as ChatMessage]);
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [conversationId, loadMessages]);

  const send = async (message: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, message }),
      });
      const json = (await response.json()) as { conversationId?: string; error?: string };
      if (!response.ok) throw new Error(json.error ?? "Gagal mengirim pesan");
      if (json.conversationId) setConversationId(json.conversationId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim pesan");
    } finally {
      setLoading(false);
    }
  };

  return { conversationId, messages, loading, error, send };
}

export function useRealtimeConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const supabase = createClient();

    const load = async () => {
      const { data } = await supabase.from("conversations").select("*").order("updated_at", { ascending: false });
      setConversations((data ?? []) as Conversation[]);
    };

    void load();

    const channel = supabase
      .channel("conversations-admin")
      .on("postgres_changes", { event: "*", schema: "public", table: "conversations" }, () => {
        void load();
      })
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  return conversations;
}
