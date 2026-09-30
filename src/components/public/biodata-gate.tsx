"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { biodataOnboardingSchema, type BiodataOnboardingInput } from "@/lib/validations/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Phone, MapPin, User, Sparkles, CheckCircle2 } from "lucide-react";

export function BiodataGate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<BiodataOnboardingInput>({
    resolver: zodResolver(biodataOnboardingSchema),
  });

  const onSubmit = async (values: BiodataOnboardingInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await response.json()) as { error?: string; ok?: boolean };
      if (!response.ok) {
        throw new Error(json.error ?? "Gagal menyimpan biodata, silakan coba lagi.");
      }
      window.location.reload();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-red-50 py-10">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-red-100/40 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-yellow-100/30 blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-red-600 to-red-700 shadow-xl shadow-red-600/20">
            <div className="flex items-center gap-1 font-display text-2xl font-extrabold text-white">
              <Sparkles className="h-5 w-5 text-amber-300" />
              <span>NSC</span>
            </div>
          </div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Selamat datang di Agency Finance Honda
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold uppercase leading-tight tracking-tight text-slate-900 lg:text-5xl">
            Lengkapi <span className="text-red-600">Data Diri</span>
            <br />
            Untuk Mulai
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600">
            Silakan isi formulir singkat di bawah ini agar kami dapat memberikan layanan terbaik dan
            penawaran promo eksklusif sesuai kebutuhan Anda.
          </p>
        </div>

        <Card className="border-slate-200 bg-white/90 p-8 shadow-2xl backdrop-blur-sm rounded-3xl ring-1 ring-slate-100">
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-sky-800">
                Data Anda Aman
              </p>
              <p className="text-xs text-sky-700/80">
                Privasi terjamin. Data hanya digunakan untuk keperluan verifikasi pengajuan dan promo.
              </p>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <Label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                  <User className="h-3.5 w-3.5 text-red-600" />
                  Nama Lengkap <span className="text-red-600">*</span>
                </Label>
                <Input
                  placeholder="Contoh: Budi Santoso"
                  {...form.register("full_name")}
                  className="h-12 rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500/20"
                />
                {form.formState.errors.full_name ? (
                  <p className="mt-1.5 text-xs font-semibold text-red-600">
                    {form.formState.errors.full_name.message}
                  </p>
                ) : null}
              </div>

              <div>
                <Label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                  <Phone className="h-3.5 w-3.5 text-red-600" />
                  Nomor WhatsApp <span className="text-red-600">*</span>
                </Label>
                <Input
                  placeholder="Contoh: 081234567890"
                  {...form.register("phone")}
                  className="h-12 rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500/20"
                />
                {form.formState.errors.phone ? (
                  <p className="mt-1.5 text-xs font-semibold text-red-600">
                    {form.formState.errors.phone.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="space-y-5 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-700">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-slate-800">
                    Alamat Lengkap
                  </p>
                  <p className="text-xs text-slate-500">
                    Opsional, lengkapi untuk mempercepat proses pengajuan
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Wilayah / Provinsi
                  </Label>
                  <Input
                    placeholder="Contoh: DKI Jakarta"
                    {...form.register("wilayah")}
                    className="h-11 rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500/20"
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Kecamatan
                  </Label>
                  <Input
                    placeholder="Contoh: Tebet"
                    {...form.register("kecamatan")}
                    className="h-11 rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500/20"
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Kelurahan / Desa
                  </Label>
                  <Input
                    placeholder="Contoh: Tebet Barat"
                    {...form.register("kelurahan")}
                    className="h-11 rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500/20"
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Kode Pos
                  </Label>
                  <Input
                    placeholder="Contoh: 12810"
                    {...form.register("kode_pos")}
                    className="h-11 rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500/20"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Nama Jalan / Detail Alamat
                  </Label>
                  <Input
                    placeholder="Contoh: Jl. MT Haryono No. 12A"
                    {...form.register("nama_jalan")}
                    className="h-11 rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500/20"
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Kota / Kabupaten
                  </Label>
                  <Input
                    placeholder="Contoh: Jakarta Selatan"
                    {...form.register("city")}
                    className="h-11 rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500/20"
                  />
                </div>
                <div className="md:col-span-1">
                  <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Alamat Lengkap (opsional)
                  </Label>
                  <Input
                    placeholder="Catatan tambahan (patokan, blok, rt/rw)"
                    {...form.register("address")}
                    className="h-11 rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500/20"
                  />
                </div>
              </div>
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
                ⚠️ {error}
              </div>
            ) : null}

            <Button
              type="submit"
              disabled={loading}
              className="h-14 w-full rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-sm font-extrabold uppercase tracking-widest text-white shadow-xl shadow-red-600/25 transition-all hover:shadow-2xl hover:shadow-red-600/35 active:scale-[0.99]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Memproses...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  Lanjut ke Halaman Utama
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-5 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>Sudah pernah isi? Nomor WhatsApp yang sama otomatis dikenali.</span>
            </div>
          </div>
        </Card>

        <div className="mt-8 grid gap-4 text-center sm:grid-cols-3">
          {[
            { icon: "⚡", title: "Proses Cepat", desc: "Isi kurang dari 2 menit" },
            { icon: "🎁", title: "Promo Eksklusif", desc: "Penawaran khusus member" },
            { icon: "🤝", title: "Konsultasi Gratis", desc: "CS siap membantu 24/7" },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur"
            >
              <div className="text-2xl">{item.icon}</div>
              <p className="mt-2 text-sm font-extrabold uppercase tracking-wider text-slate-800">
                {item.title}
              </p>
              <p className="mt-1 text-xs text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
