"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BpkbApplyDialog } from "@/components/bpkb/bpkb-apply-dialog";
import { BpkbSimulator } from "@/components/simulation/bpkb-simulator";
import { formatRupiah } from "@/lib/utils/format";
import type { BpkbProduct, BpkbRate } from "@/types/rate-card";

const DUMMY_PRODUCTS: BpkbProduct[] = [
  {
    id: "bpkb-001",
    name: "Dana BPKB Super",
    vehicle_brands: ["Honda", "Yamaha", "Kawasaki", "Suzuki"],
    max_vehicle_age: 10,
    description: "Pembiayaan multiguna dengan jaminan BPKB motor, proses cepat dan bunga kompetitif.",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "bpkb-002",
    name: "Dana BPKB Flash",
    vehicle_brands: ["Honda", "Yamaha"],
    max_vehicle_age: 7,
    description: "Pencairan dana kilat maksimal 24 jam dengan persyaratan mudah.",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "bpkb-003",
    name: "Dana BPKB Premium",
    vehicle_brands: ["Honda", "Yamaha", "Kawasaki", "Suzuki", "Ducati"],
    max_vehicle_age: 12,
    description: "Plafon tinggi hingga 500 juta untuk motor premium dan klasik.",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const DUMMY_RATES: BpkbRate[] = [
  { id: "br-1", product_id: "bpkb-001", scheme: "Reguler", disbursement_amount: 5000000, tenor: 12, installment: 475000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "br-2", product_id: "bpkb-001", scheme: "Reguler", disbursement_amount: 5000000, tenor: 24, installment: 255000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "br-3", product_id: "bpkb-001", scheme: "Reguler", disbursement_amount: 5000000, tenor: 36, installment: 185000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "br-4", product_id: "bpkb-001", scheme: "Reguler", disbursement_amount: 10000000, tenor: 12, installment: 935000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "br-5", product_id: "bpkb-001", scheme: "Reguler", disbursement_amount: 10000000, tenor: 24, installment: 505000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "br-6", product_id: "bpkb-001", scheme: "Reguler", disbursement_amount: 10000000, tenor: 36, installment: 365000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "br-7", product_id: "bpkb-001", scheme: "Reguler", disbursement_amount: 25000000, tenor: 24, installment: 1225000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "br-8", product_id: "bpkb-001", scheme: "Reguler", disbursement_amount: 25000000, tenor: 36, installment: 885000, period: "2025-2", area: "Jabodetabek", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

const REQUIREMENTS = [
  "KTP asli (Suami + Istri jika menikah)",
  "Kartu Keluarga (KK)",
  "BPKB & STNK asli motor yang dijaminkan",
  "Slip gaji / rekening koran 3 bulan terakhir",
  "NPWP (opsional untuk plafon > 50 Jt)",
  "Foto motor (depan, samping, nomor rangka & mesin)",
];

const BENEFITS = [
  { title: "Plafon Tinggi", desc: "Dana cair hingga 85% dari nilai taksiran motor" },
  { title: "Tenor Fleksibel", desc: "Pilih cicilan 6, 12, 24, hingga 36 bulan" },
  { title: "Bunga Rendah", desc: "Suku bunga flat mulai 0.85% per bulan" },
  { title: "Proses Cepat", desc: "Pencairan dana maksimal 1x24 jam kerja" },
];

export default function BpkbPage() {
  const [applyOpen, setApplyOpen] = useState(false);
  const exampleRate = DUMMY_RATES.find((r) => r.disbursement_amount === 10000000);

  return (
    <div className="animate-fadeIn">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-50 via-white to-amber-50">
        <div className="mx-auto max-w-site px-6 py-20 lg:px-12 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
                Gadai BPKB
              </span>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-slate-900 lg:text-5xl">
                Dana Cepat Dengan
                <br />
                Jaminan <span className="text-red-600">BPKB Motor</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                Butuh dana mendesak untuk modal usaha, biaya pendidikan, atau kebutuhan darurat?
                Gadai BPKB motor Honda/Yamaha/Kawasaki Anda, proses cepat tanpa survey rumit.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  type="button"
                  onClick={() => setApplyOpen(true)}
                  className="h-auto rounded-xl bg-red-600 px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-red-700"
                >
                  Ajukan Dana BPKB
                </Button>
                <a
                  href="tel:0211500672"
                  className="rounded-xl border border-slate-300 bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-slate-800 hover:border-red-500 hover:text-red-600 transition-colors inline-flex items-center justify-center"
                >
                  Konsultasi Gratis
                </a>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8">
                <div>
                  <p className="font-display text-3xl font-bold text-red-600">Rp 500 Jt</p>
                  <p className="mt-1 text-sm text-slate-500">Plafon Maksimal</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-red-600">0.85%</p>
                  <p className="mt-1 text-sm text-slate-500">Bunga Flat / Bln</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-red-600">24 Jam</p>
                  <p className="mt-1 text-sm text-slate-500">Proses Pencairan</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 bg-amber-100/40 blur-3xl"></div>
              <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Contoh Simulasi</p>
                <p className="mt-2 font-display text-lg font-bold text-slate-900">
                  Pinjaman {formatRupiah(10000000)} • Tenor 24 bulan
                </p>
                <div className="mt-6 space-y-4">
                  {DUMMY_RATES
                    .filter((r) => r.disbursement_amount === 10000000)
                    .sort((a, b) => a.tenor - b.tenor)
                    .map((r) => (
                      <div key={r.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{r.tenor} Bulan</p>
                          <p className="text-sm text-slate-600">{r.scheme}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-display text-2xl font-bold text-red-600">{formatRupiah(Number(r.installment))}</p>
                          <p className="text-xs text-slate-500">per bulan</p>
                        </div>
                      </div>
                    ))}
                </div>
                {exampleRate ? (
                  <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Estimasi Total</p>
                    <p className="mt-1 text-sm text-emerald-900">
                      Total bayar: {formatRupiah(Number(exampleRate.installment) * Number(exampleRate.tenor))}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 py-20 lg:px-12">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-red-600">Keunggulan</p>
          <h2 className="mt-2 font-display text-4xl font-bold text-slate-900">
            Keuntungan Gadai BPKB di NSC
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div key={b.title} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:border-red-200 hover:shadow-md transition-shadow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 font-display font-bold text-red-600">
                {b.title.charAt(0)}
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-site px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-red-600">Pilih Produk</p>
              <h2 className="mt-2 font-display text-4xl font-bold text-slate-900">
                Produk Pembiayaan BPKB
              </h2>
              <p className="mt-4 text-slate-600">
                Sesuaikan pilihan produk dengan kebutuhan dana dan usia motor Anda.
              </p>
              <div className="mt-8 space-y-4">
                {DUMMY_PRODUCTS.map((p) => (
                  <div key={p.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display text-xl font-bold text-slate-900">{p.name}</h3>
                        <p className="mt-2 text-sm text-slate-600">{p.description}</p>
                      </div>
                      <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase text-red-700">
                        ≤ {p.max_vehicle_age} thn
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.vehicle_brands.map((b) => (
                        <span key={b} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-red-600">Simulator</p>
              <h2 className="mt-2 font-display text-4xl font-bold text-slate-900">
                Kalkulator Angsuran BPKB
              </h2>
              <p className="mt-4 text-slate-600">
                Hitung estimasi cicilan bulanan Anda sesuai rate card terbaru.
              </p>
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <BpkbSimulator />
              </div>
              <div className="mt-6">
                <Button
                  type="button"
                  onClick={() => setApplyOpen(true)}
                  className="w-full h-auto rounded-xl bg-red-600 px-6 py-4 text-sm font-bold uppercase tracking-wider hover:bg-red-700"
                >
                  Ajukan Sekarang
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 py-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-red-600">Syarat & Dokumen</p>
            <h2 className="mt-2 font-display text-4xl font-bold text-slate-900">
              Persyaratan Pengajuan
            </h2>
            <p className="mt-4 text-slate-600">
              Siapkan dokumen berikut untuk mempercepat proses persetujuan.
            </p>
            <ul className="mt-8 space-y-3">
              {REQUIREMENTS.map((r, i) => (
                <li key={i} className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-slate-700">{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-red-700 to-red-600 p-10 text-white shadow-xl">
            <h3 className="font-display text-3xl font-bold">Siap Ajukan?</h3>
            <p className="mt-4 text-red-100 leading-relaxed">
              Tim NSC Finance siap membantu Anda mendapatkan dana dengan proses cepat dan aman.
              Isi formulir online atau hubungi CS kami untuk konsultasi langsung.
            </p>
            <div className="mt-8 space-y-3">
              <Button
                type="button"
                onClick={() => setApplyOpen(true)}
                className="w-full h-auto rounded-xl bg-white px-6 py-4 text-sm font-bold uppercase tracking-wider text-red-600 hover:bg-red-50"
              >
                Isi Formulir Online
              </Button>
              <a
                href="https://wa.me/6281288886720"
                className="block rounded-xl border border-white/30 bg-white/10 px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-white hover:bg-white/20 transition-colors"
              >
                Chat WhatsApp CS
              </a>
              <a
                href="tel:0211500672"
                className="block rounded-xl border border-white/30 bg-white/10 px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-white hover:bg-white/20 transition-colors"
              >
                Telepon (021) 1500-672
              </a>
            </div>
          </div>
        </div>
      </section>

      <BpkbApplyDialog open={applyOpen} onOpenChange={setApplyOpen} />
    </div>
  );
}
