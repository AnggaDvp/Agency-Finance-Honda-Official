"use client";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Motorcycle } from "@/types/motorcycle";
import { useState } from "react";
import { formatRupiah } from "@/lib/utils/format";

const DUMMY_MOTORCYCLES: Motorcycle[] = [
  { id: "m-01", brand: "Honda", model: "Vario 160", variant: "CBS", category: "matic", year: 2025, otr_price: 26500000, description: "Skuter matic premium dengan mesin 160cc eSP+ dan fitur canggih.", image_url: null, stock: 12, status: "active", slug: "honda-vario-160-cbs", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "m-02", brand: "Honda", model: "PCX 160", variant: "ABS", category: "matic", year: 2025, otr_price: 44500000, description: "Maxi skute legendaris dengan desain elegan.", image_url: null, stock: 8, status: "active", slug: "honda-pcx-160-abs", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "m-03", brand: "Honda", model: "ADV 160", variant: "ABS", category: "matic", year: 2025, otr_price: 53000000, description: "Adventure scooter tangguh.", image_url: null, stock: 5, status: "active", slug: "honda-adv-160-abs", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "m-04", brand: "Honda", model: "Beat Street", variant: "CBS", category: "matic", year: 2025, otr_price: 21500000, description: "Skuter stylish dengan desain street.", image_url: null, stock: 20, status: "active", slug: "honda-beat-street-cbs", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "m-05", brand: "Honda", model: "CBR 150R", variant: "ABS", category: "sport", year: 2025, otr_price: 39500000, description: "Sportbike entry level.", image_url: null, stock: 6, status: "active", slug: "honda-cbr-150r-abs", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "m-06", brand: "Honda", model: "Supra X 125", variant: "Fi", category: "cub", year: 2025, otr_price: 20500000, description: "Motor bebek legendaris hemat.", image_url: null, stock: 15, status: "active", slug: "honda-supra-x-125-fi", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "m-07", brand: "Honda", model: "EM1 e:", variant: "Standard", category: "ev", year: 2025, otr_price: 45000000, description: "Skuter listrik ramah lingkungan.", image_url: null, stock: 3, status: "active", slug: "honda-em1-ev-standard", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "m-08", brand: "Honda", model: "Vario 125", variant: "CBS", category: "matic", year: 2024, otr_price: 23500000, description: "Vario 125 cc hemat.", image_url: null, stock: 0, status: "inactive", slug: "honda-vario-125-cbs", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

export default function AdminMotorcyclesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"all" | Motorcycle["category"]>("all");
  const [status, setStatus] = useState<"all" | Motorcycle["status"]>("all");

  const filtered = DUMMY_MOTORCYCLES.filter((m) => {
    if (category !== "all" && m.category !== category) return false;
    if (status !== "all" && m.status !== status) return false;
    if (search && !`${m.brand} ${m.model} ${m.variant}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex min-h-[calc(100vh-80px-400px)] bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Admin</p>
            <h1 className="mt-1 font-display text-3xl font-bold text-slate-900">Katalog Motor & Stok</h1>
            <p className="mt-1 text-sm text-slate-500">
              Total {DUMMY_MOTORCYCLES.length} tipe motor, Stok {DUMMY_MOTORCYCLES.reduce((s, m) => s + m.stock, 0)} unit ready
            </p>
          </div>
          <Button type="button" className="bg-red-600 hover:bg-red-700">+ Tambah Motor</Button>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total Tipe", value: DUMMY_MOTORCYCLES.length, tone: "slate" },
            { label: "Unit Ready", value: DUMMY_MOTORCYCLES.reduce((s, m) => s + m.stock, 0), tone: "emerald" },
            { label: "Aktif", value: DUMMY_MOTORCYCLES.filter((m) => m.status === "active").length, tone: "sky" },
            { label: "Habis", value: DUMMY_MOTORCYCLES.filter((m) => m.stock === 0).length, tone: "rose" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{s.label}</p>
              <p className="mt-2 font-display text-3xl font-bold text-slate-900">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-wrap items-end gap-4">
          <div className="min-w-[240px] flex-1">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Cari Motor</label>
            <Input placeholder="Brand / model / varian..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="min-w-[160px]">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Kategori</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as typeof category)}
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
            >
              <option value="all">Semua</option>
              <option value="matic">Matic</option>
              <option value="cub">Bebek</option>
              <option value="sport">Sport</option>
              <option value="ev">Listrik</option>
            </select>
          </div>
          <div className="min-w-[160px]">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as typeof status)}
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
            >
              <option value="all">Semua</option>
              <option value="active">Aktif</option>
              <option value="inactive">Nonaktif</option>
            </select>
          </div>
          <Button type="button" variant="outline">Export</Button>
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="Tidak ada motor" description="Kriteria tidak membuahkan hasil." />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-4 text-left">Motor</th>
                    <th className="px-5 py-4 text-left">Kategori</th>
                    <th className="px-5 py-4 text-left">Tahun</th>
                    <th className="px-5 py-4 text-right">Harga OTR</th>
                    <th className="px-5 py-4 text-center">Stok</th>
                    <th className="px-5 py-4 text-left">Status</th>
                    <th className="px-5 py-4 text-left">Slug</th>
                    <th className="px-5 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-display font-bold text-slate-900">
                          {m.brand} {m.model}
                        </p>
                        <p className="text-xs text-slate-500">{m.variant}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-full px-2.5 py-1 text-xs font-bold capitalize bg-slate-100 text-slate-700">
                          {m.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-800">{m.year}</td>
                      <td className="px-5 py-4 text-right font-display text-lg font-bold text-red-600">
                        {formatRupiah(Number(m.otr_price))}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className={`inline-flex h-9 w-12 items-center justify-center rounded-lg text-sm font-bold ${
                          m.stock === 0 ? "bg-rose-50 text-rose-700" :
                          m.stock <= 5 ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
                        }`}>
                          {m.stock}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                          m.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                        }`}>
                          {m.status === "active" ? "Aktif" : "Nonaktif"}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-slate-500">{m.slug}</td>
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <div className="flex justify-end gap-2">
                          <Button type="button" size="sm" variant="outline">Edit</Button>
                          <Button type="button" size="sm">Rate</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
