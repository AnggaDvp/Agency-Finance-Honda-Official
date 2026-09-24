import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { BpkbRate, MotorcycleRate, SimulationResult } from "@/types/rate-card";
import { RATE_UNAVAILABLE_MESSAGE } from "@/lib/utils/constants";
import { listBpkbProducts } from "@/lib/services/rate-card-service";

type Client = SupabaseClient<Database>;

type MotorcycleQuery = {
  motorcycleId: string;
  dp: number;
  tenor: number;
  period?: string;
  area?: string;
};

type BpkbQuery = {
  productId?: string;
  disbursement: number;
  tenor: number;
  period?: string;
  area?: string;
};

function unavailable(): SimulationResult<never> {
  return { available: false, message: RATE_UNAVAILABLE_MESSAGE };
}

export async function getMotorcycleSimulation(
  client: Client,
  query: MotorcycleQuery,
): Promise<SimulationResult<MotorcycleRate>> {
  let request = client
    .from("motorcycle_rates")
    .select("*")
    .eq("motorcycle_id", query.motorcycleId)
    .eq("dp", query.dp)
    .eq("tenor", query.tenor)
    .eq("status", "active");

  if (query.period) request = request.eq("period", query.period);
  if (query.area) request = request.eq("area", query.area);

  const { data, error } = await request.maybeSingle();
  if (error) throw error;
  if (!data) return unavailable();
  return { available: true, rate: data as MotorcycleRate };
}

export async function getBpkbSimulation(
  client: Client,
  query: BpkbQuery,
): Promise<SimulationResult<BpkbRate>> {
  let productId = query.productId;
  if (!productId) {
    const products = await listBpkbProducts(client);
    productId = products[0]?.id;
  }
  if (!productId) return unavailable();

  let request = client
    .from("bpkb_rates")
    .select("*")
    .eq("product_id", productId)
    .eq("disbursement_amount", query.disbursement)
    .eq("tenor", query.tenor)
    .eq("status", "active");

  if (query.period) request = request.eq("period", query.period);
  if (query.area) request = request.eq("area", query.area);

  const { data, error } = await request.maybeSingle();
  if (error) throw error;
  if (!data) return unavailable();
  return { available: true, rate: data as BpkbRate };
}

export async function findAvailableTenors(client: Client, motorcycleId: string, dp?: number) {
  let request = client
    .from("motorcycle_rates")
    .select("tenor")
    .eq("motorcycle_id", motorcycleId)
    .eq("status", "active");
  if (dp !== undefined) request = request.eq("dp", dp);
  const { data, error } = await request;
  if (error) throw error;
  const rows = (data ?? []) as { tenor: number }[];
  return [...new Set(rows.map((row) => row.tenor))].sort((a, b) => a - b);
}

export async function findAvailableDpOptions(client: Client, motorcycleId: string) {
  const { data, error } = await client
    .from("motorcycle_rates")
    .select("dp")
    .eq("motorcycle_id", motorcycleId)
    .eq("status", "active");
  if (error) throw error;
  const rows = (data ?? []) as { dp: number }[];
  return [...new Set(rows.map((row) => Number(row.dp)))].sort((a, b) => a - b);
}

export async function findAffordableOptions(
  client: Client,
  motorcycleId: string,
  maxInstallment: number,
) {
  const { data, error } = await client
    .from("motorcycle_rates")
    .select("*")
    .eq("motorcycle_id", motorcycleId)
    .eq("status", "active")
    .lte("installment", maxInstallment)
    .order("installment");
  if (error) throw error;
  return (data ?? []) as MotorcycleRate[];
}

export async function findStartingMotorcycleRate(client: Client, motorcycleId: string) {
  const { data, error } = await client
    .from("motorcycle_rates")
    .select("*")
    .eq("motorcycle_id", motorcycleId)
    .eq("status", "active")
    .order("installment", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data as MotorcycleRate | null;
}
