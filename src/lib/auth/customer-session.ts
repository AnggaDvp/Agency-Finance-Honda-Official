/**
 * Customer Session JWT — TANPA dependency eksternal (jose/jsonwebtoken).
 * Menggunakan WebCrypto API (HMAC-SHA256, symmetric key) + Base64URL encoding.
 *
 * Dijamin hanya server-side saja yang bisa sign/verify.
 * Token disimpan di HTTP-ONLY cookie (JANGAN localStorage!).
 *
 * Struktur token payload:
 * {
 *   sub: <customer-id-uuid>,
 *   name: <customer-name>,
 *   phone: <phone-normalized>,
 *   iat: <issued-at-epoch>,
 *   exp: <expires-at-epoch>
 * }
 */

import { randomUUID } from "node:crypto";

type SessionPayload = {
  sub: string;
  name: string;
  phone: string;
  iat: number;
  exp: number;
};

const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 hari

/**
 * Dapatkan HMAC key dari env NSC_SESSION_SECRET.
 * Fallback ke default DEVELOPMENT KEY jika tidak ada (DEVELOPMENT ONLY!)
 * Di production, WAJIB set NSC_SESSION_SECRET minimal 32 bytes random string.
 */
let cachedKey: CryptoKey | null = null;
async function getKey(): Promise<CryptoKey> {
  if (cachedKey) return cachedKey;
  const secretBase = process.env.NSC_SESSION_SECRET ?? "NSC_DEV_FALLBACK_SESSION_SECRET_DO_NOT_USE_IN_PROD_32BYTES_xxxx";
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secretBase);
  cachedKey = await globalThis.crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" } as HmacImportParams,
    false,
    ["sign", "verify"],
  );
  return cachedKey;
}

function encodeBase64Url(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof ArrayBuffer ? new Uint8Array(buf) : buf;
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]!);
  const b64 = globalThis.btoa(binary);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBase64Url(str: string): Uint8Array {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4;
  const padded = pad ? b64 + "=".repeat(4 - pad) : b64;
  const binary = globalThis.atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export async function createCustomerSession(params: {
  customerId: string;
  name: string;
  phone: string;
}): Promise<string> {
  const key = await getKey();
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    sub: params.customerId,
    name: params.name,
    phone: params.phone,
    iat: now,
    exp: now + TOKEN_TTL_SECONDS,
  };
  const enc = new TextEncoder();
  const headerPart = encodeBase64Url(enc.encode(JSON.stringify({ alg: "HS256", typ: "JWT" })));
  const payloadPart = encodeBase64Url(enc.encode(JSON.stringify(payload)));
  const signingInput = `${headerPart}.${payloadPart}`;
  const sig = await globalThis.crypto.subtle.sign("HMAC", key, enc.encode(signingInput));
  const sigPart = encodeBase64Url(sig);
  return `${headerPart}.${payloadPart}.${sigPart}`;
}

export async function verifyCustomerSession(token: string | null | undefined): Promise<SessionPayload | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [headerPart, payloadPart, sigPart] = parts as [string, string, string];
  if (!headerPart || !payloadPart || !sigPart) return null;

  try {
    const key = await getKey();
    const enc = new TextEncoder();
    const signingInput = `${headerPart}.${payloadPart}`;

    const encodedSig = decodeBase64Url(sigPart);
    const sigBuffer = new ArrayBuffer(encodedSig.byteLength);
    new Uint8Array(sigBuffer).set(encodedSig);

    const encodedInput = enc.encode(signingInput);
    const inputBuffer = new ArrayBuffer(encodedInput.byteLength);
    new Uint8Array(inputBuffer).set(encodedInput);

    const valid = await globalThis.crypto.subtle.verify("HMAC", key, sigBuffer, inputBuffer);
    if (!valid) return null;

    const payload = JSON.parse(new TextDecoder().decode(decodeBase64Url(payloadPart))) as SessionPayload;
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) return null; // expired
    if (!payload.sub || !payload.phone) return null;
    return payload;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE_NAME = "nsc_customer_session";

export const SESSION_MAX_AGE_SECONDS = TOKEN_TTL_SECONDS;

export function nonce(): string {
  return randomUUID();
}
