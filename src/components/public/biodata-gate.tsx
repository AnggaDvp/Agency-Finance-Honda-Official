"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  ShieldCheck,
  Phone,
  MapPin,
  User,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Search,
  UserPlus,
  ChevronRight,
} from "lucide-react";
import {
  PROVINCES,
  listDistricts,
  listRegencies,
  listVillages,
  type Province,
  type Regency,
  type District,
  type Village,
} from "@/lib/data/indonesia-regions";
import { normalizePhone, formatPhoneDisplay } from "@/lib/utils/normalize-phone";

// =====================================================================
// Form schema STEP 1: Input nomor HP saja (bisa 0813xxx / 628xxx / 8xxx)
// =====================================================================
const identifySchema = z.object({
  phone: z
    .string()
    .trim()
    .min(6, "Nomor HP terlalu pendek")
    .max(20, "Nomor HP terlalu panjang"),
});
type IdentifyInput = z.infer<typeof identifySchema>;

// =====================================================================
// Form schema STEP 2: Biodata (customer baru).
// Nama + Phone wajib; 5 field alamat = wilayah/kecamatan/kelurahan/kodePos/namaJalan
// Secara skema masih nullable (compat ke belakang), tapi di UI user DIARAHKAN isi
// =====================================================================
const biodataSchema = z.object({
  name: z.string().trim().min(2, "Nama lengkap minimal 2 karakter").max(200),
  phone: z.string().min(8, "Nomor HP tidak valid").max(20),
  provinceId: z.string().min(1, "Pilih wilayah/provinsi"),
  regencyId: z.string().min(1, "Pilih kabupaten/kota"),
  districtId: z.string().min(1, "Pilih kecamatan"),
  villageId: z.string().min(1, "Pilih kelurahan"),
  postalCode: z.string().min(4, "Kode pos minimal 4 digit"),
  namaJalan: z.string().trim().min(3, "Nama jalan/detail alamat minimal 3 karakter").max(500),
});
type BiodataInput = z.infer<typeof biodataSchema>;

type IdentifyState =
  | { step: "identify" }
  | { step: "loading-check" }
  | { step: "existing-auto-login" }
  | { step: "new-biodata"; normalizedPhone: string }
  | { step: "submitting-biodata" };

