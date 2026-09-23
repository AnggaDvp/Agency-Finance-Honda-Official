import type { ChatContext, ChatbotIntentKey } from "@/types/chat";

const INTENT_PATTERNS: Array<{ intent: ChatbotIntentKey; patterns: RegExp[] }> = [
  { intent: "ADMIN_HANDOVER", patterns: [/admin/i, /cs manusia/i, /bicara (ke )?orang/i] },
  { intent: "CUSTOMER_COMPLAINT", patterns: [/komplain/i, /kecewa/i, /lama sekali/i] },
  { intent: "APPLICATION_STATUS", patterns: [/status pengajuan/i, /kode pengajuan/i, /sudah diproses/i] },
  { intent: "INCOME_REQUIREMENT", patterns: [/gaji/i, /penghasilan/i, /slip gaji/i] },
  { intent: "PENALTY_INFORMATION", patterns: [/denda/i, /penalty/i, /telat bayar/i] },
  { intent: "INSTALLMENT_EXPENSIVE", patterns: [/mahal/i, /berat/i, /angsurannya/i] },
  { intent: "BUDGET_LIMITED", patterns: [/budget/i, /kemampuan/i, /terbatas/i] },
  { intent: "BPKB_VEHICLE_BRAND", patterns: [/yamaha/i, /honda/i, /kawasaki/i, /merek/i] },
  { intent: "BPKB_VEHICLE_AGE", patterns: [/usia/i, /tahun ke belakang/i, /maksimal .*tahun/i] },
  { intent: "BPKB_DOCUMENT", patterns: [/syarat/i, /dokumen/i, /ktp/i, /stnk/i] },
  { intent: "BPKB_SPECIAL_CONDITION", patterns: [/atas nama/i, /masih kredit/i, /hilang/i, /blokir/i] },
  { intent: "BPKB_REQUIREMENT", patterns: [/bpkb/i, /gadai/i, /multiguna/i] },
  { intent: "REQUEST_SIMULATION", patterns: [/simulasi/i, /berapa/i, /dp/i, /tenor/i, /angsuran/i] },
  { intent: "NEW_MOTOR_PRICE", patterns: [/harga/i, /otr/i] },
  { intent: "NEW_MOTOR_DP", patterns: [/dp/i, /down payment/i] },
  { intent: "NEW_MOTOR_TENOR", patterns: [/tenor/i, /bulan/i] },
  { intent: "NEW_MOTOR_INSTALLMENT", patterns: [/cicilan/i, /angsuran/i] },
];

export function detectIntent(message: string): ChatbotIntentKey {
  for (const item of INTENT_PATTERNS) {
    if (item.patterns.some((pattern) => pattern.test(message))) {
      return item.intent;
    }
  }
  return "UNKNOWN";
}

export function extractContext(message: string): ChatContext {
  const context: ChatContext = {};
  const dpMatch = message.match(/dp\s*(\d+(?:[.,]\d+)?)\s*(juta|jt)?/i);
  if (dpMatch) {
    const amount = Number(dpMatch[1].replace(",", "."));
    context.dp = dpMatch[2] ? amount * 1_000_000 : amount;
  }

  const tenorMatch = message.match(/(\d+)\s*bulan/i);
  if (tenorMatch) context.tenor = Number(tenorMatch[1]);

  const motorMatch = message.match(/\b(pcx|adv|vario|beat|scoopy|nmax|aerox|supra|cbr|em1)\b/i);
  if (motorMatch) context.motorcycleQuery = motorMatch[1];

  if (/bpkb|gadai|multiguna/i.test(message)) context.topic = "bpkb";
  else if (context.motorcycleQuery) context.topic = "new_motor";

  return context;
}
