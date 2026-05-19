import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { Globe, ShoppingCart, Settings, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function generateMetadata(): Metadata {
  return {
    title: 'Services — yeblanca',
    description: 'Web development, e-commerce, custom systems, and consulting for businesses operating between México and the U.S.',
  }
}

type Props = { params: Promise<{ locale: string }> }

const SERVICE_KEYS = ['web', 'ecommerce', 'system', 'consulting'] as const
const ICONS = { web: Globe, ecommerce: ShoppingCart, system: Settings, consulting: BarChart3 }
const SLUGS = {
  web: 'web-development',
  ecommerce: 'ecommerce',
  system: 'custom-systems',
  consulting: 'consulting',
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'services' })

  return (
    <div className="pt-32 pb-24 px-6 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-5xl mx-auto">
        <SectionLabel label={t('page_label')} />
        <h1 className="font-sans font-bold text-[clamp(2.5rem,6vw,4rem)] tracking-[-0.03em] text-[#f0f0f0] mb-6">
          {t('page_heading')}
        </h1>
        <p className="font-sans font-light text-[1.125rem] text-[rgba(240,240,240,0.55)] mb-20 max-w-xl">
          {t('page_sub')}
        </p>

        <div className="space-y-px">
          {SERVICE_KEYS.map((key, i) => {
            const Icon = ICONS[key]
            const features = t.raw(`${key}_features`) as string[]

            return (
              <div
                key={key}
                className="group p-8 bg-[#111111] border-[0.5px] border-[rgba(240,240,240,0.08)] hover:border-[rgba(240,240,240,0.15)] transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  {/* Index + Icon */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-px bg-[#FF3E7F]" />
                      <span className="font-mono text-[0.75rem] text-[rgba(240,240,240,0.55)] tracking-[0.10em]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <Icon size={20} className="text-[#FF3E7F]" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="font-sans font-medium text-[1.25rem] text-[#f0f0f0] mb-2">
                      {t(`${key}_title`)}
                    </h2>
                    <p className="font-sans font-light text-[0.9375rem] text-[rgba(240,240,240,0.55)] mb-6">
                      {t(`${key}_tagline`)}
                    </p>

                    <ul className="space-y-2 mb-8">
                      {(Array.isArray(features) ? features : []).map((f: string, j: number) => (
                        <li key={j} className="flex items-center gap-3">
                          <span className="text-[#FF3E7F] text-[0.75rem]">—</span>
                          <span className="font-sans font-light text-[0.875rem] text-[rgba(240,240,240,0.60)]">
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/${locale}/quote?service=${SLUGS[key]}`}
                      className="inline-flex items-center h-9 px-5 bg-[#FF3E7F] text-white font-mono text-[0.75rem] uppercase tracking-[0.08em] rounded-[2px] hover:bg-[#e6356e] transition-colors"
                    >
                      {t('cta')}
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
