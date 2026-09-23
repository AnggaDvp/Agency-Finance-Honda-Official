import { cn } from "@/lib/utils/cn";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700", className)}
      {...props}
    />
  );
}
