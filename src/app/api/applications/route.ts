import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { bpkbApplicationSchema, motorcycleApplicationSchema } from "@/lib/validations/application";
import { createBpkbApplication, createMotorcycleApplication } from "@/lib/services/application-service";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const supabase = createClient();

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

    let application;
    if (body.type === "motor") {
      application = await createMotorcycleApplication(supabase, parsed.data);
    } else {
      application = await createBpkbApplication(supabase, parsed.data);
    }

    return NextResponse.json({ application });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Gagal memproses pengajuan" },
      { status: 500 },
    );
  }
}
