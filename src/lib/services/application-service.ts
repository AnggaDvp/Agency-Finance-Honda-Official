import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { Application, ApplicationWithCustomer } from "@/types/application";
import type { BpkbApplicationInput, MotorcycleApplicationInput } from "@/lib/validations/application";
import { findOrCreateCustomerByPhone } from "@/lib/services/customer-service";
import { getMotorcycleSimulation } from "@/lib/services/simulation-service";
import { getOrCreateConversation, insertMessage } from "@/lib/services/chat-service";

type Client = SupabaseClient<Database>;

const AI_ACKNOWLEDGEMENT =
  "Halo Kak, pengajuan Anda sudah kami terima. Admin kami akan menghubungi Kakak untuk proses selanjutnya ya.";

async function postApplicationCreated(client: Client, input: {
  application: Application;
  customerName: string;
  customerPhone: string;
}) {
  try {
    const conversation = await getOrCreateConversation(client, {
      customerId: input.application.customer_id,
      applicationId: input.application.id,
      guestName: input.customerName,
      guestPhone: input.customerPhone,
    });

    await insertMessage(client, {
      conversationId: conversation.id,
      senderType: "bot",
      message: AI_ACKNOWLEDGEMENT,
      metadata: {
        system: true,
        event: "APPLICATION_CREATED",
        application_id: input.application.id,
      },
    });

    try {
      const scheduleDate = new Date();
      scheduleDate.setMinutes(scheduleDate.getMinutes() + 30);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (client.from("follow_ups") as any).insert({
        application_id: input.application.id,
        note: "Auto follow-up 30 menit setelah pengajuan terkirim",
        follow_up_date: scheduleDate.toISOString(),
        status: "pending",
      }).catch(() => null);
    } catch {
      /* skip follow-up creation on error */
    }

    try {
      const { data: staffList } = await client
        .from("profiles")
        .select("id")
        .in("role", ["admin", "supervisor"])
        .limit(5);
      const staffs = (staffList ?? []) as Array<{ id: string }>;
      const productLabel =
        input.application.application_type === "bpkb_financing" ||
        input.application.application_type === "BPKB_FINANCING"
          ? "Dana Tunai BPKB"
          : "Kredit Motor Baru";
      for (const staff of staffs) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (client.from("notifications") as any).insert({
          user_id: staff.id,
          type: "NEW_APPLICATION",
          title: "Pengajuan Baru Masuk",
          message: `${input.customerName} mengajukan ${productLabel} (${input.application.application_code})`,
          is_read: false,
        }).catch(() => null);
      }
    } catch {
      /* skip notification on error, application must not fail */
    }
  } catch {
    /* FLOW 9 point 9: Continue normal customer experience even if WhatsApp/chat fails */
  }
}

export async function createBpkbApplication(client: Client, input: BpkbApplicationInput) {
  const customer = await findOrCreateCustomerByPhone(client, {
    full_name: input.full_name,
    phone: input.phone,
    address: input.address,
    wilayah: input.wilayah,
    kecamatan: input.kecamatan,
    kelurahan: input.kelurahan,
    kode_pos: input.kode_pos,
    nama_jalan: input.nama_jalan,
  });

  const insertPayload = {
    customer_id: customer.id,
    application_type: "bpkb_financing" as const,
    vehicle_type: input.vehicle_type,
    vehicle_year: input.vehicle_year,
    vehicle_plate: input.vehicle_plate,
    requested_amount: input.requested_amount,
    selected_tenor: input.selected_tenor,
    source: input.source ?? "website",
    status: "submitted" as const,
    follow_up_status: "pending" as const,
    is_demo: false,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (client.from("applications") as any).insert(insertPayload).select("*").single();

  if (error) throw error;
  const application = data as Application;

  await postApplicationCreated(client, {
    application,
    customerName: customer.full_name,
    customerPhone: customer.phone,
  });

  return application;
}

export async function createMotorcycleApplication(client: Client, input: MotorcycleApplicationInput) {
  const customer = await findOrCreateCustomerByPhone(client, {
    full_name: input.full_name,
    phone: input.phone,
    address: input.address,
    wilayah: input.wilayah,
    kecamatan: input.kecamatan,
    kelurahan: input.kelurahan,
    kode_pos: input.kode_pos,
    nama_jalan: input.nama_jalan,
  });

  let estimated: number | null = null;
  if (input.selected_dp && input.selected_tenor) {
    const simulation = await getMotorcycleSimulation(client, {
      motorcycleId: input.motorcycle_id,
      dp: input.selected_dp,
      tenor: input.selected_tenor,
    });
    const rate = simulation.available ? simulation.rate : null;
    estimated = rate ? (rate.installment_amount ?? rate.installment ?? null) : null;
  }

  const insertPayloadMotor = {
    customer_id: customer.id,
    application_type: "new_motorcycle" as const,
    motorcycle_id: input.motorcycle_id,
    selected_dp: input.selected_dp,
    selected_tenor: input.selected_tenor,
    estimated_installment: estimated,
    payment_method: input.payment_method,
    source: input.source ?? "website",
    status: "submitted" as const,
    follow_up_status: "pending" as const,
    is_demo: false,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (client.from("applications") as any).insert(insertPayloadMotor).select("*").single();

  if (error) throw error;
  const application = data as Application;

  await postApplicationCreated(client, {
    application,
    customerName: customer.full_name,
    customerPhone: customer.phone,
  });

  return application;
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
