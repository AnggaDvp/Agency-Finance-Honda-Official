import Link from "next/link";
import { formatRupiah } from "@/lib/utils/format";
import type { Motorcycle } from "@/types/motorcycle";
import type { MotorcycleRate } from "@/types/rate-card";

export function MotorcycleCard({
  motorcycle,
  startingRate,
}: {
  motorcycle: Motorcycle;
  startingRate: MotorcycleRate | null;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex aspect-[4/3] items-center justify-center bg-slate-100 p-6">
        <p className="font-display text-3xl uppercase text-slate-400">{motorcycle.model}</p>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl uppercase">{motorcycle.brand} {motorcycle.model}</h3>
        <p className="mt-1 text-sm text-slate-600">Harga OTR mulai {formatRupiah(Number(motorcycle.otr_price))}</p>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          {startingRate ? (
            <div className="flex justify-between">
              <div>
                <p className="text-xs uppercase text-slate-500">DP mulai</p>
                <p className="font-semibold">{formatRupiah(Number(startingRate.dp))}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase text-red-600">Cicilan mulai</p>
                <p className="text-xl font-bold text-red-600">{formatRupiah(Number(startingRate.installment))}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500">Data angsuran belum tersedia.</p>
          )}
        </div>
        <Link href={`/motor/${motorcycle.slug}`} className="mt-4 inline-flex justify-center rounded-lg bg-slate-100 py-3 text-xs font-bold uppercase tracking-wider hover:bg-red-600 hover:text-white">
          Lihat & Ajukan
        </Link>
      </div>
    </article>
  );
}
