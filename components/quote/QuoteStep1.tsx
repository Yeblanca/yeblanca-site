'use client'

import { useTranslations } from 'next-intl'
import type { QuoteFormData } from './QuoteForm'

const SERVICE_TYPES = ['web', 'ecommerce', 'system', 'consulting'] as const
const ENGAGEMENTS = ['accompaniment', 'punctual'] as const
const BUDGETS_ACCOMPANIMENT = ['under400', '400_700', '700_1k', '1kplus', 'talk'] as const
const BUDGETS_PUNCTUAL = ['under1k', '1k_2500', '2500_5k', '5kplus', 'talk'] as const
const TIMELINES = ['asap', '1to3', '3to6', 'flexible'] as const

function RadioOption({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={`py-4 px-5 rounded-[2px] font-mono text-[1rem] uppercase tracking-[0.08em] border-[0.5px] transition-colors text-left ${
        active
          ? 'bg-accent-muted border-accent-border text-accent'
          : 'border-border-strong text-muted-55 hover:border-border-hover'
      }`}
    >
      {children}
    </button>
  )
}

function OptionGroup({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <fieldset className="space-y-4 border-0 p-0 mx-0">
      <legend className="font-mono text-[1rem] uppercase tracking-[0.12em] text-muted mb-4">
        {label}
      </legend>
      <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-3">
        {children}
      </div>
    </fieldset>
  )
}

export function QuoteStep1({
  data,
  onChange,
  onNext,
}: {
  data: Partial<QuoteFormData>
  onChange: (updates: Partial<QuoteFormData>) => void
  onNext: () => void
}) {
  const t = useTranslations('quote')

  const canProceed = !!data.engagement

  return (
    <div className="space-y-10">
      <OptionGroup label={t('engagement_label')}>
        {ENGAGEMENTS.map((eng) => (
          <RadioOption
            key={eng}
            active={data.engagement === eng}
            onClick={() => onChange({ engagement: eng })}
          >
            {t(`engagement_${eng}`)}
          </RadioOption>
        ))}
      </OptionGroup>

      <button
        type="button"
        disabled={!canProceed}
        onClick={onNext}
        className="h-11 px-6 bg-accent text-white font-mono text-[1rem] uppercase tracking-[0.08em] rounded-[2px] hover:bg-accent-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {t('next')}
      </button>
    </div>
  )
}
