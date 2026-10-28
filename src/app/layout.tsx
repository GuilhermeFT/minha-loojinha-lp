import './globals.css'

import type { Metadata } from 'next'
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GoogleTagManager } from '@next/third-parties/google'
import { Suspense } from 'react'
import { MetaPixel } from '@/components/meta-pixel'
import { BetaBanner } from '@/components/beta-banner'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { StickyCtaMobile } from '@/components/sticky-cta-mobile'
import { CheckoutProvider } from '@/components/checkout-provider'
import { LpContentProvider } from '@/components/lp-content-context'
import { CookieConsent } from '@/components/cookie-consent'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Plus Jakarta Sans: a fonte do painel (DESIGN.md do Stitch). Só a LP nova (home e cidades) usa;
// o resto do site, inclusive /classico (controle do teste), continua em Geist.
const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
})

const siteUrl = process.env.NEXT_PUBLIC_URL ?? 'https://minhaloojinha.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Minha Loojinha | Venda no WhatsApp em Anápolis, Goiânia e região',
    template: '%s | Minha Loojinha',
  },
  description:
    'Solução para MEIs e lojistas de Anápolis, Goiânia e região venderem online no WhatsApp. Catálogo estruturado, pedidos organizados e estoque automático. Comece grátis, sem cartão.',
  keywords: [
    'WhatsApp vendas',
    'Anápolis',
    'Goiânia',
    'catálogo WhatsApp',
    'vendas online',
    'MEI',
  ],
  authors: [{ name: 'Minha Loojinha', url: siteUrl }],
  creator: 'Minha Loojinha',
  openGraph: {
    title: 'Minha Loojinha | Venda no WhatsApp em Anápolis, Goiânia e região',
    description:
      'Solução para MEIs e lojistas de Anápolis, Goiânia e região venderem online no WhatsApp. Catálogo estruturado, estoque automático. Comece grátis, sem cartão.',
    url: siteUrl,
    siteName: 'Minha Loojinha',
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Minha Loojinha | Venda no WhatsApp em Anápolis, Goiânia e região',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Minha Loojinha | Venda no WhatsApp em Anápolis, Goiânia e região',
    description:
      'Solução para MEIs e lojistas de Anápolis, Goiânia e região venderem online no WhatsApp.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jakarta.variable} antialiased overflow-x-hidden pb-28 md:pb-0`}
      >
        <CheckoutProvider>
          <LpContentProvider>
            <BetaBanner />
            <Header />
            {children}
            <Footer />
            <StickyCtaMobile />
            <CookieConsent />
          </LpContentProvider>
        </CheckoutProvider>
        <Analytics />
        {/* useSearchParams exige Suspense para não forçar renderização dinâmica */}
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        {process.env.NEXT_PUBLIC_GTAG_MANAGER_ID ? (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTAG_MANAGER_ID} />
        ) : null}
      </body>
    </html>
  )
}
