import { HomeCtas } from "@/components/public/home-ctas";
import { MotorcycleCard } from "@/components/motor/motorcycle-card";
import { EmptyState } from "@/components/ui/empty-state";
import type { Motorcycle } from "@/types/motorcycle";
import type { MotorcycleRate } from "@/types/rate-card";
import {
  ShieldCheck,
  Clock,
  Award,
  Percent,
  ArrowRight,
  Sparkles,
  FileCheck2,
  Wallet,
  CheckCircle2,
  Star,
  Zap,
  Phone,
  BadgeCheck,
} from "lucide-react";
import Link from "next/link";

const HERO_MOTOR_IMAGE =
  "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Honda%20Vario%20160%20motorcycle%20sporty%20red%20white%20color%20studio%20shot%20high%20quality%20automotive%20photography%20dynamic%20angle%20luxury%20lighting&image_size=landscape_16_9";

const DUMMY_MOTORCYCLES: Motorcycle[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    brand: "Honda",
    model: "Vario EVO 160",
    variant: "CBS ISS",
    category: "matic",
    year: 2025,
    otr_price: 27350000,
    description:
      "Skuter matic generasi terbaru dengan mesin 160cc eSP+, hemat BBM, dan fitur lengkap. Produk terlaris se-Indonesia.",
    image_url:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Honda%20Vario%20160%20EVO%20red%20color%20right%20side%20view%20white%20studio%20background%20product%20photography&image_size=landscape_4_3",
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
    description:
      "Maxi skute premium dengan desain elegan, Smart Key, ABS, dan performa mesin 160cc yang tangguh.",
    image_url:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Honda%20PCX%20160%20matte%20black%20color%20right%20side%20view%20white%20studio%20background%20luxury%20scooter%20photography&image_size=landscape_4_3",
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
    description:
      "Adventure scooter tangguh dengan desain agresif, ground clearance tinggi, siap jelajah medan perkotaan dan luar kota.",
    image_url:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Honda%20ADV%20160%20adventure%20scooter%20white%20red%20livery%20right%20side%20view%20white%20studio%20background%20motorcycle%20photography&image_size=landscape_4_3",
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
    description:
      "Skuter stylish dengan desain street, harga terjangkau, efisien, cocok untuk mobilitas harian anak muda.",
    image_url:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Honda%20Beat%20Street%20sporty%20blue%20color%20right%20side%20view%20white%20studio%20background%20compact%20scooter%20photography&image_size=landscape_4_3",
    stock: 20,
    status: "active",
    slug: "honda-beat-street-cbs",
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
    installment: 1075000,
    otr_price: 27350000,
    period: "2025-2",
    area: "Jabodetabek",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "r-002",
    motorcycle_id: "550e8400-e29b-41d4-a716-446655440001",
    dp: 5000000,
    tenor: 24,
    installment: 1150000,
    otr_price: 27350000,
    period: "2025-2",
    area: "Jabodetabek",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "r-003",
    motorcycle_id: "550e8400-e29b-41d4-a716-446655440002",
    dp: 5000000,
    tenor: 36,
    installment: 1285000,
    otr_price: 44500000,
    period: "2025-2",
    area: "Jabodetabek",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "r-004",
    motorcycle_id: "550e8400-e29b-41d4-a716-446655440003",
    dp: 5000000,
    tenor: 36,
    installment: 1420000,
    otr_price: 53000000,
    period: "2025-2",
    area: "Jabodetabek",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "r-005",
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
];

const BENEFITS = [
  {
    icon: Zap,
    title: "Proses Cepat",
    desc: "Persetujuan pengajuan kurang dari 24 jam kerja.",
  },
  {
    icon: Wallet,
    title: "DP Ringan",
    desc: "Uang muka mulai dari 10% untuk motor baru pilihan.",
  },
  {
    icon: Clock,
    title: "Tenor Fleksibel",
    desc: "Pilih cicilan 12 sampai 48 bulan sesuai kemampuan.",
  },
  {
    icon: Percent,
    title: "Bunga Kompetitif",
    desc: "Suku bunga flat mulai dari 0.85% per bulan.",
  },
];

