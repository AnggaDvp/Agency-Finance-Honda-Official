/**
 * POST /api/customer/identify
 *
 * Input JSON: { phone: "081315379958" }
 *
 * Output:
 *   { found: true,  customer: {...} }   → nomor sudah terdaftar, lanjut session
 *   { found: false, normalizedPhone: "081315379958" } → nomor baru, minta biodata
 *
 * Flow identifikasi: PHONE adalah PRIMARY IDENTIFIER (UNIQUE).
 * Input RAW diperbolehkan (628xxx / 8xxx / 08xxx) — otomatis dinormalisasi server.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { identifyCustomerByPhone } from "@/lib/services/customer-prisma-service";
import { normalizePhone } from "@/lib/utils/normalize-phone";

export const dynamic = "force-dynamic";

const schema = z.object({
  phone: z.string().min(6, "Nomor telepon terlalu pendek"),
});

export async function POST(req: Request) {
  try {
    const raw = (await req.json()) as unknown;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Data tidak valid", found: false },
        { status: 400 },
      );
    }
    const result = await identifyCustomerByPhone(parsed.data.phone);
    if (result.found) {
      return NextResponse.json({
        found: true,
        customer: {
          id: result.customer.id,
          name: result.customer.name,
          phone: result.customer.phone,
          wilayah: result.customer.wilayah ?? null,
          kecamatan: result.customer.kecamatan ?? null,
          kelurahan: result.customer.kelurahan ?? null,
          kodePos: result.customer.kodePos ?? null,
          namaJalan: result.customer.namaJalan ?? null,
        },
      });
    }
    return NextResponse.json({
      found: false,
      normalizedPhone: result.normalizedPhone,
      displayPhone: normalizePhone(parsed.data.phone),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: msg, found: false }, { status: 500 });
  }
}
