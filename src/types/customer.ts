export type UserRole = "customer" | "admin" | "supervisor";

export type Profile = {
  id: string;
  user_id: string | null;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
};
