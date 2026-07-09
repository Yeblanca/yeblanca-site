'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function NotForEveryone() {
  const t = useTranslations('home')
  const locale = useLocale()

  const noItems = t.raw('nfe_no_items') as string[]
  const yesItems = t.raw('nfe_yes_items') as string[]

  return (
    <section className="py-24 md:py-32 px-6 bg-bg border-t-[0.5px] border-border">
      <div className="max-w-5xl mx-auto">
        <SectionLabel label={t('nfe_eyebrow')} />
        <h2 className="font-sans font-bold text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.03em] text-fg leading-[1.05] mb-6 max-w-3xl">
          {t('nfe_headline')}
        </h2>
        <p className="font-sans font-light text-[1.125rem] md:text-[1.25rem] leading-[1.75] text-muted max-w-2xl mb-16">
          {t('nfe_sub')}
        </p>

        <div className="grid md:grid-cols-2 gap-px border-[0.5px] border-border bg-border">
          {/* NOT FOR */}
          <div className="bg-bg p-8 md:p-10">
            <h3 className="font-mono text-[0.75rem] uppercase tracking-[0.15em] text-accent mb-6">
              {t('nfe_no_title')}
            </h3>
            <ul className="space-y-5">
              {noItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-mono text-[0.75rem] text-accent mt-1 shrink-0">
                    0{i + 1}
                  </span>
                  <span className="font-sans font-light text-[1.0625rem] leading-[1.65] text-muted">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* FOR */}
          <div className="bg-bg p-8 md:p-10">
            <h3 className="font-mono text-[0.75rem] uppercase tracking-[0.15em] text-fg mb-6">
              {t('nfe_yes_title')}
            </h3>
            <ul className="space-y-5">
              {yesItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-mono text-[0.75rem] text-muted-50 mt-1 shrink-0">
                    0{i + 1}
                  </span>
                  <span className="font-sans font-light text-[1.0625rem] leading-[1.65] text-fg">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <Link
            href={`/${locale}/quote`}
            className="inline-flex items-center font-mono text-[0.875rem] uppercase tracking-[0.10em] text-accent hover:text-[#ff5c8d] transition-colors group"
          >
            {t('nfe_cta')}
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
