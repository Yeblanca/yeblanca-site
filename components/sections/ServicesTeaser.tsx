'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Globe, ShoppingBag, Layers, Compass, ArrowUpRight } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'

type ServiceKey = 'web' | 'ecommerce' | 'system' | 'consulting'

interface Service {
  key: ServiceKey
  index: string
}

const SERVICES: Service[] = [
  { key: 'web',        index: '001' },
  { key: 'ecommerce',  index: '002' },
  { key: 'system',    index: '003' },
  { key: 'consulting', index: '004' },
]

const ICONS: Record<ServiceKey, typeof Globe> = {
  web: Globe,
  ecommerce: ShoppingBag,
  system: Layers,
  consulting: Compass,
}

export function ServicesTeaser() {
  const t  = useTranslations('home')
  const ts = useTranslations('services')
  const locale = useLocale()

  return (
    <section className="py-24 md:py-32 px-6 bg-bg">
      <div className="max-w-5xl mx-auto">
        <SectionLabel label={t('services_label')} />

        <h2 className="font-sans font-medium text-2xl md:text-[2.5rem] tracking-tight text-fg leading-[1.15] mb-12 max-w-2xl">
          {t('services_heading')}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {SERVICES.map(({ key, index }) => {
            const Icon = ICONS[key]
            const title = ts(`${key}_title`)
            const tagline = ts(`${key}_tagline`)

            return (
              <Link
                key={key}
                href={`/${locale}/services`}
                className="group relative flex flex-col p-6 md:p-8 lg:p-10 rounded-[2px] border border-border bg-bg hover:border-accent transition-colors duration-300"
              >
                {/* Icon + arrow */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon size={20} strokeWidth={1.5} className="text-accent" />
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-muted -translate-x-1 -translate-y-1 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>

                {/* Index */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-px bg-accent" />
                  <span className="font-mono text-[0.6875rem] tracking-[0.15em] uppercase text-muted group-hover:text-accent transition-colors duration-200">
                    {index}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-sans font-medium text-[1.0625rem] tracking-tight text-fg mb-2">
                  {title}
                </h3>

                {/* Description */}
                <p className="font-sans text-[1.0625rem] leading-relaxed text-muted flex-1 group-hover:text-muted-80 transition-colors duration-200 whitespace-pre-line">
                  {tagline}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
