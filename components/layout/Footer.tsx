'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')
  const tn = useTranslations('nav')
  const locale = useLocale()

  const links = [
    { href: `/${locale}/projects`, label: tn('projects') },
    { href: `/${locale}/services`, label: tn('services') },
    { href: `/${locale}/about`, label: tn('about') },
    { href: `/${locale}/contact`, label: tn('contact') },
  ]

  return (
    <footer className="bg-[#050505] border-t border-[rgba(240,240,240,0.08)] py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="font-sans text-xl font-bold tracking-[0.08em] text-[#f0f0f0]">YEBLANCA</span>
            </div>
            <div className="space-y-1">
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.65)]">
              {t('tagline')}
            </p>
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.55)]">
              {t('location')}
            </p>
            </div>
          </div>

          {/* Links */}
          <nav className="space-y-3">
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.55)]">
              {t('links_label')}
            </p>
            <ul className="space-y-1">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex items-center min-h-[44px] font-mono text-[0.75rem] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.65)] hover:text-[rgba(240,240,240,0.75)] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div className="space-y-3">
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.55)]">
              Social
            </p>
            <ul className="space-y-1">
              <li>
                <a
                  href="https://github.com/yeblanca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px] font-mono text-[0.75rem] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.65)] hover:text-[rgba(240,240,240,0.75)] transition-colors"
                >
                  GitHub <span className="sr-only">(opens in new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/yeblanca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px] font-mono text-[0.75rem] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.65)] hover:text-[rgba(240,240,240,0.75)] transition-colors"
                >
                  LinkedIn <span className="sr-only">(opens in new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[rgba(240,240,240,0.08)]">
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.55)]">
            {t('legal')}
          </p>
        </div>
      </div>
    </footer>
  )
}
