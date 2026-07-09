'use client'

import { useTranslations } from 'next-intl'
import type { QuoteFormData } from './QuoteForm'

const inputClass =
  'w-full bg-transparent border-[0.5px] border-subtle rounded-[2px] px-4 py-3 font-sans font-light text-[1rem] text-fg placeholder:text-muted-45 focus:outline-none focus:border-[#FF3E7F] transition-colors'

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
      className={`h-9 px-4 rounded-[2px] font-mono text-[1rem] uppercase tracking-[0.08em] border-[0.5px] transition-colors ${
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
    <fieldset className="space-y-3 border-0 p-0 m-0">
      <legend className="font-mono text-[1rem] uppercase tracking-[0.12em] text-muted mb-3">
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
      {/* Project details */}
      <div className="space-y-2">
          <label htmlFor="quote-project-name" className="font-mono text-[1rem] uppercase tracking-[0.12em] text-muted">
          {t('project_name_label')} <span aria-hidden="true">*</span>
        </label>
        <input
          id="quote-project-name"
          type="text"
          value={data.projectName || ''}
          onChange={(e) => onChange({ projectName: e.target.value })}
          placeholder={t('project_name_placeholder')}
          required
          aria-required="true"
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
          <label htmlFor="quote-description" className="font-mono text-[1rem] uppercase tracking-[0.12em] text-muted">
          {t('description_label')} <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="quote-description"
          value={data.description || ''}
          onChange={(e) => onChange({ description: e.target.value.slice(0, 500) })}
          placeholder={t('description_placeholder')}
          rows={5}
          required
          aria-required="true"
          className={`${inputClass} resize-none`}
        />
        <p className="font-mono text-[1rem] text-muted-45 text-right">
          {(data.description || '').length}/500
        </p>
      </div>

      <div className="space-y-2">
          <label htmlFor="quote-stack" className="font-mono text-[1rem] uppercase tracking-[0.12em] text-muted">
          {t('stack_label')}
        </label>
        <input
          id="quote-stack"
          type="text"
          value={data.currentStack || ''}
          onChange={(e) => onChange({ currentStack: e.target.value })}
          placeholder={t('stack_placeholder')}
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
          <label htmlFor="quote-refs" className="font-mono text-[1rem] uppercase tracking-[0.12em] text-muted">
          {t('refs_label')}
        </label>
        <input
          id="quote-refs"
          type="text"
          value={data.referenceUrls || ''}
          onChange={(e) => onChange({ referenceUrls: e.target.value })}
          placeholder={t('refs_placeholder')}
          className={inputClass}
        />
      </div>

      {/* Contact info */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
            <label htmlFor="quote-contact-name" className="font-mono text-[1rem] uppercase tracking-[0.12em] text-muted">
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
            <label htmlFor="quote-contact-email" className="font-mono text-[1rem] uppercase tracking-[0.12em] text-muted">
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
        <label htmlFor="quote-company" className="font-mono text-[1rem] uppercase tracking-[0.12em] text-muted">
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
          className="h-11 px-6 border-[0.5px] border-subtle text-muted-55 font-mono text-[1rem] uppercase tracking-[0.08em] rounded-[2px] hover:border-border-hover transition-colors disabled:opacity-30"
        >
          {t('back')}
        </button>
        <button
          type="button"
          disabled={!canSubmit || isSubmitting}
          onClick={onSubmit}
          className="h-11 px-6 bg-accent text-white font-mono text-[1rem] uppercase tracking-[0.08em] rounded-[2px] hover:bg-accent-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('submitting') : t('submit')}
        </button>
      </div>
    </div>
  )
}
