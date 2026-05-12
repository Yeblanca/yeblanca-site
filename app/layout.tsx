import type { Metadata } from 'next'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import '../globals.css'

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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${grotesk.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  )
}
