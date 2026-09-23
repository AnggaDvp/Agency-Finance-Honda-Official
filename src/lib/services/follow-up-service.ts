import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { FollowUp } from "@/types/admin";

type Client = SupabaseClient<Database>;

export async function listFollowUps(client: Client) {
  const { data, error } = await client
    .from("follow_ups")
    .select("*")
    .order("follow_up_date", { ascending: true });
  if (error) throw error;
  return (data ?? []) as FollowUp[];
}

export async function createFollowUp(
  client: Client,
  input: { application_id: string; admin_id?: string; note: string; follow_up_date: string; status?: FollowUp["status"] },
) {
  const { data, error } = await client
    .from("follow_ups")
    .insert({
      application_id: input.application_id,
      admin_id: input.admin_id,
      note: input.note,
      follow_up_date: input.follow_up_date,
      status: input.status ?? "pending",
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as FollowUp;
}
