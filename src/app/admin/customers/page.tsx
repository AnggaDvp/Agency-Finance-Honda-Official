"use client";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Profile } from "@/types/customer";
import { useState } from "react";
import { formatRupiah } from "@/lib/utils/format";

const DUMMY_CUSTOMERS: Profile[] = [
  { id: "p-01", user_id: "u-01", full_name: "Budi Santoso", phone: "081234567890", address: "Jl. Sudirman No. 12", city: "Jakarta Selatan", role: "customer", created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), updated_at: new Date().toISOString() },
  { id: "p-02", user_id: "u-02", full_name: "Siti Aminah", phone: "081298765432", address: "Jl. Margonda Raya No. 45", city: "Depok", role: "customer", created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 22).toISOString(), updated_at: new Date().toISOString() },
  { id: "p-03", user_id: "u-03", full_name: "Ahmad Rifai", phone: "081322334455", address: "Jl. Ahmad Yani No. 88", city: "Bekasi", role: "customer", created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), updated_at: new Date().toISOString() },
  { id: "p-04", user_id: "u-04", full_name: "Rina Dewi", phone: "081255443322", address: "Jl. Dago No. 21", city: "Bandung", role: "customer", created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(), updated_at: new Date().toISOString() },
  { id: "p-05", user_id: "u-05", full_name: "Dedi Kusuma", phone: "081388990011", address: "Jl. Gajah Mada No. 7", city: "Tangerang", role: "customer", created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(), updated_at: new Date().toISOString() },
  { id: "p-06", user_id: "u-06", full_name: "Wati Sari", phone: "081277665544", address: "Jl. Pajajaran No. 33", city: "Bogor", role: "customer", created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(), updated_at: new Date().toISOString() },
  { id: "p-07", user_id: "u-07", full_name: "Hendra Wijaya", phone: "081311223344", address: "Jl. Asia Afrika No. 99", city: "Surabaya", role: "customer", created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), updated_at: new Date().toISOString() },
  { id: "p-08", user_id: "admin-01", full_name: "Admin NSC", phone: "081100001111", address: "Kantor Pusat NSC Finance", city: "Jakarta Pusat", role: "admin", created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(), updated_at: new Date().toISOString() },
];

const LOAN_HISTORY: Record<string, { active: number; total: number; total_paid: number; last: string | null }> = {
  "p-01": { active: 1, total: 2, total_paid: 20500000, last: "NSC-20250923-001" },
  "p-02": { active: 1, total: 3, total_paid: 50500000, last: "NSC-20250923-002" },
  "p-03": { active: 1, total: 1, total_paid: 0, last: "NSC-20250923-003" },
  "p-04": { active: 1, total: 1, total_paid: 0, last: "NSC-20250922-007" },
  "p-05": { active: 1, total: 2, total_paid: 45000000, last: "NSC-20250922-006" },
  "p-06": { active: 0, total: 2, total_paid: 120000000, last: "NSC-20250920-010" },
  "p-07": { active: 0, total: 0, total_paid: 0, last: null },
};

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<"all" | "customer" | "admin" | "supervisor">("all");

  const filtered = DUMMY_CUSTOMERS.filter((c) => {
    if (role !== "all" && c.role !== role) return false;
    if (search && !`${c.full_name} ${c.phone} ${c.city}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex min-h-[calc(100vh-80px-400px)] bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Admin</p>
            <h1 className="mt-1 font-display text-3xl font-bold text-slate-900">Data Customer & User</h1>
            <p className="mt-1 text-sm text-slate-500">Kelola profil customer, admin, dan supervisor.</p>
          </div>
          <Button type="button" className="bg-red-600 hover:bg-red-700">+ Tambah Customer</Button>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-wrap items-end gap-4">
          <div className="min-w-[240px] flex-1">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Cari Customer</label>
            <Input placeholder="Nama / No HP / Kota..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="min-w-[180px]">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Peran</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as typeof role)}
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
            >
              <option value="all">Semua Peran</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
              <option value="supervisor">Supervisor</option>
            </select>
          </div>
          <Button type="button" variant="outline">Export</Button>
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="Tidak ada data" description="Customer tidak ditemukan." />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-4 text-left">Customer</th>
                    <th className="px-5 py-4 text-left">Kontak</th>
                    <th className="px-5 py-4 text-left">Kota</th>
                    <th className="px-5 py-4 text-left">Peran</th>
                    <th className="px-5 py-4 text-center">Pengajuan Aktif</th>
                    <th className="px-5 py-4 text-right">Riwayat Total</th>
                    <th className="px-5 py-4 text-left">Sejak</th>
                    <th className="px-5 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((c) => {
                    const loan = LOAN_HISTORY[c.id];
                    return (
                      <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 text-sm font-bold text-white">
                              {c.full_name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">{c.full_name}</p>
                              <p className="text-xs text-slate-400">ID: {c.user_id ?? c.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-mono text-xs font-semibold text-slate-700">{c.phone}</p>
                          <p className="text-xs text-slate-500 max-w-[240px] truncate">{c.address}</p>
                        </td>
                        <td className="px-5 py-4 text-slate-700">{c.city}</td>
                        <td className="px-5 py-4">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                            c.role === "admin" ? "bg-slate-900 text-white" :
                            c.role === "supervisor" ? "bg-violet-100 text-violet-800" :
                            "bg-emerald-50 text-emerald-700"
                          }`}>
                            {c.role}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          {loan?.active ? (
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">
                              {loan.active}
                            </span>
                          ) : (
                            <span className="text-slate-400 text-xs">0</span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <p className="font-semibold text-slate-900">{loan?.total ?? 0} pengajuan</p>
                          <p className="text-xs text-slate-500">{formatRupiah(Number(loan?.total_paid ?? 0))} terbayar</p>
                        </td>
                        <td className="px-5 py-4 text-xs text-slate-500 whitespace-nowrap">
                          {new Date(c.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                        </td>
                        <td className="px-5 py-4 text-right whitespace-nowrap">
                          <div className="flex justify-end gap-2">
                            <Button type="button" size="sm" variant="outline">Detail</Button>
                            <Button type="button" size="sm">Chat</Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
