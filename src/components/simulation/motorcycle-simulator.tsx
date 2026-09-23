"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { formatRupiah } from "@/lib/utils/format";
import type { Motorcycle } from "@/types/motorcycle";
import type { MotorcycleRate } from "@/types/rate-card";

export function MotorcycleSimulator({ motorcycles }: { motorcycles: Motorcycle[] }) {
  const [motorcycleId, setMotorcycleId] = useState(motorcycles[0]?.id ?? "");
  const [dps, setDps] = useState<number[]>([]);
  const [tenors, setTenors] = useState<number[]>([]);
  const [dp, setDp] = useState<number | "">("");
  const [tenor, setTenor] = useState<number | "">("");
  const [result, setResult] = useState<{ available: boolean; installment?: number; message?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!motorcycleId) return;
    void fetch(`/api/simulation?kind=dp&motorcycleId=${motorcycleId}`)
      .then((response) => response.json())
      .then((json: { dps?: number[] }) => {
        setDps(json.dps ?? []);
        setDp(json.dps?.[0] ?? "");
      });
  }, [motorcycleId]);

  useEffect(() => {
    if (!motorcycleId || dp === "") return;
    void fetch(`/api/simulation?kind=tenor&motorcycleId=${motorcycleId}&dp=${dp}`)
      .then((response) => response.json())
      .then((json: { tenors?: number[] }) => {
        setTenors(json.tenors ?? []);
        setTenor(json.tenors?.[0] ?? "");
      });
  }, [motorcycleId, dp]);

  const run = async () => {
    setLoading(true);
    const response = await fetch("/api/simulation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "motorcycle", motorcycleId, dp, tenor }),
    });
    const json = (await response.json()) as { available: boolean; rate?: MotorcycleRate; message?: string };
    setResult(
      json.available && json.rate
        ? { available: true, installment: Number(json.rate.installment) }
        : { available: false, message: json.message },
    );
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Motor</Label>
        <select className="h-11 w-full rounded-lg border bg-slate-50 px-3" value={motorcycleId} onChange={(e) => setMotorcycleId(e.target.value)}>
          {motorcycles.map((motor) => (
            <option key={motor.id} value={motor.id}>
              {motor.brand} {motor.model}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label>DP</Label>
        <select className="h-11 w-full rounded-lg border bg-slate-50 px-3" value={dp} onChange={(e) => setDp(Number(e.target.value))}>
          {dps.map((value) => (
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
      <Button type="button" onClick={() => void run()} disabled={loading}>Hitung dari Rate Card</Button>
      {result?.available ? (
        <p className="text-2xl font-bold text-red-600">{formatRupiah(result.installment)}</p>
      ) : result ? (
        <p className="text-sm text-slate-600">{result.message}</p>
      ) : null}
    </div>
  );
}
