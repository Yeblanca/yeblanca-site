import Link from 'next/link'
import Image from 'next/image'
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
          <div>
            <div className="h-12 overflow-hidden mb-4">
              <Image
                src="/images/yebhozconfondo (1).png"
                alt="yeblanca"
                width={160}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.45)]">
              {t('tagline')}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.30)]">
              {t('location')}
            </p>
            </div>
          </div>

          {/* Links */}
          <nav className="space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.30)]">
              {t('links_label')}
            </p>
            <ul className="space-y-1">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex items-center min-h-[40px] font-mono text-[11px] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.45)] hover:text-[rgba(240,240,240,0.75)] transition-colors"
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
            <ul className="space-y-1">
              <li>
                <a
                  href="https://github.com/yeblanca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[40px] font-mono text-[11px] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.45)] hover:text-[rgba(240,240,240,0.75)] transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/yeblanca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[40px] font-mono text-[11px] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.45)] hover:text-[rgba(240,240,240,0.75)] transition-colors"
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
