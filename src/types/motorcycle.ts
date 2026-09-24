export type MotorcycleCategory = "matic" | "cub" | "sport" | "ev";

export type MotorcycleStatus = "active" | "inactive";

export type Motorcycle = {
  id: string;
  brand: string;
  model: string;
  variant: string;
  category: MotorcycleCategory;
  year: number;
  otr_price: number;
  description: string;
  image_url: string | null;
  stock: number;
  status: MotorcycleStatus;
  slug: string;
  promo_active?: boolean;
  fuel_capacity_l?: number;
  power_torque?: string;
  braking_system?: string;
  created_at: string;
  updated_at: string;
};
