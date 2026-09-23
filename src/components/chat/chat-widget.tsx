"use client";

import { useState } from "react";
import { useChat } from "@/hooks/use-chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const QUICK = ["Dana BPKB", "Motor Baru", "Simulasi Angsuran", "Persyaratan BPKB"];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const { messages, send, loading } = useChat();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {open ? (
        <div className="mb-4 flex h-[520px] w-[360px] max-w-[92vw] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-slate-900 p-4 text-white">
            <div>
              <p className="font-display text-lg leading-none">NSC Care</p>
              <p className="mt-1 text-[11px] text-emerald-400">Online • Bot + Admin</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-lg bg-slate-800 px-2 py-1 text-sm">
              Tutup
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.length === 0 ? (
              <p className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">
                Halo kak! Ada yang bisa kami bantu seputar Motor Baru atau Dana BPKB?
              </p>
            ) : null}
            {messages.map((message) => (
              <div
                key={message.id}
                className={message.sender_type === "customer" ? "ml-auto max-w-[85%] rounded-2xl bg-red-600 p-3 text-sm text-white" : "max-w-[85%] rounded-2xl border bg-white p-3 text-sm text-slate-800"}
              >
                {message.message}
              </div>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto border-t bg-slate-100 p-2">
            {QUICK.map((item) => (
              <button
                key={item}
                type="button"
                className="whitespace-nowrap rounded-full border bg-white px-3 py-1 text-xs"
                onClick={() => void send(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <form
            className="flex gap-2 border-t p-3"
            onSubmit={(event) => {
              event.preventDefault();
              if (!text.trim()) return;
              void send(text);
              setText("");
            }}
          >
            <Input value={text} onChange={(event) => setText(event.target.value)} placeholder="Ketik pesan Anda..." />
            <Button type="submit" disabled={loading}>
              Kirim
            </Button>
          </form>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-xl hover:border-red-400"
      >
        <span className="h-3 w-3 rounded-full bg-emerald-500" />
        <span className="text-left">
          <span className="block text-[13px] font-bold text-slate-900">CS Online NSC Finance</span>
          <span className="text-[11px] font-medium text-emerald-600">Siap membantu</span>
        </span>
      </button>
    </div>
  );
}
