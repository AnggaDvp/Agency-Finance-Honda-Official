"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

const NAV = [
  { href: "/", label: "Beranda" },
  {
    href: "/motor",
    label: "Motor",
    children: [
      {
        href: "/motor",
        label: "Katalog Motor Baru",
        desc: "Lihat semua unit Honda ready stock",
      },
      {
        href: "/pengajuan",
        label: "Pengajuan Kredit Motor",
        desc: "Isi formulir online & respon cepat",
      },
      {
        href: "/simulasi",
        label: "Simulasi Angsuran",
        desc: "Hitung cicilan DP & tenor pilihan",
      },
      {
        href: "https://www.astra-honda.com/product/vario-evo-160",
        label: "Honda Vario EVO 160",
        desc: "Produk terlaris bulan ini",
        external: true,
      },
    ],
  },
  {
    href: "/bpkb",
    label: "Dana Tunai",
    children: [
      {
        href: "/bpkb",
        label: "Gadai BPKB Motor",
        desc: "Dana cair sampai 85% nilai motor",
      },
      {
        href: "/pengajuan",
        label: "Ajukan Online Sekarang",
        desc: "Proses cepat 24 jam cair",
      },
    ],
  },
  { href: "/simulasi", label: "Simulasi" },
  { href: "/faq", label: "Tentang Kami" },
];

export function PublicHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [motorOpen, setMotorOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="hidden items-center justify-between gap-4 border-b border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-2 text-xs text-slate-200 lg:flex lg:px-12">
        <div className="mx-auto flex w-full max-w-site items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-red-400" />
              Senin - Sabtu: 08.00 - 17.00 WIB
            </span>
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Terdaftar OJK & Terverifikasi
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="tel:0211500672"
              className="inline-flex items-center gap-1.5 hover:text-red-400 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-red-400" />
              (021) 1500-672
            </a>
            <a
              href="https://wa.me/6281288886720"
              className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
              WhatsApp CS
            </a>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-site items-center justify-between gap-4 px-6 lg:px-12">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-red-700 shadow-md shadow-red-600/20 font-display text-lg font-extrabold text-white ring-2 ring-red-100">
              NSC
            </span>
            <span className="hidden sm:block">
              <span className="flex items-center gap-2">
                <span className="block font-display text-lg font-bold uppercase leading-none tracking-wide text-slate-900">
                  NSC Finance
                </span>
                <span className="rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">
                  Resmi
                </span>
              </span>
              <span className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                Pembiayaan Motor Honda &amp; Dana Multiguna
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-xl border border-slate-200/80 bg-gradient-to-r from-slate-50 to-slate-100 p-1.5 shadow-inner xl:flex">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              if (item.children) {
                return (
                  <div key={item.label} className="relative group">
                    <button
                      type="button"
                      className={cn(
                        "flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13px] font-semibold text-slate-700 transition-all hover:text-red-600 hover:bg-white/60",
                        active &&
                          "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200",
                      )}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                    </button>
                    <div className="invisible absolute left-0 top-full z-50 mt-2 flex w-72 flex-col gap-1 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-2xl ring-1 ring-black/5 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 translate-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href + child.label}
                          href={child.href}
                          target={child.external ? "_blank" : undefined}
                          rel={child.external ? "noopener noreferrer" : undefined}
                          className="group/item rounded-xl px-3 py-2.5 text-sm transition-all hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent"
                        >
                          <div className="flex items-center gap-2">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 group-hover/item:bg-red-600 group-hover/item:text-white transition-colors">
                              <ChevronDown className="h-4 w-4 -rotate-90" />
                            </span>
                            <span>
                              <span className="block font-semibold text-slate-800 group-hover/item:text-red-700">
                                {child.label}
                                {child.external && (
                                  <span className="ml-1.5 text-[10px] font-bold uppercase text-red-600">
                                    ↗
                                  </span>
                                )}
                              </span>
                              {"desc" in child && child.desc && (
                                <span className="block text-xs text-slate-500">
                                  {child.desc}
                                </span>
                              )}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3.5 py-2 text-[13px] font-semibold text-slate-700 transition-all hover:text-red-600 hover:bg-white/60",
                    active &&
                      "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:border-red-500 hover:text-red-600 transition-all sm:inline-flex"
            >
              Login
            </Link>
            <Link
              href="/pengajuan"
              className="hidden items-center gap-1.5 rounded-xl bg-gradient-to-br from-red-600 to-red-700 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-600/25 hover:from-red-700 hover:to-red-800 hover:shadow-red-600/40 transition-all sm:inline-flex"
            >
              Ajukan Sekarang
              <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
            </Link>
            <button
              type="button"
              className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm hover:border-red-300 transition-colors xl:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label="Buka menu"
            >
              {open ? (
                <X className="h-5 w-5 text-slate-800" />
              ) : (
                <Menu className="h-5 w-5 text-slate-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white px-6 py-5 shadow-xl xl:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-bold bg-slate-50 text-slate-900"
                      onClick={() => setMotorOpen((value) => !value)}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          motorOpen && "rotate-180",
                        )}
                      />
                    </button>
                    {motorOpen
                      ? item.children.map((child) => (
                          <Link
                            key={child.href + child.label}
                            href={child.href}
                            target={child.external ? "_blank" : undefined}
                            rel={
                              child.external
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="block rounded-lg px-3 py-2.5 pl-6 text-sm text-slate-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => setOpen(false)}
                          >
                            <span className="font-semibold">
                              {child.label}
                              {child.external && " ↗"}
                            </span>
                            {"desc" in child && child.desc && (
                              <span className="mt-0.5 block text-xs text-slate-400">
                                {child.desc}
                              </span>
                            )}
                          </Link>
                        ))
                      : null}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block rounded-lg px-3 py-3 text-sm font-bold text-slate-900 hover:bg-red-50 hover:text-red-700"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-3 flex gap-2 pt-3 border-t border-slate-200">
              <Link
                href="/pengajuan"
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-white"
                onClick={() => setOpen(false)}
              >
                Ajukan Sekarang
              </Link>
              <Link
                href="/login"
                className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-slate-800"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
