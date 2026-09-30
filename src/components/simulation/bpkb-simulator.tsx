"use client";

import { useMemo, useState } from "react";
import { formatRupiah } from "@/lib/utils/format";
import { CheckCircle2, Calculator, Info, ChevronDown } from "lucide-react";

type Skema = "NORMAL" | "FLASH" | "PREMIUM";
type PajakStatus = "hidup" | "mati";

const MIN_PENCAIRAN = 5_000_000;
const MAX_PENCAIRAN = 50_000_000;
const STEP_PENCAIRAN = 500_000;
const MIN_TAHUN = 2013;
const MAX_TAHUN = 2026;
const DEFAULT_PENCAIRAN = 12_000_000;
const DEFAULT_TAHUN = 2022;
const DEFAULT_SKEMA: Skema = "NORMAL";
const DEFAULT_TENOR = 12;
const DEFAULT_PAJAK: PajakStatus = "hidup";
const PAJAK_MATI_MULTIPLIER = 1.25;

const BASE_INSTALLMENT_TABLE: Record<number, number> = {
  6: 2_549_000,
  7: 2_239_000,
  8: 2_007_000,
  9: 1_826_000,
  10: 1_682_000,
  11: 1_544_000,
  12: 1_446_000,
  13: 1_367_000,
  14: 1_296_000,
  15: 1_234_000,
  16: 1_180_000,
  17: 1_132_000,
  18: 1_086_000,
  19: 1_048_000,
  20: 1_013_000,
  21: 983_000,
  22: 955_000,
  23: 929_000,
  24: 907_000,
  25: 888_000,
  26: 868_000,
  27: 850_000,
  28: 833_000,
  29: 817_000,
  30: 802_000,
  31: 790_000,
  32: 777_000,
  33: 765_000,
  34: 753_000,
  35: 723_000,
  36: 713_000,
};

const ALL_TENORS = Object.keys(BASE_INSTALLMENT_TABLE)
  .map(Number)
  .sort((a, b) => a - b);

const SKEMA_OPTIONS: { value: Skema; label: string; desc: string; adjust: number }[] = [
  {
    value: "NORMAL",
    label: "NORMAL",
    desc: "",
    adjust: 1,
  },
  {
    value: "FLASH",
    label: "FLASH",
    desc: "Pencairan kilat 24 jam • Usia ≤ 7 tahun • Premium +5%",
    adjust: 1.05,
  },
  {
    value: "PREMIUM",
    label: "PREMIUM",
    desc: "Bunga lebih ringan • Plafon besar • -5% angsuran",
    adjust: 0.95,
  },
];

function calculateInstallment(
  tenor: number,
  pencairan: number,
  tahun: number,
  skema: Skema,
  pajak: PajakStatus,
): number {
  const base = BASE_INSTALLMENT_TABLE[tenor] ?? BASE_INSTALLMENT_TABLE[12];
  const pencairanFactor = pencairan / DEFAULT_PENCAIRAN;
  const selisihTahun = DEFAULT_TAHUN - tahun;
  const tahunFactor = 1 + Math.max(0, selisihTahun) * 0.01;
  const skemaObj = SKEMA_OPTIONS.find((s) => s.value === skema) ?? SKEMA_OPTIONS[0];
  const pajakFactor = pajak === "mati" ? PAJAK_MATI_MULTIPLIER : 1;
  const total = base * pencairanFactor * tahunFactor * skemaObj.adjust * pajakFactor;
  return Math.round(total / 1000) * 1000;
}

