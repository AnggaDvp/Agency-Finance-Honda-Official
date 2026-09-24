"use client";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BpkbProduct, BpkbRate, MotorcycleRate } from "@/types/rate-card";
import { useState } from "react";
import { formatRupiah } from "@/lib/utils/format";

const MOTORCYCLE_RATES: MotorcycleRate[] = [
  { id: "r-1", motorcycle_id: "m-01", dp: 2500000, tenor: 12, installment: 2150000, otr_price: 26500000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-2", motorcycle_id: "m-01", dp: 2500000, tenor: 24, installment: 1125000, otr_price: 26500000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-3", motorcycle_id: "m-01", dp: 2500000, tenor: 36, installment: 799000, otr_price: 26500000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-4", motorcycle_id: "m-02", dp: 5000000, tenor: 12, installment: 3525000, otr_price: 44500000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-5", motorcycle_id: "m-02", dp: 5000000, tenor: 24, installment: 1885000, otr_price: 44500000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-6", motorcycle_id: "m-02", dp: 5000000, tenor: 36, installment: 1299000, otr_price: 44500000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-7", motorcycle_id: "m-03", dp: 5000000, tenor: 36, installment: 1575000, otr_price: 53000000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-8", motorcycle_id: "m-04", dp: 2000000, tenor: 36, installment: 649000, otr_price: 21500000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

const BPKB_PRODUCTS: BpkbProduct[] = [
  { id: "bp-01", name: "Dana BPKB Super", vehicle_brands: ["Honda", "Yamaha", "Kawasaki", "Suzuki"], max_vehicle_age: 10, description: "Pembiayaan multiguna BPKB motor dengan proses standar.", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "bp-02", name: "Dana BPKB Flash", vehicle_brands: ["Honda", "Yamaha"], max_vehicle_age: 7, description: "Pencairan kilat 24 jam untuk Honda/Yamaha usia muda.", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "bp-03", name: "Dana BPKB Premium", vehicle_brands: ["Honda", "Yamaha", "Kawasaki", "Ducati", "Harley"], max_vehicle_age: 12, description: "Plafon tinggi untuk motor premium & klasik.", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

const BPKB_RATES: BpkbRate[] = [
  { id: "br-1", product_id: "bp-01", scheme: "Reguler", disbursement_amount: 5000000, tenor: 12, installment: 475000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "br-2", product_id: "bp-01", scheme: "Reguler", disbursement_amount: 5000000, tenor: 24, installment: 255000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "br-3", product_id: "bp-01", scheme: "Reguler", disbursement_amount: 5000000, tenor: 36, installment: 185000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "br-4", product_id: "bp-01", scheme: "Reguler", disbursement_amount: 10000000, tenor: 12, installment: 935000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "br-5", product_id: "bp-01", scheme: "Reguler", disbursement_amount: 10000000, tenor: 24, installment: 505000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "br-6", product_id: "bp-01", scheme: "Reguler", disbursement_amount: 10000000, tenor: 36, installment: 365000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "br-7", product_id: "bp-01", scheme: "Reguler", disbursement_amount: 25000000, tenor: 24, installment: 1225000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "br-8", product_id: "bp-02", scheme: "Flash", disbursement_amount: 8000000, tenor: 24, installment: 425000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

const MOTORCYCLE_NAMES: Record<string, string> = {
  "m-01": "Honda Vario 160 CBS",
  "m-02": "Honda PCX 160 ABS",
  "m-03": "Honda ADV 160 ABS",
  "m-04": "Honda Beat Street CBS",
  "m-05": "Honda CBR 150R ABS",
  "m-06": "Honda Supra X 125 Fi",
  "m-07": "Honda EM1 e:",
  "m-08": "Honda Vario 125 CBS",
};

export default function AdminRateCardsPage() {
  const [tab, setTab] = useState<"motor" | "bpkb-product" | "bpkb-rate">("motor");
  const [filterMotor, setFilterMotor] = useState("all");

  const filteredMotor = MOTORCYCLE_RATES.filter((r) => filterMotor === "all" || r.motorcycle_id === filterMotor);

  return (
    <div className="flex min-h-[calc(100vh-80px-400px)] bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Admin</p>
            <h1 className="mt-1 font-display text-3xl font-bold text-slate-900">Rate Card & Harga</h1>
            <p className="mt-1 text-sm text-slate-500">Kelola simulasi DP, tenor, dan angsuran untuk semua produk.</p>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline">Import CSV</Button>
            <Button type="button" className="bg-red-600 hover:bg-red-700">+ Tambah Rate</Button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
            <TabsList>
              <TabsTrigger value="motor">Rate Motor Baru</TabsTrigger>
              <TabsTrigger value="bpkb-product">Produk BPKB</TabsTrigger>
              <TabsTrigger value="bpkb-rate">Rate BPKB</TabsTrigger>
            </TabsList>

            <TabsContent value="motor">
              <div className="space-y-6 p-6">
                <div className="flex flex-wrap items-end gap-4">
                  <div className="min-w-[220px]">
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Filter Motor</label>
                    <select
                      value={filterMotor}
                      onChange={(e) => setFilterMotor(e.target.value)}
                      className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
                    >
                      <option value="all">Semua Motor</option>
                      {Object.entries(MOTORCYCLE_NAMES).map(([id, name]) => (
                        <option key={id} value={id}>{name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="min-w-[180px]">
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Periode</label>
                    <select className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm">
                      <option>2025-2 (Aktif)</option>
                      <option>2025-1</option>
                    </select>
                  </div>
                  <div className="min-w-[180px]">
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Wilayah</label>
                    <select className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm">
                      <option>Jabodetabek</option>
                      <option>Jawa Barat</option>
                      <option>Jawa Tengah</option>
                      <option>Jawa Timur</option>
                    </select>
                  </div>
                </div>

                {filteredMotor.length === 0 ? (
                  <EmptyState title="Tidak ada rate" description="Rate tidak ditemukan untuk kriteria ini." />
                ) : (
                  <div className="overflow-hidden rounded-xl border border-slate-200">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                        <tr>
                          <th className="px-5 py-3 text-left">Motor</th>
                          <th className="px-5 py-3 text-right">OTR</th>
                          <th className="px-5 py-3 text-right">DP</th>
                          <th className="px-5 py-3 text-center">Tenor</th>
                          <th className="px-5 py-3 text-right">Cicilan/bulan</th>
                          <th className="px-5 py-3 text-left">Area</th>
                          <th className="px-5 py-3 text-left">Status</th>
                          <th className="px-5 py-3 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredMotor.map((r) => (
                          <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-5 py-3 font-semibold text-slate-900">
                              {MOTORCYCLE_NAMES[r.motorcycle_id] ?? r.motorcycle_id}
                            </td>
                            <td className="px-5 py-3 text-right font-semibold text-slate-800">{formatRupiah(Number(r.otr_price))}</td>
                            <td className="px-5 py-3 text-right text-slate-700">{formatRupiah(Number(r.dp))}</td>
                            <td className="px-5 py-3 text-center font-mono font-bold text-slate-900">{r.tenor}x</td>
                            <td className="px-5 py-3 text-right font-display text-lg font-bold text-red-600">{formatRupiah(Number(r.installment))}</td>
                            <td className="px-5 py-3 text-slate-600">{r.area}</td>
                            <td className="px-5 py-3">
                              <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${r.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                                {r.status === "active" ? "Aktif" : "Nonaktif"}
                              </span>
                            </td>
                            <td className="px-5 py-3 text-right whitespace-nowrap">
                              <div className="flex justify-end gap-2">
                                <Button size="sm" variant="outline">Edit</Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="bpkb-product">
              <div className="p-6">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {BPKB_PRODUCTS.map((p) => (
                    <div key={p.id} className="rounded-2xl border border-slate-200 p-6 hover:border-red-200 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <h3 className="font-display text-xl font-bold text-slate-900">{p.name}</h3>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${p.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                          {p.status === "active" ? "Aktif" : "Nonaktif"}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">{p.description}</p>
                      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Merk Diterima</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {p.vehicle_brands.map((b) => (
                            <span key={b} className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700">{b}</span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Usia maks: <span className="text-red-600">{p.max_vehicle_age} tahun</span>
                        </p>
                        <Button size="sm" variant="outline">Kelola</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bpkb-rate">
              <div className="p-6">
                {BPKB_RATES.length === 0 ? (
                  <EmptyState title="Tidak ada rate" description="Silakan tambahkan rate BPKB terlebih dahulu." />
                ) : (
                  <div className="overflow-hidden rounded-xl border border-slate-200">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                        <tr>
                          <th className="px-5 py-3 text-left">Produk</th>
                          <th className="px-5 py-3 text-left">Skema</th>
                          <th className="px-5 py-3 text-right">Pencairan</th>
                          <th className="px-5 py-3 text-center">Tenor</th>
                          <th className="px-5 py-3 text-right">Cicilan/bulan</th>
                          <th className="px-5 py-3 text-left">Area</th>
                          <th className="px-5 py-3 text-left">Status</th>
                          <th className="px-5 py-3 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {BPKB_RATES.map((r) => {
                          const product = BPKB_PRODUCTS.find((p) => p.id === r.product_id);
                          return (
                            <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-5 py-3 font-semibold text-slate-900">{product?.name ?? r.product_id}</td>
                              <td className="px-5 py-3 text-slate-700">{r.scheme}</td>
                              <td className="px-5 py-3 text-right font-semibold text-slate-800">{formatRupiah(Number(r.disbursement_amount))}</td>
                              <td className="px-5 py-3 text-center font-mono font-bold text-slate-900">{r.tenor}x</td>
                              <td className="px-5 py-3 text-right font-display text-lg font-bold text-red-600">{formatRupiah(Number(r.installment))}</td>
                              <td className="px-5 py-3 text-slate-600">{r.area}</td>
                              <td className="px-5 py-3">
                                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${r.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                                  {r.status === "active" ? "Aktif" : "Nonaktif"}
                                </span>
                              </td>
                              <td className="px-5 py-3 text-right whitespace-nowrap">
                                <Button size="sm" variant="outline">Edit</Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
