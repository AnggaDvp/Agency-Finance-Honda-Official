export function formatRupiah(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "—";
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function parseMoney(input: string) {
  const digits = input.replace(/[^\d]/g, "");
  if (!digits) return undefined;
  return Number(digits);
}
