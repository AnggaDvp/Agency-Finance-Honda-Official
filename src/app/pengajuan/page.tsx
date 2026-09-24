"use client";

import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MotorApplyDialog } from "@/components/motor/motor-apply-dialog";
import { BpkbApplyDialog } from "@/components/bpkb/bpkb-apply-dialog";
import { Button } from "@/components/ui/button";
import type { Motorcycle } from "@/types/motorcycle";

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
];

const STEPS_MOTOR = [
  { num: "1", title: "Pilih Motor", desc: "Pilih tipe motor Honda yang Anda inginkan dari katalog" },
  { num: "2", title: "Isi Data Diri", desc: "Lengkapi formulir pengajuan dengan data yang valid" },
  { num: "3", title: "Pembayaran DP", desc: "Transfer uang muka sesuai simulasi yang disetujui" },
  { num: "4", title: "Ambil Unit", desc: "Motor siap diambil di dealer terdekat" },
];

const STEPS_BPKB = [
  { num: "1", title: "Isi Formulir", desc: "Lengkapi data diri dan detail kendaraan yang dijaminkan" },
  { num: "2", title: "Upload Dokumen", desc: "Kirim scan KTP, KK, BPKB, STNK, dan slip gaji" },
  { num: "3", title: "Verifikasi & Survey", desc: "Tim kami melakukan verifikasi data dan survey" },
  { num: "4", title: "Dana Cair", desc: "Dana ditransfer ke rekening Anda maksimal 24 jam" },
];

export default function PengajuanPage() {
  const [motorOpen, setMotorOpen] = useState(false);
  const [bpkbOpen, setBpkbOpen] = useState(false);

  return (
    <div className="animate-fadeIn">
      <section className="border-b border-slate-200 bg-gradient-to-br from-red-50 via-white to-slate-50 py-16">
        <div className="mx-auto max-w-site px-6 lg:px-12">
          <p className="text-sm font-bold uppercase tracking-wider text-red-600">Pengajuan Online</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-slate-900 lg:text-5xl">
            Ajukan Kredit & Dana BPKB
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Pilih produk yang sesuai, isi formulir online, dan tim kami akan menghubungi Anda kurang dari 30 menit.
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
              <div className="grid gap-10 p-8 lg:grid-cols-2 lg:p-10">
                <div>
                  <h2 className="font-display text-2xl font-bold text-slate-900">Kredit Motor Honda</h2>
                  <p className="mt-2 text-slate-600">
                    Beli motor baru Honda dengan DP ringan dan cicilan fleksibel. Pilih dari berbagai tipe motor terbaru.
                  </p>

                  <div className="mt-8 space-y-4">
                    {STEPS_MOTOR.map((s) => (
                      <div key={s.num} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 font-display text-lg font-bold text-white">
                          {s.num}
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-slate-900">{s.title}</h3>
                          <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button
                      type="button"
                      onClick={() => setMotorOpen(true)}
                      className="h-auto rounded-xl bg-red-600 px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-red-700"
                    >
                      Mulai Pengajuan Motor
                    </Button>
                    <Link
                      href="/motor"
                      className="rounded-xl border border-slate-300 bg-white px-8 py-4 text-center text-sm font-bold uppercase tracking-wider text-slate-800 hover:border-red-500 hover:text-red-600 transition-colors inline-flex items-center"
                    >
                      Lihat Katalog Motor
                    </Link>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6">
                  <h3 className="font-display text-lg font-bold text-slate-900">Unit Promo Saat Ini</h3>
                  <div className="mt-4 space-y-3">
                    {DUMMY_MOTORCYCLES.slice(0, 4).map((m) => (
                      <div key={m.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 hover:border-red-200 transition-colors cursor-pointer" onClick={() => setMotorOpen(true)}>
                        <div>
                          <p className="font-display font-bold text-slate-900">{m.brand} {m.model}</p>
                          <p className="text-xs text-slate-500">{m.variant} • {m.year}</p>
                        </div>
                        <span className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold uppercase text-red-700">
                          Stok {m.stock}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bpkb">
              <div className="grid gap-10 p-8 lg:grid-cols-2 lg:p-10">
                <div>
                  <h2 className="font-display text-2xl font-bold text-slate-900">Gadai BPKB Motor</h2>
                  <p className="mt-2 text-slate-600">
                    Butuh dana cepat? Jaminkan BPKB motor Anda. Proses mudah, bunga rendah, pencairan maksimal 24 jam.
                  </p>

                  <div className="mt-8 space-y-4">
                    {STEPS_BPKB.map((s) => (
                      <div key={s.num} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 font-display text-lg font-bold text-white">
                          {s.num}
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-slate-900">{s.title}</h3>
                          <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button
                      type="button"
                      onClick={() => setBpkbOpen(true)}
                      className="h-auto rounded-xl bg-red-600 px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-red-700"
                    >
                      Mulai Pengajuan BPKB
                    </Button>
                    <a
                      href="/bpkb"
                      className="rounded-xl border border-slate-300 bg-white px-8 py-4 text-center text-sm font-bold uppercase tracking-wider text-slate-800 hover:border-red-500 hover:text-red-600 transition-colors inline-flex items-center"
                    >
                      Info BPKB Lengkap
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-6">
                  <h3 className="font-display text-lg font-bold text-slate-900">Kelebihan Gadai BPKB</h3>
                  <ul className="mt-4 space-y-3 text-sm text-slate-700">
                    {[
                      "Dana cair sampai 85% dari nilai taksiran motor",
                      "Motor tetap bisa Anda gunakan sehari-hari",
                      "Bunga flat mulai 0.85% per bulan",
                      "Tenor fleksibel 6 - 36 bulan",
                      "Proses tanpa BI checking yang rumit",
                      "Asuransi kendaraan tersedia sebagai opsional",
                      "Tidak ada denda untuk pelunasan dipercepat",
                      "Pencairan dana maksimal 1x24 jam kerja",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-site px-6 lg:px-12">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-white lg:p-14">
            <div className="grid items-center gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="font-display text-3xl font-bold lg:text-4xl">
                  Mau Konsultasi Langsung dengan CS Kami?
                </h2>
                <p className="mt-3 text-slate-300 text-lg">
                  Tim Agency Honda siap membantu Anda Senin - Jumat 08:00 - 17:00 WIB, Sabtu 08:00 - 14:00 WIB.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:0211500672"
                  className="rounded-xl bg-red-600 px-6 py-4 text-center text-sm font-bold uppercase tracking-wider hover:bg-red-700 transition-colors"
                >
                  📞 (021) 1500-672
                </a>
                <a
                  href="https://wa.me/6281288886720"
                  className="rounded-xl bg-emerald-600 px-6 py-4 text-center text-sm font-bold uppercase tracking-wider hover:bg-emerald-700 transition-colors"
                >
                  💬 WhatsApp CS
                </a>
                <a
                  href="mailto:care@agencyhonda.co.id"
                  className="rounded-xl border border-slate-600 bg-slate-800 px-6 py-4 text-center text-sm font-bold uppercase tracking-wider hover:bg-slate-700 transition-colors"
                >
                  ✉️ Email Kami
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MotorApplyDialog open={motorOpen} onOpenChange={setMotorOpen} motorcycles={DUMMY_MOTORCYCLES} />
      <BpkbApplyDialog open={bpkbOpen} onOpenChange={setBpkbOpen} />
    </div>
  );
}
