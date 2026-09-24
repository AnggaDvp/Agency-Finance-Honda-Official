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
      const json = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(json.error ?? "Login gagal, silakan coba lagi.");
      }
      window.location.href = "/admin";
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
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 font-display text-2xl font-extrabold text-white shadow-lg">
            NSC
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold text-slate-900">
            Masuk ke Akun
          </h1>
          <p className="mt-3 text-slate-600">
            Portal admin dan customer NSC Finance
          </p>
        </div>

        <Card className="p-8 shadow-xl border-slate-200 rounded-2xl">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                autoComplete="email"
                placeholder="nama@email.com"
                {...form.register("email")}
                className="h-12"
              />
              {form.formState.errors.email ? (
                <p className="mt-1.5 text-xs font-semibold text-red-600">
                  {form.formState.errors.email.message}
                </p>
              ) : null}
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                {...form.register("password")}
                className="h-12"
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
              <a
                href="#forgot"
                className="font-semibold text-red-600 hover:text-red-700"
              >
                Lupa password?
              </a>
            </div>

            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
                {error}
              </div>
            ) : null}

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-red-600 text-sm font-bold uppercase tracking-wider hover:bg-red-700"
            >
              {loading ? "Memproses..." : "Masuk"}
            </Button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Atau
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="space-y-3 text-sm">
            <a
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors"
            >
              <span>🌐</span>
              Lanjutkan dengan Google
            </a>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-600">
            <p className="font-bold text-slate-800 mb-2">Demo Access:</p>
            <p>Admin: admin@nscfinance.id / password123</p>
            <p>Customer: user@example.com / password123</p>
          </div>
        </Card>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-slate-600">
          <Link href="/" className="font-semibold hover:text-red-600">
            ← Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
