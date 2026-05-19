'use client'

import { useTranslations } from 'next-intl'
import type { QuoteFormData } from './QuoteForm'

const inputClass =
  'w-full bg-transparent border-[0.5px] border-[rgba(240,240,240,0.15)] rounded-[2px] px-4 py-3 font-sans font-light text-[1rem] text-[#f0f0f0] placeholder:text-[rgba(240,240,240,0.45)] focus:outline-none focus:border-[#FF3E7F] transition-colors'

const LANGUAGES = ['en', 'es'] as const
const SOURCES = ['google', 'referral', 'social', 'other'] as const

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
      className={`h-9 px-4 rounded-[2px] font-mono text-[11px] uppercase tracking-[0.08em] border-[0.5px] transition-colors ${
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
    <fieldset className="space-y-3 border-0 p-0 m-0">
      <legend className="font-mono text-[11px] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.65)] mb-3">
        {label}
      </legend>
      <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-3">
        {children}
      </div>
    </fieldset>
  )
}

export function QuoteStep3({
  data,
  onChange,
  onSubmit,
  onBack,
  isSubmitting,
}: {
  data: Partial<QuoteFormData>
  onChange: (updates: Partial<QuoteFormData>) => void
  onSubmit: () => void
  onBack: () => void
  isSubmitting: boolean
}) {
  const t = useTranslations('quote')

  const canSubmit = !!(data.name?.trim() && data.email?.trim())

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="quote-contact-name" className="font-mono text-[11px] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.65)]">
            {t('name_label')} <span aria-hidden="true">*</span>
          </label>
          <input
            id="quote-contact-name"
            type="text"
            value={data.name || ''}
            onChange={(e) => onChange({ name: e.target.value })}
            required
            aria-required="true"
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="quote-contact-email" className="font-mono text-[11px] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.65)]">
            {t('email_label')} <span aria-hidden="true">*</span>
          </label>
          <input
            id="quote-contact-email"
            type="email"
            value={data.email || ''}
            onChange={(e) => onChange({ email: e.target.value })}
            required
            aria-required="true"
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="quote-company" className="font-mono text-[11px] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.65)]">
          {t('company_label')}
        </label>
        <input
          id="quote-company"
          type="text"
          value={data.company || ''}
          onChange={(e) => onChange({ company: e.target.value })}
          className={inputClass}
        />
      </div>

      <OptionGroup label={t('language_label')}>
        <div className="flex gap-3">
          {LANGUAGES.map((lang) => (
            <RadioOption
              key={lang}
              active={data.preferredLanguage === lang}
              onClick={() => onChange({ preferredLanguage: lang })}
            >
              {t(`language_${lang}`)}
            </RadioOption>
          ))}
        </div>
      </OptionGroup>

      <OptionGroup label={t('source_label')}>
        <div className="flex flex-wrap gap-3">
          {SOURCES.map((src) => (
            <RadioOption
              key={src}
              active={data.source === src}
              onClick={() => onChange({ source: src })}
            >
              {t(`source_${src}`)}
            </RadioOption>
          ))}
        </div>
      </OptionGroup>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="h-11 px-6 border-[0.5px] border-[rgba(240,240,240,0.15)] text-[rgba(240,240,240,0.55)] font-mono text-[11px] uppercase tracking-[0.08em] rounded-[2px] hover:border-[rgba(240,240,240,0.30)] transition-colors disabled:opacity-30"
        >
          {t('back')}
        </button>
        <button
          type="button"
          disabled={!canSubmit || isSubmitting}
          onClick={onSubmit}
          className="h-11 px-6 bg-[#FF3E7F] text-white font-mono text-[11px] uppercase tracking-[0.08em] rounded-[2px] hover:bg-[#e6356e] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('submitting') : t('submit')}
        </button>
      </div>
    </div>
  )
}
