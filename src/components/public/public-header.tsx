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

type NavChildItem = {
  href: string;
  label: string;
  external?: boolean;
  desc?: string;
};

type NavItem = {
  href: string;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children?: NavChildItem[];
};

// Nav customer HANYA MUNCUL JIKA SUDAH TERIDENTIFIKASI (isCustomerIdentified = TRUE).
// Sebelumnya NAV lama disembunyikan seluruhnya (sesuai aturan bisnis nomor 7 & 8).
const NAV_CUSTOMER_AFTER_IDENTIFIED: readonly NavItem[] = [
  { href: "/bpkb", label: "Dana Tunai" },
  { href: "/motor", label: "Kredit Motor" },
  { href: "/simulasi", label: "Simulasi" },
  { href: "/faq", label: "Tentang Kami" },
  {
    href: "#chat-widget",
    label: "Chat",
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const chat = document.getElementById("nsc-chat-widget-trigger");
      if (chat) chat.click();
      else {
        const trigger = document.querySelector('[data-chat-trigger="true"]');
        if (trigger instanceof HTMLElement) trigger.click();
      }
    },
  },
];

export function PublicHeader({
  isCustomerIdentified = false,
  customerName = null,
}: {
  isCustomerIdentified?: boolean;
  customerName?: string | null;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [motorOpen, setMotorOpen] = useState(false);

  const NAV: readonly NavItem[] = isCustomerIdentified
    ? NAV_CUSTOMER_AFTER_IDENTIFIED
    : [];

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
                  : !item.href.startsWith("#") && pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  onClick={
                    "onClick" in item
                      ? (item as { onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }).onClick
                      : undefined
                  }
                  className={cn(
                    "rounded-lg px-3.5 py-2 text-[13px] font-semibold text-slate-700 transition-all hover:text-red-600 hover:bg-white/60",
                    active && "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200",
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
