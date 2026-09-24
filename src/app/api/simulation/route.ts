import { NextResponse } from "next/server";
import type { MotorcycleRate, BpkbRate, SimulationResult } from "@/types/rate-card";
import { RATE_UNAVAILABLE_MESSAGE } from "@/lib/utils/constants";

const MOTORCYCLE_RATES: MotorcycleRate[] = [
  { id: "r-1", motorcycle_id: "550e8400-e29b-41d4-a716-446655440001", dp: 2500000, tenor: 12, installment: 2150000, otr_price: 26500000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-2", motorcycle_id: "550e8400-e29b-41d4-a716-446655440001", dp: 2500000, tenor: 24, installment: 1125000, otr_price: 26500000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-3", motorcycle_id: "550e8400-e29b-41d4-a716-446655440001", dp: 2500000, tenor: 36, installment: 799000, otr_price: 26500000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-4", motorcycle_id: "550e8400-e29b-41d4-a716-446655440001", dp: 5000000, tenor: 12, installment: 1925000, otr_price: 26500000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-5", motorcycle_id: "550e8400-e29b-41d4-a716-446655440001", dp: 5000000, tenor: 24, installment: 995000, otr_price: 26500000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-6", motorcycle_id: "550e8400-e29b-41d4-a716-446655440002", dp: 5000000, tenor: 12, installment: 3525000, otr_price: 44500000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-7", motorcycle_id: "550e8400-e29b-41d4-a716-446655440002", dp: 5000000, tenor: 24, installment: 1885000, otr_price: 44500000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-8", motorcycle_id: "550e8400-e29b-41d4-a716-446655440002", dp: 5000000, tenor: 36, installment: 1299000, otr_price: 44500000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-9", motorcycle_id: "550e8400-e29b-41d4-a716-446655440003", dp: 5000000, tenor: 36, installment: 1575000, otr_price: 53000000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-10", motorcycle_id: "550e8400-e29b-41d4-a716-446655440004", dp: 2000000, tenor: 36, installment: 649000, otr_price: 21500000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-11", motorcycle_id: "550e8400-e29b-41d4-a716-446655440005", dp: 4000000, tenor: 36, installment: 1125000, otr_price: 39500000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-12", motorcycle_id: "550e8400-e29b-41d4-a716-446655440006", dp: 2000000, tenor: 36, installment: 615000, otr_price: 20500000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-13", motorcycle_id: "550e8400-e29b-41d4-a716-446655440007", dp: 5000000, tenor: 24, installment: 1850000, otr_price: 45000000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-14", motorcycle_id: "550e8400-e29b-41d4-a716-446655440008", dp: 2500000, tenor: 36, installment: 699000, otr_price: 23500000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

const BPKB_RATES: BpkbRate[] = [
  { id: "br-1", product_id: "bpkb-001", scheme: "Reguler", disbursement_amount: 5000000, tenor: 12, installment: 475000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "br-2", product_id: "bpkb-001", scheme: "Reguler", disbursement_amount: 5000000, tenor: 24, installment: 255000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "br-3", product_id: "bpkb-001", scheme: "Reguler", disbursement_amount: 5000000, tenor: 36, installment: 185000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "br-4", product_id: "bpkb-001", scheme: "Reguler", disbursement_amount: 10000000, tenor: 12, installment: 935000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "br-5", product_id: "bpkb-001", scheme: "Reguler", disbursement_amount: 10000000, tenor: 24, installment: 505000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "br-6", product_id: "bpkb-001", scheme: "Reguler", disbursement_amount: 10000000, tenor: 36, installment: 365000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "br-7", product_id: "bpkb-001", scheme: "Reguler", disbursement_amount: 25000000, tenor: 24, installment: 1225000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "br-8", product_id: "bpkb-002", scheme: "Flash", disbursement_amount: 8000000, tenor: 24, installment: 425000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

type SimBodyMotor = { type: "motorcycle"; motorcycleId: string; dp: number | ""; tenor: number | "" };
type SimBodyBpkb = { type: "bpkb"; productId: string; disbursement: number | ""; tenor: number | "" };
type SimBody = SimBodyMotor | SimBodyBpkb;

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const kind = searchParams.get("kind");

  if (kind === "dp") {
    const motorcycleId = searchParams.get("motorcycleId");
    const dps = [...new Set(
      MOTORCYCLE_RATES
        .filter((r) => !motorcycleId || r.motorcycle_id === motorcycleId)
        .map((r) => Number(r.dp)),
    )].sort((a, b) => a - b);
    return NextResponse.json({ dps });
  }

  if (kind === "tenor") {
    const motorcycleId = searchParams.get("motorcycleId");
    const dpRaw = searchParams.get("dp");
    const dp = dpRaw ? Number(dpRaw) : undefined;
    const tenors = [...new Set(
      MOTORCYCLE_RATES
        .filter((r) => !motorcycleId || r.motorcycle_id === motorcycleId)
        .filter((r) => dp === undefined || Number(r.dp) === dp)
        .map((r) => r.tenor),
    )].sort((a, b) => a - b);
    return NextResponse.json({ tenors });
  }

  if (kind === "bpkb-rates") {
    const productId = searchParams.get("productId");
    const rates = BPKB_RATES.filter((r) => !productId || r.product_id === productId);
    return NextResponse.json({ rates });
  }

  return NextResponse.json({ error: "Unknown kind" }, { status: 400 });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SimBody;

    if (body.type === "motorcycle") {
      const { motorcycleId, dp, tenor } = body;
      const rate = MOTORCYCLE_RATES.find(
        (r) =>
          r.motorcycle_id === motorcycleId &&
          (dp === "" || Number(r.dp) === Number(dp)) &&
          (tenor === "" || r.tenor === Number(tenor)),
      );
      const result: SimulationResult<MotorcycleRate> = rate
        ? { available: true, rate }
        : { available: false, message: RATE_UNAVAILABLE_MESSAGE };
      return NextResponse.json(result);
    }

    if (body.type === "bpkb") {
      const { productId, disbursement, tenor } = body;
      const rate = BPKB_RATES.find(
        (r) =>
          r.product_id === productId &&
          (disbursement === "" || Number(r.disbursement_amount) === Number(disbursement)) &&
          (tenor === "" || r.tenor === Number(tenor)),
      );
      const result: SimulationResult<BpkbRate> = rate
        ? { available: true, rate }
        : { available: false, message: RATE_UNAVAILABLE_MESSAGE };
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: "Unknown simulation type" }, { status: 400 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Bad request" },
      { status: 400 },
    );
  }
}