const STEPS = [
  {
    num: "01",
    icon: FileCheck2,
    title: "Pilih Produk",
    desc: "Pilih motor baru atau skema dana BPKB sesuai kebutuhan.",
  },
  {
    num: "02",
    icon: FileCheck2,
    title: "Isi Formulir",
    desc: "Lengkapi data diri dan unggah dokumen persyaratan.",
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "Verifikasi",
    desc: "Tim kami akan melakukan verifikasi dan survey jika diperlukan.",
  },
  {
    num: "04",
    icon: Wallet,
    title: "Cairkan Dana",
    desc: "Pengajuan disetujui, unit motor siap diambil atau dana langsung cair.",
  },
];

const TRUST_BADGES = [
  { icon: CheckCircle2, text: "Proses Mudah & Cepat" },
  { icon: Award, text: "Informasi Transparan" },
  { icon: Phone, text: "CS Profesional 24/7" },
];

export default function HomePage() {
  return (
    <div className="animate-fadeIn">
      {/* 1. CINEMATIC FULL-WIDTH HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-16">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center lg:bg-right opacity-100"
            style={{
              backgroundImage: `url(${HERO_MOTOR_IMAGE})`,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 sm:via-white/85 lg:via-white/75 to-white/10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/30"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(220,38,38,0.08),transparent_60%)]"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-site px-6 pb-16 pt-28 lg:px-12 lg:pb-20 lg:pt-36">
          <div className="grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="flex max-w-2xl flex-col items-start gap-5">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-red-200 bg-red-50 px-3.5 py-1.5 shadow-sm">
                <span className="relative inline-flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-red-700">
                  Solusi Pembiayaan Terverifikasi OJK
                </span>
                <span className="relative inline-flex items-center justify-center">
                  <BadgeCheck className="h-5 w-5 text-sky-500 drop-shadow-sm" strokeWidth={2.5} />
                </span>
              </div>

              <h1 className="font-display text-[44px] font-extrabold uppercase leading-[0.95] tracking-tight text-slate-900 lg:text-[72px] lg:leading-[1.02]">
                Pilihan Motor{" "}
                <span className="text-red-600 drop-shadow-sm">Impianmu.</span>
                <br />
                <span className="relative inline-block text-slate-900">
                  Ajukan Dengan
                  <span className="text-red-600"> Mudah.</span>
                  <span className="absolute -bottom-2 left-0 h-2 w-32 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 sm:w-44"></span>
                </span>
              </h1>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/pengajuan"
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-red-600/20 hover:bg-red-700 transition-all"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Pengajuan Motor Baru
                </Link>
                <Link
                  href="/bpkb"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-amber-400 bg-amber-400/90 px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-900 shadow-sm hover:bg-amber-400 transition-all"
                >
                  <Zap className="h-3.5 w-3.5 text-red-700" />
                  Dana Tunai BPKB
                </Link>
              </div>

              <p className="text-lg leading-relaxed text-slate-600 lg:text-xl lg:leading-[1.7]">
                Solusi pembiayaan motor baru Honda pilihan dan pinjaman dana
                multiguna beragunan BPKB motor dengan pencairan cepat, bunga
                kompetitif, dan angsuran fleksibel.
              </p>

              <div className="w-full pt-3">
                <HomeCtas motorcycles={DUMMY_MOTORCYCLES} />
              </div>

              <div className="mt-4 flex w-full flex-wrap items-center gap-5 border-t border-slate-200 pt-6 text-sm text-slate-700">
                {TRUST_BADGES.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-emerald-600" />
                    <span className="font-semibold">{text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-8 pt-4">
                <div>
                  <p className="font-display text-3xl font-bold text-red-600">
                    15K+
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Customer Terpercaya
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-red-600">
                    24 Jam
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Proses Pencairan
                  </p>
                </div>
                <div>
                  <p className="flex items-center gap-1 font-display text-3xl font-bold text-red-600">
                    4.9
                    <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Rating Kepuasan</p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-8 -z-10 rounded-full bg-gradient-to-br from-red-200/40 via-amber-100/30 to-transparent blur-3xl"></div>
              <div className="relative rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-2xl backdrop-blur-sm">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 p-8">
                  <div className="absolute -top-8 -right-8 rounded-full bg-red-500/10 h-40 w-40 blur-2xl"></div>
                  <div className="absolute -bottom-12 -left-8 rounded-full bg-amber-400/20 h-48 w-48 blur-3xl"></div>
                  <img
                    src={HERO_MOTOR_IMAGE}
                    alt="Honda Vario EVO 160 - Promo Terbaru"
                    className="relative mx-auto w-full max-w-xl object-contain drop-shadow-2xl"
                  />
                </div>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Promo Terbaru • Vario EVO 160
                    </p>
                    <p className="mt-1 font-display text-4xl font-extrabold text-red-600">
                      DP Rp 2,5JT
                    </p>
                  </div>
                  <Link
                    href="https://www.astra-honda.com/product/vario-evo-160"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-700 transition-colors"
                  >
                    Lihat di Astra Honda
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Bunga Mulai
                </p>
                <p className="mt-1 font-display text-3xl font-extrabold text-red-600">
                  0.85%
                </p>
                <p className="text-xs text-slate-500">flat / bulan</p>
              </div>

              <div className="absolute -top-6 -right-4 rounded-2xl border border-emerald-200 bg-white p-4 shadow-xl">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Ready Stock
                </p>
                <p className="mt-1 font-display text-2xl font-extrabold text-slate-900">
                  45+ Unit
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TWO MAIN SERVICE CARDS WITH IMAGE DETAILS */}
      <section className="relative z-20 mx-auto w-full max-w-site px-6 pb-16 lg:px-12 lg:-mt-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-red-300 hover:shadow-xl">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-red-50 via-white to-slate-50">
              <img
                src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Honda%20Vario%20160%20PCX%20ADV%20Beat%20row%20of%20new%20motorcycles%20red%20white%20black%20color%20dealership%20showroom%20display%20professional%20automotive%20photography&image_size=landscape_16_9"
                alt="Katalog Motor Honda Baru"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
              <div className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-white/90 px-3 py-1 shadow-sm backdrop-blur">
                <Zap className="h-3.5 w-3.5 text-red-600" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-600">
                  Katalog Resmi
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="mb-1 flex items-center gap-2">
                  {[
                    "Vario",
                    "PCX",
                    "ADV",
                    "Beat",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight drop-shadow-lg">
                  MOTOR BARU
                </h2>
                <p className="mt-1.5 text-sm text-white/90">
                  Ready stock 45+ unit Honda terbaru dengan DP spesial
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5 p-8">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl border border-red-100 bg-red-50/60 p-3">
                  <p className="font-display text-lg font-bold text-red-600">
                    DP 10%
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Min. DP
                  </p>
                </div>
                <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-3">
                  <p className="font-display text-lg font-bold text-amber-600">
                    48 Bln
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Tenor Max
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3">
                  <p className="font-display text-lg font-bold text-emerald-600">
                    0.85%
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Bunga Flat
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                Temukan motor Honda terbaru dengan pilihan DP ringan,
                angsuran fleksibel, dan persetujuan leasing kilat
                se-Indonesia. Promo terbatas untuk bulan ini.
              </p>
              <Link
                href="/pengajuan"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-red-600 to-red-700 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-red-600/20 transition-all hover:shadow-lg hover:shadow-red-600/30"
              >
                Ajukan Kredit Motor
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-red-200 bg-white shadow-sm transition-all hover:border-red-400 hover:shadow-xl">
            <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-400 to-red-500"></div>
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
              <img
                src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Motorcycle%20BPKB%20vehicle%20registration%20document%20and%20cash%20money%20Indonesian%20Rupiah%20banknotes%20contract%20agreement%20handshake%20professional%20business%20finance%20photography&image_size=landscape_16_9"
                alt="Gadai BPKB Motor Dana Tunai"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/15 to-transparent"></div>
              <div className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-red-700" />
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-950">
                  Paling Populer
                </span>
              </div>
              <div className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 shadow-sm backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  Cair 24 Jam
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="mb-1 flex items-center gap-2">
                  {["Honda", "Yamaha", "Kawasaki", "Suzuki"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight drop-shadow-lg">
                  GADAI BPKB
                </h2>
                <p className="mt-1.5 text-sm text-white/90">
                  Dana tunai sampai 85% nilai kendaraan, motor tetap dipakai
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5 p-8">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl border border-red-100 bg-red-50/60 p-3">
                  <p className="font-display text-lg font-bold text-red-600">
                    85%
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Plafon Max
                  </p>
                </div>
                <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-3">
                  <p className="font-display text-lg font-bold text-amber-600">
                    36 Bln
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Tenor Cicilan
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3">
                  <p className="font-display text-lg font-bold text-emerald-600">
                    1 Hari
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Proses Cair
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                Ajukan dana tunai multiguna dengan jaminan BPKB motor Honda,
                Yamaha, Kawasaki, atau Suzuki. Tanpa birokrasi berbelit,
                motor tetap Anda gunakan sehari-hari.
              </p>
              <Link
                href="/bpkb"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 px-6 py-3.5 text-sm font-black uppercase tracking-wider text-slate-950 shadow-md transition-all hover:shadow-lg"
              >
                Ajukan Dana BPKB
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENEFITS SECTION */}
      <section className="mx-auto max-w-site px-6 py-20 lg:px-12">
        <div className="mb-12 text-center">
          <div className="mb-2 inline-flex items-center gap-2">
            <span className="h-2 w-7 rounded-full bg-red-600"></span>
            <span className="h-2 w-3 rounded-full bg-amber-400"></span>
          </div>
          <p className="text-sm font-bold uppercase tracking-wider text-red-600">
            Keunggulan Kami
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight text-slate-900 lg:text-5xl">
            Kenapa Pilih NSC Finance
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 shadow-sm transition-transform group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. NEW MOTORCYCLE CATALOG HIGHLIGHTS */}
      <section className="w-full bg-gradient-to-b from-slate-50 to-white py-20">
        <div className="mx-auto max-w-site px-6 lg:px-12">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-7 rounded-full bg-red-600"></span>
                <span className="h-2 w-3 rounded-full bg-amber-400"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-red-600">
                  KATALOG RESMI AGENCY HONDA
                </span>
                <span className="rounded border border-amber-300 bg-amber-100 px-2 py-0.5 text-[11px] font-bold uppercase text-amber-800">
                  PROMO SPESIAL
                </span>
              </div>
              <h2 className="font-display text-5xl font-bold uppercase tracking-tight leading-none text-slate-900">
                MOTOR BARU
              </h2>
              <p className="mt-3 text-base text-slate-600">
                Pilih motor yang sesuai kebutuhan dan budget Anda. Dapatkan
                promo DP spesial bulan ini.
              </p>
            </div>
            <div className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-slate-200/80 bg-slate-100 p-1.5">
              <button className="rounded-lg bg-red-600 px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors">
                Semua
              </button>
              <button className="rounded-lg px-4 py-2 text-[13px] font-semibold text-slate-700 hover:bg-white hover:text-slate-900 transition-colors">
                Matic
              </button>
              <button className="rounded-lg px-4 py-2 text-[13px] font-semibold text-slate-700 hover:bg-white hover:text-slate-900 transition-colors">
                Cub / Bebek
              </button>
              <button className="rounded-lg px-4 py-2 text-[13px] font-semibold text-slate-700 hover:bg-white hover:text-slate-900 transition-colors">
                Sport
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {DUMMY_MOTORCYCLES.map((motor) => {
              const rate = DUMMY_RATES.find((r) => r.motorcycle_id === motor.id);
              return (
                <MotorcycleCard
                  key={motor.id}
                  motorcycle={motor}
                  startingRate={rate ?? null}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. MITRA LEASING RESMI & TERDAFTAR OJK */}
      <section className="w-full bg-gradient-to-b from-slate-50 to-white py-20">
        <div className="mx-auto max-w-site px-6 lg:px-12">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-sky-200 bg-sky-50 px-5 py-2.5 shadow-sm">
              <BadgeCheck className="h-6 w-6 text-sky-500 drop-shadow-sm" strokeWidth={2.5} />
              <span className="text-sm font-bold uppercase tracking-wider text-sky-700">
                Terdaftar &amp; Diawasi OJK
              </span>
              <BadgeCheck className="h-6 w-6 text-sky-500 drop-shadow-sm" strokeWidth={2.5} />
            </div>
            <div className="mb-2 inline-flex items-center gap-2">
              <span className="h-2 w-7 rounded-full bg-red-600"></span>
              <span className="h-2 w-3 rounded-full bg-amber-400"></span>
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            </div>
            <h2 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight text-slate-900 lg:text-5xl">
              Mitra Leasing Resmi &amp; Terpercaya
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Bekerja sama dengan jaringan perusahaan pembiayaan terbesar di
              Indonesia yang telah terdaftar dan diawasi langsung oleh OJK,
              memberikan kepastian hukum dan keamanan transaksi Anda.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              {
                name: "Honda Finance",
                initial: "HF",
                desc: "Official Honda",
              },
              {
                name: "FIFGROUP",
                initial: "FIF",
                desc: "Astra Group",
              },
              {
                name: "ADIRA",
                initial: "ADR",
                desc: "MNC Leasing",
              },
              {
                name: "BFI Finance",
                initial: "BFI",
                desc: "Multi Finance",
              },
              {
                name: "WOM Finance",
                initial: "WOM",
                desc: "Since 1982",
              },
              {
                name: "SOFICO",
                initial: "SFC",
                desc: "OJK Registered",
              },
            ].map((mitra) => (
              <div
                key={mitra.name}
                className="group relative flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-amber-50 font-display text-lg font-extrabold text-red-700 ring-2 ring-red-100 transition-transform group-hover:scale-110">
                  {mitra.initial}
                </div>
                <p className="text-sm font-extrabold uppercase tracking-tight text-slate-900">
                  {mitra.name}
                </p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {mitra.desc}
                </p>
                <div className="mt-3 inline-flex items-center gap-1">
                  <BadgeCheck
                    className="h-3.5 w-3.5 text-sky-500"
                    strokeWidth={2.5}
                  />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                    OJK
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-xl lg:grid-cols-4 lg:p-10">
            <div className="lg:col-span-1 flex flex-col justify-center gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-7 w-7 text-emerald-400" />
                <p className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                  Jaminan Keamanan
                </p>
              </div>
              <h3 className="font-display text-3xl font-extrabold leading-tight">
                Aman. Terpercaya.
                <br />
                <span className="text-amber-400">Pasti Cair.</span>
              </h3>
            </div>
            {[
              {
                icon: ShieldCheck,
                title: "Terdaftar OJK",
                desc: "Legal & berizin resmi",
              },
              {
                icon: Award,
                title: "Perlindungan Data",
                desc: "Privasi terjamin aman",
              },
              {
                icon: CheckCircle2,
                title: "Kontrak Jelas",
                desc: "Transparan tanpa biaya tersembunyi",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/20">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">{title}</p>
                  <p className="mt-1 text-sm text-slate-300">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 4 LANGKAH MUDAH */}
      <section className="bg-gradient-to-br from-red-700 via-red-600 to-red-700 py-20 text-white">
        <div className="mx-auto max-w-site px-6 lg:px-12">
          <div className="mb-12 text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-red-200">
              Alur Proses
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold lg:text-5xl">
              4 Langkah Mudah Pengajuan
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ num, icon: Icon, title, desc }) => (
              <div
                key={num}
                className="relative rounded-2xl border border-red-500/30 bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <p className="font-display text-6xl font-extrabold text-red-400/60">
                    {num}
                  </p>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-red-100">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA BOTTOM */}
      <section className="mx-auto max-w-site px-6 py-20 lg:px-12">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-10 text-center shadow-sm lg:p-16">
          <h2 className="font-display text-4xl font-bold text-slate-900 lg:text-5xl">
            Butuh Konsultasi?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
            Tim Agency Honda siap membantu Anda memilih produk pembiayaan
            terbaik. Chat CS kami atau klik tombol ajukan untuk respon cepat.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/pengajuan"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-red-600 to-red-700 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg hover:from-red-700 hover:to-red-800 transition-all"
            >
              Ajukan Sekarang
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:0211500672"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-slate-800 hover:border-red-500 hover:text-red-600 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Hubungi CS
            </a>
          </div>
        </div>
      </section>

      <div className="hidden">
        <EmptyState title="" description="" />
      </div>
    </div>
  );
}
