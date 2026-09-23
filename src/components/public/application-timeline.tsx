import type { ApplicationStatus } from "@/types/application";
import { APPLICATION_TIMELINE } from "@/types/application";
import { cn } from "@/lib/utils/cn";

const LABELS: Record<ApplicationStatus, string> = {
  submitted: "Pengajuan Terkirim",
  verification: "Verifikasi",
  follow_up: "Follow Up",
  survey: "Survey",
  processing: "Proses",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

export function ApplicationTimeline({ status }: { status: ApplicationStatus }) {
  const current = APPLICATION_TIMELINE.indexOf(status);
  return (
    <ol className="space-y-2">
      {APPLICATION_TIMELINE.map((step, index) => (
        <li key={step} className={cn("rounded-lg border px-3 py-2 text-sm", index <= current && status !== "cancelled" ? "border-red-200 bg-red-50 font-semibold" : "border-slate-200 text-slate-500")}>
          {LABELS[step]}
        </li>
      ))}
    </ol>
  );
}
