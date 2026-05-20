'use client'

import { useTranslations } from 'next-intl'
import type { QuoteFormData } from './QuoteForm'

const SERVICE_TYPES = ['web', 'ecommerce', 'system', 'consulting'] as const
const BUDGETS = ['under1k', '1k3k', '3k8k', '8kplus', 'talk'] as const
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
      className={`h-11 px-5 rounded-[2px] font-mono text-[0.75rem] uppercase tracking-[0.08em] border-[0.5px] transition-colors text-left ${
        active
          ? 'bg-[rgba(255,62,127,0.15)] border-[rgba(255,62,127,0.30)] text-[#FF3E7F]'
          : 'border-[rgba(240,240,240,0.12)] text-[rgba(240,240,240,0.55)] hover:border-[rgba(240,240,240,0.30)]'
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
    <fieldset className="space-y-4 border-0 p-0 m-0">
      <legend className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.65)] mb-4">
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

      <OptionGroup label={t('budget_label')}>
        {BUDGETS.map((b) => (
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

      <button
        type="button"
        disabled={!canProceed}
        onClick={onNext}
        className="h-11 px-6 bg-[#FF3E7F] text-white font-mono text-[0.75rem] uppercase tracking-[0.08em] rounded-[2px] hover:bg-[#e6356e] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {t('next')}
      </button>
    </div>
  )
}
