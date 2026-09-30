export type UserRole = "customer" | "admin" | "supervisor";

export type Profile = {
  id: string;
  user_id: string | null;
  full_name: string;
  phone: string;
  wilayah?: string;
  kecamatan?: string;
  kelurahan?: string;
  kode_pos?: string;
  nama_jalan?: string;
  address: string;
  city: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
};
