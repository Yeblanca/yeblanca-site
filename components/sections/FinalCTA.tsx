import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function FinalCTA() {
  const t = useTranslations('home')
  const locale = useLocale()

  return (
    <section className="py-24 md:py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <SectionLabel label={t('final_cta_label')} />
        <h2 className="font-sans font-bold text-[clamp(2rem,5vw,3rem)] tracking-[-0.03em] text-[#f0f0f0] mb-6">
          {t('final_cta_heading')}
        </h2>
        <p className="font-sans font-light text-[1rem] text-[rgba(240,240,240,0.55)] max-w-lg mb-10">
          {t('final_cta_sub')}
        </p>
        <Link
          href={`/${locale}/quote`}
          className="inline-flex items-center h-11 px-6 bg-[#FF3E7F] text-white font-mono text-[0.75rem] uppercase tracking-[0.08em] rounded-[2px] hover:bg-[#e6356e] transition-colors"
        >
          {t('final_cta_button')}
        </Link>
      </div>
    </section>
  )
}