import { SALES_CONSULTANT_SYSTEM_PROMPT } from "@/lib/chatbot/system-prompt";

export type LlmNaturalizeOptions = {
  userMessage: string;
  detectedIntent: string;
  context: Record<string, unknown>;
  systemDraftReply?: string | null;
  conversationHistory?: Array<{ role: "user" | "assistant"; content: string }>;
  signal?: AbortSignal;
};

const GEMINI_MODEL = "gemini-2.0-flash-lite";
const API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

function envGeminiKey(): string | null {
  const key = process.env.GOOGLE_API_KEY?.trim();
  return key && key.length > 0 ? key : null;
}

export function isLlmAvailable(): boolean {
  return !!envGeminiKey();
}

type GeminiPart = { text?: string };
type GeminiContent = {
  role: "user" | "model";
  parts: GeminiPart[];
};
type GeminiRequestBody = {
  systemInstruction?: { parts: GeminiPart[] };
  contents: GeminiContent[];
  generationConfig?: {
    temperature?: number;
    topP?: number;
    topK?: number;
    maxOutputTokens?: number;
    responseMimeType?: string;
  };
  safetySettings?: Array<{
    category: string;
    threshold: string;
  }>;
};
type GeminiCandidate = {
  content?: { parts?: GeminiPart[] };
  finishReason?: string;
};
type GeminiResponse = {
  candidates?: GeminiCandidate[];
  error?: { message?: string; code?: number };
};

function buildUserPrompt(opts: LlmNaturalizeOptions): string {
  const lines: string[] = [];
  lines.push(`=== KONTEKS INTERNAL ===`);
  lines.push(`Intent terdeteksi: ${opts.detectedIntent}`);
  lines.push(`Konteks ter-extract: ${JSON.stringify(opts.context, null, 0)}`);
  if (opts.systemDraftReply) {
    lines.push(``);
    lines.push(`JAWABAN DRAF DARI SISTEM (angka & fakta WAJIB dipertahankan persis, jangan ubah):`);
    lines.push(`--- DRAF MULAI ---`);
    lines.push(opts.systemDraftReply);
    lines.push(`--- DRAF SELESAI ---`);
  } else {
    lines.push(``);
    lines.push(`Jawaban draf: TIDAK ADA (UNKNOWN intent). Jawab sesuai spec Sales Consultant.`);
  }
  lines.push(``);
  lines.push(`=== PESAN CUSTOMER ===`);
  lines.push(opts.userMessage);
  lines.push(``);
  lines.push(`=== TUGAS ===`);
  lines.push(`Naturalisasikan jawaban sesuai spec Sales Consultant System Prompt.`);
  lines.push(`JANGAN ubah angka, nama motor, DP, cicilan, syarat dokumen, atau fakta dari draf sistem.`);
  lines.push(`Output HANYA teks jawaban final untuk customer.`);
  return lines.join("\n");
}

export async function naturalizeWithLlm(
  opts: LlmNaturalizeOptions,
): Promise<{ ok: true; text: string } | { ok: false; reason: string }> {
  const apiKey = envGeminiKey();
  if (!apiKey) return { ok: false, reason: "GOOGLE_API_KEY not configured" };

  try {
    const history: GeminiContent[] = (opts.conversationHistory ?? [])
      .map((m) => ({
        role: m.role === "user" ? "user" as const : "model" as const,
        parts: [{ text: m.content }],
      }));

    const lastUser: GeminiContent = {
      role: "user",
      parts: [{ text: buildUserPrompt(opts) }],
    };

    const body: GeminiRequestBody = {
      systemInstruction: {
        parts: [{ text: SALES_CONSULTANT_SYSTEM_PROMPT }],
      },
      contents: [...history, lastUser],
      generationConfig: {
        temperature: 0.5,
        topP: 0.95,
        maxOutputTokens: 600,
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
      ],
    };

    const endpoint = `${API_BASE}/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-goog-api-client": "nsc-finance/1.0",
      },
      body: JSON.stringify(body),
      signal: opts.signal ?? AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      let detail = `HTTP ${res.status}`;
      try {
        const t = await res.text();
        if (t) detail += ` ${t.slice(0, 240)}`;
      } catch {
        /* ignore */
      }
      return { ok: false, reason: detail };
    }

    const json = (await res.json()) as GeminiResponse;
    if (json.error?.message) {
      return { ok: false, reason: `Gemini error: ${json.error.message}` };
    }

    const first = json.candidates?.[0];
    const text = first?.content?.parts?.map((p) => p.text ?? "").join("").trim() ?? "";
    if (!text) {
      return { ok: false, reason: `Empty response (finishReason: ${first?.finishReason ?? "unknown"})` };
    }
    return { ok: true, text };
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    return { ok: false, reason };
  }
}
