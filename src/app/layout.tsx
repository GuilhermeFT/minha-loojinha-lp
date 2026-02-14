import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StickyCtaMobile } from "@/components/sticky-cta-mobile";
import { CheckoutProvider } from "@/components/checkout-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_URL ?? "https://minhaloojinha.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Minha Loojinha | Venda no WhatsApp em Anápolis, Goiânia e região",
    template: "%s | Minha Loojinha",
  },
  description:
    "Solução para MEIs e lojistas de Anápolis, Goiânia e região venderem online no WhatsApp. Catálogo estruturado, pedidos organizados, pagamento online e estoque automático. 90 dias grátis.",
  keywords: [
    "WhatsApp vendas",
    "Anápolis",
    "Goiânia",
    "catálogo WhatsApp",
    "vendas online",
    "MEI",
  ],
  openGraph: {
    title:
      "Minha Loojinha | Venda no WhatsApp em Anápolis, Goiânia e região",
    description:
      "Solução para MEIs e lojistas de Anápolis, Goiânia e região venderem online no WhatsApp. Catálogo estruturado, pagamento online, estoque automático.",
    url: siteUrl,
    siteName: "Minha Loojinha",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Minha Loojinha | Venda no WhatsApp em Anápolis, Goiânia e região",
    description:
      "Solução para MEIs e lojistas de Anápolis, Goiânia e região venderem online no WhatsApp.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pb-24 md:pb-0`}
      >
        <CheckoutProvider>
          <Header />
          {children}
          <Footer />
          <StickyCtaMobile />
        </CheckoutProvider>
      </body>
    </html>
  );
}