export function BpkbSimulator() {
  const [pencairan, setPencairan] = useState<number>(DEFAULT_PENCAIRAN);
  const [tahun, setTahun] = useState<number>(DEFAULT_TAHUN);
  const [skema] = useState<Skema>(DEFAULT_SKEMA);
  const [pajak, setPajak] = useState<PajakStatus>(DEFAULT_PAJAK);
  const [tenor, setTenor] = useState<number>(DEFAULT_TENOR);

  const daftarPencairan = useMemo(() => {
    const list: number[] = [];
    for (let v = MIN_PENCAIRAN; v <= MAX_PENCAIRAN; v += STEP_PENCAIRAN) list.push(v);
    return list;
  }, []);

  const daftarTahun = useMemo(() => {
    const list: number[] = [];
    for (let t = MAX_TAHUN; t >= MIN_TAHUN; t--) list.push(t);
    return list;
  }, []);

  const selectedInstallment = useMemo(
    () => calculateInstallment(tenor, pencairan, tahun, skema, pajak),
    [tenor, pencairan, tahun, skema, pajak],
  );

  const allRows = useMemo(() => {
    return ALL_TENORS.map((t) => ({
      tenor: t,
      installment: calculateInstallment(t, pencairan, tahun, skema, pajak),
    }));
  }, [pencairan, tahun, skema, pajak]);

  const col1 = allRows.slice(0, Math.ceil(allRows.length / 2));
  const col2 = allRows.slice(Math.ceil(allRows.length / 2));

  void SKEMA_OPTIONS;

  const handleIncrementPencairan = () =>
    setPencairan((prev) => Math.min(prev + STEP_PENCAIRAN, MAX_PENCAIRAN));
  const handleDecrementPencairan = () =>
    setPencairan((prev) => Math.max(prev - STEP_PENCAIRAN, MIN_PENCAIRAN));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-red-500 text-white shadow-md shadow-red-200">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-slate-900">
            Kalkulator Angsuran
          </h3>
          <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Gadai BPKB Motor • Real-time Calculation
          </p>
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-50 p-6 ring-1 ring-slate-100">
        {/* PENCAIRAN */}
        <div>
          <label className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-600">
              Pencairan
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Kelipatan Rp 500.000
            </span>
          </label>
          <div className="flex items-stretch gap-2">
            <button
              type="button"
              onClick={handleDecrementPencairan}
              disabled={pencairan <= MIN_PENCAIRAN}
              className="flex w-12 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white text-xl font-bold text-slate-700 transition-colors hover:border-red-500 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-300 disabled:hover:bg-white disabled:hover:text-slate-700"
            >
              −
            </button>
            <div className="relative flex-1">
              <select
                value={pencairan}
                onChange={(e) => setPencairan(Number(e.target.value))}
                className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white pl-4 pr-10 font-display text-lg font-bold text-slate-900 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              >
                {daftarPencairan.map((v) => (
                  <option key={v} value={v}>
                    {formatRupiah(v)}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            </div>
            <button
              type="button"
              onClick={handleIncrementPencairan}
              disabled={pencairan >= MAX_PENCAIRAN}
              className="flex w-12 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white text-xl font-bold text-slate-700 transition-colors hover:border-red-500 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-300 disabled:hover:bg-white disabled:hover:text-slate-700"
            >
              +
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* TAHUN MOTOR */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-600">
              Tahun Motor
            </label>
            <div className="relative">
              <select
                value={tahun}
                onChange={(e) => setTahun(Number(e.target.value))}
                className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white pl-4 pr-10 font-display text-lg font-bold text-slate-900 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              >
                {daftarTahun.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            </div>
            <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Min. tahun {MIN_TAHUN}
            </p>
          </div>

          {/* PAJAK */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-600">
              Status Pajak
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPajak("hidup")}
                className={`h-12 rounded-xl border font-display text-sm font-bold uppercase tracking-wider transition-all ${
                  pajak === "hidup"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm ring-2 ring-emerald-500/30"
                    : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                Hidup
              </button>
              <button
                type="button"
                onClick={() => setPajak("mati")}
                className={`h-12 rounded-xl border font-display text-sm font-bold uppercase tracking-wider transition-all ${
                  pajak === "mati"
                    ? "border-red-500 bg-red-50 text-red-700 shadow-sm ring-2 ring-red-500/30"
                    : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                Mati
              </button>
            </div>
            <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              {pajak === "mati" ? `Kenaikan +${Math.round((PAJAK_MATI_MULTIPLIER - 1) * 100)}% angsuran` : "Angsuran normal"}
            </p>
          </div>
        </div>

        {/* TENOR */}
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-600">
            Tenor
          </label>
          <div className="relative">
            <select
              value={tenor}
              onChange={(e) => setTenor(Number(e.target.value))}
              className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white pl-4 pr-10 font-display text-lg font-bold text-slate-900 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            >
              {ALL_TENORS.map((t) => (
                <option key={t} value={t}>
                  {t} Bulan
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* HASIL TENOR DIPILIH */}
        <div className="mt-2 overflow-hidden rounded-2xl border border-red-200 bg-gradient-to-br from-red-600 via-red-600 to-red-700 p-5 shadow-lg shadow-red-200">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-red-100">
                Angsuran Tenor Dipilih
                {pajak === "mati" && <span className="ml-2 rounded bg-red-200/40 px-2 py-0.5 text-red-50">Pajak Mati</span>}
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-white lg:text-4xl">
                  {formatRupiah(selectedInstallment)}
                </span>
                <span className="text-xs font-bold uppercase text-red-200">
                  / {tenor} bulan
                </span>
              </div>
            </div>
            <div className="hidden shrink-0 flex-col items-center gap-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center backdrop-blur sm:flex">
              <CheckCircle2 className="h-6 w-6 text-emerald-300" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                Hasil Otomatis
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* TABEL TENOR */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-slate-400" />
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
            Daftar Seluruh Tenor &amp; Estimasi Angsuran
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Header Table */}
          <div className="grid grid-cols-2 border-b border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
            <div className="grid grid-cols-2 border-r border-slate-700/50">
              <div className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-slate-300">
                Tenor
              </div>
              <div className="px-5 py-3.5 text-right text-[11px] font-bold uppercase tracking-widest text-slate-300">
                Angsuran
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-slate-300">
                Tenor
              </div>
              <div className="px-5 py-3.5 text-right text-[11px] font-bold uppercase tracking-widest text-slate-300">
                Angsuran
              </div>
            </div>
          </div>

          {/* Rows */}
          {col1.map((rowLeft, idx) => {
            const rowRight = col2[idx];
            const leftActive = rowLeft.tenor === tenor;
            const rightActive = rowRight?.tenor === tenor;
            return (
              <div
                key={rowLeft.tenor}
                className="grid grid-cols-2 border-b border-slate-100 last:border-b-0 text-sm hover:bg-slate-50 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setTenor(rowLeft.tenor)}
                  className={`grid grid-cols-2 border-r border-slate-100 text-left transition-colors ${
                    leftActive ? "bg-red-50 ring-2 ring-inset ring-red-500/30" : ""
                  }`}
                >
                  <div
                    className={`px-5 py-3.5 font-display font-bold ${
                      leftActive ? "text-red-700" : "text-slate-800"
                    }`}
                  >
                    {rowLeft.tenor}
                    <span className="ml-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                      bln
                    </span>
                  </div>
                  <div
                    className={`px-5 py-3.5 text-right font-display font-bold ${
                      leftActive ? "text-red-600" : "text-slate-900"
                    }`}
                  >
                    {formatRupiah(rowLeft.installment)}
                  </div>
                </button>

                {rowRight ? (
                  <button
                    type="button"
                    onClick={() => setTenor(rowRight.tenor)}
                    className={`grid grid-cols-2 text-left transition-colors ${
                      rightActive ? "bg-red-50 ring-2 ring-inset ring-red-500/30" : ""
                    }`}
                  >
                    <div
                      className={`px-5 py-3.5 font-display font-bold ${
                        rightActive ? "text-red-700" : "text-slate-800"
                      }`}
                    >
                      {rowRight.tenor}
                      <span className="ml-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                        bln
                      </span>
                    </div>
                    <div
                      className={`px-5 py-3.5 text-right font-display font-bold ${
                        rightActive ? "text-red-600" : "text-slate-900"
                      }`}
                    >
                      {formatRupiah(rowRight.installment)}
                    </div>
                  </button>
                ) : (
                  <div className="px-5 py-3.5 text-slate-300"></div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900/90">
          <span className="inline-flex items-start gap-2 font-semibold">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            Catatan:
          </span>
          <span className="leading-relaxed">
            Hasil bersifat estimasi berdasarkan pencairan{" "}
            <strong>{formatRupiah(pencairan)}</strong>, motor tahun{" "}
            <strong>{tahun}</strong>, dan status pajak <strong>{pajak.toUpperCase()}</strong>
            {pajak === "mati" && ` (kenaikan +${Math.round((PAJAK_MATI_MULTIPLIER - 1) * 100)}%)`}
            . Angsuran aktual dapat berbeda setelah survey &amp; verifikasi dokumen.
          </span>
        </div>
      </div>
    </div>
  );
}