export function BiodataGate() {
  const [state, setState] = useState<IdentifyState>({ step: "identify" });
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);

  // ============== STEP 1 FORM ================
  const formIdentify = useForm<IdentifyInput>({
    resolver: zodResolver(identifySchema),
    defaultValues: { phone: "" },
  });

  // ============== STEP 2 FORM (Customer BARU) ================
  const formBiodata = useForm<BiodataInput>({
    resolver: zodResolver(biodataSchema),
    defaultValues: {
      name: "",
      phone: "",
      provinceId: "",
      regencyId: "",
      districtId: "",
      villageId: "",
      postalCode: "",
      namaJalan: "",
    },
  });

  const selectedProvince = formBiodata.watch("provinceId");
  const selectedRegency = formBiodata.watch("regencyId");
  const selectedDistrict = formBiodata.watch("districtId");
  const selectedVillage = formBiodata.watch("villageId");

  // Cascading: Wilayah → Kabupaten/Kota → Kecamatan → Kelurahan (auto kode pos)
  const regencyOptions: Regency[] = useMemo(
    () => listRegencies(selectedProvince),
    [selectedProvince],
  );
  const districtOptions: District[] = useMemo(
    () => listDistricts(selectedProvince, selectedRegency),
    [selectedProvince, selectedRegency],
  );
  const villageOptions: Village[] = useMemo(
    () => listVillages(selectedProvince, selectedRegency, selectedDistrict),
    [selectedProvince, selectedRegency, selectedDistrict],
  );

  const selectedVillageObj = useMemo(
    () => villageOptions.find((v) => v.id === selectedVillage) ?? null,
    [villageOptions, selectedVillage],
  );

  // Auto isi kode pos ketika kelurahan dipilih
  if (selectedVillageObj && !formBiodata.getValues("postalCode")) {
    formBiodata.setValue("postalCode", selectedVillageObj.postalCode, { shouldValidate: true });
  }

  // ================================================================
  // Submit STEP 1 — Cek customer by phone via API
  // ================================================================
  const onSubmitIdentify = async (values: IdentifyInput) => {
    setErrMsg(null);
    setOkMsg(null);
    setState({ step: "loading-check" });
    try {
      const res = await fetch("/api/customer/identify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: values.phone }),
      });
      const json = (await res.json()) as {
        found: boolean;
        customer?: { name: string; phone: string };
        normalizedPhone?: string;
        error?: string;
      };

      if (!res.ok || !("found" in json)) {
        throw new Error(json.error ?? "Gagal memeriksa nomor, coba sesaat lagi.");
      }

      if (json.found) {
        // = Customer LAMA: auto onboard/set session, lalu reload
        setState({ step: "existing-auto-login" });
        setOkMsg(
          `Nomor ${formatPhoneDisplay(values.phone)} dikenali. Selamat datang kembali, ${
            json.customer?.name ?? "Teman Honda"
          }! Menyiapkan sesi...`,
        );
        // Panggil onboard untuk SET COOKIE session (existing customer tidak dibuat ulang).
        const bio = {
          name: json.customer?.name ?? "Customer NSC",
          phone: json.customer?.phone ?? normalizePhone(values.phone),
          wilayah: null,
          kecamatan: null,
          kelurahan: null,
          kodePos: null,
          namaJalan: null,
        };
        const onBoard = await fetch("/api/customer/onboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bio),
        });
        const obJson = (await onBoard.json()) as { ok?: boolean; error?: string };
        if (!onBoard.ok || !obJson.ok) {
          throw new Error(obJson.error ?? "Gagal masuk, silakan ulangi.");
        }
        // Beres session → reload page → navbar muncul
        window.setTimeout(() => window.location.reload(), 400);
        return;
      }

      // = Customer BARU: lanjut isi biodata
      const normalized = json.normalizedPhone ?? normalizePhone(values.phone);
      formBiodata.setValue("phone", normalized, { shouldValidate: true });
      setState({ step: "new-biodata", normalizedPhone: normalized });
      setOkMsg(
        `Nomor ${formatPhoneDisplay(
          normalized,
        )} belum terdaftar. Silakan isi biodata sekali untuk mendaftar (gratis).`,
      );
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
      setErrMsg(msg);
      setState({ step: "identify" });
    }
  };

  // ================================================================
  // Submit STEP 2 (new biodata) → POST /api/customer/onboard
  // ================================================================
  const onSubmitBiodata = async (values: BiodataInput) => {
    setState({ step: "submitting-biodata" });
    setErrMsg(null);
    setOkMsg(null);
    try {
      // Lookup nama wilayah agar disimpan sebagai TEXT (bukan hanya id) di Customer.
      const prov: Province | undefined = PROVINCES.find((p) => p.id === values.provinceId);
      const kab: Regency | undefined = prov?.regencies.find((r) => r.id === values.regencyId);
      const kec: District | undefined = kab?.districts.find((d) => d.id === values.districtId);
      const kel: Village | undefined = kec?.villages.find((v) => v.id === values.villageId);

      const payload = {
        name: values.name,
        phone: values.phone,
        wilayah: prov?.name ?? values.provinceId,
        kecamatan: kec?.name ?? values.districtId,
        kelurahan: kel?.name ?? values.villageId,
        kodePos: values.postalCode,
        namaJalan: values.namaJalan,
      };

      const res = await fetch("/api/customer/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string; created?: boolean };
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Gagal menyimpan biodata. Silakan coba lagi.");
      }
      setOkMsg(
        json.created
          ? "Data berhasil disimpan. Anda terdaftar sebagai customer baru. Memuat halaman utama..."
          : "Sesi dimulai. Memuat halaman utama...",
      );
      window.setTimeout(() => window.location.reload(), 500);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
      setErrMsg(msg);
      setState({ step: "new-biodata", normalizedPhone: formBiodata.getValues("phone") });
    }
  };

  // =================================================================
  // RENDER
  // =================================================================
  const showSpinner =
    state.step === "loading-check" ||
    state.step === "existing-auto-login" ||
    state.step === "submitting-biodata";

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
            Agency Finance Honda Resmi Terdaftar
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold uppercase leading-tight tracking-tight text-slate-900 lg:text-5xl">
            {state.step === "identify" || state.step === "loading-check" ? (
              <>
                Mulai dengan <span className="text-red-600">Nomor WhatsApp</span>
              </>
            ) : (
              <>
                Lengkapi <span className="text-red-600">Biodata Diri</span>
              </>
            )}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600">
            {state.step === "identify" || state.step === "loading-check"
              ? "Masukkan nomor WhatsApp Anda. Nomor adalah identitas unik customer NSC Finance Honda."
              : "Isi biodata berikut ini satu kali. Data aman dan hanya digunakan untuk keperluan verifikasi pengajuan."}
          </p>
        </div>

        <Card className="border-slate-200 bg-white/90 p-8 shadow-2xl backdrop-blur-sm rounded-3xl ring-1 ring-slate-100">
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white">
              {state.step === "identify" || state.step === "loading-check" ? (
                <Search className="h-5 w-5" />
              ) : (
                <ShieldCheck className="h-5 w-5" />
              )}
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-sky-800">
                {state.step === "identify" || state.step === "loading-check"
                  ? "Langkah 1 dari 2 — Cek Nomor"
                  : "Langkah 2 dari 2 — Biodata Pelanggan Baru"}
              </p>
              <p className="text-xs text-sky-700/80">
                {state.step === "identify" || state.step === "loading-check"
                  ? "Jika nomor sudah terdaftar, Anda langsung masuk. Jika belum, isi formulir biodata singkat."
                  : "5 field alamat menggunakan dropdown berjenjang (cascading). Pilih wilayah terlebih dahulu."}
              </p>
            </div>
          </div>

          {/* ================================================================= */}
          {/* STEP 1: INPUT NOMOR HP SAJA */}
          {/* ================================================================= */}
          {(state.step === "identify" || state.step === "loading-check") && (
            <form
              onSubmit={formIdentify.handleSubmit(onSubmitIdentify)}
              className="space-y-6"
            >
              <div>
                <Label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                  <Phone className="h-3.5 w-3.5 text-red-600" />
                  Nomor WhatsApp <span className="text-red-600">*</span>
                </Label>
                <Input
                  placeholder="Contoh: 0813-1537-9958 atau 6281315379958"
                  {...formIdentify.register("phone")}
                  className="h-14 rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500/20 text-lg font-medium"
                  disabled={showSpinner}
                />
                {formIdentify.formState.errors.phone ? (
                  <p className="mt-1.5 text-xs font-semibold text-red-600">
                    {formIdentify.formState.errors.phone.message}
                  </p>
                ) : null}
                <p className="mt-2 text-[11px] text-slate-500">
                  Format apa pun diperbolehkan. Server akan menormalkan menjadi format 08xx.
                </p>
              </div>

              {errMsg ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
                  ⚠️ {errMsg}
                </div>
              ) : null}
              {okMsg ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
                  ✅ {okMsg}
                </div>
              ) : null}

              <Button
                type="submit"
                disabled={showSpinner}
                className="h-14 w-full rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-sm font-extrabold uppercase tracking-widest text-white shadow-xl shadow-red-600/25 transition-all hover:shadow-2xl hover:shadow-red-600/35 active:scale-[0.99]"
              >
                {showSpinner ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Memeriksa Nomor...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Cek Customer
                    <ChevronRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
          )}

          {/* ================================================================= */}
          {/* STEP: Existing customer auto login (loading screen) */}
          {/* ================================================================= */}
          {state.step === "existing-auto-login" && (
            <div className="flex flex-col items-center justify-center gap-4 py-8">
              <span className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
              <p className="font-bold text-slate-800">Menyiapkan sesi customer lama...</p>
              {okMsg ? (
                <p className="text-sm text-slate-600 max-w-md text-center">{okMsg}</p>
              ) : null}
            </div>
          )}

          {/* ================================================================= */}
          {/* STEP 2: FORM BIODATA (NEW CUSTOMER) */}
          {/* ================================================================= */}
          {(state.step === "new-biodata" || state.step === "submitting-biodata") && (
            <form
              onSubmit={formBiodata.handleSubmit(onSubmitBiodata)}
              className="space-y-6"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <Label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                    <User className="h-3.5 w-3.5 text-red-600" />
                    Nama Lengkap <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    placeholder="Contoh: Budi Santoso"
                    {...formBiodata.register("name")}
                    className="h-12 rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500/20"
                    disabled={showSpinner}
                  />
                  {formBiodata.formState.errors.name ? (
                    <p className="mt-1.5 text-xs font-semibold text-red-600">
                      {formBiodata.formState.errors.name.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <Label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                    <Phone className="h-3.5 w-3.5 text-red-600" />
                    Nomor WhatsApp <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    {...formBiodata.register("phone")}
                    readOnly
                    className="h-12 rounded-xl border-slate-300 bg-slate-100 font-semibold text-slate-800"
                  />
                  <p className="mt-1 text-[11px] text-slate-500">
                    Nomor unik ini yang menjadi ID Anda di sistem.
                  </p>
                </div>
              </div>

              {/* Cascading wilayah */}
              <div className="space-y-5 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-700">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-slate-800">
                      Alamat Lengkap (Cascading)
                    </p>
                    <p className="text-xs text-slate-500">
                      Pilih dari atas ke bawah: Wilayah → Kabupaten → Kecamatan → Kelurahan.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {/* 1. Wilayah / Provinsi */}
                  <div>
                    <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Wilayah / Provinsi <span className="text-red-600">*</span>
                    </Label>
                    <select
                      {...formBiodata.register("provinceId")}
                      disabled={showSpinner}
                      onChange={(e) => {
                        const value = e.target.value;
                        formBiodata.setValue("provinceId", value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                        formBiodata.setValue("regencyId", "", {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                        formBiodata.setValue("districtId", "", {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                        formBiodata.setValue("villageId", "", {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                        formBiodata.setValue("postalCode", "", {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 disabled:bg-slate-100"
                    >
                      <option value="">-- Pilih Provinsi --</option>
                      {PROVINCES.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                    {formBiodata.formState.errors.provinceId ? (
                      <p className="mt-1.5 text-xs font-semibold text-red-600">
                        {formBiodata.formState.errors.provinceId.message}
                      </p>
                    ) : null}
                  </div>

                  {/* 2. Kabupaten / Kota */}
                  <div>
                    <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Kabupaten / Kota <span className="text-red-600">*</span>
                    </Label>
                    <select
                      {...formBiodata.register("regencyId")}
                      disabled={showSpinner || !selectedProvince}
                      onChange={(e) => {
                        const value = e.target.value;
                        formBiodata.setValue("regencyId", value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                        formBiodata.setValue("districtId", "", {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                        formBiodata.setValue("villageId", "", {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                        formBiodata.setValue("postalCode", "", {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 disabled:bg-slate-100 disabled:text-slate-400"
                    >
                      <option value="">
                        {selectedProvince ? "-- Pilih Kabupaten/Kota --" : "-- Pilih provinsi dulu --"}
                      </option>
                      {regencyOptions.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.type === "KOTA" ? `Kota ${r.name.replace("Kota ", "")}` : r.name}
                        </option>
                      ))}
                    </select>
                    {formBiodata.formState.errors.regencyId ? (
                      <p className="mt-1.5 text-xs font-semibold text-red-600">
                        {formBiodata.formState.errors.regencyId.message}
                      </p>
                    ) : null}
                  </div>

                  {/* 3. Kecamatan */}
                  <div>
                    <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Kecamatan <span className="text-red-600">*</span>
                    </Label>
                    <select
                      {...formBiodata.register("districtId")}
                      disabled={showSpinner || !selectedRegency}
                      onChange={(e) => {
                        const value = e.target.value;
                        formBiodata.setValue("districtId", value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                        formBiodata.setValue("villageId", "", {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                        formBiodata.setValue("postalCode", "", {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 disabled:bg-slate-100 disabled:text-slate-400"
                    >
                      <option value="">
                        {selectedRegency ? "-- Pilih Kecamatan --" : "-- Pilih kabupaten dulu --"}
                      </option>
                      {districtOptions.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                    {formBiodata.formState.errors.districtId ? (
                      <p className="mt-1.5 text-xs font-semibold text-red-600">
                        {formBiodata.formState.errors.districtId.message}
                      </p>
                    ) : null}
                  </div>

                  {/* 4. Kelurahan */}
                  <div>
                    <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Kelurahan / Desa <span className="text-red-600">*</span>
                    </Label>
                    <select
                      {...formBiodata.register("villageId")}
                      disabled={showSpinner || !selectedDistrict}
                      onChange={(e) => {
                        const value = e.target.value;
                        formBiodata.setValue("villageId", value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 disabled:bg-slate-100 disabled:text-slate-400"
                    >
                      <option value="">
                        {selectedDistrict ? "-- Pilih Kelurahan --" : "-- Pilih kecamatan dulu --"}
                      </option>
                      {villageOptions.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name} — Kode Pos {v.postalCode}
                        </option>
                      ))}
                    </select>
                    {formBiodata.formState.errors.villageId ? (
                      <p className="mt-1.5 text-xs font-semibold text-red-600">
                        {formBiodata.formState.errors.villageId.message}
                      </p>
                    ) : null}
                  </div>

                  {/* 5. Kode Pos (AUTO ISI dari kelurahan terpilih) */}
                  <div>
                    <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Kode Pos <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      {...formBiodata.register("postalCode")}
                      readOnly={!!selectedVillageObj}
                      className="h-11 rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500/20 disabled:bg-slate-100"
                    />
                    {formBiodata.formState.errors.postalCode ? (
                      <p className="mt-1.5 text-xs font-semibold text-red-600">
                        {formBiodata.formState.errors.postalCode.message}
                      </p>
                    ) : null}
                    <p className="mt-1 text-[11px] text-slate-500">
                      Otomatis diisi ketika kelurahan dipilih.
                    </p>
                  </div>

                  {/* 6. Nama Jalan / Detail (required) */}
                  <div className="md:col-span-2">
                    <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Nama Jalan / Detail Alamat <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      placeholder="Contoh: Jl. MT Haryono No. 12A RT 005 RW 003, Patokan: depan SPBU"
                      {...formBiodata.register("namaJalan")}
                      disabled={showSpinner}
                      className="h-11 rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500/20"
                    />
                    {formBiodata.formState.errors.namaJalan ? (
                      <p className="mt-1.5 text-xs font-semibold text-red-600">
                        {formBiodata.formState.errors.namaJalan.message}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              {errMsg ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
                  ⚠️ {errMsg}
                </div>
              ) : null}
              {okMsg ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
                  ✅ {okMsg}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setState({ step: "identify" });
                    setErrMsg(null);
                    setOkMsg(null);
                  }}
                  disabled={showSpinner}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  <ArrowRight className="h-4 w-4 -scale-x-100" />
                  Ubah Nomor HP
                </button>

                <Button
                  type="submit"
                  disabled={showSpinner}
                  className="h-14 flex-1 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-sm font-extrabold uppercase tracking-widest text-white shadow-xl shadow-red-600/25 transition-all hover:shadow-2xl hover:shadow-red-600/35 active:scale-[0.99] sm:max-w-md sm:ml-auto"
                >
                  {showSpinner ? (
                    <span className="flex items-center gap-2">
                      <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Memproses Pendaftaran...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      Daftar & Masuk ke NSC Finance
                    </span>
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* Footer tip existing */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-5 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>Nomor yang sama tidak perlu mendaftar ulang — otomatis dikenali.</span>
            </div>
          </div>
        </Card>

        <div className="mt-8 grid gap-4 text-center sm:grid-cols-3">
          {[
            { icon: "⚡", title: "Proses Cepat", desc: "Cek nomor < 10 detik" },
            { icon: "🎁", title: "Promo Eksklusif", desc: "Hanya untuk member terdaftar" },
            { icon: "🤝", title: "Konsultasi Gratis", desc: "CS siap bantu via WhatsApp" },
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
