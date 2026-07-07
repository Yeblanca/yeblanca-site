import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Calendar, Users, Bell, BarChart3 } from 'lucide-react'
import { WaitlistForm } from '@/components/os/WaitlistForm'

export function generateMetadata(): Metadata {
  return {
    title: 'Yeblanca OS — CRM & Scheduling for Service Businesses',
    description:
      'CRM and scheduling for service businesses. Built by engineers. Priced for real businesses.',
  }
}

type Props = { params: Promise<{ locale: string }> }

const FEATURE_ICONS = [Users, Calendar, Bell, BarChart3]

export default async function OSPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'os' })

  const problemItems = t.raw('problem_items') as string[]
  const features = t.raw('features') as Array<{ title: string; desc: string }>
  const starterFeatures = t.raw('plan_starter_features') as string[]
  const growthFeatures = t.raw('plan_growth_features') as string[]
  const proFeatures = t.raw('plan_pro_features') as string[]
  const businessTypes = t.raw('waitlist_type_options') as string[]

  return (
    <div className="pt-32 pb-24 px-6 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-5xl mx-auto space-y-32">
        {/* Hero */}
        <div>
          <SectionLabel label={t('page_label')} />
          <h1 className="font-sans font-bold text-[clamp(2.5rem,6vw,4rem)] tracking-[-0.03em] text-[#f0f0f0] mb-6">
            {t('page_heading')}
          </h1>
          <p className="font-sans font-light text-[1.125rem] text-[rgba(240,240,240,0.65)] max-w-xl whitespace-pre-line">
            {t('hero_sub')}
          </p>
        </div>

        {/* Problem */}
        <div>
          <SectionLabel label={t('problem_label')} />
          <h2 className="font-sans font-medium text-[clamp(1.75rem,4vw,2.5rem)] tracking-[-0.02em] text-[#f0f0f0] mb-10 whitespace-pre-line">
            {t('problem_heading')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {problemItems.map((item, i) => (
              <div
                key={i}
                className="p-5 bg-[#111111] border-[0.5px] border-[rgba(240,240,240,0.08)] flex items-start gap-3"
              >
                <span className="text-[#FF3E7F] text-[0.75rem] mt-1 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-sans font-light text-[0.9375rem] text-[rgba(240,240,240,0.65)]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Solution */}
        <div>
          <SectionLabel label={t('solution_label')} />
          <h2 className="font-sans font-medium text-[clamp(1.75rem,4vw,2.5rem)] tracking-[-0.02em] text-[#f0f0f0] mb-4 whitespace-pre-line">
            {t('solution_heading')}
          </h2>
          <p className="font-sans font-light text-[1rem] text-[rgba(240,240,240,0.65)] max-w-xl">
            {t('solution_sub')}
          </p>
        </div>

        {/* Features */}
        <div>
          <SectionLabel label={t('features_label')} />
          <div className="grid sm:grid-cols-2 gap-px mt-6">
            {features.map((feature, i) => {
              const Icon = FEATURE_ICONS[i]
              return (
                <div
                  key={i}
                  className="p-8 bg-[#111111] border-[0.5px] border-[rgba(240,240,240,0.08)] hover:border-[rgba(240,240,240,0.15)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon size={20} className="text-[#FF3E7F]" strokeWidth={1.5} />
                    <h3 className="font-sans font-medium text-[1.125rem] text-[#f0f0f0]">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="font-sans font-light text-[0.9375rem] text-[rgba(240,240,240,0.65)] leading-[1.7]">
                    {feature.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pricing */}
        <div>
          <SectionLabel label={t('pricing_label')} />
          <h2 className="font-sans font-medium text-[clamp(1.75rem,4vw,2.5rem)] tracking-[-0.02em] text-[#f0f0f0] mb-4 whitespace-pre-line">
            {t('pricing_heading')}
          </h2>
          <p className="font-sans font-light text-[1rem] text-[rgba(240,240,240,0.65)] mb-12 max-w-xl">
            {t('pricing_sub')}
          </p>

          <div className="grid md:grid-cols-3 gap-px">
            {[
              {
                name: t('plan_starter'),
                price: t('plan_starter_price'),
                period: t('plan_starter_period'),
                features: starterFeatures,
                highlight: false,
              },
              {
                name: t('plan_growth'),
                price: t('plan_growth_price'),
                period: t('plan_growth_period'),
                features: growthFeatures,
                highlight: true,
              },
              {
                name: t('plan_pro'),
                price: t('plan_pro_price'),
                period: t('plan_pro_period'),
                features: proFeatures,
                highlight: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`p-8 ${
                  plan.highlight
                    ? 'bg-[#111111] border-[0.5px] border-[#FF3E7F]'
                    : 'bg-[#111111] border-[0.5px] border-[rgba(240,240,240,0.08)]'
                }`}
              >
                {plan.highlight && (
                  <span className="inline-flex items-center h-6 px-2 mb-4 bg-[rgba(255,62,127,0.15)] border-[0.5px] border-[rgba(255,62,127,0.30)] font-mono text-[0.6875rem] uppercase tracking-[0.10em] text-[#FF3E7F]">
                    Popular
                  </span>
                )}
                <h3 className="font-sans font-medium text-[1.125rem] text-[#f0f0f0] mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-sans font-bold text-[2rem] text-[#f0f0f0]">
                    {plan.price}
                  </span>
                  <span className="font-sans font-light text-[0.9375rem] text-[rgba(240,240,240,0.60)]">
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <span className="text-[#FF3E7F] text-[0.75rem]">—</span>
                      <span className="font-sans font-light text-[0.875rem] text-[rgba(240,240,240,0.60)]">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study */}
        <div>
          <SectionLabel label={t('case_label')} />
          <h2 className="font-sans font-medium text-[clamp(1.75rem,4vw,2.5rem)] tracking-[-0.02em] text-[#f0f0f0] mb-4 whitespace-pre-line">
            {t('case_heading')}
          </h2>
          <p className="font-sans font-light text-[1rem] text-[rgba(240,240,240,0.65)] max-w-2xl leading-[1.8]">
            {t('case_body')}
          </p>
        </div>

        {/* Waitlist */}
        <div>
          <SectionLabel label={t('waitlist_label')} />
          <h2 className="font-sans font-medium text-[clamp(1.75rem,4vw,2.5rem)] tracking-[-0.02em] text-[#f0f0f0] mb-4 whitespace-pre-line">
            {t('waitlist_heading')}
          </h2>
          <p className="font-sans font-light text-[1rem] text-[rgba(240,240,240,0.65)] mb-10 max-w-xl">
            {t('waitlist_sub')}
          </p>

          <WaitlistForm
            businessTypes={businessTypes}
            labels={{
              email: t('waitlist_email_placeholder'),
              business: t('waitlist_business_placeholder'),
              type: t('waitlist_type_label'),
              submit: t('waitlist_submit'),
              success: t('waitlist_success'),
              error: t('waitlist_error'),
            }}
          />
        </div>

        {/* Final CTA */}
        <div className="text-center pt-8">
          <SectionLabel label={t('final_cta_label')} />
          <h2 className="font-sans font-bold text-[clamp(2rem,5vw,3rem)] tracking-[-0.03em] text-[#f0f0f0] mb-8 whitespace-pre-line">
            {t('final_cta_heading')}
          </h2>
          <a
            href="#waitlist"
            className="inline-flex items-center h-12 px-8 bg-[#FF3E7F] text-white font-mono text-[0.75rem] uppercase tracking-[0.08em] rounded-[2px] hover:bg-[#e6356e] transition-colors"
          >
            {t('final_cta_button')}
          </a>
        </div>
      </div>
    </div>
  )
}
