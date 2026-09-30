import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { Profile } from "@/types/customer";
import { normalizePhone } from "@/lib/validations/application";

type Client = SupabaseClient<Database>;

export async function getProfileByUserId(client: Client, userId: string) {
  const { data, error } = await client
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return data as Profile | null;
}

export async function findOrCreateCustomerByPhone(
  client: Client,
  input: {
    full_name: string;
    phone: string;
    address?: string;
    city?: string;
    wilayah?: string;
    kecamatan?: string;
    kelurahan?: string;
    kode_pos?: string;
    nama_jalan?: string;
  },
) {
  const normalizedPhone = normalizePhone(input.phone);

  const { data: existing, error: findError } = await client
    .from("profiles")
    .select("*")
    .eq("phone", normalizedPhone)
    .eq("role", "customer")
    .maybeSingle();
  if (findError) throw findError;

  if (existing) {
    const updatePayload: Record<string, unknown> = {};
    if (input.full_name && !existing.full_name) updatePayload.full_name = input.full_name;
    if (input.wilayah && !existing.wilayah) updatePayload.wilayah = input.wilayah;
    if (input.kecamatan && !existing.kecamatan) updatePayload.kecamatan = input.kecamatan;
    if (input.kelurahan && !existing.kelurahan) updatePayload.kelurahan = input.kelurahan;
    if (input.kode_pos && !existing.kode_pos) updatePayload.kode_pos = input.kode_pos;
    if (input.nama_jalan && !existing.nama_jalan) updatePayload.nama_jalan = input.nama_jalan;
    if (input.address && !existing.address) updatePayload.address = input.address;
    if (input.city && !existing.city) updatePayload.city = input.city;

    if (Object.keys(updatePayload).length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: updated, error: updError } = await (client.from("profiles") as any)
        .update(updatePayload)
        .eq("id", existing.id)
        .select("*")
        .single();
      if (!updError && updated) return updated as Profile;
    }
    return existing as Profile;
  }

  const combinedAddress = [input.nama_jalan, input.kelurahan, input.kecamatan, input.wilayah, input.kode_pos]
    .filter(Boolean)
    .join(", ") || input.address || "";

  const customerPayload = {
    full_name: input.full_name,
    phone: normalizedPhone,
    wilayah: input.wilayah ?? "",
    kecamatan: input.kecamatan ?? "",
    kelurahan: input.kelurahan ?? "",
    kode_pos: input.kode_pos ?? "",
    nama_jalan: input.nama_jalan ?? "",
    address: combinedAddress,
    city: input.city ?? "",
    role: "customer" as const,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (client.from("profiles") as any).insert(customerPayload).select("*").single();
  if (error) throw error;
  return data as Profile;
}

export async function listCustomers(client: Client, search?: string) {
  let query = client.from("profiles").select("*").eq("role", "customer").order("created_at", { ascending: false });
  if (search) {
    query = query.or(`full_name.ilike.%${search}%,phone.ilike.%${search}%,city.ilike.%${search}%`);
  }
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Profile[];
}

export async function countCustomers(client: Client) {
  const { count, error } = await client
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("role", "customer");
  if (error) throw error;
  return count ?? 0;
}
