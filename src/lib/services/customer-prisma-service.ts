/**
 * Customer Prisma Service — Flow identifikasi customer NSC Finance.
 *
 * BUSINESS RULES:
 * 1. Nomor telepon = IDENTITAS UNIQUE Customer (phone unique constraint).
 * 2. Jika nomor HP sudah ada → PAKAI customer existing (JANGAN create baru).
 * 3. Jika nomor HP BELUM ada → butuh biodata lengkap (7 field) untuk create baru.
 * 4. 1 Customer → BISA punya BANYAK Application (relation Customer.applications[]).
 * 5. Tidak ada password customer, tidak ada RO/NIO/NEW.
 *
 * IMPORTANT:
 * - Karena database production MySQL Hostinger BELUM terhubung pada tahap ini,
 *   semua method di sini safe: selalu try/catch dan fallback throw error friendly.
 *   Flow DILINDUNGI API route (tidak merusak existing Supabase).
 * - Fallback: Jika Prisma gagal connect (DATABASE_URL tidak di-set),
 *   kita lempar error eksplisit agar frontend menampilkan hint maintenance.
 */

import { prisma } from "@/lib/prisma";
import { normalizePhone } from "@/lib/utils/normalize-phone";
import type { Prisma, Customer } from "@/generated/prisma/client";

// -------------------------------------------------------------------------
// Tipe input create customer baru (biodata lengkap 7 field)
// -------------------------------------------------------------------------
export type CreateCustomerPrismaInput = {
  name: string;
  phone: string; // raw input, akan dinormalisasi ke 0813xxx
  wilayah?: string | null;
  kecamatan?: string | null;
  kelurahan?: string | null;
  kodePos?: string | null;
  namaJalan?: string | null;
};

export type IdentifyResult =
  | { found: true; customer: Customer }
  | { found: false; normalizedPhone: string };

/**
 * findCustomerByPhone — cari Customer berdasarkan nomor telepon (UNIQUE).
 * Input RAW (bisa 08xx / 62xx / 8xx / dll) otomatis dinormalisasi.
 */
export async function findCustomerByPhone(rawPhone: string): Promise<Customer | null> {
  const normalized = normalizePhone(rawPhone);
  if (!normalized || normalized.length < 8) return null;

  try {
    const customer = await prisma.customer.findUnique({
      where: { phone: normalized },
    });
    return customer;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    // Jika error karena DATABASE_URL kosong / prisma generate belum jalan / MySQL belum connect,
    // beri pesan friendly untuk frontend. Kita TIDAK fallback ke Supabase di sini
    // (agar flow isolasi jelas).
    if (
      typeof msg === "string" &&
      (msg.includes("DATABASE_URL") ||
        msg.includes("no such table") ||
        msg.includes("Can't reach database") ||
        msg.includes("unknown database"))
    ) {
      // Return null dengan side-effect throw, tetapi caller akan tangkap.
      throw new Error(
        "Database customer dalam tahap pemeliharaan. Silakan coba beberapa saat lagi.",
      );
    }
    throw err;
  }
}

/**
 * identifyCustomerByPhone — API utama flow identifikasi.
 * Return found:true (pakai existing) atau found:false (need biodata create).
 */
export async function identifyCustomerByPhone(rawPhone: string): Promise<IdentifyResult> {
  const normalized = normalizePhone(rawPhone);
  if (!normalized || normalized.length < 8) {
    throw new Error("Nomor telepon tidak valid. Minimal 8 digit.");
  }
  const existing = await findCustomerByPhone(normalized);
  if (existing) return { found: true, customer: existing };
  return { found: false, normalizedPhone: normalized };
}

/**
 * createCustomerPrisma — BUAT customer BARU hanya jika nomor BELUM ADA.
 * Constraint UNIQUE(phone) di schema.prisma + check explicit disini agar aman race condition double click.
 */
export async function createCustomerPrisma(input: CreateCustomerPrismaInput): Promise<Customer> {
  const normalized = normalizePhone(input.phone);
  if (!normalized || normalized.length < 8) {
    throw new Error("Nomor telepon tidak valid.");
  }
  if (!input.name || input.name.trim().length < 2) {
    throw new Error("Nama lengkap harus diisi (minimal 2 karakter).");
  }

  // Guard anti-duplicate sebelum insert (jika ada race condition, schema unique akan catch).
  const existing = await findCustomerByPhone(normalized);
  if (existing) {
    // Nomor sudah ada = JANGAN buat baru → return existing (sesuai aturan bisnis nomor 2).
    return existing;
  }

  const data: Prisma.CustomerCreateInput = {
    name: input.name.trim(),
    phone: normalized, // 100% disimpan format 0813xxx → unique key ini
    wilayah: input.wilayah ?? undefined,
    kecamatan: input.kecamatan ?? undefined,
    kelurahan: input.kelurahan ?? undefined,
    kodePos: input.kodePos ?? undefined,
    namaJalan: input.namaJalan ?? undefined,
  };

  try {
    return await prisma.customer.create({ data });
  } catch (err) {
    // MySQL error code 1062 = Duplicate unique constraint (race condition second submit).
    // Di sini kita balas existing customer (tidak error).
    const msg = err instanceof Error ? err.message : String(err);
    if (
      typeof msg === "string" &&
      (msg.includes("Unique constraint") ||
        msg.includes("Duplicate entry") ||
        msg.includes("1062"))
    ) {
      const customer = await findCustomerByPhone(normalized);
      if (customer) return customer;
    }
    throw err;
  }
}

/**
 * getCustomerById — untuk session lookup setelah sign-in/session verify.
 */
export async function getCustomerById(id: string): Promise<Customer | null> {
  if (!id) return null;
  try {
    return await prisma.customer.findUnique({ where: { id } });
  } catch {
    return null;
  }
}
