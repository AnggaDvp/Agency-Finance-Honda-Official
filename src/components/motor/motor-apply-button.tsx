"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MotorApplyDialog } from "@/components/motor/motor-apply-dialog";
import type { Motorcycle } from "@/types/motorcycle";

export function MotorApplyButton({
  motorcycleId,
  motorcycles,
}: {
  motorcycleId: string;
  motorcycles: Motorcycle[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        className="flex-1 h-auto rounded-xl bg-red-600 px-6 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-red-700"
      >
        Ajukan Kredit Ini
      </Button>
      <MotorApplyDialog
        open={open}
        onOpenChange={setOpen}
        motorcycles={motorcycles}
        defaultMotorcycleId={motorcycleId}
      />
    </>
  );
}
