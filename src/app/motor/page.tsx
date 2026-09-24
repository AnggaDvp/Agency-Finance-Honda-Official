import { MotorcycleCard } from "@/components/motor/motorcycle-card";
import { EmptyState } from "@/components/ui/empty-state";
import { formatRupiah } from "@/lib/utils/format";
import type { Motorcycle } from "@/types/motorcycle";
import type { MotorcycleRate } from "@/types/rate-card";

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
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    brand: "Honda",
    model: "ADV 160",
    variant: "ABS",
    category: "matic",
    year: 2025,
    otr_price: 53000000,
    description: "Adventure scooter tangguh untuk medan perkotaan dan luar kota.",
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
    description: "Skuter stylish dengan desain street dan harga terjangkau.",
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
    description: "Sportbike entry level dengan performa mesin 150cc responsif.",
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
    description: "Motor bebek legendaris hemat bahan bakar dan tangguh.",
    image_url: null,
    stock: 15,
    status: "active",
    slug: "honda-supra-x-125-fi",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    brand: "Honda",
    model: "EM1 e:",
    variant: "Standard",
    category: "ev",
    year: 2025,
    otr_price: 45000000,
    description: "Skuter listrik ramah lingkungan dengan jarak tempuh hingga 60km.",
    image_url: null,
    stock: 3,
    status: "active",
    slug: "honda-em1-ev-standard",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    brand: "Honda",
    model: "Vario 125",
    variant: "CBS",
    category: "matic",
    year: 2025,
    otr_price: 23500000,
    description: "Vario 125 cc hemat dan lincah untuk aktivitas perkotaan.",
    image_url: null,
    stock: 18,
    status: "active",
    slug: "honda-vario-125-cbs",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const DUMMY_RATES: MotorcycleRate[] = [
  {
    id: "r-001",
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
    id: "r-002",
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
  {
    id: "r-003",
    motorcycle_id: "550e8400-e29b-41d4-a716-446655440003",
    dp: 5000000,
    tenor: 36,
    installment: 1575000,
    otr_price: 53000000,
    period: "2025-2",
    area: "Jabodetabek",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "r-004",
    motorcycle_id: "550e8400-e29b-41d4-a716-446655440004",
    dp: 2000000,
    tenor: 36,
    installment: 649000,
    otr_price: 21500000,
    period: "2025-2",
    area: "Jabodetabek",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "r-005",
    motorcycle_id: "550e8400-e29b-41d4-a716-446655440005",
    dp: 4000000,
    tenor: 36,
    installment: 1125000,
    otr_price: 39500000,
    period: "2025-2",
    area: "Jabodetabek",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "r-006",
    motorcycle_id: "550e8400-e29b-41d4-a716-446655440006",
    dp: 2000000,
    tenor: 36,
    installment: 615000,
    otr_price: 20500000,
    period: "2025-2",
    area: "Jabodetabek",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "r-007",
    motorcycle_id: "550e8400-e29b-41d4-a716-446655440007",
    dp: 5000000,
    tenor: 24,
    installment: 1850000,
    otr_price: 45000000,
    period: "2025-2",
    area: "Jabodetabek",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "r-008",
    motorcycle_id: "550e8400-e29b-41d4-a716-446655440008",
    dp: 2500000,
    tenor: 36,
    installment: 699000,
    otr_price: 23500000,
    period: "2025-2",
    area: "Jabodetabek",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const CATEGORIES = [
  { key: "all", label: "Semua Motor" },
  { key: "matic", label: "Matic" },
  { key: "sport", label: "Sport" },
  { key: "cub", label: "Bebek" },
  { key: "ev", label: "Listrik" },
];

export const dynamic = "force-dynamic";

export default async function MotorPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams.category ?? "all";
  const list = category === "all" ? DUMMY_MOTORCYCLES : DUMMY_MOTORCYCLES.filter((m) => m.category === category);

  const minPrice = Math.min(...DUMMY_MOTORCYCLES.map((m) => Number(m.otr_price)));
  const maxPrice = Math.max(...DUMMY_MOTORCYCLES.map((m) => Number(m.otr_price)));

  return (
    <div className="animate-fadeIn">
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-50 to-white py-16">
        <div className="mx-auto max-w-site px-6 lg:px-12">
          <p className="text-sm font-bold uppercase tracking-wider text-red-600">Katalog</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-slate-900 lg:text-5xl">
            Motor Baru Honda
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Pilih unit Honda terbaru dengan promo DP ringan mulai dari {formatRupiah(minPrice)} - {formatRupiah(maxPrice)}.
            Cicilan mulai 600 ribuan per bulan.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.key}
                href={cat.key === "all" ? "/motor" : `/motor?category=${cat.key}`}
                className={`rounded-xl border px-5 py-2.5 text-sm font-semibold transition-colors ${
                  category === cat.key
                    ? "border-red-600 bg-red-600 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:border-red-300 hover:text-red-600"
                }`}
              >
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 py-16 lg:px-12">
        {list.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((motor) => {
              const rate = DUMMY_RATES.find((r) => r.motorcycle_id === motor.id);
              return (
                <MotorcycleCard key={motor.id} motorcycle={motor} startingRate={rate ?? null} />
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="Kategori kosong"
            description="Belum ada motor untuk kategori ini. Silakan pilih kategori lain."
          />
        )}
      </section>
    </div>
  );
}
