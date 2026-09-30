import { z } from "zod";

export function normalizePhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("62")) {
    digits = "0" + digits.slice(2);
  } else if (digits.startsWith("8")) {
    digits = "0" + digits;
  }
  return digits;
}

export const bpkbApplicationSchema = z.object({
  full_name: z.string().min(2, "Nama lengkap wajib diisi"),
  phone: z
    .string()
    .min(10, "Nomor WhatsApp tidak valid")
    .max(20)
    .transform((v) => normalizePhone(v)),
  address: z.string().min(8, "Alamat lengkap wajib diisi").optional().or(z.literal("")),
  wilayah: z.string().optional(),
  kecamatan: z.string().optional(),
  kelurahan: z.string().optional(),
  kode_pos: z.string().optional(),
  nama_jalan: z.string().optional(),
  vehicle_type: z.string().min(2, "Tipe motor wajib diisi"),
  vehicle_year: z.coerce.number().int().min(2000).max(new Date().getFullYear()),
  vehicle_plate: z.string().min(3, "Nomor polisi wajib diisi"),
  requested_amount: z.coerce.number().optional(),
  selected_tenor: z.coerce.number().optional(),
  source: z.string().optional(),
});

export const motorcycleApplicationSchema = z.object({
  full_name: z.string().min(2, "Nama lengkap wajib diisi"),
  phone: z
    .string()
    .min(10, "Nomor WhatsApp tidak valid")
    .max(20)
    .transform((v) => normalizePhone(v)),
  address: z.string().min(8, "Alamat lengkap wajib diisi").optional().or(z.literal("")),
  wilayah: z.string().optional(),
  kecamatan: z.string().optional(),
  kelurahan: z.string().optional(),
  kode_pos: z.string().optional(),
  nama_jalan: z.string().optional(),
  motorcycle_id: z.string().min(5, "Pilih motor yang diminati"),
  selected_dp: z.coerce.number().optional(),
  selected_tenor: z.coerce.number().optional(),
  payment_method: z.enum(["cash", "credit"]),
  source: z.string().optional(),
});

export const customerProfileSchema = z.object({
  full_name: z.string().min(2, "Nama lengkap wajib diisi"),
  phone: z
    .string()
    .min(10, "Nomor WhatsApp tidak valid")
    .max(20)
    .transform((v) => normalizePhone(v)),
  wilayah: z.string().min(2, "Wilayah wajib diisi"),
  kecamatan: z.string().min(2, "Kecamatan wajib diisi"),
  kelurahan: z.string().min(2, "Kelurahan wajib diisi"),
  kode_pos: z.string().min(4, "Kode pos wajib diisi"),
  nama_jalan: z.string().min(3, "Nama jalan wajib diisi"),
});

export type BpkbApplicationInput = z.infer<typeof bpkbApplicationSchema>;
export type MotorcycleApplicationInput = z.infer<typeof motorcycleApplicationSchema>;
export type CustomerProfileInput = z.infer<typeof customerProfileSchema>;
