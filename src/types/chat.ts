export type ConversationMode = "bot" | "admin" | "waiting_admin";

export type ConversationStatus = "open" | "closed";

export type SenderType = "customer" | "bot" | "admin";

export type Conversation = {
  id: string;
  customer_id: string | null;
  assigned_admin_id: string | null;
  status: ConversationStatus;
  mode: ConversationMode;
  guest_name: string | null;
  guest_phone: string | null;
  created_at: string;
  updated_at: string;
};

export type ChatMessage = {
  id: string;
  conversation_id: string;
  sender_type: SenderType;
  sender_id: string | null;
  message: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

export type ChatbotIntentKey =
  | "BPKB_REQUIREMENT"
  | "BPKB_VEHICLE_BRAND"
  | "BPKB_VEHICLE_AGE"
  | "BPKB_DOCUMENT"
  | "BPKB_SPECIAL_CONDITION"
  | "INCOME_REQUIREMENT"
  | "PENALTY_INFORMATION"
  | "INSTALLMENT_EXPENSIVE"
  | "BUDGET_LIMITED"
  | "REQUEST_SIMULATION"
  | "NEW_MOTOR_PRICE"
  | "NEW_MOTOR_DP"
  | "NEW_MOTOR_TENOR"
  | "NEW_MOTOR_INSTALLMENT"
  | "APPLICATION_STATUS"
  | "CUSTOMER_COMPLAINT"
  | "ADMIN_HANDOVER"
  | "UNKNOWN";

export type ChatbotIntent = {
  id: string;
  intent_key: ChatbotIntentKey;
  category: string;
  description: string;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type ChatbotResponse = {
  id: string;
  intent_id: string;
  trigger_examples: string[];
  response_text: string;
  priority: number;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type ChatContext = {
  motorcycleQuery?: string;
  dp?: number;
  tenor?: number;
  disbursement?: number;
  topic?: "bpkb" | "new_motor" | "general";
};
