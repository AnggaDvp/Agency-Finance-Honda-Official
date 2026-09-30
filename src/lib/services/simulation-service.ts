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
    .eq("status", "active")
    .or(`dp.eq.${query.dp},dp_amount.eq.${query.dp}`)
    .or(`tenor.eq.${query.tenor},tenor_months.eq.${query.tenor}`);

  if (query.period) request = request.eq("period", query.period);
  if (query.area) request = request.eq("area", query.area);

  const { data, error } = await request.limit(1).maybeSingle();
  if (error) throw error;
  if (!data) return unavailable();

  const raw = data as Record<string, unknown>;
  const normalized: MotorcycleRate = {
    ...(data as unknown as MotorcycleRate),
    dp_amount: Number(raw.dp_amount ?? raw.dp ?? query.dp),
    dp: Number(raw.dp ?? raw.dp_amount ?? query.dp),
    tenor: Number(raw.tenor ?? raw.tenor_months ?? query.tenor),
    tenor_months: Number(raw.tenor_months ?? raw.tenor ?? query.tenor),
    installment: Number(raw.installment ?? raw.installment_amount ?? 0),
    installment_amount: Number(raw.installment_amount ?? raw.installment ?? 0),
    dp_cukup_bayar: Number(raw.dp_cukup_bayar ?? (raw.dp_amount ? Number(raw.dp_amount) * 1.12 : Number(raw.dp ?? 0) * 1.12)),
  };
  return { available: true, rate: normalized };
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
