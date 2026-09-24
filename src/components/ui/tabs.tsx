"use client";

import { cn } from "@/lib/utils/cn";
import { createContext, useContext, useState } from "react";

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used inside <Tabs>");
  return ctx;
}

export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  children,
}: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}) {
  const [internal, setInternal] = useState(defaultValue ?? "");
  const value = controlledValue ?? internal;
  const setValue = (next: string) => {
    if (controlledValue === undefined) setInternal(next);
    onValueChange?.(next);
  };
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 px-4 pt-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { value: active, setValue } = useTabsContext();
  const isActive = active === value;
  return (
    <button
      type="button"
      onClick={() => setValue(value)}
      className={cn(
        "-mb-px rounded-t-xl border border-transparent px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors",
        isActive && "border-slate-200 border-b-white bg-white text-red-600 shadow-[0_-1px_0_0_#b70011_inset]",
        !isActive && "hover:text-slate-900",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { value: active } = useTabsContext();
  if (active !== value) return null;
  return <div className={cn("p-0", className)}>{children}</div>;
}
