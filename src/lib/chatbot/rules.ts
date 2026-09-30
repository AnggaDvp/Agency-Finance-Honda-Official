import type { ChatContext } from "@/types/chat";

export function formatSimulationReply(context: ChatContext, installment: number) {
  const motor = context.motorcycleQuery?.toUpperCase() ?? "motor tersebut";
  const dp = context.dp ? ` DP Rp ${context.dp.toLocaleString("id-ID")}` : "";
  const tenor = context.tenor ? ` tenor ${context.tenor} bulan` : "";
  const amount = Number(installment) || 0;
  return `Untuk ${motor}${dp}${tenor}, angsuran sesuai rate card: Rp ${amount.toLocaleString("id-ID")} / bulan.`;
}

export function formatReplyIncomeRequirement(): string {
  return "Untuk besaran gaji, ajukan dulu saja kak. Nanti akan dianalisis oleh tim kami dan kami informasikan kembali setelah pengajuan.";
}

export function formatReplyPenaltyBpkb(): string {
  return "Untuk informasi denda akan diinformasikan saat proses pencairan ya kak.";
}

export function formatReplyPenaltyNewMotor(): string {
  return "Untuk informasi denda akan diinformasikan saat motor sudah sampai di alamat kakak ya.";
}

export function formatReplyInstallmentExpensive(): string {
  return "Bisa kita coba opsi yang lebih ringan kak. Mau coba tenor lebih panjang atau nominal pengajuan lebih kecil?";
}
