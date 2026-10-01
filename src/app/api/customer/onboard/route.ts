/**
 * POST /api/customer/onboard
 *
 * Step setelah customer BARU (found:false) mengisi biodata lengkap:
 *   { name, phone, wilayah?, kecamatan?, kelurahan?, kodePos?, namaJalan? }
 *
 * Step jika customer LAMA:
 *   Bisa juga dipanggil untuk force refresh session (jika name/phone sesuai existing).
 *
 * Behavior:
 * 1. Jika phone SUDAH ADA → PAKAI customer existing (tidak dibuat baru).
 * 2. Jika phone BELUM ADA → buat customer baru.
 * 3. SELALU SET HTTP-only SECURE COOKIE session (bukan localStorage!).
 * 4. Cookie valid 30 hari, httpOnly=true, sameSite=lax, path=/.
 *
 * Response: { ok: true, customer: {...}, created: boolean }
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import {
  createCustomerPrisma,
  findCustomerByPhone,
} from "@/lib/services/customer-prisma-service";
import { normalizePhone } from "@/lib/utils/normalize-phone";
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  createCustomerSession,
} from "@/lib/auth/customer-session";

export const dynamic = "force-dynamic";

// Input schema: Nama + Phone wajib; 5 field alamat (opsional/nullable).
// Kita TIDAK MEMBUAT PASSWORD CUSTOMER.
const schema = z.object({
  name: z.string().min(2, "Nama lengkap minimal 2 karakter").max(200),
  phone: z.string().min(8, "Nomor telepon minimal 8 digit"),
  wilayah: z.string().optional().or(z.null()),
  kecamatan: z.string().optional().or(z.null()),
  kelurahan: z.string().optional().or(z.null()),
  kodePos: z.string().optional().or(z.null()),
  namaJalan: z.string().optional().or(z.null()),
});

export async function POST(req: Request) {
  try {
    const raw = (await req.json()) as unknown;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? "Data biodata tidak valid" },
        { status: 400 },
      );
    }

    const input = parsed.data;
    const normalized = normalizePhone(input.phone);

    // 1. Cari existing terlebih dahulu
    let customer = await findCustomerByPhone(normalized);
    let created = false;
    if (!customer) {
      // 2. Nomor baru = create customer baru (dengan data biodata).
      customer = await createCustomerPrisma({
        name: input.name,
        phone: normalized,
        wilayah: input.wilayah ?? null,
        kecamatan: input.kecamatan ?? null,
        kelurahan: input.kelurahan ?? null,
        kodePos: input.kodePos ?? null,
        namaJalan: input.namaJalan ?? null,
      });
      created = true;
    }

    // 3. SELALU BUAT SESSION BARU (HTTP-only cookie).
    const token = await createCustomerSession({
      customerId: customer.id,
      name: customer.name,
      phone: customer.phone,
    });

    const cookieStore = await cookies();
    cookieStore.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true, // ✅ TIDAK BISA diakses JS (anti XSS)
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });

    // Legacy cookie (untuk kompatibilitas sementara dengan existing code yang
    // masih pakai nsc_onboarded_profile_id). Nanti akan dihapus bertahap.
    cookieStore.set({
      name: "nsc_onboarded_profile_id",
      value: customer.id,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });

    return NextResponse.json({
      ok: true,
      created,
      customer: {
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        wilayah: customer.wilayah ?? null,
        kecamatan: customer.kecamatan ?? null,
        kelurahan: customer.kelurahan ?? null,
        kodePos: customer.kodePos ?? null,
        namaJalan: customer.namaJalan ?? null,
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Gagal menyimpan biodata";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
