/**
 * normalizePhone() — Konsisten dengan lib/validations/application.ts.
 *
 * RULE:
 * - Input "62813..." → output "0813..."
 * - Input "813..."    → output "0813..."
 * - Input "+62813..."  → output "0813..."
 * - Input "0813..."    → output tetap "0813..."
 * - Hapus semua karakter non-digit (spasi, strip, dll)
 */
export function normalizePhone(raw: string): string {
  if (!raw) return "";
  let digits = String(raw).replace(/\D/g, "");
  if (digits.startsWith("62")) {
    digits = "0" + digits.slice(2);
  } else if (digits.startsWith("8")) {
    digits = "0" + digits;
  }
  return digits;
}

/**
 * formatPhoneDisplay() — format display agar mudah dibaca user.
 * Contoh: 081315379958 → 0813-1537-9958
 */
export function formatPhoneDisplay(raw: string): string {
  const normalized = normalizePhone(raw);
  if (!normalized) return raw ?? "";
  if (normalized.length === 12) {
    return `${normalized.slice(0, 4)}-${normalized.slice(4, 8)}-${normalized.slice(8)}`;
  }
  if (normalized.length === 11) {
    return `${normalized.slice(0, 4)}-${normalized.slice(4, 8)}-${normalized.slice(8)}`;
  }
  if (normalized.length === 13) {
    return `${normalized.slice(0, 4)}-${normalized.slice(4, 8)}-${normalized.slice(8)}`;
  }
  return normalized;
}
