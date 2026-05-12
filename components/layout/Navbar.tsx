'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { usePathname, useRouter } from 'next/navigation'

export function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  function switchLocale(next: string) {
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/'))
  }

  const navLinks = [
    { href: `/${locale}/projects`, label: t('projects') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(240,240,240,0.08)] bg-[#0a0a0a]/90 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center h-8">
          <Image
            src="/images/yebconfondo (1).png"
            alt="yeblanca"
            width={80}
            height={20}
            className="h-full w-full object-cover"
            priority
          />
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                isActive(href)
                  ? 'text-[#FF3E7F] opacity-100'
                  : 'text-[rgba(240,240,240,0.45)] hover:text-[rgba(240,240,240,0.75)]'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: locale toggle + quote CTA + theme toggle */}
        <div className="flex items-center gap-4">
          {/* Locale toggle */}
          <button
            onClick={() => switchLocale(locale === 'en' ? 'es' : 'en')}
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.45)] hover:text-[rgba(240,240,240,0.75)] transition-colors"
          >
            {locale === 'en' ? 'ES' : 'EN'}
          </button>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.45)] hover:text-[rgba(240,240,240,0.75)] transition-colors"
          >
            {(theme ?? 'dark') === 'dark' ? '○' : '●'}
          </button>

          {/* Quote CTA */}
          <Link
            href={`/${locale}/quote`}
            className="hidden md:inline-flex items-center h-8 px-4 bg-[#FF3E7F] text-white font-mono text-[11px] uppercase tracking-[0.08em] rounded-[2px] hover:bg-[#e6356e] transition-colors"
          >
            {t('quote')}
          </Link>
        </div>
      </div>
    </header>
  )
}
