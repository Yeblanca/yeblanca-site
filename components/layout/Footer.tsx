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
    <footer className="border-t border-[rgba(240,240,240,0.08)] py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <p className="font-sans font-bold text-[13px] uppercase tracking-[0.06em] text-[#f0f0f0]">
              yeblanca
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.45)]">
              {t('tagline')}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.30)]">
              {t('location')}
            </p>
          </div>

          {/* Links */}
          <nav className="space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.30)]">
              {t('links_label')}
            </p>
            <ul className="space-y-2">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-mono text-[11px] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.45)] hover:text-[rgba(240,240,240,0.75)] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div className="space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.30)]">
              Social
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/yeblanca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.45)] hover:text-[rgba(240,240,240,0.75)] transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/yeblanca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.45)] hover:text-[rgba(240,240,240,0.75)] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[rgba(240,240,240,0.08)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.30)]">
            {t('legal')}
          </p>
        </div>
      </div>
    </footer>
  )
}
