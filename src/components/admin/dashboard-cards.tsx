import { Card } from "@/components/ui/card";
import type { DashboardStats } from "@/types/admin";

export function DashboardCards({ stats }: { stats: DashboardStats }) {
  const items = [
    { label: "Total Customer", value: stats.totalCustomers },
    { label: "Pengajuan Hari Ini", value: stats.applicationsToday },
    { label: "Pengajuan BPKB", value: stats.bpkbApplications },
    { label: "Pengajuan Motor Baru", value: stats.newMotorApplications },
    { label: "Chat Aktif", value: stats.activeChats },
    { label: "Need Admin", value: stats.needAdmin },
    { label: "Follow Up", value: stats.followUps },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label}>
          <p className="text-xs uppercase text-slate-500">{item.label}</p>
          <p className="mt-2 font-display text-3xl font-bold">{item.value}</p>
        </Card>
      ))}
    </div>
  );
}
