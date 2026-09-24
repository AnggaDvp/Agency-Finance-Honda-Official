import { NextResponse } from "next/server";
import type { Application } from "@/types/application";
import { bpkbApplicationSchema, motorcycleApplicationSchema } from "@/lib/validations/application";

export const dynamic = "force-dynamic";

function generateApplicationCode() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const rand = Math.floor(100 + Math.random() * 900);
  return `NSC-${yyyy}${mm}${dd}-${String(rand).padStart(3, "0")}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      type: "bpkb" | "motor";
      payload: unknown;
    };

    if (!body.type || !["bpkb", "motor"].includes(body.type)) {
      return NextResponse.json({ error: "Tipe pengajuan tidak valid" }, { status: 400 });
    }

    const schema = body.type === "motor" ? motorcycleApplicationSchema : bpkbApplicationSchema;
    const parsed = schema.safeParse(body.payload);
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Data pengajuan tidak valid";
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const values = parsed.data as Record<string, unknown>;
    const now = new Date().toISOString();
    const vehicle_year = body.type === "bpkb" && typeof values.vehicle_year === "number" ? values.vehicle_year : body.type === "bpkb" && typeof values.vehicle_year === "string" ? Number(values.vehicle_year) : null;
    const requested_amount = body.type === "bpkb" && typeof values.requested_amount === "number" ? values.requested_amount : body.type === "bpkb" && typeof values.requested_amount === "string" ? Number(values.requested_amount) : null;
    const selected_dp = body.type === "motor" && typeof values.selected_dp === "number" ? values.selected_dp : body.type === "motor" && typeof values.selected_dp === "string" ? Number(values.selected_dp) : null;
    const selected_tenor = typeof values.selected_tenor === "number" ? values.selected_tenor : typeof values.selected_tenor === "string" ? Number(values.selected_tenor) : null;
    const source = typeof values.source === "string" ? values.source : "website";
    const raw_pm = body.type === "motor" && typeof values.payment_method === "string" ? values.payment_method : null;
    const payment_method = (raw_pm === "cash" || raw_pm === "credit" ? raw_pm : null) as "cash" | "credit" | null;
    const customer_id = typeof values.customer_id === "string" ? values.customer_id : "demo-guest";
    const application: Application = {
      id: "app-" + Math.random().toString(36).slice(2, 10),
      application_code: generateApplicationCode(),
      customer_id,
      application_type: body.type === "motor" ? "new_motorcycle" : "bpkb_financing",
      motorcycle_id: body.type === "motor" && typeof values.motorcycle_id === "string" ? values.motorcycle_id : null,
      bpkb_product_id: body.type === "bpkb" ? "bpkb-001" : null,
      vehicle_type: body.type === "bpkb" && typeof values.vehicle_type === "string" ? values.vehicle_type : null,
      vehicle_year: vehicle_year ?? null,
      vehicle_plate: body.type === "bpkb" && typeof values.vehicle_plate === "string" ? values.vehicle_plate : null,
      requested_amount: requested_amount ?? null,
      selected_dp: selected_dp ?? null,
      selected_tenor: selected_tenor ?? null,
      estimated_installment: null,
      payment_method: payment_method ?? null,
      status: "submitted",
      survey_number: null,
      voucher_name: null,
      source: source ?? "website",
      follow_up_status: "pending",
      is_demo: true,
      created_at: now,
      updated_at: now,
    };

    return NextResponse.json({ application });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Gagal memproses pengajuan" },
      { status: 500 },
    );
  }
}
