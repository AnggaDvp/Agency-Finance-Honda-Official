import type { Metadata } from "next";
import { Inter, Roboto_Condensed } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { ChatWidget } from "@/components/chat/chat-widget";
import { SESSION_COOKIE_NAME } from "@/lib/auth/customer-session";

const jakarta = Inter({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const barlow = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "NSC Finance - Pembiayaan Motor Honda",
  description:
    "Platform pembiayaan motor baru Honda dan dana multiguna beragunan BPKB. Simulasi angsuran, ajukan kredit online, dan konsultasi dengan tim kami.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const hasSession = Boolean(cookieStore.get(SESSION_COOKIE_NAME)?.value);
  const hasLegacyId = Boolean(cookieStore.get("nsc_onboarded_profile_id")?.value);
  const isCustomerIdentified = hasSession || hasLegacyId;

  return (
    <html lang="id" className={`${jakarta.variable} ${barlow.variable}`}>
      <body>
        <div className={`flex min-h-screen flex-col ${isCustomerIdentified ? "pt-20" : ""}`}>
          {isCustomerIdentified && (
            <PublicHeader
              isCustomerIdentified={isCustomerIdentified}
            />
          )}
          <main className="flex-1">{children}</main>
          <PublicFooter />
          <ChatWidget />
        </div>
      </body>
    </html>
  );
}
