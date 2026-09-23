"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motorcycleApplicationSchema, type MotorcycleApplicationInput } from "@/lib/validations/application";
import { useApplication } from "@/hooks/use-application";
import type { Motorcycle } from "@/types/motorcycle";

export function MotorApplyDialog({
  open,
  onOpenChange,
  motorcycles,
  defaultMotorcycleId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  motorcycles: Motorcycle[];
  defaultMotorcycleId?: string;
}) {
  const { submit, loading, result, error } = useApplication();
  const form = useForm<MotorcycleApplicationInput>({
    resolver: zodResolver(motorcycleApplicationSchema),
    defaultValues: { motorcycle_id: defaultMotorcycleId, payment_method: "credit" },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display text-xl uppercase">Ajukan Kredit Motor</DialogTitle>
        </DialogHeader>
        <form className="space-y-4 p-6" onSubmit={form.handleSubmit((values) => submit(values, "motor"))}>
          <div>
            <Label>Nama Lengkap</Label>
            <Input {...form.register("full_name")} />
          </div>
          <div>
            <Label>Nomor WhatsApp</Label>
            <Input {...form.register("phone")} />
          </div>
          <div>
            <Label>Alamat Lengkap</Label>
            <Textarea rows={2} {...form.register("address")} />
          </div>
          <div>
            <Label>Motor yang diminati</Label>
            <select className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm" {...form.register("motorcycle_id")}>
              <option value="">Pilih motor</option>
              {motorcycles.map((motor) => (
                <option key={motor.id} value={motor.id}>
                  {motor.brand} {motor.model}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>DP</Label>
              <Input type="number" {...form.register("selected_dp")} />
            </div>
            <div>
              <Label>Tenor (bulan)</Label>
              <Input type="number" {...form.register("selected_tenor")} />
            </div>
          </div>
          <div>
            <Label>Cash / Kredit</Label>
            <select className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm" {...form.register("payment_method")}>
              <option value="credit">Kredit</option>
              <option value="cash">Cash</option>
            </select>
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {result ? (
            <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">
              Pengajuan terkirim. Kode: {result.application_code}
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Mengirim..." : "Kirim Pengajuan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
