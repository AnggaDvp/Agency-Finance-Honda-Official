"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { ComponentType } from "react";

const NILAI_PERUSAHAAN = [
  {
    icon: ShieldCheck,
    title: "Integritas Tinggi",
    desc: "Kami menjunjung tinggi kejujuran dan transparansi dalam setiap transaksi dan layanan kami.",
  },
  {
    icon: Heart,
    title: "Berorientasi Pelanggan",
    desc: "Kepuasan nasabah adalah prioritas utama kami dengan layanan personal dan responsif.",
  },
  {
    icon: Handshake,
    title: "Kolaborasi Kuat",
    desc: "Sinergi solid dengan Astra Honda Motor dan seluruh mitra untuk memberikan solusi terbaik.",
  },
  {
    icon: Award,
    title: "Inovasi & Kualitas",
    desc: "Terus berinovasi menghadirkan produk pembiayaan dengan kualitas prima dan proses cepat.",
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
  { name: "Adira Finance", tagline: "Astra Group", Logo: AdiraLogo },
  { name: "WOM Finance", tagline: "Maybank Group", Logo: WomLogo },
  { name: "BAF", tagline: "Busan Auto Finance", Logo: BafLogo },
  { name: "BFI Finance", tagline: "Multifinance Terpercaya", Logo: BfiLogo },
  { name: "Mandiri Tunas Finance", tagline: "Mandiri Group", Logo: MandiriTunasLogo },
  { name: "KreditPlus", tagline: "KB Finansia", Logo: KreditPlusLogo },
];

function StatsCarousel() {
  const [current, setCurrent] = useState(0);
  const total = STATISTIK.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 3500);
    return () => clearInterval(timer);
  }, [total]);

  const goPrev = () => setCurrent((prev) => (prev - 1 + total) % total);
  const goNext = () => setCurrent((prev) => (prev + 1) % total);

  const StatComp = STATISTIK[current];
  const IconComp = StatComp.icon;

  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="relative overflow-hidden rounded-3xl border-4 border-red-700 bg-white shadow-2xl">
        <div className="absolute left-0 top-0 h-2 w-full bg-yellow-400" />
        <div className="absolute right-0 top-0 h-full w-2 bg-red-700" />
        <div className="absolute bottom-0 left-0 h-2 w-full bg-red-700" />
        <div className="absolute left-0 top-0 h-full w-2 bg-yellow-400" />

        <button
          type="button"
          onClick={goPrev}
          className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-red-700 bg-white text-red-700 shadow-lg transition-all hover:bg-red-700 hover:text-white"
          aria-label="Previous"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div className="relative px-16 py-12 sm:py-16">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="absolute -inset-3 rounded-full bg-yellow-400/40 blur-xl" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-yellow-400 bg-gradient-to-br from-red-700 to-red-600 text-white shadow-2xl">
                <IconComp className="h-12 w-12" />
              </div>
            </div>
            <p className="font-black tracking-tight text-red-700 text-6xl sm:text-7xl">
              {StatComp.value}
            </p>
            <div className="mt-3 h-1 w-20 bg-yellow-400" />
            <p className="mt-3 font-black uppercase tracking-[0.2em] text-black text-sm sm:text-base">
              {StatComp.label}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={goNext}
          className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-red-700 bg-white text-red-700 shadow-lg transition-all hover:bg-red-700 hover:text-white"
          aria-label="Next"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        {STATISTIK.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrent(idx)}
            className={`h-3 rounded-full transition-all ${
              idx === current
                ? "w-10 bg-red-700"
                : "w-3 border-2 border-red-700 bg-white hover:bg-yellow-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function TentangKamiClient() {
  return (
    <div className="animate-fadeIn bg-white">
      <section className="relative overflow-hidden border-b-8 border-yellow-400 bg-white py-20 sm:py-24">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #DC2626 0px, #DC2626 2px, transparent 2px, transparent 20px)`,
        }} />
        <div className="absolute left-0 top-0 h-full w-3 bg-gradient-to-b from-red-700 via-yellow-400 to-red-700" />
        <div className="absolute right-0 top-0 h-full w-3 bg-gradient-to-b from-yellow-400 via-red-700 to-yellow-400" />

        <div className="relative mx-auto max-w-site px-6 lg:px-12">
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-1 flex-1 bg-red-700" />
              <span className="inline-flex items-center gap-2 border-4 border-red-700 bg-yellow-400 px-5 py-2 font-black uppercase tracking-[0.25em] text-black text-xs">
                <Building2 className="h-4 w-4" />
                Profil Perusahaan
              </span>
              <div className="h-1 flex-1 bg-red-700" />
            </div>

            <h1 className="font-black leading-none uppercase tracking-tight text-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
              Tentang
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-red-700 via-red-600 to-red-700 bg-clip-text text-transparent">
                  Agency
                </span>
                <span className="absolute -bottom-2 left-0 h-3 w-full bg-yellow-400 -z-0" />
              </span>
              <span className="text-red-700"> Finance</span>
              <span className="text-yellow-500"> Honda</span>
            </h1>

            <p className="mt-10 max-w-3xl font-semibold leading-relaxed text-black text-lg lg:text-xl">
              Dealer resmi Honda dan perusahaan pembiayaan motor terpercaya di Indonesia,
              berkomitmen menghadirkan solusi pembiayaan motor impian Anda dengan proses cepat,
              aman, dan terverifikasi OJK.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="group relative overflow-hidden border-4 border-black bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#DC2626]">
                <div className="absolute left-0 top-0 h-1 w-full bg-yellow-400" />
                <span className="font-black uppercase tracking-wider text-black text-xs">
                  Terverifikasi OJK
                </span>
              </div>
              <div className="group relative overflow-hidden border-4 border-black bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#DC2626]">
                <div className="absolute left-0 top-0 h-1 w-full bg-yellow-400" />
                <span className="font-black uppercase tracking-wider text-black text-xs">
                  Partner Resmi Astra Honda
                </span>
              </div>
              <div className="group relative overflow-hidden border-4 border-black bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#DC2626]">
                <div className="absolute left-0 top-0 h-1 w-full bg-yellow-400" />
                <span className="font-black uppercase tracking-wider text-black text-xs">
                  Proses Cepat 1x24 Jam
                </span>
              </div>
              <div className="group relative overflow-hidden border-4 border-black bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#DC2626]">
                <div className="absolute left-0 top-0 h-1 w-full bg-yellow-400" />
                <span className="inline-flex items-center gap-2 font-black uppercase tracking-wider text-black text-xs">
                  <Handshake className="h-4 w-4 text-red-700" />
                  6+ Mitra Leasing Resmi
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-white via-yellow-50/50 to-white py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6 lg:px-12">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 flex items-center gap-4 max-w-md">
              <div className="h-1 flex-1 bg-yellow-400" />
              <div className="h-3 w-3 rotate-45 bg-red-700" />
              <div className="h-1 flex-1 bg-red-700" />
            </div>
            <h2 className="font-black uppercase tracking-[0.15em] text-black text-3xl sm:text-4xl lg:text-5xl">
              Angka <span className="text-red-700">Kami</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-semibold text-black/70 text-base">
              Perjalanan kami yang telah dipercaya oleh puluhan ribu nasabah di seluruh Indonesia.
            </p>
          </div>
          <StatsCarousel />
        </div>
      </section>

      <section className="relative border-t-4 border-red-700 bg-white py-20">
        <div className="absolute left-0 top-0 h-2 w-full bg-yellow-400" />
        <div className="mx-auto max-w-site px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="relative">
              <div className="absolute -top-3 -left-3 h-full w-full border-4 border-yellow-400 rounded-none" />
              <div className="absolute -bottom-3 -right-3 h-full w-full border-4 border-red-700 rounded-none" />
              <div className="relative overflow-hidden border-4 border-black bg-white p-8 shadow-xl">
                <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-red-700 via-yellow-400 to-red-700" />
                <div className="absolute right-0 top-0 flex h-14 items-center gap-2 border-l-4 border-b-4 border-black bg-yellow-400 px-5">
                  <Award className="h-5 w-5 text-black" />
                  <span className="font-black uppercase tracking-[0.2em] text-black text-[10px]">
                    Sejak 2009
                  </span>
                </div>

                <div className="mt-16 space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center border-4 border-yellow-400 bg-red-700 text-white">
                      <Building2 className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-black uppercase text-black text-xl">
                        PT Nusantara Sakti Cendikia
                      </h3>
                      <p className="mt-1 font-bold uppercase tracking-widest text-red-700 text-xs">
                        Dealer Resmi Honda &amp; Pembiayaan
                      </p>
                    </div>
                  </div>

                  <div className="border-l-4 border-yellow-400 pl-4">
                    <p className="font-semibold leading-relaxed text-black">
                      <strong className="text-red-700 uppercase">Agency Finance Honda</strong> adalah perusahaan yang
                      bergerak di bidang dealer resmi kendaraan roda dua merek Honda dan penyedia
                      layanan pembiayaan konsumen (multifinance) motor terpercaya di Indonesia.
                    </p>
                  </div>

                  <p className="font-semibold leading-relaxed text-black/80">
                    Sebagai mitra strategis <strong className="text-red-700">Astra Honda Motor (AHM)</strong>, kami menyediakan
                    unit motor Honda terbaru dari varian bebek, matic, sport, hingga adventure dengan
                    kualitas terjamin dan garansi resmi pabrik.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="border-4 border-black p-5">
                      <div className="mb-2 h-1 w-8 bg-yellow-400" />
                      <p className="font-black uppercase tracking-widest text-red-700 text-[10px]">
                        Kantor Pusat
                      </p>
                      <p className="mt-2 font-bold text-black">Jakarta Selatan</p>
                    </div>
                    <div className="border-4 border-black p-5">
                      <div className="mb-2 h-1 w-8 bg-red-700" />
                      <p className="font-black uppercase tracking-widest text-red-700 text-[10px]">
                        Lisensi OJK
                      </p>
                      <p className="mt-2 font-bold text-black">Terverifikasi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative overflow-hidden border-4 border-black bg-white p-8 shadow-lg">
                <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-red-700 to-yellow-400" />
                <div className="absolute right-0 top-0 h-16 w-16 bg-yellow-400 -translate-y-8 translate-x-8 rotate-45" />
                <div className="relative flex gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center border-4 border-black bg-gradient-to-br from-red-700 to-red-600 text-white shadow-lg">
                    <Eye className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-black uppercase tracking-tight text-black text-2xl">
                      <span className="text-red-700">VISI</span>
                    </h3>
                    <div className="mt-2 h-1 w-16 bg-yellow-400" />
                    <p className="mt-4 font-semibold leading-relaxed text-black">
                      Menjadi{" "}
                      <strong className="text-red-700">
                        dealer resmi Honda dan perusahaan pembiayaan motor nomor satu terpercaya
                      </strong>{" "}
                      di Indonesia yang mampu memberikan solusi keuangan inklusif, cepat, dan bernilai
                      tambah bagi seluruh lapisan masyarakat.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden border-4 border-black bg-white p-8 shadow-lg">
                <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-yellow-400 to-red-700" />
                <div className="absolute right-0 top-0 h-16 w-16 bg-red-700 -translate-y-8 translate-x-8 rotate-45" />
                <div className="relative flex gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center border-4 border-black bg-gradient-to-br from-yellow-400 to-yellow-500 text-black shadow-lg">
                    <Target className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black uppercase tracking-tight text-black text-2xl">
                      <span className="text-red-700">MISI</span>
                    </h3>
                    <div className="mt-2 h-1 w-16 bg-yellow-400" />
                    <ul className="mt-4 space-y-4">
                      {MISI_LIST.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-black bg-yellow-400 text-black">
                            <span className="font-black text-xs">{idx + 1}</span>
                          </div>
                          <span className="font-semibold leading-relaxed text-black">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y-4 border-yellow-400 bg-white py-20">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `repeating-linear-gradient(-45deg, #DC2626 0px, #DC2626 2px, transparent 2px, transparent 30px)`,
        }} />
        <div className="relative mx-auto max-w-site px-6 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex items-center gap-4 max-w-sm">
              <div className="h-1 flex-1 bg-red-700" />
              <span className="inline-flex items-center gap-2 border-2 border-black bg-yellow-400 px-4 py-1.5 font-black uppercase tracking-[0.25em] text-black text-xs">
                <Award className="h-4 w-4" />
                Core Values
              </span>
              <div className="h-1 flex-1 bg-red-700" />
            </div>
            <h2 className="font-black uppercase text-black text-3xl sm:text-4xl lg:text-5xl">
              Nilai-Nilai <span className="text-red-700">Perusahaan</span>
            </h2>
            <p className="mt-4 font-semibold text-black/70">
              Empat pilar nilai yang menjadi dasar kami dalam melayani setiap nasabah.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {NILAI_PERUSAHAAN.map((item, i) => {
              const IconComp = item.icon;
              return (
                <div
                  key={i}
                  className="group relative overflow-hidden border-4 border-black bg-white p-7 transition-all duration-300 hover:-translate-y-2"
                  style={{ boxShadow: "8px 8px 0 0 #DC2626" }}
                >
                  <div className="absolute left-0 top-0 h-1.5 w-full bg-yellow-400" />
                  <div className="absolute right-0 top-0 h-4 w-4 bg-red-700" />
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center border-4 border-black bg-red-700 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-yellow-400 group-hover:text-black">
                    <IconComp className="h-8 w-8" />
                  </div>
                  <h3 className="font-black uppercase text-black text-lg">
                    {item.title}
                  </h3>
                  <div className="mt-3 h-1 w-12 bg-yellow-400" />
                  <p className="mt-4 font-semibold leading-relaxed text-black/80 text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative bg-white py-20">
        <div className="mx-auto max-w-site px-6 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-4 flex items-center gap-4 max-w-md">
              <div className="h-1 flex-1 bg-yellow-400" />
              <span className="inline-flex items-center gap-2 border-4 border-black bg-red-700 px-5 py-2 font-black uppercase tracking-[0.25em] text-white text-xs">
                <Handshake className="h-4 w-4 text-yellow-400" />
                Partner Terpercaya
              </span>
              <div className="h-1 flex-1 bg-yellow-400" />
            </div>
            <h2 className="font-black uppercase text-black text-3xl sm:text-4xl lg:text-5xl">
              Mitra <span className="text-red-700">Pembiayaan</span> Resmi
            </h2>
            <p className="mt-4 font-semibold leading-relaxed text-black/70 text-base">
              Agency Finance Honda bekerjasama dengan{" "}
              <strong className="text-black">enam perusahaan multifinance leasing terbesar</strong> dan
              terpercaya di Indonesia.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {PARTNERS.map((partner) => {
              const LogoComp = partner.Logo;
              return (
                <div
                  key={partner.name}
                  className="group relative cursor-default overflow-hidden border-4 border-black bg-white p-6 transition-all duration-300 hover:-translate-y-2"
                  style={{ boxShadow: "8px 8px 0 0 #FACC15" }}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-700 via-yellow-400 to-red-700 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="relative mb-5 flex h-16 w-full items-center justify-center">
                    <div className="absolute inset-0 flex h-full w-full items-center justify-center transition-all duration-300 grayscale group-hover:grayscale-0">
                      <LogoComp className="h-full w-full object-contain" />
                    </div>
                  </div>
                  <div className="w-full border-t-2 border-black pt-4 text-center">
                    <p className="font-black uppercase tracking-wider text-black text-xs">
                      {partner.name}
                    </p>
                    <p className="mt-1 font-bold uppercase tracking-widest text-red-700 text-[10px]">
                      {partner.tagline}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <div className="relative overflow-hidden border-4 border-black bg-white p-6 transition-all hover:-translate-y-1" style={{ boxShadow: "6px 6px 0 0 #DC2626" }}>
              <div className="absolute left-0 top-0 h-1 w-full bg-yellow-400" />
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-black bg-red-700 text-white">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-black uppercase tracking-tight text-black text-base">
                    Lebih Mudah Disetujui
                  </h3>
                  <p className="mt-2 font-semibold leading-relaxed text-black/70 text-sm">
                    Memiliki 6 mitra leasing sekaligus membuat peluang pengajuan Anda disetujui jauh lebih besar.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden border-4 border-black bg-white p-6 transition-all hover:-translate-y-1" style={{ boxShadow: "6px 6px 0 0 #FACC15" }}>
              <div className="absolute left-0 top-0 h-1 w-full bg-red-700" />
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-black bg-yellow-400 text-black">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-black uppercase tracking-tight text-black text-base">
                    Rate Bunga Kompetitif
                  </h3>
                  <p className="mt-2 font-semibold leading-relaxed text-black/70 text-sm">
                    Bandingkan penawaran dari seluruh mitra dan pilih angsuran paling ringan.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden border-4 border-black bg-white p-6 transition-all hover:-translate-y-1" style={{ boxShadow: "6px 6px 0 0 #DC2626" }}>
              <div className="absolute left-0 top-0 h-1 w-full bg-yellow-400" />
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-black bg-red-700 text-white">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-black uppercase tracking-tight text-black text-base">
                    Terdaftar &amp; Berizin OJK
                  </h3>
                  <p className="mt-2 font-semibold leading-relaxed text-black/70 text-sm">
                    Seluruh mitra pembiayaan kami adalah perusahaan resmi yang terdaftar OJK.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t-4 border-red-700 bg-white py-20">
        <div className="absolute left-0 top-0 h-2 w-full bg-yellow-400" />
        <div className="mx-auto max-w-site px-6 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-1 w-8 bg-yellow-400" />
                <span className="inline-flex items-center gap-2 border-2 border-black bg-red-700 px-4 py-1.5 font-black uppercase tracking-[0.25em] text-white text-xs">
                  <MapPin className="h-4 w-4 text-yellow-400" />
                  Kantor Pusat
                </span>
              </div>
              <h2 className="font-black uppercase text-black text-3xl sm:text-4xl lg:text-5xl">
                Hubungi <span className="text-red-700">Kami</span>
              </h2>
              <p className="mt-4 font-semibold leading-relaxed text-black/70">
                Tim Customer Service kami siap membantu Anda setiap hari kerja.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href="tel:0211500672"
                  className="group flex items-center gap-4 border-4 border-black bg-white p-4 transition-all hover:-translate-y-1"
                  style={{ boxShadow: "6px 6px 0 0 #DC2626" }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-black bg-red-700 text-white">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black uppercase tracking-widest text-red-700 text-[10px]">
                      Hotline Customer Service
                    </p>
                    <p className="mt-1 font-black text-black text-lg">
                      (021) 1500-672
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-black transition-all group-hover:translate-x-1 group-hover:text-red-700" />
                </a>

                <a
                  href="https://wa.me/6281288886720"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 border-4 border-black bg-white p-4 transition-all hover:-translate-y-1"
                  style={{ boxShadow: "6px 6px 0 0 #FACC15" }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-black bg-yellow-400 text-black">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black uppercase tracking-widest text-red-700 text-[10px]">
                      WhatsApp Resmi
                    </p>
                    <p className="mt-1 font-black text-black text-lg">
                      0812-8888-6720
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-black transition-all group-hover:translate-x-1 group-hover:text-red-700" />
                </a>

                <a
                  href="mailto:care@agencyhonda.co.id"
                  className="group flex items-center gap-4 border-4 border-black bg-white p-4 transition-all hover:-translate-y-1"
                  style={{ boxShadow: "6px 6px 0 0 #DC2626" }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-black bg-red-700 text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black uppercase tracking-widest text-red-700 text-[10px]">
                      Email Customer Care
                    </p>
                    <p className="mt-1 font-black text-black text-lg">
                      care@agencyhonda.co.id
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-black transition-all group-hover:translate-x-1 group-hover:text-red-700" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="relative overflow-hidden border-4 border-black bg-white p-8 shadow-xl">
                <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-red-700 via-yellow-400 to-red-700" />
                <div className="mb-6 flex items-center gap-4 border-b-4 border-dashed border-black pb-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center border-4 border-yellow-400 bg-red-700 text-white shadow-lg">
                    <MapPin className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="font-black uppercase tracking-widest text-red-700 text-[10px]">
                      Alamat Kantor Pusat
                    </p>
                    <h3 className="mt-1 font-black uppercase text-black text-xl">
                      Agency Finance Honda Head Office
                    </h3>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="relative overflow-hidden border-4 border-black bg-white p-5">
                    <div className="absolute left-0 top-0 h-full w-1 bg-yellow-400" />
                    <div className="flex gap-4">
                      <MapPin className="h-5 w-5 shrink-0 text-red-700" />
                      <div>
                        <p className="font-black uppercase tracking-widest text-red-700 text-[10px]">
                          Alamat Lengkap
                        </p>
                        <p className="mt-1 font-semibold leading-relaxed text-black">
                          Jl. Gatot Subroto Kav. 42-43, Kel. Kuningan Barat, Kec. Setiabudi,
                          <br />
                          Jakarta Selatan, DKI Jakarta 12950
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="relative overflow-hidden border-4 border-black bg-white p-5">
                      <div className="absolute left-0 top-0 h-full w-1 bg-yellow-400" />
                      <div className="flex gap-4">
                        <Clock className="h-5 w-5 shrink-0 text-red-700" />
                        <div>
                          <p className="font-black uppercase tracking-widest text-red-700 text-[10px]">
                            Jam Operasional
                          </p>
                          <ul className="mt-2 space-y-1.5">
                            {JADWAL_OPERASIONAL.map((j, i) => (
                              <li key={i} className="flex items-baseline justify-between font-semibold text-sm">
                                <span className="text-black">{j.hari}</span>
                                <span className="text-black/70">{j.jam}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="relative overflow-hidden border-4 border-black bg-white p-5">
                      <div className="absolute left-0 top-0 h-full w-1 bg-red-700" />
                      <div className="flex gap-4">
                        <Building2 className="h-5 w-5 shrink-0 text-red-700" />
                        <div>
                          <p className="font-black uppercase tracking-widest text-red-700 text-[10px]">
                            Cabang Kami
                          </p>
                          <p className="mt-2 font-semibold leading-relaxed text-black text-sm">
                            Tersebar di <strong className="text-red-700">35+ kota</strong> seluruh Indonesia.
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
          </div>
        </div>
      </section>

      <section className="relative bg-white py-16">
        <div className="mx-auto max-w-site px-6 lg:px-12">
          <div className="relative overflow-hidden border-4 border-black bg-red-700 p-10 text-center text-white lg:p-14" style={{ boxShadow: "12px 12px 0 0 #FACC15" }}>
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `repeating-linear-gradient(45deg, #000 0px, #000 2px, transparent 2px, transparent 25px)`,
            }} />
            <div className="absolute left-0 top-0 h-2 w-full bg-yellow-400" />
            <div className="absolute left-0 bottom-0 h-2 w-full bg-yellow-400" />
            <div className="relative">
              <h2 className="font-black uppercase leading-tight text-white text-3xl lg:text-5xl">
                Siap Memiliki Motor Honda
                <br />
                <span className="text-yellow-400">Impian Anda?</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl font-semibold text-white/90 text-lg">
                Ajukan sekarang dan dapatkan penawaran pembiayaan terbaik dari Agency Finance Honda. Proses
                cepat, mudah, dan persetujuan maksimal 1x24 jam kerja.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/#katalog"
                  className="inline-flex items-center gap-2 border-4 border-black bg-yellow-400 px-8 py-4 font-black uppercase tracking-wider text-black transition-all hover:-translate-y-1 hover:bg-yellow-300"
                  style={{ boxShadow: "6px 6px 0 0 #000" }}
                >
                  Lihat Katalog Motor
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://wa.me/6281288886720"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-4 border-yellow-400 bg-white px-8 py-4 font-black uppercase tracking-wider text-red-700 transition-all hover:-translate-y-1"
                  style={{ boxShadow: "6px 6px 0 0 #000" }}
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat WhatsApp CS
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
