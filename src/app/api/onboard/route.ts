import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { findOrCreateCustomerByPhone } from "@/lib/services/customer-service";
import { biodataOnboardingSchema, type BiodataOnboardingInput } from "@/lib/validations/forms";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    const parsed = biodataOnboardingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Data biodata tidak valid" },
        { status: 400 },
      );
    }

    const input = parsed.data as BiodataOnboardingInput;
    const supabase = await createClient();

    const profile = await findOrCreateCustomerByPhone(supabase, {
      full_name: input.full_name,
      phone: input.phone,
      wilayah: input.wilayah,
      kecamatan: input.kecamatan,
      kelurahan: input.kelurahan,
      kode_pos: input.kode_pos,
      nama_jalan: input.nama_jalan,
      address: input.address,
      city: input.city,
    });

    const cookieStore = await cookies();
    cookieStore.set("nsc_onboarded_profile_id", profile.id, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    cookieStore.set("nsc_onboarded_name", profile.full_name, {
      httpOnly: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return NextResponse.json({ ok: true, profileId: profile.id });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Gagal menyimpan biodata" },
      { status: 500 },
    );
  }
}
