"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/conversations", label: "Live Chat" },
  { href: "/admin/applications", label: "Pengajuan" },
  { href: "/admin/customers", label: "Customer" },
  { href: "/admin/motorcycles", label: "Motor" },
  { href: "/admin/rate-cards", label: "Rate Card" },
  { href: "/admin/follow-ups", label: "Follow Up" },
  { href: "/admin/knowledge-base", label: "Knowledge Base" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-60 shrink-0 border-r border-slate-200 bg-white p-4">
      <p className="mb-6 font-display text-lg font-bold uppercase">NSC Admin</p>
      <nav className="flex flex-col gap-1">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn("rounded-lg px-3 py-2 text-sm font-medium", active ? "bg-red-600 text-white" : "text-slate-700 hover:bg-slate-100")}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
