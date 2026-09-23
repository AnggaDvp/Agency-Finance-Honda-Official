import { z } from "zod";

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
