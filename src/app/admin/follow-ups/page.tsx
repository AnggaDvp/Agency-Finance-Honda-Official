"use client";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import type { FollowUp } from "@/types/admin";
import type { ApplicationWithCustomer } from "@/types/application";
import { useState } from "react";

const DUMMY_FOLLOW_UPS: (FollowUp & { application?: ApplicationWithCustomer })[] = [
  { id: "f-01", application_id: "a-02", admin_id: "admin-01", note: "Customer butuh klarifikasi soal asuransi. Janjian follow up via WhatsApp besok pagi.", follow_up_date: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().slice(0, 10), status: "in_progress", created_at: new Date().toISOString(), updated_at: new Date().toISOString(), application: { id: "a-02", application_code: "NSC-20250923-002", customer_id: "c2", application_type: "bpkb_financing", motorcycle_id: null, bpkb_product_id: "bp1", vehicle_type: "Honda Vario 150", vehicle_year: 2020, vehicle_plate: "B 1234 ABC", requested_amount: 10000000, selected_dp: null, selected_tenor: 24, estimated_installment: 505000, payment_method: null, status: "follow_up", survey_number: "SRV-001", voucher_name: null, source: "whatsapp", follow_up_status: "in_progress", is_demo: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), customer: { full_name: "Siti Aminah", phone: "081298765432", city: "Depok" } } },
  { id: "f-02", application_id: "a-05", admin_id: "admin-01", note: "Survey lokasi besok siang di Tangerang. Perlu koordinasi dengan tim survey lapangan.", follow_up_date: new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString().slice(0, 10), status: "pending", created_at: new Date().toISOString(), updated_at: new Date().toISOString(), application: { id: "a-05", application_code: "NSC-20250922-006", customer_id: "c5", application_type: "new_motorcycle", motorcycle_id: "m3", bpkb_product_id: null, vehicle_type: null, vehicle_year: null, vehicle_plate: null, requested_amount: null, selected_dp: 5000000, selected_tenor: 36, estimated_installment: 1575000, payment_method: "credit", status: "survey", survey_number: "SRV-003", voucher_name: null, source: "facebook", follow_up_status: "in_progress", is_demo: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), customer: { full_name: "Dedi Kusuma", phone: "081388990011", city: "Tangerang" } } },
  { id: "f-03", application_id: "a-04", admin_id: null, note: "Customer belum upload dokumen lengkap. Kirim reminder via SMS dan WhatsApp.", follow_up_date: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString().slice(0, 10), status: "pending", created_at: new Date().toISOString(), updated_at: new Date().toISOString(), application: { id: "a-04", application_code: "NSC-20250922-007", customer_id: "c4", application_type: "bpkb_financing", motorcycle_id: null, bpkb_product_id: "bp2", vehicle_type: "Yamaha NMAX", vehicle_year: 2021, vehicle_plate: "F 5678 XYZ", requested_amount: 15000000, selected_dp: null, selected_tenor: 36, estimated_installment: 685000, payment_method: null, status: "submitted", survey_number: null, voucher_name: null, source: "website", follow_up_status: "pending", is_demo: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), customer: { full_name: "Rina Dewi", phone: "081255443322", city: "Bandung" } } },
  { id: "f-04", application_id: "a-01", admin_id: "admin-01", note: "Verifikasi dokumen KTP selesai. Customer setuju lanjut proses. Status diupdate ke survey.", follow_up_date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString().slice(0, 10), status: "done", created_at: new Date().toISOString(), updated_at: new Date().toISOString(), application: { id: "a-01", application_code: "NSC-20250923-001", customer_id: "c1", application_type: "new_motorcycle", motorcycle_id: "m1", bpkb_product_id: null, vehicle_type: null, vehicle_year: null, vehicle_plate: null, requested_amount: null, selected_dp: 2500000, selected_tenor: 36, estimated_installment: 799000, payment_method: "credit", status: "verification", survey_number: null, voucher_name: null, source: "website", follow_up_status: "pending", is_demo: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), customer: { full_name: "Budi Santoso", phone: "081234567890", city: "Jakarta Selatan" } } },
  { id: "f-05", application_id: "a-03", admin_id: "admin-02", note: "Customer konfirmasi transfer DP. Unit siap diambil dealer Bekasi.", follow_up_date: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString().slice(0, 10), status: "done", created_at: new Date().toISOString(), updated_at: new Date().toISOString(), application: { id: "a-03", application_code: "NSC-20250923-003", customer_id: "c3", application_type: "new_motorcycle", motorcycle_id: "m2", bpkb_product_id: null, vehicle_type: null, vehicle_year: null, vehicle_plate: null, requested_amount: null, selected_dp: 5000000, selected_tenor: 36, estimated_installment: 1299000, payment_method: "credit", status: "processing", survey_number: "SRV-002", voucher_name: "PROMO-10JT", source: "instagram", follow_up_status: "done", is_demo: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), customer: { full_name: "Ahmad Rifai", phone: "081322334455", city: "Bekasi" } } },
];

