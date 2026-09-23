export function LoadingState({ label = "Memuat data..." }: { label?: string }) {
  return <p className="text-sm text-slate-500">{label}</p>;
}
