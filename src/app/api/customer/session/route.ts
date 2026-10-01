/**
 * GET /api/customer/session
 *
 * Digunakan client-side untuk cek: apakah customer SUDAH teridentifikasi (sudah login session)?
 * Baca HTTP-only cookie → verify JWT → return customer data.
 *
 * Response:
 *   { authenticated: true, customer: {...} }
 *   { authenticated: false }
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE_NAME,
  verifyCustomerSession,
} from "@/lib/auth/customer-session";
import { getCustomerById } from "@/lib/services/customer-prisma-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) {
      // Fallback: baca cookie legacy (masa transisi)
      const legacyId = cookieStore.get("nsc_onboarded_profile_id")?.value;
      if (!legacyId) {
        return NextResponse.json({ authenticated: false });
      }
      const cust = await getCustomerById(legacyId);
      if (!cust) return NextResponse.json({ authenticated: false });
      return NextResponse.json({
        authenticated: true,
        customer: {
          id: cust.id,
          name: cust.name,
          phone: cust.phone,
          wilayah: cust.wilayah ?? null,
          kecamatan: cust.kecamatan ?? null,
          kelurahan: cust.kelurahan ?? null,
          kodePos: cust.kodePos ?? null,
          namaJalan: cust.namaJalan ?? null,
        },
      });
    }

    const payload = await verifyCustomerSession(token);
    if (!payload) return NextResponse.json({ authenticated: false });

    const cust = await getCustomerById(payload.sub);
    if (!cust) return NextResponse.json({ authenticated: false });

    return NextResponse.json({
      authenticated: true,
      customer: {
        id: cust.id,
        name: cust.name,
        phone: cust.phone,
        wilayah: cust.wilayah ?? null,
        kecamatan: cust.kecamatan ?? null,
        kelurahan: cust.kelurahan ?? null,
        kodePos: cust.kodePos ?? null,
        namaJalan: cust.namaJalan ?? null,
      },
    });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
