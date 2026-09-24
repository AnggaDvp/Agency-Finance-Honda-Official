"use client";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ApplicationWithCustomer } from "@/types/application";
import { ApplicationTimeline } from "@/components/public/application-timeline";
import { formatRupiah } from "@/lib/utils/format";
import { useState } from "react";

const DUMMY_APPS: ApplicationWithCustomer[] = [
  { id: "a-01", application_code: "NSC-20250923-001", customer_id: "c1", application_type: "new_motorcycle", motorcycle_id: "m1", bpkb_product_id: null, vehicle_type: null, vehicle_year: null, vehicle_plate: null, requested_amount: null, selected_dp: 2500000, selected_tenor: 36, estimated_installment: 799000, payment_method: "credit", status: "verification", survey_number: null, voucher_name: null, source: "website", follow_up_status: "pending", is_demo: true, created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), updated_at: new Date().toISOString(), customer: { full_name: "Budi Santoso", phone: "081234567890", city: "Jakarta Selatan" } },
  { id: "a-02", application_code: "NSC-20250923-002", customer_id: "c2", application_type: "bpkb_financing", motorcycle_id: null, bpkb_product_id: "bp1", vehicle_type: "Honda Vario 150", vehicle_year: 2020, vehicle_plate: "B 1234 ABC", requested_amount: 10000000, selected_dp: null, selected_tenor: 24, estimated_installment: 505000, payment_method: null, status: "follow_up", survey_number: "SRV-001", voucher_name: null, source: "whatsapp", follow_up_status: "in_progress", is_demo: true, created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(), updated_at: new Date().toISOString(), customer: { full_name: "Siti Aminah", phone: "081298765432", city: "Depok" } },
  { id: "a-03", application_code: "NSC-20250923-003", customer_id: "c3", application_type: "new_motorcycle", motorcycle_id: "m2", bpkb_product_id: null, vehicle_type: null, vehicle_year: null, vehicle_plate: null, requested_amount: null, selected_dp: 5000000, selected_tenor: 36, estimated_installment: 1299000, payment_method: "credit", status: "processing", survey_number: "SRV-002", voucher_name: "PROMO-10JT", source: "instagram", follow_up_status: "done", is_demo: true, created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), updated_at: new Date().toISOString(), customer: { full_name: "Ahmad Rifai", phone: "081322334455", city: "Bekasi" } },
  { id: "a-04", application_code: "NSC-20250922-007", customer_id: "c4", application_type: "bpkb_financing", motorcycle_id: null, bpkb_product_id: "bp2", vehicle_type: "Yamaha NMAX", vehicle_year: 2021, vehicle_plate: "F 5678 XYZ", requested_amount: 15000000, selected_dp: null, selected_tenor: 36, estimated_installment: 685000, payment_method: null, status: "submitted", survey_number: null, voucher_name: null, source: "website", follow_up_status: "pending", is_demo: true, created_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(), updated_at: new Date().toISOString(), customer: { full_name: "Rina Dewi", phone: "081255443322", city: "Bandung" } },
  { id: "a-05", application_code: "NSC-20250922-006", customer_id: "c5", application_type: "new_motorcycle", motorcycle_id: "m3", bpkb_product_id: null, vehicle_type: null, vehicle_year: null, vehicle_plate: null, requested_amount: null, selected_dp: 5000000, selected_tenor: 36, estimated_installment: 1575000, payment_method: "credit", status: "survey", survey_number: "SRV-003", voucher_name: null, source: "facebook", follow_up_status: "in_progress", is_demo: true, created_at: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), updated_at: new Date().toISOString(), customer: { full_name: "Dedi Kusuma", phone: "081388990011", city: "Tangerang" } },
  { id: "a-06", application_code: "NSC-20250920-010", customer_id: "c6", application_type: "new_motorcycle", motorcycle_id: "m4", bpkb_product_id: null, vehicle_type: null, vehicle_year: null, vehicle_plate: null, requested_amount: null, selected_dp: 2000000, selected_tenor: 36, estimated_installment: 649000, payment_method: "credit", status: "completed", survey_number: "SRV-004", voucher_name: null, source: "website", follow_up_status: "done", is_demo: true, created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), updated_at: new Date().toISOString(), customer: { full_name: "Wati Sari", phone: "081277665544", city: "Bogor" } },
];

const STATUS_OPTIONS = ["all", "submitted", "verification", "follow_up", "survey", "processing", "completed", "cancelled"];

