import type { ChatbotIntentKey, ChatContext } from "@/types/chat";
import { HANDOVER_REPLY } from "@/lib/chatbot/escalation";
import {
  formatReplyIncomeRequirement,
  formatReplyPenaltyBpkb,
  formatReplyPenaltyNewMotor,
  formatReplyInstallmentExpensive,
} from "@/lib/chatbot/rules";

const STATIC_REPLIES: Partial<Record<ChatbotIntentKey, string>> = {
  BPKB_VEHICLE_BRAND: "Bisa kak, tipe dan tahun motornya apa?",
  BPKB_VEHICLE_AGE: "Sebutkan tipe dan tahun motornya ya kak, nanti saya cek ketersediaannya.",
  BPKB_REQUIREMENT:
    "Pengajuan Dana BPKB bisa untuk Honda, Yamaha, dan Kawasaki. Tipe dan tahun motornya apa kak?",
  BPKB_DOCUMENT: "Syarat dokumen: KTP, KK, STNK aktif, dan BPKB asli ya kak.",
  INCOME_REQUIREMENT: formatReplyIncomeRequirement(),
  INSTALLMENT_EXPENSIVE: formatReplyInstallmentExpensive(),
  BUDGET_LIMITED: "Bisa kita sesuaikan kak. Sebutkan budget angsuran per bulan yang nyaman ya.",
  APPLICATION_STATUS: "Bisa kak. Kirimkan kode pengajuan agar saya cek statusnya.",
  REQUEST_SIMULATION: "Bisa kak. Sebutkan tipe motor, DP, dan tenor yang diinginkan.",
  NEW_MOTOR_PRICE: "Harga OTR mengikuti katalog resmi ya kak. Motor mana yang ingin dicek?",
  NEW_MOTOR_DP: "DP mengikuti rate card database. Motor dan tenor yang diinginkan apa kak?",
  NEW_MOTOR_TENOR: "Tenor tersedia sesuai rate card motor tersebut. Motor apa yang dicek kak?",
  ADMIN_HANDOVER: HANDOVER_REPLY,
  BPKB_SPECIAL_CONDITION: HANDOVER_REPLY,
  CUSTOMER_COMPLAINT: HANDOVER_REPLY,
};

export function penaltyReply(context: ChatContext) {
  if (context.topic === "new_motor") {
    return formatReplyPenaltyNewMotor();
  }
  return formatReplyPenaltyBpkb();
}

export function fallbackReply() {
  return "Halo kak, saya bisa bantu seputar motor baru, dana BPKB, atau simulasi angsuran. Mau mulai dari mana?";
}

export function staticReplyFor(intent: ChatbotIntentKey, context: ChatContext) {
  if (intent === "PENALTY_INFORMATION") return penaltyReply(context);
  return STATIC_REPLIES[intent] ?? fallbackReply();
}
