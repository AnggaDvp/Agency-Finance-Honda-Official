export type RateStatus = "active" | "inactive";

export type MotorcycleRate = {
  id: string;
  motorcycle_id: string;
  dp: number;
  tenor: number;
  installment: number;
  otr_price: number;
  period: string;
  area: string;
  status: RateStatus;
  created_at: string;
  updated_at: string;
};

export type BpkbProduct = {
  id: string;
  name: string;
  vehicle_brands: string[];
  max_vehicle_age: number;
  description: string;
  status: RateStatus;
  created_at: string;
  updated_at: string;
};

export type BpkbRate = {
  id: string;
  product_id: string;
  scheme: string;
  disbursement_amount: number;
  tenor: number;
  installment: number;
  period: string;
  area: string;
  status: RateStatus;
  created_at: string;
  updated_at: string;
};

export type SimulationMatch<T> = {
  available: true;
  rate: T;
};

export type SimulationUnavailable = {
  available: false;
  message: string;
};

export type SimulationResult<T> = SimulationMatch<T> | SimulationUnavailable;
