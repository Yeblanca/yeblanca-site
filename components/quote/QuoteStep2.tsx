'use client'

import { useTranslations } from 'next-intl'
import type { QuoteFormData } from './QuoteForm'

const SERVICE_TYPES = ['web', 'ecommerce', 'system', 'consulting'] as const
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

export function QuoteStep2({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: Partial<QuoteFormData>
  onChange: (updates: Partial<QuoteFormData>) => void
  onNext: () => void
  onBack: () => void
}) {
  const t = useTranslations('quote')

  const budgets = data.engagement === 'punctual' ? BUDGETS_PUNCTUAL : BUDGETS_ACCOMPANIMENT
  const budgetLabel = data.engagement === 'punctual' ? t('budget_label_punctual') : t('budget_label_accompaniment')

  const canProceed = !!data.serviceType && !!data.budget && !!data.timeline

  return (
    <div className="space-y-10">
      <OptionGroup label={t('type_label')}>
        {SERVICE_TYPES.map((type) => (
          <RadioOption
            key={type}
            active={data.serviceType === type}
            onClick={() => onChange({ serviceType: type })}
          >
            {t(`type_${type}`)}
          </RadioOption>
        ))}
      </OptionGroup>

      <OptionGroup label={budgetLabel}>
        {budgets.map((b) => (
          <RadioOption
            key={b}
            active={data.budget === b}
            onClick={() => onChange({ budget: b })}
          >
            {t(`budget_${b}`)}
          </RadioOption>
        ))}
      </OptionGroup>

      <OptionGroup label={t('timeline_label')}>
        {TIMELINES.map((tl) => (
          <RadioOption
            key={tl}
            active={data.timeline === tl}
            onClick={() => onChange({ timeline: tl })}
          >
            {t(`timeline_${tl}`)}
          </RadioOption>
        ))}
      </OptionGroup>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="h-11 px-6 border-[0.5px] border-subtle text-muted-55 font-mono text-[1rem] uppercase tracking-[0.08em] rounded-[2px] hover:border-border-hover transition-colors"
        >
          {t('back')}
        </button>
        <button
          type="button"
          disabled={!canProceed}
          onClick={onNext}
          className="h-11 px-6 bg-accent text-white font-mono text-[1rem] uppercase tracking-[0.08em] rounded-[2px] hover:bg-accent-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {t('next')}
        </button>
      </div>
    </div>
  )
}
