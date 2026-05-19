import type { Metadata } from 'next'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Script from 'next/script'

import '@payloadcms/next/css'
import '../../globals.css'

import { routing } from '@/i18n/routing'
import { Providers } from '@/components/Providers'
import { SkipLink } from '@/components/layout/SkipLink'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '500', '700'],
  variable: '--font-grotesk',
  display: 'swap',
})

const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono-var',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'yeblanca — Web Development Agency',
    template: '%s | yeblanca',
  },
  description: 'Cross-border web development agency. Bilingual. Builds systems that go to production.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yeblanca.com'),
  icons: {
    icon: '/images/yebconfondo.png',
    apple: '/images/yebconfondo.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en' | 'es')) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${grotesk.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        {/* FOUC prevention: sets theme class before React hydrates */}
        <Script
          id="theme-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `try{let t=localStorage.getItem('theme')||'dark';document.documentElement.classList.add(t)}catch(e){document.documentElement.classList.add('dark')}`,
          }}
        />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Providers>
            <SkipLink />
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}