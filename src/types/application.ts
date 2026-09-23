export type ApplicationType = "new_motorcycle" | "bpkb_financing";

export type ApplicationStatus =
  | "submitted"
  | "verification"
  | "follow_up"
  | "survey"
  | "processing"
  | "completed"
  | "cancelled";

export type FollowUpStatus = "pending" | "in_progress" | "done";

export type PaymentMethod = "cash" | "credit";

export type Application = {
  id: string;
  application_code: string;
  customer_id: string;
  application_type: ApplicationType;
  motorcycle_id: string | null;
  bpkb_product_id: string | null;
  vehicle_type: string | null;
  vehicle_year: number | null;
  vehicle_plate: string | null;
  requested_amount: number | null;
  selected_dp: number | null;
  selected_tenor: number | null;
  estimated_installment: number | null;
  payment_method: PaymentMethod | null;
  status: ApplicationStatus;
  survey_number: string | null;
  voucher_name: string | null;
  source: string;
  follow_up_status: FollowUpStatus;
  is_demo: boolean;
  created_at: string;
  updated_at: string;
};

export type ApplicationWithCustomer = Application & {
  customer: {
    full_name: string;
    phone: string;
    city: string;
  } | null;
};

export const APPLICATION_TIMELINE: ApplicationStatus[] = [
  "submitted",
  "verification",
  "follow_up",
  "survey",
  "processing",
  "completed",
];
