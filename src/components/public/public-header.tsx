"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

const NAV = [
  { href: "/", label: "Beranda" },
  { href: "/motor", label: "Motor", children: [
    { href: "/motor", label: "Katalog Motor Baru" },
    { href: "/bpkb", label: "Gadai BPKB Motor" },
    { href: "/pengajuan", label: "Pengajuan Kredit" },
  ]},
  { href: "/bpkb", label: "BPKB" },
  { href: "/simulasi", label: "Simulasi" },
  { href: "/faq", label: "FAQ" },
];

export function PublicHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [motorOpen, setMotorOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-site items-center justify-between gap-4 px-6 lg:px-12">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-600 font-display text-lg font-extrabold text-white">
            NSC
          </span>
          <span className="hidden sm:block">
            <span className="block font-display text-lg font-bold uppercase leading-none tracking-wide text-slate-900">
              NSC Finance
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
              Pembiayaan Motor
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-xl border border-slate-200/80 bg-slate-100 p-1.5 xl:flex">
          {NAV.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            if (item.children) {
              return (
                <div key={item.label} className="relative group">
                  <button
                    type="button"
                    className={cn(
                      "flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13px] font-semibold text-slate-700 transition-colors hover:text-red-600",
                      active && "bg-white text-slate-900 shadow-sm",
                    )}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="invisible absolute left-0 top-full z-50 mt-1 flex w-56 flex-col gap-1 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href + child.label}
                        href={child.href}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-red-600"
                      >
                        {child.label}
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
                  "rounded-lg px-3.5 py-2 text-[13px] font-semibold text-slate-700 transition-colors hover:text-red-600",
                  active && "bg-white text-slate-900 shadow-sm",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/pengajuan"
            className="hidden rounded-lg bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-700 sm:inline-flex"
          >
            Ajukan
          </Link>
          <Link
            href="/login"
            className="hidden rounded-lg border border-slate-300 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-800 hover:border-red-500 hover:text-red-600 sm:inline-flex"
          >
            Login
          </Link>
          <button
            type="button"
            className="rounded-lg border border-slate-200 p-2 xl:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Buka menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white px-6 py-4 xl:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-2 text-sm font-semibold"
                      onClick={() => setMotorOpen((value) => !value)}
                    >
                      {item.label}
                      <ChevronDown className={cn("h-4 w-4", motorOpen && "rotate-180")} />
                    </button>
                    {motorOpen
                      ? item.children.map((child) => (
                          <Link
                            key={child.href + child.label}
                            href={child.href}
                            className="block py-2 pl-3 text-sm text-slate-600"
                            onClick={() => setOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))
                      : null}
                  </>
                ) : (
                  <Link href={item.href} className="block py-2 text-sm font-semibold" onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link href="/login" className="mt-2 text-sm font-semibold text-red-600" onClick={() => setOpen(false)}>
              Login Admin / Customer
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
