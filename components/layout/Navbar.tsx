'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { usePathname, useRouter } from 'next/navigation'

export function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  function switchLocale(next: string) {
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/'))
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const navLinks = [
    { href: `/${locale}/projects`, label: t('projects') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(240,240,240,0.08)] bg-[#0a0a0a]/90 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 h-8 relative z-50">
            <Image
              src="/images/yebconfondo (1).png"
              alt="yeblanca"
              width={80}
              height={20}
              className="h-full w-auto object-contain"
              priority
            />
            <span className="font-sans text-sm font-bold tracking-[0.08em] text-[#f0f0f0]">YEBLANCA</span>
          </Link>

          {/* Desktop Nav links */}
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

          {/* Right: locale toggle + quote CTA + theme toggle + mobile hamburger */}
          <div className="flex items-center gap-1">
            {/* Locale toggle — expanded tap target */}
            <button
              onClick={() => switchLocale(locale === 'en' ? 'es' : 'en')}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.45)] hover:text-[rgba(240,240,240,0.75)] transition-colors"
              aria-label={locale === 'en' ? 'Switch to Spanish' : 'Switch to English'}
            >
              {locale === 'en' ? 'ES' : 'EN'}
            </button>

            {/* Theme toggle — expanded tap target */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.45)] hover:text-[rgba(240,240,240,0.75)] transition-colors"
            >
              {(theme ?? 'dark') === 'dark' ? '○' : '●'}
            </button>

            {/* Desktop Quote CTA */}
            <Link
              href={`/${locale}/quote`}
              className="hidden md:inline-flex items-center h-8 px-4 bg-[#FF3E7F] text-white font-mono text-[11px] uppercase tracking-[0.08em] rounded-[2px] hover:bg-[#e6356e] transition-colors"
            >
              {t('quote')}
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative z-50 min-w-[44px] min-h-[44px] flex items-center justify-center ml-1"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <div className="w-5 h-3.5 relative flex flex-col justify-between">
                <span
                  className={`block h-[1.5px] bg-current transition-all duration-300 origin-center ${
                    mobileOpen ? 'rotate-45 translate-y-[5px] bg-[#f0f0f0]' : 'bg-[rgba(240,240,240,0.75)]'
                  }`}
                />
                <span
                  className={`block h-[1.5px] bg-current transition-all duration-300 ${
                    mobileOpen ? 'opacity-0' : 'bg-[rgba(240,240,240,0.75)]'
                  }`}
                />
                <span
                  className={`block h-[1.5px] bg-current transition-all duration-300 origin-center ${
                    mobileOpen ? '-rotate-45 -translate-y-[5px] bg-[#f0f0f0]' : 'bg-[rgba(240,240,240,0.75)]'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu Content */}
        <nav
          className={`relative z-10 flex flex-col items-center justify-center min-h-screen px-6 transition-transform duration-500 ${
            mobileOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          <div className="flex flex-col items-center gap-8">
            {navLinks.map(({ href, label }, index) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`font-sans text-[clamp(1.75rem,6vw,2.5rem)] font-bold tracking-[-0.02em] transition-all duration-300 ${
                  isActive(href)
                    ? 'text-[#FF3E7F]'
                    : 'text-[#f0f0f0] hover:text-[rgba(240,240,240,0.75)]'
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${index * 50 + 100}ms` : '0ms',
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'translateY(0)' : 'translateY(12px)',
                }}
              >
                {label}
              </Link>
            ))}

            {/* Mobile Quote CTA */}
            <Link
              href={`/${locale}/quote`}
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex items-center h-12 px-8 bg-[#FF3E7F] text-white font-mono text-[13px] uppercase tracking-[0.08em] rounded-[2px] hover:bg-[#e6356e] transition-all duration-300"
              style={{
                transitionDelay: mobileOpen ? `${navLinks.length * 50 + 100}ms` : '0ms',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(12px)',
              }}
            >
              {t('quote')}
            </Link>

            {/* Locale & Theme in mobile menu footer */}
            <div
              className="mt-8 flex items-center gap-6 transition-all duration-300"
              style={{
                transitionDelay: mobileOpen ? `${(navLinks.length + 1) * 50 + 100}ms` : '0ms',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(12px)',
              }}
            >
              <button
                onClick={() => switchLocale(locale === 'en' ? 'es' : 'en')}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center font-mono text-[13px] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.45)] hover:text-[rgba(240,240,240,0.75)] transition-colors"
              >
                {locale === 'en' ? 'ES' : 'EN'}
              </button>
              <span className="w-px h-4 bg-[rgba(240,240,240,0.15)]" />
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center font-mono text-[13px] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.45)] hover:text-[rgba(240,240,240,0.75)] transition-colors"
              >
                {(theme ?? 'dark') === 'dark' ? '○' : '●'}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
