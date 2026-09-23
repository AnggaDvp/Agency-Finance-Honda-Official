import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { BpkbProduct, BpkbRate, MotorcycleRate } from "@/types/rate-card";

type Client = SupabaseClient<Database>;

export async function listMotorcycleRates(client: Client, motorcycleId?: string) {
  let query = client.from("motorcycle_rates").select("*").eq("status", "active");
  if (motorcycleId) query = query.eq("motorcycle_id", motorcycleId);
  const { data, error } = await query.order("dp");
  if (error) throw error;
  return (data ?? []) as MotorcycleRate[];
}

export async function listBpkbProducts(client: Client) {
  const { data, error } = await client.from("bpkb_products").select("*").eq("status", "active");
  if (error) throw error;
  return (data ?? []) as BpkbProduct[];
}

export async function listBpkbRates(client: Client, productId?: string) {
  let query = client.from("bpkb_rates").select("*").eq("status", "active");
  if (productId) query = query.eq("product_id", productId);
  const { data, error } = await query.order("disbursement_amount");
  if (error) throw error;
  return (data ?? []) as BpkbRate[];
}
