import type { ChatContext } from "@/types/chat";

export function formatSimulationReply(context: ChatContext, installment: number) {
  const motor = context.motorcycleQuery?.toUpperCase() ?? "motor tersebut";
  const dp = context.dp ? ` DP Rp ${context.dp.toLocaleString("id-ID")}` : "";
  const tenor = context.tenor ? ` tenor ${context.tenor} bulan` : "";
  return `Untuk ${motor}${dp}${tenor}, angsuran sesuai rate card: Rp ${installment.toLocaleString("id-ID")} / bulan.`;
}
