"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { bpkbApplicationSchema, type BpkbApplicationInput } from "@/lib/validations/application";
import { useApplication } from "@/hooks/use-application";

export function BpkbApplyDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { submit, loading, result, error } = useApplication();
  const form = useForm<BpkbApplicationInput>({ resolver: zodResolver(bpkbApplicationSchema) });

  const onSubmit = async (values: BpkbApplicationInput) => {
    await submit(values, "bpkb");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display text-xl uppercase">Ajukan Dana BPKB</DialogTitle>
        </DialogHeader>
        <form className="space-y-4 p-6" onSubmit={form.handleSubmit(onSubmit)}>
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
            <Label>Tipe Motor</Label>
            <Input {...form.register("vehicle_type")} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Tahun Motor</Label>
              <Input type="number" {...form.register("vehicle_year")} />
            </div>
            <div>
              <Label>Nomor Polisi</Label>
              <Input {...form.register("vehicle_plate")} />
            </div>
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

export function useBpkbDialog() {
  const [open, setOpen] = useState(false);
  return { open, setOpen };
}
