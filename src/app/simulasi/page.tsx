"use client";

import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MotorcycleSimulator } from "@/components/simulation/motorcycle-simulator";
import { BpkbSimulator } from "@/components/simulation/bpkb-simulator";
import { MotorApplyDialog } from "@/components/motor/motor-apply-dialog";
import { BpkbApplyDialog } from "@/components/bpkb/bpkb-apply-dialog";
import { Button } from "@/components/ui/button";
import type { Motorcycle } from "@/types/motorcycle";
import type { BpkbProduct } from "@/types/rate-card";

const DUMMY_MOTORCYCLES: Motorcycle[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    brand: "Honda",
    model: "Vario 160",
    variant: "CBS",
    category: "matic",
    year: 2025,
    otr_price: 26500000,
    description: "Skuter matic premium",
    image_url: null,
    stock: 12,
    status: "active",
    slug: "honda-vario-160-cbs",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    brand: "Honda",
    model: "PCX 160",
    variant: "ABS",
    category: "matic",
    year: 2025,
    otr_price: 44500000,
    description: "Maxi skute premium",
    image_url: null,
    stock: 8,
    status: "active",
    slug: "honda-pcx-160-abs",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    brand: "Honda",
    model: "ADV 160",
    variant: "ABS",
    category: "matic",
    year: 2025,
    otr_price: 53000000,
    description: "Adventure scooter",
    image_url: null,
    stock: 5,
    status: "active",
    slug: "honda-adv-160-abs",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    brand: "Honda",
    model: "Beat Street",
    variant: "CBS",
    category: "matic",
    year: 2025,
    otr_price: 21500000,
    description: "Skuter stylish",
    image_url: null,
    stock: 20,
    status: "active",
    slug: "honda-beat-street-cbs",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    brand: "Honda",
    model: "CBR 150R",
    variant: "ABS",
    category: "sport",
    year: 2025,
    otr_price: 39500000,
    description: "Sportbike entry level",
    image_url: null,
    stock: 6,
    status: "active",
    slug: "honda-cbr-150r-abs",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    brand: "Honda",
    model: "Supra X 125",
    variant: "Fi",
    category: "cub",
    year: 2025,
    otr_price: 20500000,
    description: "Motor bebek hemat",
    image_url: null,
    stock: 15,
    status: "active",
    slug: "honda-supra-x-125-fi",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const DUMMY_BPKB_PRODUCTS: BpkbProduct[] = [
  {
    id: "bpkb-001",
    name: "Dana BPKB Super",
    vehicle_brands: ["Honda", "Yamaha", "Kawasaki", "Suzuki"],
    max_vehicle_age: 10,
    description: "Pembiayaan multiguna dengan jaminan BPKB motor.",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "bpkb-002",
    name: "Dana BPKB Flash",
    vehicle_brands: ["Honda", "Yamaha"],
    max_vehicle_age: 7,
    description: "Pencairan dana kilat maksimal 24 jam.",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const NOTES = [
  "Hasil simulasi bersifat estimasi dari rate card aktif.",
  "Angsuran aktual dapat berbeda sesuai kebijakan dan kondisi survey.",
  "Pilih DP dan tenor yang sesuai dengan kemampuan finansial Anda.",
  "Untuk hasil lebih akurat, konsultasikan dengan CS kami.",
];

export default function SimulasiPage() {
  const [motorOpen, setMotorOpen] = useState(false);
  const [bpkbOpen, setBpkbOpen] = useState(false);

  return (
    <div className="animate-fadeIn">
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-50 to-white py-16">
        <div className="mx-auto max-w-site px-6 lg:px-12">
          <p className="text-sm font-bold uppercase tracking-wider text-red-600">Kalkulator</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-slate-900 lg:text-5xl">
            Simulasi Angsuran
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Hitung estimasi cicilan Kredit Motor Baru dan Gadai BPKB berdasarkan rate card terbaru NSC Finance.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 py-16 lg:px-12">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <Tabs defaultValue="motor">
            <TabsList>
              <TabsTrigger value="motor">Kredit Motor Baru</TabsTrigger>
              <TabsTrigger value="bpkb">Gadai BPKB</TabsTrigger>
            </TabsList>
            <TabsContent value="motor">
              <div className="grid gap-8 p-8 lg:grid-cols-2 lg:p-10">
                <div>
                  <h2 className="font-display text-2xl font-bold text-slate-900">Kalkulator Motor Baru</h2>
                  <p className="mt-2 text-slate-600">
                    Pilih tipe motor, uang muka (DP), dan lama cicilan untuk melihat estimasi per bulan.
                  </p>
                  <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <MotorcycleSimulator motorcycles={DUMMY_MOTORCYCLES} />
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button
                      type="button"
                      onClick={() => setMotorOpen(true)}
                      className="h-auto rounded-xl bg-red-600 px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-red-700"
                    >
                      Lanjut Pengajuan Motor
                    </Button>
                    <Link
                      href="/motor"
                      className="rounded-xl border border-slate-300 bg-white px-8 py-4 text-center text-sm font-bold uppercase tracking-wider text-slate-800 hover:border-red-500 hover:text-red-600 transition-colors inline-flex items-center"
                    >
                      Lihat Katalog
                    </Link>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-red-50 to-white p-6">
                    <h3 className="font-display text-lg font-bold text-slate-900">Cara Membaca Hasil</h3>
                    <ol className="mt-4 space-y-3 text-sm text-slate-700">
                      <li className="flex gap-3"><span className="font-bold text-red-600">1.</span>Pilih unit motor yang tersedia di daftar dropdown.</li>
                      <li className="flex gap-3"><span className="font-bold text-red-600">2.</span>Pilih DP (uang muka) yang tersedia dari rate card aktif.</li>
                      <li className="flex gap-3"><span className="font-bold text-red-600">3.</span>Pilih tenor (jangka waktu cicilan) sesuai kemampuan.</li>
                      <li className="flex gap-3"><span className="font-bold text-red-600">4.</span>Klik &quot;Hitung dari Rate Card&quot; untuk melihat hasil.</li>
                    </ol>
                  </div>
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                    <h3 className="font-display text-lg font-bold text-amber-900">Catatan Penting</h3>
                    <ul className="mt-4 space-y-2 text-sm text-amber-900/90">
                      {NOTES.map((n, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="font-bold">•</span>
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bpkb">
              <div className="grid gap-8 p-8 lg:grid-cols-2 lg:p-10">
                <div>
                  <h2 className="font-display text-2xl font-bold text-slate-900">Kalkulator Gadai BPKB</h2>
                  <p className="mt-2 text-slate-600">
                    Pilih produk BPKB, jumlah dana yang dicairkan, dan tenor cicilan.
                  </p>
                  <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <BpkbSimulator />
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button
                      type="button"
                      onClick={() => setBpkbOpen(true)}
                      className="h-auto rounded-xl bg-red-600 px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-red-700"
                    >
                      Lanjut Pengajuan BPKB
                    </Button>
                    <a
                      href="/bpkb"
                      className="rounded-xl border border-slate-300 bg-white px-8 py-4 text-center text-sm font-bold uppercase tracking-wider text-slate-800 hover:border-red-500 hover:text-red-600 transition-colors inline-flex items-center"
                    >
                      Info BPKB Lengkap
                    </a>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-amber-50 to-white p-6">
                    <h3 className="font-display text-lg font-bold text-slate-900">Skema BPKB</h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-700">
                      {DUMMY_BPKB_PRODUCTS.map((p) => (
                        <li key={p.id} className="rounded-xl border border-slate-200 bg-white p-4">
                          <p className="font-display font-bold text-slate-900">{p.name}</p>
                          <p className="mt-1 text-slate-600">{p.description}</p>
                          <p className="mt-2 text-xs font-semibold text-slate-500">
                            Usia motor: ≤ {p.max_vehicle_age} tahun
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                    <h3 className="font-display text-lg font-bold text-amber-900">Catatan Penting</h3>
                    <ul className="mt-4 space-y-2 text-sm text-amber-900/90">
                      {NOTES.map((n, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="font-bold">•</span>
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <MotorApplyDialog open={motorOpen} onOpenChange={setMotorOpen} motorcycles={DUMMY_MOTORCYCLES} />
      <BpkbApplyDialog open={bpkbOpen} onOpenChange={setBpkbOpen} />
    </div>
  );
}
