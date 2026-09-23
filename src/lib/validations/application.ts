import { z } from "zod";

export const bpkbApplicationSchema = z.object({
  full_name: z.string().min(2, "Nama lengkap wajib diisi"),
  phone: z.string().min(10, "Nomor WhatsApp tidak valid").max(20),
  address: z.string().min(8, "Alamat lengkap wajib diisi"),
  vehicle_type: z.string().min(2, "Tipe motor wajib diisi"),
  vehicle_year: z.coerce.number().int().min(2000).max(new Date().getFullYear()),
  vehicle_plate: z.string().min(3, "Nomor polisi wajib diisi"),
  requested_amount: z.coerce.number().optional(),
  selected_tenor: z.coerce.number().optional(),
  source: z.string().optional(),
});

export const motorcycleApplicationSchema = z.object({
  full_name: z.string().min(2, "Nama lengkap wajib diisi"),
  phone: z.string().min(10, "Nomor WhatsApp tidak valid").max(20),
  address: z.string().min(8, "Alamat lengkap wajib diisi"),
  motorcycle_id: z.string().uuid("Pilih motor yang diminati"),
  selected_dp: z.coerce.number().optional(),
  selected_tenor: z.coerce.number().optional(),
  payment_method: z.enum(["cash", "credit"]),
  source: z.string().optional(),
});

export type BpkbApplicationInput = z.infer<typeof bpkbApplicationSchema>;
export type MotorcycleApplicationInput = z.infer<typeof motorcycleApplicationSchema>;
