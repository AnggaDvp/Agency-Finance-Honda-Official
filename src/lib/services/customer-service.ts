import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { Profile } from "@/types/customer";

type Client = SupabaseClient<Database>;

export async function getProfileByUserId(client: Client, userId: string) {
  const { data, error } = await client
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return data as Profile | null;
}

export async function findOrCreateCustomerByPhone(
  client: Client,
  input: { full_name: string; phone: string; address: string; city?: string },
) {
  const { data: existing, error: findError } = await client
    .from("profiles")
    .select("*")
    .eq("phone", input.phone)
    .eq("role", "customer")
    .maybeSingle();
  if (findError) throw findError;
  if (existing) return existing as Profile;

  const { data, error } = await client
    .from("profiles")
    .insert({
      full_name: input.full_name,
      phone: input.phone,
      address: input.address,
      city: input.city ?? "",
      role: "customer",
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as Profile;
}

export async function listCustomers(client: Client, search?: string) {
  let query = client.from("profiles").select("*").eq("role", "customer").order("created_at", { ascending: false });
  if (search) {
    query = query.or(`full_name.ilike.%${search}%,phone.ilike.%${search}%,city.ilike.%${search}%`);
  }
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Profile[];
}

export async function countCustomers(client: Client) {
  const { count, error } = await client
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("role", "customer");
  if (error) throw error;
  return count ?? 0;
}
