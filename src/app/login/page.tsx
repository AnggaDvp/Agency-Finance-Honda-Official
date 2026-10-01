"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await response.json()) as {
        error?: string;
        ok?: boolean;
        redirectTo?: string;
      };
      if (!response.ok) {
        throw new Error(json.error ?? "Login gagal, silakan coba lagi.");
      }
      window.location.assign(json.redirectTo ?? "/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login gagal";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px-400px)] animate-fadeIn bg-gradient-to-br from-slate-50 via-white to-red-50 py-20">
      <div className="mx-auto max-w-lg px-6">
        <div className="mb-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-red-700 font-display text-2xl font-extrabold text-white shadow-xl shadow-red-600/20">
            NSC
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold text-slate-900">
            Masuk Portal
          </h1>
          <p className="mt-3 text-slate-600">
            Login untuk mengakses dashboard admin NSC Finance
          </p>
        </div>

        <Card className="p-8 shadow-xl border-slate-200 rounded-3xl ring-1 ring-slate-100">
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-emerald-800">
                Akses Terbatas
              </p>
              <p className="text-xs text-emerald-700/80">
                Halaman ini hanya untuk staf dan admin NSC Finance.
              </p>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                <Mail className="h-3.5 w-3.5 text-red-600" />
                Email Admin
              </Label>
              <Input
                type="email"
                autoComplete="email"
                placeholder="admin@nscfinance.id"
                {...form.register("email")}
                className="h-12 rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500/20"
              />
              {form.formState.errors.email ? (
                <p className="mt-1.5 text-xs font-semibold text-red-600">
                  {form.formState.errors.email.message}
                </p>
              ) : null}
            </div>

            <div>
              <Label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                <Lock className="h-3.5 w-3.5 text-red-600" />
                Password
              </Label>
              <Input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                {...form.register("password")}
                className="h-12 rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500/20"
              />
              {form.formState.errors.password ? (
                <p className="mt-1.5 text-xs font-semibold text-red-600">
                  {form.formState.errors.password.message}
                </p>
              ) : null}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                />
                <span>Ingat saya</span>
              </label>
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
                ⚠️ {error}
              </div>
            ) : null}

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-sm font-extrabold uppercase tracking-widest text-white shadow-lg shadow-red-600/25 transition-all hover:shadow-xl hover:shadow-red-600/35 active:scale-[0.99]"
            >
              {loading ? "Memproses..." : "Masuk ke Dashboard"}
            </Button>
          </form>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-600">
            <p className="font-bold text-slate-800 mb-2">Belum punya akun admin?</p>
            <p>
              Hubungi Owner / Supervisor untuk meminta pembuatan akun melalui
              Supabase Dashboard Auth.
            </p>
          </div>
        </Card>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-slate-600">
          <Link href="/" className="font-semibold hover:text-red-600 inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
