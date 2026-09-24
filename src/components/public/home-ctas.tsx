"use client";

import { useState } from "react";
import Link from "next/link";
import { BpkbApplyDialog } from "@/components/bpkb/bpkb-apply-dialog";
import { MotorApplyDialog } from "@/components/motor/motor-apply-dialog";
import type { Motorcycle } from "@/types/motorcycle";

export function HomeCtas({ motorcycles }: { motorcycles: Motorcycle[] }) {
  const [bpkbOpen, setBpkbOpen] = useState(false);
  const [motorOpen, setMotorOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-4 pt-3">
        <Link href="/motor" className="rounded-lg bg-red-600 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg hover:bg-red-700">
          Lihat Motor Baru
        </Link>
        <button
          type="button"
          onClick={() => setBpkbOpen(true)}
          className="rounded-lg border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wider hover:border-red-500 hover:text-red-600"
        >
          Ajukan Dana BPKB
        </button>
        <button
          type="button"
          onClick={() => setMotorOpen(true)}
          className="rounded-lg border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wider hover:border-red-500 hover:text-red-600"
        >
          Ajukan Kredit Motor
        </button>
      </div>
      <BpkbApplyDialog open={bpkbOpen} onOpenChange={setBpkbOpen} />
      <MotorApplyDialog open={motorOpen} onOpenChange={setMotorOpen} motorcycles={motorcycles} />
    </>
  );
}
