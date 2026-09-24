import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { DashboardCards } from "@/components/admin/dashboard-cards";
import Link from "next/link";
import type { DashboardStats } from "@/types/admin";
import type { ApplicationWithCustomer } from "@/types/application";
import type { Conversation } from "@/types/chat";
import { ApplicationTimeline } from "@/components/public/application-timeline";
import { EmptyState } from "@/components/ui/empty-state";
import { formatRupiah } from "@/lib/utils/format";

const DUMMY_STATS: DashboardStats = {
  totalCustomers: 248,
  applicationsToday: 18,
  bpkbApplications: 132,
  newMotorApplications: 116,
  activeChats: 7,
  needAdmin: 3,
  followUps: 24,
};

const DUMMY_APPLICATIONS: ApplicationWithCustomer[] = [
  {
    id: "app-001",
    application_code: "NSC-20250923-001",
    customer_id: "cust-001",
    application_type: "new_motorcycle",
    motorcycle_id: "m-001",
    bpkb_product_id: null,
    vehicle_type: null,
    vehicle_year: null,
    vehicle_plate: null,
    requested_amount: null,
    selected_dp: 2500000,
    selected_tenor: 36,
    estimated_installment: 799000,
    payment_method: "credit",
    status: "verification",
    survey_number: null,
    voucher_name: null,
    source: "website",
    follow_up_status: "pending",
    is_demo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    customer: { full_name: "Budi Santoso", phone: "081234567890", city: "Jakarta Selatan" },
  },
  {
    id: "app-002",
    application_code: "NSC-20250923-002",
    customer_id: "cust-002",
    application_type: "bpkb_financing",
    motorcycle_id: null,
    bpkb_product_id: "bpkb-001",
    vehicle_type: "Honda Vario 150",
    vehicle_year: 2020,
    vehicle_plate: "B 1234 ABC",
    requested_amount: 10000000,
    selected_dp: null,
    selected_tenor: 24,
    estimated_installment: 505000,
    payment_method: null,
    status: "follow_up",
    survey_number: "SRV-001",
    voucher_name: null,
    source: "whatsapp",
    follow_up_status: "in_progress",
    is_demo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    customer: { full_name: "Siti Aminah", phone: "081298765432", city: "Depok" },
  },
  {
    id: "app-003",
    application_code: "NSC-20250923-003",
    customer_id: "cust-003",
    application_type: "new_motorcycle",
    motorcycle_id: "m-002",
    bpkb_product_id: null,
    vehicle_type: null,
    vehicle_year: null,
    vehicle_plate: null,
    requested_amount: null,
    selected_dp: 5000000,
    selected_tenor: 36,
    estimated_installment: 1299000,
    payment_method: "credit",
    status: "processing",
    survey_number: "SRV-002",
    voucher_name: "PROMO-10JT",
    source: "instagram",
    follow_up_status: "done",
    is_demo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    customer: { full_name: "Ahmad Rifai", phone: "081322334455", city: "Bekasi" },
  },
  {
    id: "app-004",
    application_code: "NSC-20250923-004",
    customer_id: "cust-004",
    application_type: "bpkb_financing",
    motorcycle_id: null,
    bpkb_product_id: "bpkb-002",
    vehicle_type: "Yamaha NMAX",
    vehicle_year: 2021,
    vehicle_plate: "F 5678 XYZ",
    requested_amount: 15000000,
    selected_dp: null,
    selected_tenor: 36,
    estimated_installment: 685000,
    payment_method: null,
    status: "submitted",
    survey_number: null,
    voucher_name: null,
    source: "website",
    follow_up_status: "pending",
    is_demo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    customer: { full_name: "Rina Dewi", phone: "081255443322", city: "Bandung" },
  },
];

