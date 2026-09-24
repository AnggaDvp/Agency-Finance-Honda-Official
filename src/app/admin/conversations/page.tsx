"use client";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Conversation, ChatMessage } from "@/types/chat";
import { useState } from "react";

const DUMMY_CONVERSATIONS: Conversation[] = [
  { id: "conv-001", customer_id: "cust-001", assigned_admin_id: "admin-01", status: "open", mode: "admin", guest_name: "Budi Santoso", guest_phone: "081234567890", created_at: new Date(Date.now() - 1000 * 60 * 3).toISOString(), updated_at: new Date().toISOString() },
  { id: "conv-002", customer_id: "cust-002", assigned_admin_id: null, status: "open", mode: "waiting_admin", guest_name: "Siti Aminah", guest_phone: "081298765432", created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(), updated_at: new Date().toISOString() },
  { id: "conv-003", customer_id: null, assigned_admin_id: null, status: "open", mode: "bot", guest_name: "Guest 7842", guest_phone: null, created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(), updated_at: new Date().toISOString() },
  { id: "conv-004", customer_id: "cust-003", assigned_admin_id: null, status: "closed", mode: "bot", guest_name: "Ahmad Rifai", guest_phone: "081322334455", created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), updated_at: new Date().toISOString() },
];

const DUMMY_MESSAGES: Record<string, ChatMessage[]> = {
  "conv-001": [
    { id: "m1", conversation_id: "conv-001", sender_type: "customer", sender_id: "cust-001", message: "Halo, saya mau tanya soal kredit Honda ADV 160 dong.", metadata: null, created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
    { id: "m2", conversation_id: "conv-001", sender_type: "bot", sender_id: null, message: "Selamat datang kak! Honda ADV 160 ABS saat ini tersedia dengan harga OTR Rp 53 Juta. Promo DP mulai 5 Jt dengan cicilan mulai Rp 1.575.000 per bulan (36x). Kakak berminat simulasi tenor lain?", metadata: null, created_at: new Date(Date.now() - 1000 * 60 * 9).toISOString() },
    { id: "m3", conversation_id: "conv-001", sender_type: "customer", sender_id: "cust-001", message: "Mau minta dihubungi sales dong, mau tanya detail lebih lanjut.", metadata: null, created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
    { id: "m4", conversation_id: "conv-001", sender_type: "admin", sender_id: "admin-01", message: "Halo Budi, dengan Admin NSC. Saya bantu detail ADV 160 ya. Ada unit warna apa yang kakak preferensikan?", metadata: null, created_at: new Date(Date.now() - 1000 * 60 * 3).toISOString() },
  ],
  "conv-002": [
    { id: "m1", conversation_id: "conv-002", sender_type: "customer", sender_id: "cust-002", message: "BPKB saya Honda Vario 2020, bisa cair berapa ya?", metadata: null, created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString() },
  ],
};

function AdminConversationsContent() {
  const [activeId, setActiveId] = useState(DUMMY_CONVERSATIONS[0]?.id ?? "");
  const [filter, setFilter] = useState<"all" | "open" | "waiting_admin">("all");
  const [input, setInput] = useState("");

  const list = DUMMY_CONVERSATIONS.filter((c) => {
    if (filter === "all") return true;
    if (filter === "open") return c.status === "open";
    return c.mode === "waiting_admin";
  });

  const messages = DUMMY_MESSAGES[activeId] ?? [];

  return (
    <div className="flex h-[calc(100vh-80px-400px+64px)] min-h-[600px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <aside className="flex w-80 shrink-0 flex-col border-r border-slate-200">
        <div className="border-b border-slate-200 p-4">
          <h2 className="font-display text-lg font-bold text-slate-900">Live Chat</h2>
          <div className="mt-3 flex gap-1 rounded-xl bg-slate-100 p-1 text-xs font-semibold">
            {(["all", "open", "waiting_admin"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 rounded-lg py-1.5 transition-colors ${
                  filter === f ? "bg-white text-red-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {f === "all" ? "Semua" : f === "open" ? "Aktif" : "Butuh Admin"}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <Input placeholder="Cari percakapan..." value={""} onChange={() => {}} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {list.length > 0 ? (
            list.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`w-full border-b border-slate-100 p-4 text-left transition-colors ${
                  activeId === c.id ? "bg-red-50/60 border-l-4 border-l-red-600" : "hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-2.5 w-2.5 rounded-full ${
                    c.mode === "waiting_admin" ? "bg-amber-500 animate-pulse" :
                    c.status === "open" ? "bg-emerald-500" : "bg-slate-400"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate font-semibold text-sm text-slate-900">{c.guest_name ?? "Guest"}</p>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {new Date(c.updated_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {c.guest_phone ?? "Belum login"} • {c.mode}
                    </p>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="p-6">
              <EmptyState title="Tidak ada" description="Percakapan tidak ditemukan." />
            </div>
          )}
        </div>
      </aside>

      <section className="flex flex-1 flex-col">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          {(() => {
            const active = DUMMY_CONVERSATIONS.find((c) => c.id === activeId);
            if (!active) return null;
            return (
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 font-bold text-white">
                    {(active.guest_name ?? "G").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{active.guest_name ?? "Guest"}</p>
                    <p className="text-xs text-slate-500">
                      {active.guest_phone ?? "Belum input nomor"} • Mode: {active.mode}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {active.mode !== "admin" ? (
                    <Button type="button" size="sm">Ambil Alih ke Admin</Button>
                  ) : null}
                  <Button type="button" variant="outline" size="sm">Tutup Chat</Button>
                </div>
              </div>
            );
          })()}
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50/50 p-6">
          {messages.length > 0 ? messages.map((msg) => (
            <div key={msg.id} className={`flex ${
              msg.sender_type === "customer" ? "justify-end" : "justify-start"
            }`}>
              <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                msg.sender_type === "customer"
                  ? "bg-red-600 text-white rounded-br-sm"
                  : msg.sender_type === "admin"
                  ? "bg-slate-900 text-white rounded-bl-sm"
                  : "bg-white text-slate-800 border border-slate-200 rounded-bl-sm"
              }`}>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider opacity-70">
                  {msg.sender_type === "customer" ? "Customer" : msg.sender_type === "admin" ? "Admin" : "Bot"}
                </p>
                <p className="whitespace-pre-wrap">{msg.message}</p>
              </div>
            </div>
          )) : (
            <EmptyState title="Belum ada pesan" description="Mulailah percakapan dengan customer." />
          )}
        </div>

        <form
          className="border-t border-slate-200 bg-white p-4 flex gap-2"
          onSubmit={(e) => { e.preventDefault(); if (input.trim()) setInput(""); }}
        >
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ketik balasan..." className="h-11" />
          <Button type="submit" className="h-11 px-5 bg-red-600 hover:bg-red-700">Kirim</Button>
        </form>
      </section>
    </div>
  );
}

export default function AdminConversationsPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px-400px)] bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Admin</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-slate-900">Live Chat & Conversations</h1>
          <p className="mt-1 text-sm text-slate-500">Kelola percakapan customer dari chat widget dan takeover dari bot.</p>
        </div>
        <AdminConversationsContent />
      </main>
    </div>
  );
}
