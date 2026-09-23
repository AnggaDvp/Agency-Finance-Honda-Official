import type { ChatbotIntentKey } from "@/types/chat";

const ESCALATION_INTENTS: ChatbotIntentKey[] = [
  "BPKB_SPECIAL_CONDITION",
  "CUSTOMER_COMPLAINT",
  "ADMIN_HANDOVER",
];

export function shouldEscalate(intent: ChatbotIntentKey, message: string) {
  if (ESCALATION_INTENTS.includes(intent)) return true;
  if (/atas nama|masih kredit|hilang|sita|blokir/i.test(message)) return true;
  return false;
}

export const HANDOVER_REPLY =
  "Untuk kondisi tersebut perlu dicek lebih lanjut ya kak. Saya bantu teruskan ke Customer Service.";
