import { NextResponse } from "next/server";
import { cookies } from "next/headers";
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
    const VALID_ADMIN = { email: "admin@nscfinance.id", password: "password123" };
    const VALID_USER = { email: "user@example.com", password: "password123" };

    const okAdmin = email === VALID_ADMIN.email && password === VALID_ADMIN.password;
    const okUser = email === VALID_USER.email && password === VALID_USER.password;

    if (!okAdmin && !okUser) {
      return NextResponse.json(
        { error: "Email atau password salah. Gunakan demo access di halaman login." },
        { status: 401 },
      );
    }

    const role = okAdmin ? "admin" : "customer";
    const cookieStore = await cookies();
    cookieStore.set("nsc_auth", JSON.stringify({ email, role, ts: Date.now() }), {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 12,
      path: "/",
    });

    return NextResponse.json({ ok: true, role });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Login gagal" },
      { status: 500 },
    );
  }
}
