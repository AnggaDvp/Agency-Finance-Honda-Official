import Link from "next/link";
import {
  Building2,
  Target,
  Eye,
  Heart,
  ShieldCheck,
  Handshake,
  Award,
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import type { ComponentType } from "react";

export const metadata = {
  title: "Tentang Kami | NSC Finance - Dealer Resmi Honda",
  description:
    "Profil NSC Finance, dealer resmi Honda dan penyedia layanan pembiayaan motor terpercaya dengan jaringan mitra leasing multifinance seluruh Indonesia.",
};

const NILAI_PERUSAHAAN = [
  {
    icon: ShieldCheck,
    title: "Integritas Tinggi",
    desc: "Kami menjunjung tinggi kejujuran dan transparansi dalam setiap transaksi dan layanan kami.",
    color: "from-blue-600 to-blue-500",
  },
  {
    icon: Heart,
    title: "Berorientasi Pelanggan",
    desc: "Kepuasan nasabah adalah prioritas utama kami dengan layanan personal dan responsif.",
    color: "from-red-600 to-red-500",
  },
  {
    icon: Handshake,
    title: "Kolaborasi Kuat",
    desc: "Sinergi solid dengan Astra Honda Motor dan seluruh mitra untuk memberikan solusi terbaik.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Award,
    title: "Inovasi & Kualitas",
    desc: "Terus berinovasi menghadirkan produk pembiayaan dengan kualitas prima dan proses cepat.",
    color: "from-emerald-600 to-emerald-500",
  },
];

const STATISTIK = [
  { value: "15+", label: "Tahun Pengalaman", icon: TrendingUp },
  { value: "50.000+", label: "Nasabah Aktif", icon: Users },
  { value: "35+", label: "Cabang Nasional", icon: MapPin },
  { value: "98%", label: "Tingkat Kepuasan", icon: CheckCircle2 },
];

const JADWAL_OPERASIONAL = [
  { hari: "Senin - Jumat", jam: "08.00 - 17.00 WIB" },
  { hari: "Sabtu", jam: "08.00 - 15.00 WIB" },
  { hari: "Minggu & Libur Nasional", jam: "Tutup" },
];

const MISI_LIST = [
  "Menyediakan unit motor Honda berkualitas resmi dengan harga kompetitif",
  "Menghadirkan produk pembiayaan dengan bunga ringan dan tenor fleksibel",
  "Memperluas jaringan layanan hingga ke seluruh wilayah Indonesia",
  "Mengedepankan layanan pelanggan prima, responsif, dan profesional",
  "Berkontribusi positif bagi perekonomian dan kesejahteraan masyarakat",
];

type PartnerLogoProps = { className?: string };

function AdiraLogo({ className = "" }: PartnerLogoProps) {
  return (
    <svg viewBox="0 0 200 60" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Adira Finance">
      <text x="0" y="42" fontFamily="Arial Black, sans-serif" fontSize="42" fontWeight="900" fill="#003399">
        ADIRA
      </text>
      <text x="0" y="57" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="800" fill="#E30613" letterSpacing="1">
        Astra Group
      </text>
    </svg>
  );
}

function WomLogo({ className = "" }: PartnerLogoProps) {
  return (
    <svg viewBox="0 0 200 60" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="WOM Finance">
      <rect x="0" y="6" width="68" height="48" rx="4" fill="#FFD100" />
      <text x="6" y="42" fontFamily="Arial Black, sans-serif" fontSize="30" fontWeight="900" fill="#002F6C">
        WOM
      </text>
      <text x="76" y="30" fontFamily="Arial Black, sans-serif" fontSize="20" fontWeight="900" fill="#002F6C">
        FINANCE
      </text>
      <text x="76" y="48" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="700" fill="#00A74C">
        Maybank Group
      </text>
    </svg>
  );
}

function BafLogo({ className = "" }: PartnerLogoProps) {
  return (
    <svg viewBox="0 0 200 60" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="BAF">
      <defs>
        <clipPath id="baf-a-slice">
          <rect x="88" y="8" width="36" height="44" />
        </clipPath>
      </defs>
      <text x="0" y="46" fontFamily="Arial Black, sans-serif" fontSize="46" fontWeight="900" fill="#002B7F">
        B
        <tspan>A</tspan>
        <tspan>F</tspan>
      </text>
      <g clipPath="url(#baf-a-slice)">
        <polygon points="88,8 124,8 88,52" fill="#F5B800" />
      </g>
      <text x="92" y="46" fontFamily="Arial Black, sans-serif" fontSize="46" fontWeight="900" fill="#F5B800" opacity="0">A</text>
    </svg>
  );
}

function BfiLogo({ className = "" }: PartnerLogoProps) {
  return (
    <svg viewBox="0 0 200 60" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="BFI Finance">
      <rect x="30" y="4" width="130" height="40" rx="2" fill="#004A99" />
      <text x="42" y="35" fontFamily="Georgia, serif" fontSize="30" fontWeight="700" fill="#FFFFFF" letterSpacing="6">
        BFI
      </text>
      <text x="42" y="57" fontFamily="Arial Black, sans-serif" fontSize="14" fontWeight="900" fill="#0A0A0A" letterSpacing="3">
        FINANCE
      </text>
    </svg>
  );
}

function MandiriTunasLogo({ className = "" }: PartnerLogoProps) {
  return (
    <svg viewBox="0 0 200 60" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Mandiri Tunas Finance">
      <path
        d="M 50 10 Q 58 2 66 10 Q 74 2 82 10 Q 90 2 98 10 L 100 14 L 50 14 Z"
        fill="#FFB612"
      />
      <text x="10" y="40" fontFamily="Arial, sans-serif" fontSize="26" fontWeight="800" fill="#003399">
        mandiri
      </text>
      <text x="10" y="58" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="500" fill="#003399" fontStyle="italic">
        tunas finance
      </text>
    </svg>
  );
}

function KreditPlusLogo({ className = "" }: PartnerLogoProps) {
  return (
    <svg viewBox="0 0 200 60" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="KreditPlus">
      <text x="0" y="42" fontFamily="Arial Black, sans-serif" fontSize="36" fontWeight="900" fill="#00A3E0">
        kredit
      </text>
      <text x="108" y="42" fontFamily="Arial Black, sans-serif" fontSize="36" fontWeight="900" fill="#E30613">
        plus
      </text>
      <g fill="#E30613">
        <circle cx="182" cy="14" r="5" />
        <circle cx="192" cy="22" r="5" />
        <circle cx="180" cy="30" r="5" />
        <circle cx="190" cy="38" r="5" />
      </g>
    </svg>
  );
}

const PARTNERS: { name: string; tagline: string; Logo: ComponentType<PartnerLogoProps> }[] = [
  {
    name: "Adira Finance",
    tagline: "Astra Group",
    Logo: AdiraLogo,
  },
  {
    name: "WOM Finance",
    tagline: "Maybank Group",
    Logo: WomLogo,
  },
  {
    name: "BAF",
    tagline: "Busan Auto Finance",
    Logo: BafLogo,
  },
  {
    name: "BFI Finance",
    tagline: "Multifinance Terpercaya",
    Logo: BfiLogo,
  },
  {
    name: "Mandiri Tunas Finance",
    tagline: "Mandiri Group",
    Logo: MandiriTunasLogo,
  },
  {
    name: "KreditPlus",
    tagline: "KB Finansia",
    Logo: KreditPlusLogo,
  },
];

export default function TentangKamiPage() {
  return (
    <div className="animate-fadeIn">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-red-600/10 blur-3xl" />
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-site px-6 lg:px-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              <Building2 className="h-3.5 w-3.5 text-red-400" />
              Profil Perusahaan
            </span>

            <h1 className="mt-6 font-display text-4xl font-bold leading-tight lg:text-6xl">
              Tentang{" "}
              <span className="bg-gradient-to-r from-red-400 via-red-500 to-orange-400 bg-clip-text text-transparent">
                NSC Finance
              </span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300 lg:text-xl">
              Dealer resmi Honda dan perusahaan pembiayaan motor terpercaya di Indonesia,
              berkomitmen menghadirkan solusi pembiayaan motor impian Anda dengan proses cepat,
              aman, dan terverifikasi OJK.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                Terverifikasi OJK
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                Partner Resmi Astra Honda
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                Proses Cepat 1x24 Jam
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                <Handshake className="h-3.5 w-3.5 text-amber-300" />
                6+ Mitra Leasing Resmi
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTIK */}
      <section className="mx-auto max-w-site -mt-10 px-6 lg:px-12">
        <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl lg:grid-cols-4 lg:p-8">
          {STATISTIK.map((stat, i) => {
            const IconComp = stat.icon;
            return (
              <div
                key={i}
                className="relative flex items-center gap-4 p-4 lg:flex-col lg:items-start lg:text-center"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-red-500 text-white shadow-lg shadow-red-200">
                  <IconComp className="h-7 w-7" />
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-slate-900 lg:text-4xl">
                    {stat.value}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 lg:mt-1">
                    {stat.label}
                  </p>
                </div>
                {i < STATISTIK.length - 1 && (
                  <div className="absolute right-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-slate-200 lg:block" />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* PROFILE + VISI MISI */}
      <section className="mx-auto max-w-site px-6 py-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* KIRI: PROFILE CARD */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-red-600/20 via-transparent to-amber-500/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
              <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5">
                <Award className="h-4 w-4 text-red-600" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-red-700">
                  Sejak 2009
                </span>
              </div>

              <div className="mt-12 space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-900">
                      PT Nusantara Sakti Cendikia
                    </h3>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-slate-500">
                      Dealer Resmi Honda &amp; Pembiayaan
                    </p>
                  </div>
                </div>

                <p className="leading-relaxed text-slate-700">
                  <strong className="text-slate-900">NSC Finance</strong> adalah perusahaan yang
                  bergerak di bidang dealer resmi kendaraan roda dua merek Honda dan penyedia
                  layanan pembiayaan konsumen (multifinance) motor terpercaya di Indonesia. Kami
                  hadir untuk memudahkan setiap individu memiliki motor impian dengan skema
                  pembiayaan yang fleksibel, aman, dan terjangkau.
                </p>

                <p className="leading-relaxed text-slate-700">
                  Sebagai mitra strategis <strong>Astra Honda Motor (AHM)</strong>, kami menyediakan
                  unit motor Honda terbaru dari varian bebek, matic, sport, hingga adventure dengan
                  kualitas terjamin dan garansi resmi pabrik. Didukung oleh tim profesional
                  berpengalaman dan jaringan cabang yang luas di seluruh Indonesia.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                      Kantor Pusat
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">Jakarta Selatan</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                      Lisensi OJK
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">Terverifikasi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KANAN: VISI MISI */}
          <div className="space-y-10">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-red-600/10 to-transparent blur-2xl" />
              <div className="relative flex gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-red-500 text-white shadow-lg shadow-red-200">
                  <Eye className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-slate-900">
                    Visi
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-700">
                    Menjadi{" "}
                    <strong>
                      dealer resmi Honda dan perusahaan pembiayaan motor nomor satu terpercaya
                    </strong>{" "}
                    di Indonesia yang mampu memberikan solusi keuangan inklusif, cepat, dan bernilai
                    tambah bagi seluruh lapisan masyarakat.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-amber-500/10 to-transparent blur-2xl" />
              <div className="relative flex gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-200">
                  <Target className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-slate-900">
                    Misi
                  </h3>
                  <ul className="mt-3 space-y-3">
                    {MISI_LIST.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                        <span className="leading-relaxed text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NILAI PERUSAHAAN */}
      <section className="border-y border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-50 py-20">
        <div className="mx-auto max-w-site px-6 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-red-700">
              <Award className="h-3.5 w-3.5" />
              Core Values
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase text-slate-900 lg:text-4xl">
              Nilai-Nilai Perusahaan
            </h2>
            <p className="mt-4 text-slate-600">
              Empat pilar nilai yang menjadi dasar kami dalam melayani setiap nasabah dan menjalankan
              bisnis.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {NILAI_PERUSAHAAN.map((item, i) => {
              const IconComp = item.icon;
              const topBarClass = `absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.color}`;
              const iconWrapClass = `mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`;
              return (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className={topBarClass} />
                  <div className={iconWrapClass}>
                    <IconComp className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MITRA PEMBIAYAAN */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-site px-6 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
              <Handshake className="h-3.5 w-3.5 text-amber-300" />
              Partner Terpercaya
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase text-slate-900 lg:text-4xl">
              Mitra Pembiayaan Resmi
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              NSC Finance bekerjasama dengan{" "}
              <strong className="text-slate-900">enam perusahaan multifinance leasing terbesar</strong> dan
              terpercaya di Indonesia untuk memastikan pengajuan Anda mendapatkan persetujuan tercepat
              dengan skema bunga terbaik dan fleksibel.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {PARTNERS.map((partner) => {
              const LogoComp = partner.Logo;
              return (
                <div
                  key={partner.name}
                  className="group relative flex cursor-default flex-col items-center justify-center rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-white px-4 py-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-xl hover:shadow-red-100/60"
                >
                  <div className="relative mb-5 flex h-16 w-full items-center justify-center transition-all duration-300">
                    <div className="absolute inset-0 flex h-full w-full items-center justify-center grayscale transition-all duration-300 group-hover:grayscale-0">
                      <LogoComp className="h-full w-full object-contain" />
                    </div>
                  </div>
                  <div className="w-full border-t border-slate-100 pt-4 text-center">
                    <p className="font-display text-sm font-bold uppercase tracking-wider text-slate-900">
                      {partner.name}
                    </p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                      {partner.tagline}
                    </p>
                  </div>
                  <div className="absolute inset-x-0 top-0 h-1 scale-x-0 rounded-t-2xl bg-gradient-to-r from-red-600 to-amber-500 transition-transform duration-300 group-hover:scale-x-100" />
                </div>
              );
            })}
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-200">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold uppercase tracking-tight text-slate-900">
                  Lebih Mudah Disetujui
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Memiliki 6 mitra leasing sekaligus membuat peluang pengajuan Anda disetujui jauh lebih
                  besar dan cepat.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-200">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold uppercase tracking-tight text-slate-900">
                  Rate Bunga Kompetitif
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Bandingkan penawaran dari seluruh mitra secara real-time dan pilih angsuran paling ringan
                  untuk Anda.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold uppercase tracking-tight text-slate-900">
                  Terdaftar &amp; Berizin OJK
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Seluruh mitra pembiayaan kami adalah perusahaan multifinance resmi yang terdaftar dan
                  diawasi oleh OJK.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KONTAK */}
      <section className="mx-auto max-w-site px-6 py-20 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
              <MapPin className="h-3.5 w-3.5 text-red-400" />
              Kantor Pusat
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase text-slate-900 lg:text-4xl">
              Hubungi Kami
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              Tim Customer Service kami siap membantu Anda setiap hari kerja. Kunjungi kantor cabang
              terdekat atau hubungi kontak di bawah untuk pelayanan cepat.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="tel:0211500672"
                className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-red-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-200">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Hotline Customer Service
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-slate-900">
                    (021) 1500-672
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-red-600" />
              </a>

              <a
                href="https://wa.me/6281288886720"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-200">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    WhatsApp Resmi
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-slate-900">
                    0812-8888-6720
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-emerald-600" />
              </a>

              <a
                href="mailto:care@agencyhonda.co.id"
                className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Email Customer Care
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-slate-900">
                    care@agencyhonda.co.id
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-blue-600" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
              <div className="mb-6 flex items-center gap-4 border-b border-slate-100 pb-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg">
                  <MapPin className="h-7 w-7 text-red-400" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Alamat Kantor Pusat
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold text-slate-900">
                    NSC Finance Head Office
                  </h3>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex gap-4 rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200">
                  <MapPin className="h-5 w-5 shrink-0 text-red-600" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Alamat Lengkap
                    </p>
                    <p className="mt-1 leading-relaxed text-slate-800">
                      Jl. Gatot Subroto Kav. 42-43, Kel. Kuningan Barat, Kec. Setiabudi,
                      <br />
                      Jakarta Selatan, DKI Jakarta 12950
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex gap-4 rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200">
                    <Clock className="h-5 w-5 shrink-0 text-amber-600" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        Jam Operasional
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {JADWAL_OPERASIONAL.map((j, i) => (
                          <li key={i} className="flex items-baseline justify-between text-sm">
                            <span className="font-semibold text-slate-800">{j.hari}</span>
                            <span className="text-slate-600">{j.jam}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4 rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200">
                    <Building2 className="h-5 w-5 shrink-0 text-slate-700" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        Cabang Kami
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-800">
                        Tersebar di <strong>35+ kota</strong> seluruh Indonesia.
                        <br />
                        Jakarta, Bogor, Depok, Tangerang, Bekasi,
                        <br />
                        Bandung, Surabaya, Medan, Makassar, dll.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAWAH */}
      <section className="bg-gradient-to-br from-red-700 via-red-600 to-red-700 py-16 text-white">
        <div className="mx-auto max-w-site px-6 lg:px-12">
          <div className="rounded-3xl border border-white/20 bg-white/5 p-10 backdrop-blur-sm text-center lg:p-14">
            <h2 className="font-display text-3xl font-bold lg:text-4xl">
              Siap Memiliki Motor Honda Impian Anda?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-red-100">
              Ajukan sekarang dan dapatkan penawaran pembiayaan terbaik dari NSC Finance. Proses
              cepat, mudah, dan persetujuan maksimal 1x24 jam kerja.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#katalog"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-red-600 transition-colors hover:bg-red-50"
              >
                Lihat Katalog Motor
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/6281288886720"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/20"
              >
                <MessageCircle className="h-4 w-4" />
                Chat WhatsApp CS
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
