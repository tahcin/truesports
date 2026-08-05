import type { Metadata } from 'next'
import { FONTSHARE_CSS } from '@/lib/fonts'
import { site } from '@/content/site'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WhatsAppFab } from '@/components/whatsapp-fab'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: Find the sport that fits your child.`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: site.name,
    url: site.url,
    title: `${site.name}: Find the sport that fits your child.`,
    description: site.description,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${site.name}: sports for all` }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        {/*
          Satoshi via the Fontshare API. ITF's licence permits free commercial
          use but asks that the webfont NOT be self-hosted without written
          consent, so this is a linked stylesheet rather than next/font/local.
          preconnect keeps the extra origin off the critical path.
          See lib/fonts.ts.
        */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTSHARE_CSS} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppFab />
      </body>
    </html>
  )
}