const DUMMY_CHATS: Conversation[] = [
  { id: "conv-001", customer_id: "cust-001", assigned_admin_id: null, status: "open", mode: "waiting_admin", guest_name: "Budi Santoso", guest_phone: "081234567890", created_at: new Date(Date.now() - 1000 * 60 * 3).toISOString(), updated_at: new Date().toISOString() },
  { id: "conv-002", customer_id: "cust-002", assigned_admin_id: "admin-01", status: "open", mode: "admin", guest_name: "Siti Aminah", guest_phone: "081298765432", created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(), updated_at: new Date().toISOString() },
  { id: "conv-003", customer_id: null, assigned_admin_id: null, status: "open", mode: "bot", guest_name: "Guest 7842", guest_phone: null, created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(), updated_at: new Date().toISOString() },
];

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px-400px)] bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-x-hidden">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Dashboard</p>
            <h1 className="mt-1 font-display text-3xl font-bold text-slate-900">Selamat datang, Admin 👋</h1>
            <p className="mt-1 text-sm text-slate-500">Ringkasan aktivitas platform hari ini</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/applications" className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-red-300 hover:text-red-600 transition-colors">
              Lihat Semua Pengajuan
            </Link>
            <Link href="/admin/conversations" className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors">
              Live Chat ({DUMMY_CHATS.filter((c) => c.status === "open").length})
            </Link>
          </div>
        </div>

        <DashboardCards stats={DUMMY_STATS} />

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-slate-900">Pengajuan Terbaru</h2>
                <p className="text-xs text-slate-500">4 pengajuan masuk hari ini</p>
              </div>
              <Link href="/admin/applications" className="text-xs font-bold uppercase tracking-wider text-red-600 hover:text-red-700">
                Lihat semua →
              </Link>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-3 text-left">Kode</th>
                    <th className="px-4 py-3 text-left">Customer</th>
                    <th className="px-4 py-3 text-left">Tipe</th>
                    <th className="px-4 py-3 text-right">Est. Cicilan</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {DUMMY_APPLICATIONS.slice(0, 4).map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-700">{app.application_code}</td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-slate-900">{app.customer?.full_name ?? "—"}</p>
                        <p className="text-xs text-slate-500">{app.customer?.city ?? "—"}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                          app.application_type === "new_motorcycle"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-amber-50 text-amber-800"
                        }`}>
                          {app.application_type === "new_motorcycle" ? "Motor Baru" : "BPKB"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-900">
                        {formatRupiah(Number(app.estimated_installment))}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                          app.status === "completed" ? "bg-emerald-50 text-emerald-700" :
                          app.status === "cancelled" ? "bg-slate-100 text-slate-600" :
                          app.status === "submitted" ? "bg-sky-50 text-sky-700" :
                          app.status === "processing" ? "bg-violet-50 text-violet-700" :
                          "bg-amber-50 text-amber-800"
                        }`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8">
              <h3 className="font-display text-lg font-bold text-slate-900">Timeline Pengajuan Terbaru</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {DUMMY_APPLICATIONS.slice(0, 2).map((app) => (
                  <div key={app.id} className="rounded-xl border border-slate-200 p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="font-mono text-xs font-bold text-slate-700">{app.application_code}</p>
                      <span className="text-xs font-semibold text-red-600">{app.customer?.full_name}</span>
                    </div>
                    <ApplicationTimeline status={app.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-xl font-bold text-slate-900">Live Chat Aktif</h2>
                  <p className="text-xs text-slate-500">{DUMMY_CHATS.length} percakapan aktif</p>
                </div>
                <Link href="/admin/conversations" className="text-xs font-bold uppercase tracking-wider text-red-600 hover:text-red-700">
                  Buka →
                </Link>
              </div>
              <div className="space-y-3">
                {DUMMY_CHATS.length > 0 ? DUMMY_CHATS.map((c) => (
                  <Link key={c.id} href="/admin/conversations" className="block rounded-xl border border-slate-200 p-4 hover:border-red-200 hover:bg-red-50/30 transition-colors">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className={`h-2.5 w-2.5 rounded-full ${
                          c.mode === "waiting_admin" ? "bg-amber-500 animate-pulse" :
                          c.mode === "admin" ? "bg-emerald-500" : "bg-slate-400"
                        }`} />
                        <div>
                          <p className="font-semibold text-sm text-slate-900">{c.guest_name ?? "Guest"}</p>
                          <p className="text-xs text-slate-500">{c.guest_phone ?? "Belum login"}</p>
                        </div>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        c.mode === "waiting_admin" ? "bg-amber-50 text-amber-700" :
                        c.mode === "admin" ? "bg-emerald-50 text-emerald-700" :
                        "bg-slate-100 text-slate-600"
                      }`}>
                        {c.mode}
                      </span>
                    </div>
                  </Link>
                )) : (
                  <EmptyState title="Tidak ada chat" description="Belum ada percakapan aktif." />
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-6 shadow-sm">
              <h2 className="font-display text-xl font-bold text-amber-900">Perlu Tindakan</h2>
              <p className="mt-1 text-xs text-amber-800/80">Item yang membutuhkan perhatian Anda</p>
              <ul className="mt-5 space-y-3">
                <li className="flex items-start gap-3 rounded-xl bg-white/80 p-4 border border-amber-200/60">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
                    3
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-amber-900">Percakapan menunggu Admin</p>
                    <p className="text-xs text-amber-800/80">Customer perlu dialihkan ke human agent</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 rounded-xl bg-white/80 p-4 border border-amber-200/60">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {DUMMY_STATS.followUps}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-amber-900">Follow Up aktif</p>
                    <p className="text-xs text-amber-800/80">Jadwal follow up perlu diproses hari ini</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 rounded-xl bg-white/80 p-4 border border-amber-200/60">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white">
                    4
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-amber-900">Pengajuan menunggu verifikasi</p>
                    <p className="text-xs text-amber-800/80">Data pengajuan perlu Anda review</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
