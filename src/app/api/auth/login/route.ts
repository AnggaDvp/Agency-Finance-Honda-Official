import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/validations/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Email atau password tidak valid" },
        { status: 400 },
      );
    }

    const { email, password } = parsed.data;
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) {
      return NextResponse.json(
        { error: "Email atau password salah. Silakan periksa kembali atau hubungi admin." },
        { status: 401 },
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", data.user.id)
      .maybeSingle();

    let role = "customer";
    if (!profileError && profile) {
      role = (profile as { role: string }).role;
    }

    const redirectTo = role === "admin" || role === "supervisor" ? "/admin" : "/";

    return NextResponse.json({ ok: true, role, redirectTo });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Login gagal" },
      { status: 500 },
    );
  }
}
