"use client";

import { useState } from "react";
import type { Application } from "@/types/application";
import type { BpkbApplicationInput, MotorcycleApplicationInput } from "@/lib/validations/application";

export function useApplication() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Application | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = async (payload: BpkbApplicationInput | MotorcycleApplicationInput, type: "bpkb" | "motor") => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, payload }),
      });
      const json = (await response.json()) as { application?: Application; error?: string };
      if (!response.ok) throw new Error(json.error ?? "Pengajuan gagal");
      setResult(json.application ?? null);
      return json.application;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Pengajuan gagal";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, result, error };
}
