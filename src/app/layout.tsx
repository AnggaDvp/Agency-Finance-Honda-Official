import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Barlow_Semi_Condensed } from "next/font/google";
import "./globals.css";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { ChatWidget } from "@/components/chat/chat-widget";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const barlow = Barlow_Semi_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "NSC Finance - Pembiayaan Motor Honda",
  description:
    "Platform pembiayaan motor baru Honda dan dana multiguna beragunan BPKB. Simulasi angsuran, ajukan kredit online, dan konsultasi dengan tim kami.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${jakarta.variable} ${barlow.variable}`}>
      <body>
        <div className="flex min-h-screen flex-col pt-20">
          <PublicHeader />
          <main className="flex-1">{children}</main>
          <PublicFooter />
          <ChatWidget />
        </div>
      </body>
    </html>
  );
}
