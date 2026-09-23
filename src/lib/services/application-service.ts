import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { Application, ApplicationWithCustomer } from "@/types/application";
import type { BpkbApplicationInput, MotorcycleApplicationInput } from "@/lib/validations/application";
import { findOrCreateCustomerByPhone } from "@/lib/services/customer-service";
import { getMotorcycleSimulation } from "@/lib/services/simulation-service";

type Client = SupabaseClient<Database>;

export async function createBpkbApplication(client: Client, input: BpkbApplicationInput) {
  const customer = await findOrCreateCustomerByPhone(client, {
    full_name: input.full_name,
    phone: input.phone,
    address: input.address,
  });

  const { data, error } = await client
    .from("applications")
    .insert({
      customer_id: customer.id,
      application_type: "bpkb_financing",
      vehicle_type: input.vehicle_type,
      vehicle_year: input.vehicle_year,
      vehicle_plate: input.vehicle_plate,
      requested_amount: input.requested_amount,
      selected_tenor: input.selected_tenor,
      source: input.source ?? "website",
      status: "submitted",
    })
    .select("*")
    .single();

  if (error) throw error;
  return data as Application;
}

export async function createMotorcycleApplication(client: Client, input: MotorcycleApplicationInput) {
  const customer = await findOrCreateCustomerByPhone(client, {
    full_name: input.full_name,
    phone: input.phone,
    address: input.address,
  });

  let estimated: number | null = null;
  if (input.selected_dp && input.selected_tenor) {
    const simulation = await getMotorcycleSimulation(client, {
      motorcycleId: input.motorcycle_id,
      dp: input.selected_dp,
      tenor: input.selected_tenor,
    });
    estimated = simulation.available ? simulation.rate.installment : null;
  }

  const { data, error } = await client
    .from("applications")
    .insert({
      customer_id: customer.id,
      application_type: "new_motorcycle",
      motorcycle_id: input.motorcycle_id,
      selected_dp: input.selected_dp,
      selected_tenor: input.selected_tenor,
      estimated_installment: estimated,
      payment_method: input.payment_method,
      source: input.source ?? "website",
      status: "submitted",
    })
    .select("*")
    .single();

  if (error) throw error;
  return data as Application;
}

export async function listApplications(
  client: Client,
  options: {
    search?: string;
    status?: string;
    type?: string;
    page?: number;
    pageSize?: number;
    sort?: string;
  } = {},
) {
  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? 20;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = client
    .from("applications")
    .select("*, customer:profiles!applications_customer_id_fkey(full_name, phone, city)", { count: "exact" })
    .order(options.sort === "code" ? "application_code" : "created_at", { ascending: false })
    .range(from, to);

  if (options.status) query = query.eq("status", options.status);
  if (options.type) query = query.eq("application_type", options.type);
  if (options.search) {
    query = query.or(
      `application_code.ilike.%${options.search}%,survey_number.ilike.%${options.search}%,voucher_name.ilike.%${options.search}%`,
    );
  }

  const { data, error, count } = await query;
  if (error) throw error;

  return {
    rows: (data ?? []) as ApplicationWithCustomer[],
    total: count ?? 0,
    page,
    pageSize,
  };
}

export async function getApplicationByCode(client: Client, code: string) {
  const { data, error } = await client
    .from("applications")
    .select("*, customer:profiles!applications_customer_id_fkey(full_name, phone, city)")
    .eq("application_code", code)
    .maybeSingle();
  if (error) throw error;
  return data as ApplicationWithCustomer | null;
}

export async function getApplicationsForCustomer(client: Client, customerId: string) {
  const { data, error } = await client
    .from("applications")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Application[];
}

export async function getDashboardStats(client: Client) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [customers, todayApps, bpkb, motor, chats, needAdmin, followUps] = await Promise.all([
    client.from("profiles").select("id", { count: "exact", head: true }).eq("role", "customer"),
    client.from("applications").select("id", { count: "exact", head: true }).gte("created_at", today.toISOString()),
    client.from("applications").select("id", { count: "exact", head: true }).eq("application_type", "bpkb_financing"),
    client.from("applications").select("id", { count: "exact", head: true }).eq("application_type", "new_motorcycle"),
    client.from("conversations").select("id", { count: "exact", head: true }).eq("status", "open"),
    client.from("conversations").select("id", { count: "exact", head: true }).eq("mode", "waiting_admin"),
    client.from("follow_ups").select("id", { count: "exact", head: true }).eq("status", "pending"),
  ]);

  return {
    totalCustomers: customers.count ?? 0,
    applicationsToday: todayApps.count ?? 0,
    bpkbApplications: bpkb.count ?? 0,
    newMotorApplications: motor.count ?? 0,
    activeChats: chats.count ?? 0,
    needAdmin: needAdmin.count ?? 0,
    followUps: followUps.count ?? 0,
  };
}
