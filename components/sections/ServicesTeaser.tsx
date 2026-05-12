import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Globe, ShoppingCart, Settings, BarChart3 } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'

const SERVICES = [
  {
    key: 'web' as const,
    icon: Globe,
    slug: 'web-development',
  },
  {
    key: 'ecommerce' as const,
    icon: ShoppingCart,
    slug: 'ecommerce',
  },
  {
    key: 'system' as const,
    icon: Settings,
    slug: 'custom-systems',
  },
  {
    key: 'consulting' as const,
    icon: BarChart3,
    slug: 'consulting',
  },
]

export function ServicesTeaser() {
  const t = useTranslations('home')
  const ts = useTranslations('services')
  const locale = useLocale()

  return (
    <section className="py-24 md:py-32 px-6 bg-[#111111]">
      <div className="max-w-5xl mx-auto">
        <SectionLabel label={t('services_label')} />
        <h2 className="font-sans font-medium text-[2rem] tracking-[-0.02em] text-[#f0f0f0] mb-12">
          {t('services_heading')}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map(({ key, icon: Icon, slug }) => (
            <Link
              key={key}
              href={`/${locale}/services`}
              className="group p-6 bg-[#0a0a0a] border-[0.5px] border-[rgba(240,240,240,0.08)] rounded-[2px] hover:border-[#FF3E7F] transition-colors"
            >
              <Icon
                size={20}
                className="text-[#FF3E7F] mb-4"
                strokeWidth={1.5}
              />
              <h3 className="font-sans font-medium text-[0.9375rem] text-[#f0f0f0] mb-2">
                {ts(`${key}_title`)}
              </h3>
              <p className="font-sans font-light text-[0.8125rem] text-[rgba(240,240,240,0.50)] leading-relaxed">
                {ts(`${key}_tagline`)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
