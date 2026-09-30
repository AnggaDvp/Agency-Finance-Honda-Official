import { z } from "zod";

export const biodataOnboardingSchema = z.object({
  full_name: z.string().min(2, "Nama lengkap minimal 2 karakter"),
  phone: z.string().min(8, "Nomor WhatsApp minimal 8 digit"),
  wilayah: z.string().optional(),
  kecamatan: z.string().optional(),
  kelurahan: z.string().optional(),
  kode_pos: z.string().optional(),
  nama_jalan: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
});

export type BiodataOnboardingInput = z.infer<typeof biodataOnboardingSchema>;

export const motorcycleSimulationSchema = z.object({
  motorcycleId: z.string().uuid(),
  dp: z.coerce.number().positive(),
  tenor: z.coerce.number().int().positive(),
  period: z.string().optional(),
  area: z.string().optional(),
});

export const bpkbSimulationSchema = z.object({
  productId: z.string().uuid().optional(),
  disbursement: z.coerce.number().positive(),
  tenor: z.coerce.number().int().positive(),
  period: z.string().optional(),
  area: z.string().optional(),
});

export const chatMessageSchema = z.object({
  conversationId: z.string().uuid().optional(),
  message: z.string().min(1).max(2000),
  guestName: z.string().optional(),
});

export const followUpSchema = z.object({
  application_id: z.string().uuid(),
  note: z.string().min(3),
  follow_up_date: z.string().min(8),
  status: z.enum(["pending", "in_progress", "done"]).default("pending"),
});
