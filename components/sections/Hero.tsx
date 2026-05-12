import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function Hero() {
  const t = useTranslations('home')
  const locale = useLocale()

  const headline = t('hero_headline')

  return (
    <section className="min-h-[90vh] flex flex-col justify-center px-6 py-32 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto w-full">
        <SectionLabel label={t('hero_label')} />

        <h1 className="font-sans font-bold text-[clamp(2.5rem,8vw,5rem)] leading-[1.05] tracking-[-0.03em] text-[#f0f0f0] mb-8 whitespace-pre-line">
          {headline}
        </h1>

        <p className="font-sans font-light text-[1.125rem] leading-[1.7] text-[rgba(240,240,240,0.60)] max-w-xl mb-12">
          {t('hero_sub')}
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center h-11 px-6 border border-[rgba(240,240,240,0.15)] text-[#f0f0f0] font-mono text-[11px] uppercase tracking-[0.08em] rounded-[2px] hover:border-[rgba(240,240,240,0.35)] transition-colors"
          >
            {t('cta_work')}
          </Link>
          <Link
            href={`/${locale}/quote`}
            className="inline-flex items-center h-11 px-6 bg-[#FF3E7F] text-white font-mono text-[11px] uppercase tracking-[0.08em] rounded-[2px] hover:bg-[#e6356e] transition-colors"
          >
            {t('cta_quote')}
          </Link>
        </div>
      </div>
    </section>
  )
}
