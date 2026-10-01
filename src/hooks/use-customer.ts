"use client";

import { useEffect, useState } from "react";

export type CustomerSession = {
  id: string;
  name: string;
  phone: string;
  wilayah: string | null;
  kecamatan: string | null;
  kelurahan: string | null;
  kodePos: string | null;
  namaJalan: string | null;
};

type SessionResponse =
  | { authenticated: true; customer: CustomerSession }
  | { authenticated: false };

export function useCustomer() {
  const [customer, setCustomer] = useState<CustomerSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const run = async () => {
      try {
        const res = await fetch("/api/customer/session", {
          method: "GET",
          credentials: "include",
          signal: controller.signal,
        });
        if (!res.ok) {
          setCustomer(null);
          setLoading(false);
          return;
        }
        const data = (await res.json()) as SessionResponse;
        if (data.authenticated) {
          setCustomer(data.customer);
        } else {
          setCustomer(null);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setCustomer(null);
      } finally {
        setLoading(false);
      }
    };
    void run();
    return () => controller.abort();
  }, []);

  return { customer, loading };
}