function ApplicationsTable({ items }: { items: ApplicationWithCustomer[] }) {
  if (items.length === 0) {
    return <EmptyState title="Tidak ada data" description="Pengajuan tidak ditemukan dengan filter ini." />;
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="whitespace-nowrap px-5 py-4 text-left">Kode Pengajuan</th>
              <th className="whitespace-nowrap px-5 py-4 text-left">Customer</th>
              <th className="whitespace-nowrap px-5 py-4 text-left">Tipe</th>
              <th className="whitespace-nowrap px-5 py-4 text-left">Detail</th>
              <th className="whitespace-nowrap px-5 py-4 text-right">Est. Cicilan</th>
              <th className="whitespace-nowrap px-5 py-4 text-left">Status</th>
              <th className="whitespace-nowrap px-5 py-4 text-left">Tanggal</th>
              <th className="whitespace-nowrap px-5 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4 font-mono text-xs font-bold text-slate-800">{a.application_code}</td>
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-900">{a.customer?.full_name ?? "—"}</p>
                  <p className="text-xs text-slate-500">{a.customer?.phone ?? "—"}</p>
                  <p className="text-xs text-slate-400">{a.customer?.city ?? ""}</p>
                </td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                    a.application_type === "new_motorcycle" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-800"
                  }`}>
                    {a.application_type === "new_motorcycle" ? "Motor Baru" : "BPKB"}
                  </span>
                </td>
                <td className="px-5 py-4 max-w-[220px]">
                  {a.application_type === "new_motorcycle" ? (
                    <div>
                      <p className="font-semibold text-slate-900 text-xs">
                        DP {formatRupiah(Number(a.selected_dp))}
                      </p>
                      <p className="text-xs text-slate-500">Tenor {a.selected_tenor} bulan</p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold text-slate-900 text-xs">{a.vehicle_type ?? "—"}</p>
                      <p className="text-xs text-slate-500">{a.vehicle_plate ?? "—"} • {a.vehicle_year ?? "—"}</p>
                      <p className="text-xs text-slate-400">Plafon: {formatRupiah(Number(a.requested_amount))}</p>
                    </div>
                  )}
                </td>
                <td className="px-5 py-4 text-right font-semibold text-slate-900">
                  {formatRupiah(Number(a.estimated_installment))}
                </td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                    a.status === "completed" ? "bg-emerald-50 text-emerald-700" :
                    a.status === "cancelled" ? "bg-slate-100 text-slate-600" :
                    a.status === "submitted" ? "bg-sky-50 text-sky-700" :
                    a.status === "processing" ? "bg-violet-50 text-violet-700" :
                    a.status === "survey" ? "bg-pink-50 text-pink-700" :
                    "bg-amber-50 text-amber-800"
                  }`}>
                    {a.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-5 py-4 text-xs text-slate-500 whitespace-nowrap">
                  {new Date(a.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                </td>
                <td className="px-5 py-4 text-right whitespace-nowrap">
                  <Button type="button" size="sm" variant="outline">Detail</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ApplicationsContent() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]>("all");
  const [type, setType] = useState<"all" | "new_motorcycle" | "bpkb_financing">("all");

  const filtered = DUMMY_APPS.filter((a) => {
    if (status !== "all" && a.status !== status) return false;
    if (type !== "all" && a.application_type !== type) return false;
    if (search && !`${a.application_code} ${a.customer?.full_name ?? ""} ${a.customer?.phone ?? ""}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const latest = filtered[0];

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-end gap-4">
          <div className="min-w-[220px] flex-1">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Cari</label>
            <Input placeholder="Kode / nama / nomor HP..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="min-w-[180px]">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as (typeof STATUS_OPTIONS)[number])}
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s === "all" ? "Semua Status" : s.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-[180px]">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Tipe</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as typeof type)}
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
            >
              <option value="all">Semua Tipe</option>
              <option value="new_motorcycle">Motor Baru</option>
              <option value="bpkb_financing">Gadai BPKB</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline">Export CSV</Button>
            <Button type="button" className="bg-red-600 hover:bg-red-700">+ Pengajuan Baru</Button>
          </div>
        </div>
      </div>

      <ApplicationsTable items={filtered} />

      {latest ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-display text-lg font-bold text-slate-900">
            Detail Terbaru: {latest.application_code}
          </h3>
          <div className="mt-5 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Data Pengajuan</p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-2"><dt className="text-slate-500">Kode</dt><dd className="font-semibold text-slate-900 font-mono">{latest.application_code}</dd></div>
                  <div className="flex justify-between gap-2"><dt className="text-slate-500">Customer</dt><dd className="font-semibold text-slate-900">{latest.customer?.full_name}</dd></div>
                  <div className="flex justify-between gap-2"><dt className="text-slate-500">Tipe</dt><dd className="font-semibold text-slate-900">{latest.application_type === "new_motorcycle" ? "Motor Baru" : "BPKB"}</dd></div>
                  <div className="flex justify-between gap-2"><dt className="text-slate-500">Est. Cicilan</dt><dd className="font-semibold text-red-600">{formatRupiah(Number(latest.estimated_installment))}</dd></div>
                  <div className="flex justify-between gap-2"><dt className="text-slate-500">Source</dt><dd className="font-semibold capitalize text-slate-900">{latest.source}</dd></div>
                </dl>
              </div>
            </div>
            <div className="lg:col-span-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Timeline Status</p>
              <div className="max-w-md">
                <ApplicationTimeline status={latest.status} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function AdminApplicationsPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px-400px)] bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Admin</p>
            <h1 className="mt-1 font-display text-3xl font-bold text-slate-900">Pengajuan Kredit & BPKB</h1>
            <p className="mt-1 text-sm text-slate-500">
              Total {DUMMY_APPS.length} pengajuan dalam database
            </p>
          </div>
        </div>
        <ApplicationsContent />
      </main>
    </div>
  );
}
