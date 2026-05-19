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
    <section className="py-24 md:py-32 px-6 bg-[var(--color-bg)]">
      <div className="max-w-5xl mx-auto">
        <SectionLabel label={t('services_label')} />

        <h2 className="font-sans font-medium text-2xl md:text-[2.5rem] tracking-tight text-[var(--color-fg)] leading-[1.15] mb-12 max-w-2xl">
          {t('services_heading')}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {SERVICES.map(({ key, index }) => {
            const Icon = ICONS[key]
            const title = ts(`${key}_title`)
            const tagline = ts(`${key}_tagline`)
            const price = ts(`${key}_starting_price`)

            return (
              <Link
                key={key}
                href={`/${locale}/services`}
                className="group relative flex flex-col p-8 lg:p-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[#FF3E7F]/40 hover:bg-[var(--color-surface)]/50 transition-all duration-300 ease-out min-h-[340px] lg:min-h-[360px]"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 bg-gradient-to-br from-[#FF3E7F]/5 to-transparent" />

                {/* Icon + arrow */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FF3E7F]/10 group-hover:bg-[#FF3E7F]/20 transition-colors duration-300">
                    <Icon size={20} strokeWidth={1.5} className="text-[#FF3E7F]" />
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-[var(--color-muted)] -translate-x-1 -translate-y-1 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>

                {/* Index */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-px bg-[#FF3E7F]" />
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--color-muted)] group-hover:text-[#FF3E7F] transition-colors duration-200">
                    {index}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-sans font-medium text-[15px] tracking-tight text-[var(--color-fg)] mb-2">
                  {title}
                </h3>

                {/* Description */}
                <p className="font-sans text-[13px] leading-relaxed text-[var(--color-muted)] flex-1 group-hover:text-[var(--color-fg)]/80 transition-colors duration-200 whitespace-pre-line">
                  {tagline}
                </p>

                {/* Price */}
                <div className="mt-5 pt-4 border-t border-[var(--color-border)]/60">
                  <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--color-muted)]">
                    {ts('from')}{' '}
                    <span className="text-[#FF3E7F] font-medium">{price}</span>
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}