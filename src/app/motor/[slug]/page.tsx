import { notFound } from "next/navigation";
import { MotorcycleSimulator } from "@/components/simulation/motorcycle-simulator";
import { MotorApplyButton } from "@/components/motor/motor-apply-button";
import { formatRupiah } from "@/lib/utils/format";
import type { Motorcycle } from "@/types/motorcycle";
import type { MotorcycleRate } from "@/types/rate-card";
import Link from "next/link";

const DUMMY_MOTORCYCLES: Motorcycle[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    brand: "Honda",
    model: "Vario 160",
    variant: "CBS",
    category: "matic",
    year: 2025,
    otr_price: 26500000,
    description: "Skuter matic premium dengan mesin 160cc eSP+ dan fitur canggih.",
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
    description: "Maxi skute legendaris dengan desain elegan dan performa tangguh.",
    image_url: null,
    stock: 8,
    status: "active",
    slug: "honda-pcx-160-abs",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const DUMMY_RATES: MotorcycleRate[] = [
  {
    id: "r-001",
    motorcycle_id: "550e8400-e29b-41d4-a716-446655440001",
    dp: 2500000,
    tenor: 12,
    installment: 2150000,
    otr_price: 26500000,
    period: "2025-2",
    area: "Jabodetabek",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "r-002",
    motorcycle_id: "550e8400-e29b-41d4-a716-446655440001",
    dp: 2500000,
    tenor: 24,
    installment: 1125000,
    otr_price: 26500000,
    period: "2025-2",
    area: "Jabodetabek",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "r-003",
    motorcycle_id: "550e8400-e29b-41d4-a716-446655440001",
    dp: 2500000,
    tenor: 36,
    installment: 799000,
    otr_price: 26500000,
    period: "2025-2",
    area: "Jabodetabek",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "r-004",
    motorcycle_id: "550e8400-e29b-41d4-a716-446655440002",
    dp: 5000000,
    tenor: 36,
    installment: 1299000,
    otr_price: 44500000,
    period: "2025-2",
    area: "Jabodetabek",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const SPECS = [
  { key: "Mesin", label: "Mesin" },
  { key: "Kapasitas", label: "Kapasitas Mesin" },
  { key: "Tenaga", label: "Tenaga Maksimal" },
  { key: "Torsi", label: "Torsi Maksimal" },
  { key: "Transmisi", label: "Transmisi" },
  { key: "BBM", label: "Sistem Bahan Bakar" },
];

const DUMMY_SPECS: Record<string, Record<string, string>> = {
  "honda-vario-160-cbs": {
    Mesin: "4-langkah, SOHC, eSP+",
    Kapasitas: "157 cc",
    Tenaga: "11.3 kW / 8500 rpm",
    Torsi: "13.8 Nm / 7000 rpm",
    Transmisi: "Otomatis V-Matic",
    BBM: "PGM-Fi",
  },
  "honda-pcx-160-abs": {
    Mesin: "4-langkah, SOHC, eSP+",
    Kapasitas: "157 cc",
    Tenaga: "11.8 kW / 8500 rpm",
    Torsi: "14.7 Nm / 6500 rpm",
    Transmisi: "Otomatis V-Matic",
    BBM: "PGM-Fi",
  },
};

export const dynamic = "force-dynamic";

export default async function MotorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const motor = DUMMY_MOTORCYCLES.find((m) => m.slug === slug);
  if (!motor) return notFound();

  const rates = DUMMY_RATES.filter((r) => r.motorcycle_id === motor.id);
  const specs = DUMMY_SPECS[motor.slug] ?? {};
  const Tenors = [...new Set(rates.map((r) => r.tenor))].sort((a, b) => a - b);
  const Dps = [...new Set(rates.map((r) => Number(r.dp)))].sort((a, b) => a - b);

  return (
    <div className="animate-fadeIn">
      <section className="mx-auto max-w-site px-6 py-10 lg:px-12">
        <Link href="/motor" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600">
          ← Kembali ke Katalog Motor
        </Link>
      </section>

      <section className="mx-auto max-w-site px-6 pb-20 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex aspect-[4/3] items-center justify-center rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 shadow-sm">
              <div className="text-center">
                <p className="font-display text-6xl font-extrabold uppercase text-slate-400 lg:text-7xl">
                  {motor.model}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                  {motor.brand} {motor.variant} {motor.year}
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg font-bold text-slate-900">Spesifikasi Utama</h3>
              <dl className="mt-4 divide-y divide-slate-100">
                {SPECS.map((s) => (
                  <div key={s.key} className="flex items-center justify-between py-3">
                    <dt className="text-sm text-slate-500">{s.label}</dt>
                    <dd className="text-sm font-semibold text-slate-900">{specs[s.key] ?? "-"}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-red-600">
              {motor.brand} • {motor.category.toUpperCase()}
            </p>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight text-slate-900 lg:text-5xl">
              {motor.brand} {motor.model}
              <span className="block text-slate-500">{motor.variant}</span>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{motor.description}</p>

            <div className="mt-8 rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-6 shadow-sm">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-red-700">Harga OTR Jabodetabek</p>
                  <p className="mt-1 font-display text-4xl font-extrabold text-red-600">
                    {formatRupiah(Number(motor.otr_price))}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                  motor.stock > 5 ? "bg-emerald-50 text-emerald-700" : motor.stock > 0 ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-500"
                }`}>
                  Stok: {motor.stock}
                </span>
              </div>
            </div>

            {rates.length > 0 ? (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-display text-lg font-bold text-slate-900">Simulasi Cicilan (DP {formatRupiah(Dps[0] ?? 0)})</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {Tenors.map((t) => {
                    const rate = rates.find((r) => r.tenor === t && Number(r.dp) === Dps[0]);
                    return (
                      <div key={t} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{t} Bulan</p>
                        <p className="mt-2 font-display text-2xl font-bold text-red-600">
                          {rate ? formatRupiah(Number(rate.installment)) : "-"}
                        </p>
                        <p className="text-xs text-slate-500">per bulan</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="mt-8">
              <h3 className="font-display text-lg font-bold text-slate-900">Hitung Cicilan Lengkap</h3>
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <MotorcycleSimulator motorcycles={DUMMY_MOTORCYCLES} />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <MotorApplyButton motorcycleId={motor.id} motorcycles={DUMMY_MOTORCYCLES} />
              <a
                href="tel:0211500672"
                className="flex-1 rounded-xl border border-slate-300 bg-white px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-slate-800 hover:border-red-500 hover:text-red-600 transition-colors"
              >
                Hubungi Sales
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
