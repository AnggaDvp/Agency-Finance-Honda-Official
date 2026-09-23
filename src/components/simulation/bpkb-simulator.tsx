"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { formatRupiah } from "@/lib/utils/format";
import type { BpkbProduct, BpkbRate } from "@/types/rate-card";

export function BpkbSimulator({ products }: { products: BpkbProduct[] }) {
  const [productId, setProductId] = useState(products[0]?.id ?? "");
  const [rates, setRates] = useState<BpkbRate[]>([]);
  const [disbursement, setDisbursement] = useState<number | "">("");
  const [tenor, setTenor] = useState<number | "">("");
  const [result, setResult] = useState<{ available: boolean; installment?: number; message?: string } | null>(null);

  useEffect(() => {
    if (!productId) return;
    void fetch(`/api/simulation?kind=bpkb-rates&productId=${productId}`)
      .then((response) => response.json())
      .then((json: { rates?: BpkbRate[] }) => {
        const next = json.rates ?? [];
        setRates(next);
        setDisbursement(next[0] ? Number(next[0].disbursement_amount) : "");
        setTenor(next[0]?.tenor ?? "");
      });
  }, [productId]);

  const amounts = [...new Set(rates.map((rate) => Number(rate.disbursement_amount)))];
  const tenors = [...new Set(rates.filter((rate) => Number(rate.disbursement_amount) === disbursement).map((rate) => rate.tenor))];

  const run = async () => {
    const response = await fetch("/api/simulation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "bpkb", productId, disbursement, tenor }),
    });
    const json = (await response.json()) as { available: boolean; rate?: BpkbRate; message?: string };
    setResult(
      json.available && json.rate
        ? { available: true, installment: Number(json.rate.installment) }
        : { available: false, message: json.message },
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Produk</Label>
        <select className="h-11 w-full rounded-lg border bg-slate-50 px-3" value={productId} onChange={(e) => setProductId(e.target.value)}>
          {products.map((product) => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
      </div>
      <div>
        <Label>Pencairan</Label>
        <select className="h-11 w-full rounded-lg border bg-slate-50 px-3" value={disbursement} onChange={(e) => setDisbursement(Number(e.target.value))}>
          {amounts.map((value) => (
            <option key={value} value={value}>{formatRupiah(value)}</option>
          ))}
        </select>
      </div>
      <div>
        <Label>Tenor</Label>
        <select className="h-11 w-full rounded-lg border bg-slate-50 px-3" value={tenor} onChange={(e) => setTenor(Number(e.target.value))}>
          {tenors.map((value) => (
            <option key={value} value={value}>{value} bulan</option>
          ))}
        </select>
      </div>
      <Button type="button" onClick={() => void run()}>Hitung dari Rate Card</Button>
      {result?.available ? (
        <p className="text-2xl font-bold text-red-600">{formatRupiah(result.installment)}</p>
      ) : result ? (
        <p className="text-sm text-slate-600">{result.message}</p>
      ) : null}
    </div>
  );
}
