"use client";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ChatbotIntent, ChatbotResponse } from "@/types/chat";
import { useState } from "react";

const DUMMY_INTENTS: ChatbotIntent[] = [
  { id: "i-01", intent_key: "BPKB_REQUIREMENT", category: "BPKB", description: "Customer menanyakan syarat gadai BPKB", active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "i-02", intent_key: "BPKB_VEHICLE_BRAND", category: "BPKB", description: "Customer menanyakan merk motor yang diterima BPKB", active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "i-03", intent_key: "BPKB_VEHICLE_AGE", category: "BPKB", description: "Customer menanyakan usia maksimal motor untuk BPKB", active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "i-04", intent_key: "NEW_MOTOR_PRICE", category: "Motor Baru", description: "Customer menanyakan harga motor baru", active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "i-05", intent_key: "NEW_MOTOR_DP", category: "Motor Baru", description: "Customer menanyakan DP motor baru", active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "i-06", intent_key: "NEW_MOTOR_INSTALLMENT", category: "Motor Baru", description: "Customer menanyakan besaran cicilan motor", active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "i-07", intent_key: "REQUEST_SIMULATION", category: "Simulasi", description: "Customer meminta simulasi perhitungan", active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "i-08", intent_key: "APPLICATION_STATUS", category: "Pengajuan", description: "Customer menanyakan status pengajuan", active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "i-09", intent_key: "ADMIN_HANDOVER", category: "General", description: "Customer ingin berbicara dengan human agent", active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "i-10", intent_key: "UNKNOWN", category: "General", description: "Percakapan tidak terdeteksi intent spesifik", active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

const DUMMY_RESPONSES: ChatbotResponse[] = [
  { id: "r-01", intent_id: "i-01", trigger_examples: ["syarat bpkb", "dokumen gadai bpkb", "persyaratan bpkb", "butuh dokumen apa untuk bpkb"], response_text: "✅ Persyaratan standar Gadai BPKB:\n• KTP asli (Suami + Istri jika menikah)\n• Kartu Keluarga\n• BPKB & STNK asli motor\n• Slip gaji / rekening koran 3 bulan terakhir\n• NPWP (opsional plafon > 50 Jt)\n\nKakak punya dokumen di atas? Kalau sudah, saya bantu simulasi pencairan ya!", priority: 10, active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-02", intent_id: "i-04", trigger_examples: ["harga honda vario", "harga pcx", "harga motor baru honda", "berapa harga adv 160"], response_text: "Mantap kak! Berikut daftar harga OTR terbaru Jabodetabek:\n• Honda Vario 160 CBS: Rp 26.500.000\n• Honda PCX 160 ABS: Rp 44.500.000\n• Honda ADV 160 ABS: Rp 53.000.000\n• Honda Beat Street: Rp 21.500.000\nSemua unit ready stock! Kakak minat tipe mana untuk disimulasikan cicilannya?", priority: 10, active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-03", intent_id: "i-05", trigger_examples: ["dp minimal", "uang muka motor", "dp berapa", "bayar awal berapa"], response_text: "Saat ini promo DP mulai dari 10% aja kak! Contoh:\n• Vario 160: DP mulai Rp 2,5 Jt (cicilan ±Rp 799.000 x 36 bln)\n• PCX 160: DP mulai Rp 5 Jt (cicilan ±Rp 1.299.000 x 36 bln)\nSemakin besar DP semakin ringan cicilan. Kakak preferensi DP berapa?", priority: 10, active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-04", intent_id: "i-09", trigger_examples: ["mau bicara cs", "mau bicara manusia", "pindah ke admin", "hubungi manusia", "tungguin admin"], response_text: "Baik kak, saya transfer ke Customer Service manusia ya. Mohon ditunggu sebentar, admin kami akan merespon maksimal 5 menit lagi 🙏\n\nSambil menunggu, kakak bisa share dulu: (1) tipe motor / (2) DP yang diinginkan / (3) kota domisili, agar admin cepat bantu simulasi.", priority: 99, active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "r-05", intent_id: "i-02", trigger_examples: ["merk apa aja yang diterima", "yamaha bisa ga", "kawasaki bpkb", "suzuki digadaikan"], response_text: "Kami menerima semua merk populer kak ✅\n\nReguler: Honda, Yamaha, Kawasaki, Suzuki (usia ≤10 tahun)\nPremium: Ducati, Harley, BMW, KTM (usia ≤12 tahun)\n\nKakak punya motor merk apa dan tahun berapa? Saya bantu estimasi pencairan.", priority: 10, active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

const CATEGORIES = ["Semua", ...new Set(DUMMY_INTENTS.map((i) => i.category))];

export default function AdminKnowledgeBasePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");

  const filtered = DUMMY_INTENTS.filter((i) => {
    if (category !== "Semua" && i.category !== category) return false;
    if (search && !`${i.intent_key} ${i.category} ${i.description}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex min-h-[calc(100vh-80px-400px)] bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Admin</p>
            <h1 className="mt-1 font-display text-3xl font-bold text-slate-900">Knowledge Base Chatbot</h1>
            <p className="mt-1 text-sm text-slate-500">
              Kelola intent, trigger keyword, dan template jawaban otomatis chatbot CS.
            </p>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline">Test Chatbot</Button>
            <Button type="button" className="bg-red-600 hover:bg-red-700">+ Tambah Intent</Button>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-wrap items-end gap-4">
          <div className="min-w-[240px] flex-1">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Cari Intent</label>
            <Input placeholder="Intent / kategori / deskripsi..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="min-w-[180px]">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Kategori</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline">Export</Button>
            <Button type="button" variant="outline">Import</Button>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total Intent", value: DUMMY_INTENTS.length, tone: "slate" },
            { label: "Aktif", value: DUMMY_INTENTS.filter((i) => i.active).length, tone: "emerald" },
            { label: "Total Response", value: DUMMY_RESPONSES.length, tone: "sky" },
            { label: "Kategori", value: new Set(DUMMY_INTENTS.map((i) => i.category)).size, tone: "violet" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{s.label}</p>
              <p className="mt-2 font-display text-3xl font-bold text-slate-900">{s.value}</p>
            </div>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="Tidak ada intent" description="Silakan perbaiki filter atau tambahkan intent baru." />
        ) : (
          <div className="space-y-5">
            {filtered.map((intent) => {
              const responses = DUMMY_RESPONSES.filter((r) => r.intent_id === intent.id);
              return (
                <article key={intent.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <header className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 bg-slate-50/60 p-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${intent.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                        {intent.active ? "Aktif" : "Nonaktif"}
                      </span>
                      <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        {intent.category}
                      </span>
                      <h3 className="font-display text-lg font-bold text-slate-900">{intent.intent_key}</h3>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Preview</Button>
                      <Button size="sm">Edit</Button>
                    </div>
                  </header>
                  <div className="px-6 pt-5">
                    <p className="text-sm text-slate-600">{intent.description}</p>
                  </div>
                  <div className="space-y-4 p-6">
                    {responses.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                        Belum ada response template untuk intent ini.
                      </div>
                    ) : (
                      responses.map((r) => (
                        <div key={r.id} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${r.active ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"}`}>
                              {r.active ? "AKTIF" : "NONAKTIF"}
                            </span>
                            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 border border-slate-200">
                              Priority {r.priority}
                            </span>
                            <p className="text-[11px] font-mono text-slate-500 ml-auto">ID: {r.id}</p>
                          </div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">Trigger Keywords</p>
                              <div className="flex flex-wrap gap-1.5">
                                {r.trigger_examples.map((kw) => (
                                  <span key={kw} className="rounded-md bg-white px-2 py-1 text-xs font-mono text-slate-700 border border-slate-200">
                                    &quot;{kw}&quot;
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">Response Text</p>
                              <p className="rounded-lg bg-white border border-slate-200 p-3 text-xs leading-relaxed text-slate-700 whitespace-pre-wrap max-h-[220px] overflow-y-auto">
                                {r.response_text}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
