'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'

type Tier = {
  key: 'hosted' | 'managed' | 'architect'
  highlight: boolean
  badge?: string
}

const TIERS: Tier[] = [
  { key: 'hosted', highlight: false },
  { key: 'managed', highlight: true, badge: 'Most common' },
  { key: 'architect', highlight: false },
]

export function DeliveryTiers() {
  const t = useTranslations('home')
  const locale = useLocale()

  return (
    <section className="py-24 md:py-32 px-6 bg-bg border-t-[0.5px] border-border">
      <div className="max-w-5xl mx-auto">
        <SectionLabel label={t('delivery_eyebrow')} />

        <p className="font-sans font-light text-[1.125rem] md:text-[1.25rem] leading-[1.75] text-muted max-w-2xl mb-16 whitespace-pre-line">
          {t('delivery_intro')}
        </p>

        <div className="grid md:grid-cols-3 gap-px border-[0.5px] border-border bg-border">
          {TIERS.map(({ key, highlight, badge }) => (
            <article
              key={key}
              className={`relative bg-bg p-8 md:p-10 flex flex-col ${
                highlight ? 'border-l-2 border-l-accent md:border-l-[0.5px]' : ''
              }`}
            >
              {badge ? (
                <span className="inline-flex items-center h-6 px-2 mb-6 self-start bg-accent-muted border-[0.5px] border-accent-border font-mono text-[0.6875rem] uppercase tracking-[0.10em] text-accent">
                  {badge}
                </span>
              ) : (
                /* Reserve badge space so titles align across all three cards */
                <div className="h-6 mb-6" aria-hidden="true" />
              )}

              {/* Index */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-px bg-accent" />
                <span className="font-mono text-[0.6875rem] tracking-[0.15em] uppercase text-muted-50">
                  {key === 'hosted' && '001'}
                  {key === 'managed' && '002'}
                  {key === 'architect' && '003'}
                </span>
              </div>

              <h3 className="font-sans font-medium text-[1.5rem] tracking-[-0.02em] text-fg uppercase mb-4">
                {t(`delivery_${key}_title`)}
              </h3>

              <p className="font-sans font-light text-[0.9375rem] leading-[1.7] text-muted whitespace-pre-line mb-6 flex-1">
                {t(`delivery_${key}_body`)}
              </p>

              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.10em] text-muted-50 border-t-[0.5px] border-border pt-4">
                {t(`delivery_${key}_best`)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href={`/${locale}/quote`}
            className="inline-flex items-center font-mono text-[0.875rem] uppercase tracking-[0.10em] text-accent hover:text-[#ff5c8d] transition-colors group"
          >
            {t('delivery_cta')}
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