function relativeDate(iso: string) {
  const target = new Date(iso + "T00:00:00");
  const now = new Date();
  const diffDays = Math.round((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Hari ini";
  if (diffDays === 1) return "Besok";
  if (diffDays === -1) return "Kemarin";
  if (diffDays > 0) return `${diffDays} hari lagi`;
  return `${Math.abs(diffDays)} hari lalu`;
}

export default function AdminFollowUpsPage() {
  const [filter, setFilter] = useState<"all" | FollowUp["status"]>("all");
  const items = DUMMY_FOLLOW_UPS.filter((f) => filter === "all" || f.status === filter);

  const counts = {
    all: DUMMY_FOLLOW_UPS.length,
    pending: DUMMY_FOLLOW_UPS.filter((f) => f.status === "pending").length,
    in_progress: DUMMY_FOLLOW_UPS.filter((f) => f.status === "in_progress").length,
    done: DUMMY_FOLLOW_UPS.filter((f) => f.status === "done").length,
  };

  return (
    <div className="flex min-h-[calc(100vh-80px-400px)] bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Admin</p>
            <h1 className="mt-1 font-display text-3xl font-bold text-slate-900">Follow Up Pengajuan</h1>
            <p className="mt-1 text-sm text-slate-500">
              Jadwal kontak customer, survey lapangan, dan penagihan dokumen.
            </p>
          </div>
          <Button type="button" className="bg-red-600 hover:bg-red-700">+ Tambah Follow Up</Button>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className={`rounded-2xl border p-5 shadow-sm ${filter === "all" ? "border-red-300 bg-red-50" : "border-slate-200 bg-white"}`}>
            <button onClick={() => setFilter("all")} className="block w-full text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Semua</p>
              <p className="mt-2 font-display text-3xl font-bold text-slate-900">{counts.all}</p>
            </button>
          </div>
          <div className={`rounded-2xl border p-5 shadow-sm ${filter === "pending" ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-white"}`}>
            <button onClick={() => setFilter("pending")} className="block w-full text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Menunggu</p>
              <p className="mt-2 font-display text-3xl font-bold text-amber-800">{counts.pending}</p>
            </button>
          </div>
          <div className={`rounded-2xl border p-5 shadow-sm ${filter === "in_progress" ? "border-sky-300 bg-sky-50" : "border-slate-200 bg-white"}`}>
            <button onClick={() => setFilter("in_progress")} className="block w-full text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-sky-700">Diproses</p>
              <p className="mt-2 font-display text-3xl font-bold text-sky-800">{counts.in_progress}</p>
            </button>
          </div>
          <div className={`rounded-2xl border p-5 shadow-sm ${filter === "done" ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white"}`}>
            <button onClick={() => setFilter("done")} className="block w-full text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Selesai</p>
              <p className="mt-2 font-display text-3xl font-bold text-emerald-800">{counts.done}</p>
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <EmptyState title="Tidak ada follow up" description="Filter ini tidak membuahkan hasil." />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {items.map((f) => (
              <article key={f.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        f.status === "done" ? "bg-emerald-50 text-emerald-700" :
                        f.status === "in_progress" ? "bg-sky-50 text-sky-700" :
                        "bg-amber-50 text-amber-800"
                      }`}>
                        {f.status === "done" ? "Selesai" : f.status === "in_progress" ? "Diproses" : "Menunggu"}
                      </span>
                      <span className="text-xs font-mono font-semibold text-slate-500">
                        #{f.application?.application_code ?? f.application_id}
                      </span>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        f.application?.application_type === "new_motorcycle" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-800"
                      }`}>
                        {f.application?.application_type === "new_motorcycle" ? "Motor Baru" : "BPKB"}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-bold text-slate-900">
                      {f.application?.customer?.full_name ?? "Customer"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {f.application?.customer?.phone ?? ""} • {f.application?.customer?.city ?? ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Tanggal FU</p>
                    <p className="font-display text-lg font-bold text-slate-900">
                      {new Date(f.follow_up_date).toLocaleDateString("id-ID", { weekday: "short", day: "2-digit", month: "short" })}
                    </p>
                    <p className={`text-xs font-semibold ${
                      f.status === "done" ? "text-emerald-600" :
                      relativeDate(f.follow_up_date).includes("lalu") ? "text-rose-600" :
                      relativeDate(f.follow_up_date) === "Hari ini" ? "text-red-600" : "text-slate-600"
                    }`}>
                      {relativeDate(f.follow_up_date)}
                    </p>
                  </div>
                </header>

                <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">Catatan Follow Up</p>
                  <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">{f.note}</p>
                </div>

                <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <p className="text-xs text-slate-500">
                    Admin: {f.admin_id ? "Sudah diassign" : "Belum diassign"}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Detail</Button>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">Update Status</Button>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
