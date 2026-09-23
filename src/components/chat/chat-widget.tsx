"use client";

import { useEffect, useState } from "react";
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

function ruleReply(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("bpkb") || m.includes("gadai") || m.includes("dana") || m.includes("cair")) {
    return "Pilihan tepat kak! Untuk Gadai BPKB Motor: syaratnya KTP, KK, BPKB & STNK asli, motor usia maks. 10 tahun (Honda / Yamaha / Kawasaki). Estimasi dana cair sampai 85% dari nilai taksiran, tenor fleksibel 6-36 bulan, suku bunga mulai 0.85% flat/bulan. Bisa cek Simulator Live di halaman utama ya!";
  }
  if (m.includes("motor") || m.includes("beli") || m.includes("kredit") || m.includes("adv") || m.includes("pcx") || m.includes("vario")) {
    return "Kami menyediakan Kredit Motor Baru Honda tipe ADV 160, PCX 160, Vario 160 dengan promo DP ringan mulai Rp 2,5 Jt & bunga kompetitif. Unit ready stock! Anda berminat tipe mana? Kami bantu simulasi cicilan per bulan.";
  }
  if (m.includes("syarat") || m.includes("persyaratan") || m.includes("dokumen") || m.includes("ktp")) {
    return "✅ Persyaratan Standar (Gadai BPKB & Kredit Motor):\n• KTP asli (Suami + Istri jika menikah)\n• Kartu Keluarga\n• BPKB & STNK asli (untuk Gadai BPKB)\n• Slip gaji / rekening koran 3 bulan terakhir\n• NPWP (opsional plafon > 50 Jt)\n\nBerkas bisa di-scan & dikirim via WhatsApp nanti.";
  }
  if (m.includes("simulasi") || m.includes("angsuran") || m.includes("cicilan") || m.includes("harga")) {
    return "Silakan cek Simulator Live di section KALKULATOR SIMULASI pada halaman utama! Atau kirim: tipe motor / nilai BPKB, DP yang diinginkan, dan pilihan tenor. Tim kami bantu hitungkan angsuran akurat untuk Anda.";
  }
  if (m.includes("wa") || m.includes("whatsapp") || m.includes("telepon") || m.includes("hubungi") || m.includes("cs")) {
    return "Tim Agency Honda siap melayani:\n📞 Call: (021) 1500-672\n💬 WhatsApp: 0812-8888-6720\n📧 Email: care@agencyhonda.co.id\n🕓 Senin-Jumat 08:00-17:00, Sabtu 08:00-14:00 WIB\nAnda juga bisa klik tombol AJUKAN di halaman, tim kami akan membalas < 30 menit.";
  }
  return "Terima kasih atas pesannya kak 👋 Silakan pilih salah satu menu cepat di atas atau kirimkan pertanyaan detail Anda. Ada opsi: (1) Dana Multiguna BPKB, (2) Kredit Motor Baru Honda, (3) Simulasi Angsuran, (4) Persyaratan Dokumen.";
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const send = async (raw: string) => {
    const message = raw.trim();
    if (!message) return;
    const userMsg: Message = {
      id: "u-" + Date.now(),
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        });
        if (res.ok) {
          const json = (await res.json()) as { reply?: string };
          if (json.reply) reply = json.reply;
        }
      } catch {}
      const adminMsg: Message = {
        id: "a-" + Date.now(),
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
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {open ? (
        <div className="mb-4 flex h-[560px] w-[380px] max-w-[94vw] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl flex-col-reverse">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between bg-slate-900 p-4 text-white border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">
                    support_agent
                  </span>
                </div>
                <div>
                  <p className="font-display text-base leading-none font-bold uppercase tracking-wide">
                    Agency Honda Care
                  </p>
                  <p className="mt-1 text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online • Respon &lt; 5 menit
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-slate-800 hover:bg-slate-700 px-2 py-1 text-sm text-slate-200 transition-colors flex items-center gap-1"
                aria-label="Tutup chat"
              >
                <X className="w-4 h-4" />
                Tutup
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={
                    msg.sender_type === "customer"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  <div
                    className={
                      msg.sender_type === "customer"
                        ? "max-w-[86%] rounded-2xl rounded-br-sm bg-red-600 p-3 text-sm text-white shadow-sm leading-relaxed whitespace-pre-wrap"
                        : "max-w-[86%] rounded-2xl rounded-bl-sm border border-slate-200 bg-white p-3 text-sm text-slate-800 shadow-sm leading-relaxed whitespace-pre-wrap"
                    }
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
              {loading ? (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm border border-slate-200 bg-white p-3 flex gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></span>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar border-t border-slate-200 bg-slate-100 p-2.5">
              {QUICK.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-body-sm font-medium text-slate-700 hover:border-red-400 hover:text-red-600 transition-colors shadow-sm"
                  onClick={() => void send(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <form
              className="flex gap-2 border-t border-slate-200 p-3 bg-white"
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
                className="flex h-11"
              />
              <Button
                type="submit"
                disabled={loading || !text.trim()}
                className="bg-red-600 hover:bg-red-700 text-white h-11 px-4 font-semibold tracking-wide"
              >
                Kirim
              </Button>
            </form>
          </div>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-xl hover:border-red-400 transition-all group"
      >
        <span className="relative flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
        </span>
        <span className="text-left">
          <span className="block text-[13px] font-bold text-slate-900 group-hover:text-red-600 transition-colors">
            CS Agency Honda
          </span>
          <span className="text-[11px] font-medium text-emerald-600">
            Siap membantu 24/7
          </span>
        </span>
        <span className="material-symbols-outlined text-red-600 text-[20px] group-hover:rotate-12 transition-transform">
          chat_bubble
        </span>
      </button>
    </div>
  );
}
