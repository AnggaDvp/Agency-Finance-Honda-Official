"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

type Message = {
  id: string;
  sender_type: "customer" | "admin";
  message: string;
  created_at?: string;
};

const QUICK = [
  "Dana BPKB",
  "Motor Baru",
  "Simulasi Angsuran",
  "Persyaratan BPKB",
];

const BOT_AVATAR_SRC = "/images/chatbot-affiyah.png";
const BOT_NAME = "Affiyah";
const BOT_TITLE = "Customer Service NSC Finance";
const BOT_AVATAR_ALT = "Affiyah - Customer Service NSC Finance";

function ruleReply(msg: string): string {
  const m = msg.toLowerCase();

  if (
    m.includes("bpkb") ||
    m.includes("gadai") ||
    m.includes("dana") ||
    m.includes("cair")
  ) {
    return "Pilihan tepat kak! Untuk Gadai BPKB Motor: syaratnya KTP, KK, BPKB & STNK asli (Honda / Yamaha / Kawasaki). Estimasi dana cair sampai 85% dari nilai taksiran, tenor fleksibel 6-36 bulan, suku bunga mulai 0.85% flat/bulan. Bisa cek Simulator Live di halaman utama ya!";
  }

  if (
    m.includes("motor") ||
    m.includes("beli") ||
    m.includes("kredit") ||
    m.includes("adv") ||
    m.includes("pcx") ||
    m.includes("vario")
  ) {
    return "Kami menyediakan Kredit Motor Baru Honda tipe ADV 160, PCX 160, Vario 160 dengan promo DP ringan mulai Rp 2,5 Jt & bunga kompetitif. Unit ready stock! Anda berminat tipe mana? Kami bantu simulasi cicilan per bulan.";
  }

  if (
    m.includes("syarat") ||
    m.includes("persyaratan") ||
    m.includes("dokumen") ||
    m.includes("ktp")
  ) {
    return "✅ Persyaratan Standar (Gadai BPKB & Kredit Motor):\n• KTP asli (Suami + Istri jika menikah)\n• Kartu Keluarga\n• BPKB & STNK asli (untuk Gadai BPKB)\n• Slip gaji / rekening koran 3 bulan terakhir\n• NPWP (opsional plafon > 50 Jt)\n\nBerkas bisa di-scan & dikirim via WhatsApp nanti.";
  }

  if (
    m.includes("simulasi") ||
    m.includes("angsuran") ||
    m.includes("cicilan") ||
    m.includes("harga")
  ) {
    return "Silakan cek Simulator Live di section KALKULATOR SIMULASI pada halaman utama! Atau kirim: tipe motor / nilai BPKB, DP yang diinginkan, dan pilihan tenor. Tim kami bantu hitungkan angsuran akurat untuk Anda.";
  }

  if (
    m.includes("wa") ||
    m.includes("whatsapp") ||
    m.includes("telepon") ||
    m.includes("hubungi") ||
    m.includes("cs")
  ) {
    return "Tim Agency Honda siap melayani:\n📞 Call: (021) 1500-672\n💬 WhatsApp: 0812-8888-6720\n📧 Email: care@agencyhonda.co.id\n🕓 Senin-Jumat 08:00-17:00, Sabtu 08:00-14:00 WIB\nAnda juga bisa klik tombol AJUKAN di halaman, tim kami akan membalas < 30 menit.";
  }

  return "Terima kasih atas pesannya kak 👋 Silakan pilih salah satu menu cepat di atas atau kirimkan pertanyaan detail Anda. Ada opsi: (1) Dana Multiguna BPKB, (2) Kredit Motor Baru Honda, (3) Simulasi Angsuran, (4) Persyaratan Dokumen.";
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const messageIdRef = useRef(0);

  const send = async (raw: string) => {
    const message = raw.trim();

    if (!message) return;

    const userMsg: Message = {
      id: `u-${++messageIdRef.current}`,
      sender_type: "customer",
      message,
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      let reply: string = ruleReply(message);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        });

        if (res.ok) {
          const json = (await res.json()) as { reply?: string };

          if (json.reply) {
            reply = json.reply;
          }
        }
      } catch {
        // Gunakan fallback ruleReply jika API gagal.
      }

      const adminMsg: Message = {
        id: `a-${++messageIdRef.current}`,
        sender_type: "admin",
        message: reply,
      };

      setMessages((prev) => [...prev, adminMsg]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open || messages.length > 0) return;

    const tid = setTimeout(() => {
      setMessages([
        {
          id: "welcome",
          sender_type: "admin",
          message:
            "Halo kak! 👋 Selamat datang di Agency Honda Official Dealer. Ada yang bisa kami bantu seputar Kredit Motor Baru Honda atau Gadai BPKB Multiguna?",
        },
      ]);
    }, 200);

    return () => clearTimeout(tid);
  }, [open, messages.length]);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {open ? (
        <div className="mb-0 flex h-[560px] w-[380px] max-w-[94vw] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          {/* HEADER CHAT DIBUKA */}
          <div className="flex items-center justify-between gap-3 border-b border-red-100 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 px-4 py-3 text-white">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="relative h-12 w-12 rounded-full p-[2px] bg-gradient-to-br from-red-500 via-red-600 to-red-700 shadow-lg shadow-red-600/20">
                  <div className="h-full w-full overflow-hidden rounded-full bg-white">
                    <Image
                      src={BOT_AVATAR_SRC}
                      alt={BOT_AVATAR_ALT}
                      width={44}
                      height={44}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-display text-[15px] font-bold leading-none tracking-wide text-white">
                  {BOT_NAME}
                </p>
                <p className="mt-1 truncate text-[11px] font-medium text-slate-300">
                  {BOT_TITLE}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Online
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex shrink-0 items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-2.5 py-2 text-sm text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Tutup chat"
            >
              <X className="h-4 w-4" />
              <span className="hidden sm:inline text-xs font-semibold tracking-wide">
                Tutup
              </span>
            </button>
          </div>

          {/* BODY CHAT (existing) */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={
                  msg.sender_type === "customer"
                    ? "flex justify-end"
                    : "flex items-end justify-start gap-2"
                }
              >
                {msg.sender_type === "admin" ? (
                  <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-sm">
                    <Image
                      src={BOT_AVATAR_SRC}
                      alt={BOT_AVATAR_ALT}
                      width={28}
                      height={28}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null}
                <div
                  className={
                    msg.sender_type === "customer"
                      ? "max-w-[82%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-gradient-to-br from-red-600 to-red-700 p-3 text-sm leading-relaxed text-white shadow-sm"
                      : "max-w-[82%] whitespace-pre-wrap rounded-2xl rounded-bl-sm border border-slate-200 bg-white p-3 text-sm leading-relaxed text-slate-800 shadow-sm"
                  }
                >
                  {msg.message}
                </div>
              </div>
            ))}

            {loading ? (
              <div className="flex items-end justify-start gap-2">
                <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-sm">
                  <Image
                    src={BOT_AVATAR_SRC}
                    alt={BOT_NAME}
                    width={28}
                    height={28}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex gap-1.5 rounded-2xl rounded-bl-sm border border-slate-200 bg-white p-3 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                </div>
              </div>
            ) : null}
          </div>

          {/* QUICK REPLY & INPUT (existing) */}
          <div className="no-scrollbar flex gap-2 overflow-x-auto border-t border-slate-200 bg-slate-100 p-2.5">
            {QUICK.map((item) => (
              <button
                key={item}
                type="button"
                className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[12px] font-semibold text-slate-700 shadow-sm transition-colors hover:border-red-400 hover:text-red-600 hover:bg-red-50"
                onClick={() => void send(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <form
            className="flex gap-2 border-t border-slate-200 bg-white p-3"
            onSubmit={(event) => {
              event.preventDefault();

              if (!text.trim()) return;

              void send(text);
              setText("");
            }}
          >
            <Input
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Ketik pesan Anda disini..."
              className="flex h-11 rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500/20"
            />

            <Button
              type="submit"
              disabled={loading || !text.trim()}
              className="h-11 rounded-xl bg-gradient-to-br from-red-600 to-red-700 px-5 font-bold uppercase tracking-wider text-white shadow-lg shadow-red-600/20 hover:from-red-700 hover:to-red-800"
            >
              Kirim
            </Button>
          </form>
        </div>
      ) : null}

      {/* FLOATING BUTTON — CHAT DITUTUP */}
      <button
        id="nsc-chat-widget-trigger"
        data-chat-trigger="true"
        type="button"
        onClick={() => setOpen(true)}
        className="group flex items-center gap-3 rounded-full border border-red-100 bg-white pl-2 pr-5 py-2 shadow-2xl shadow-slate-900/10 transition-all hover:shadow-red-500/20 hover:scale-[1.02]"
        aria-label="Buka chat dengan Affiyah, Customer Service NSC Finance"
      >
        {/* Avatar utama lingkaran */}
        <div className="relative shrink-0">
          <div className="relative h-14 w-14 rounded-full p-[3px] bg-gradient-to-br from-red-500 via-red-600 to-red-700 shadow-xl shadow-red-600/30">
            <div className="h-full w-full overflow-hidden rounded-full bg-white">
              <Image
                src={BOT_AVATAR_SRC}
                alt={BOT_AVATAR_ALT}
                width={50}
                height={50}
                unoptimized
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          {/* Indikator online */}
          <span className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
          </span>
        </div>

        {/* Label nama & jabatan */}
        <span className="flex flex-col items-start text-left">
          <span className="block text-[14px] font-black uppercase tracking-wide text-slate-900 transition-colors group-hover:text-red-600">
            {BOT_NAME}
          </span>
          <span className="block text-[11px] font-semibold leading-tight text-slate-500 group-hover:text-slate-700">
            {BOT_TITLE}
          </span>
        </span>
      </button>
    </div>
  );
}