"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useRealtime<T extends { id: string }>(table: "messages" | "conversations" | "applications") {
  const [rows, setRows] = useState<T[]>([]);

  useEffect(() => {
    const supabase = createClient();
    const load = async () => {
      const { data } = await supabase.from(table).select("*").order("created_at", { ascending: false });
      setRows((data ?? []) as T[]);
    };
    void load();

    const channel = supabase
      .channel(`realtime:${table}`)
      .on("postgres_changes", { event: "*", schema: "public", table }, () => {
        void load();
      })
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [table]);

  return rows;
}
