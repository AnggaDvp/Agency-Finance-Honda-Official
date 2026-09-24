"use client";

import Image from "next/image";
import Link from "next/link";
import { formatRupiah } from "@/lib/utils/format";
import type { Motorcycle } from "@/types/motorcycle";
import type { MotorcycleRate } from "@/types/rate-card";
import { ArrowRight, ExternalLink, Zap, Droplets, ShieldCheck, CheckCircle2, BadgePercent } from "lucide-react";

export function MotorcycleCard({
  motorcycle,
  startingRate,
}: {
  motorcycle: Motorcycle;
  startingRate: MotorcycleRate | null;
}) {
  const isVario =
    motorcycle.model.toLowerCase().includes("vario") ||
    motorcycle.slug.toLowerCase().includes("vario");

  const ASTRA_HONDA_URL = "https://www.astra-honda.com/product/vario-evo-160";

  const ccMatch = motorcycle.model.match(/(\d+)\s*(cc)?/i);
  const ccBadge = ccMatch ? `${ccMatch[1]} CC` : null;
  const yearBadge = motorcycle.year ? `${motorcycle.year}` : null;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-red-200">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-white">
        {motorcycle.image_url ? (
          <Image
            src={motorcycle.image_url}
            alt={`${motorcycle.brand} ${motorcycle.model}`}
            fill
            priority={false}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="font-display text-3xl uppercase text-slate-400">{motorcycle.model}</p>
          </div>
        )}

        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {ccBadge && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
              <Zap className="h-3 w-3 text-yellow-400" />
              {ccBadge}
            </span>
          )}
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            <CheckCircle2 className="h-3 w-3" />
            Ready Stock
          </span>
          {motorcycle.promo_active && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
              <BadgePercent className="h-3 w-3" />
              Promo
            </span>
          )}
        </div>

        {yearBadge && (
          <div className="absolute bottom-4 right-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-800 shadow-md backdrop-blur-sm ring-1 ring-slate-200">
            {yearBadge}
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-widest text-red-600">
              {motorcycle.brand}
            </p>
            <h3 className="mt-0.5 font-display text-xl font-bold uppercase leading-tight text-slate-900 line-clamp-1">
              {motorcycle.model}
            </h3>
            {motorcycle.variant && (
              <p className="mt-0.5 text-xs font-semibold text-slate-500">{motorcycle.variant}</p>
            )}
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            OTR mulai
          </span>
          <span className="font-display text-lg font-bold text-slate-900">
            {formatRupiah(Number(motorcycle.otr_price))}
          </span>
        </div>

        {startingRate ? (
          <div className="mt-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 ring-1 ring-slate-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative pl-3">
                <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-slate-300" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  DP Mulai
                </p>
                <p className="mt-0.5 font-display text-sm font-bold text-slate-800">
                  {formatRupiah(Number(startingRate.dp))}
                </p>
              </div>
              <div className="relative pl-3">
                <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-red-600" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-red-600">
                  Cicilan Mulai
                </p>
                <p className="mt-0.5 font-display text-sm font-bold text-red-600">
                  {formatRupiah(Number(startingRate.installment))}
                  <span className="ml-1 text-[10px] font-semibold text-red-500">/bln</span>
                </p>
              </div>
            </div>
            <p className="mt-3 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Tenor {startingRate.tenor} bulan • Bunga {startingRate.interest_rate}%
            </p>
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-xs font-medium text-slate-500">Data angsuran segera hadir</p>
          </div>
        )}

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center gap-1 rounded-lg bg-slate-50 px-2 py-2 ring-1 ring-slate-100">
            <Droplets className="h-4 w-4 text-slate-600" />
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
              {motorcycle.fuel_capacity_l ? `${motorcycle.fuel_capacity_l}L` : "—"}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-lg bg-slate-50 px-2 py-2 ring-1 ring-slate-100">
            <Zap className="h-4 w-4 text-slate-600" />
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
              {motorcycle.power_torque || "eSAF"}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-lg bg-slate-50 px-2 py-2 ring-1 ring-slate-100">
            <ShieldCheck className="h-4 w-4 text-slate-600" />
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
              {motorcycle.braking_system || "CBS"}
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <Link
            href={`/motor/${motorcycle.slug}`}
            className="group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-200 hover:bg-red-600 hover:shadow-lg hover:shadow-red-600/25"
          >
            Ajukan Kredit Unit
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Link>

          {isVario && (
            <a
              href={ASTRA_HONDA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white hover:border-red-600"
            >
              Lihat di Astra Honda
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
