import { NextResponse } from "next/server";
import { generateReply } from "@/lib/chatbot/engine";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { message?: string; conversation_id?: string };
    const message = (body.message ?? "").trim();
    if (!message) {
      return NextResponse.json({ error: "Pesan tidak boleh kosong" }, { status: 400 });
    }

    let client;
    try {
      client = createAdminClient();
    } catch {
      client = null;
    }

    const reply = await generateReply(message, {
      conversation_id: body.conversation_id,
      supabaseClient: client,
    });

    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Gagal memproses pesan" },
      { status: 500 },
    );
  }
}
