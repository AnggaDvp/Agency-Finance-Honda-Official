import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { Motorcycle } from "@/types/motorcycle";

type Client = SupabaseClient<Database>;

export async function listMotorcycles(client: Client, category?: string) {
  let query = client.from("motorcycles").select("*").eq("status", "active").order("model");
  if (category && category !== "all") query = query.eq("category", category);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Motorcycle[];
}

export async function getMotorcycleBySlug(client: Client, slug: string) {
  const { data, error } = await client.from("motorcycles").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data as Motorcycle | null;
}

export async function getMotorcycleById(client: Client, id: string) {
  const { data, error } = await client.from("motorcycles").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data as Motorcycle | null;
}

export async function searchMotorcycles(client: Client, queryText: string) {
  const { data, error } = await client
    .from("motorcycles")
    .select("*")
    .eq("status", "active")
    .or(`model.ilike.%${queryText}%,brand.ilike.%${queryText}%,slug.ilike.%${queryText}%`);
  if (error) throw error;
  return (data ?? []) as Motorcycle[];
}

export async function listAllMotorcyclesAdmin(client: Client) {
  const { data, error } = await client.from("motorcycles").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Motorcycle[];
}
