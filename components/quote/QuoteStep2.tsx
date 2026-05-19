'use client'

import { useTranslations } from 'next-intl'
import type { QuoteFormData } from './QuoteForm'

const inputClass =
  'w-full bg-transparent border-[0.5px] border-[rgba(240,240,240,0.15)] rounded-[2px] px-4 py-3 font-sans font-light text-[1rem] text-[#f0f0f0] placeholder:text-[rgba(240,240,240,0.45)] focus:outline-none focus:border-[#FF3E7F] transition-colors'

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

  const canProceed = !!(data.projectName?.trim() && data.description?.trim())

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <label htmlFor="quote-project-name" className="font-mono text-[11px] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.65)]">
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
        <label htmlFor="quote-description" className="font-mono text-[11px] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.65)]">
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
        <p className="font-mono text-[10px] text-[rgba(240,240,240,0.25)] text-right">
          {(data.description || '').length}/500
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="quote-stack" className="font-mono text-[11px] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.65)]">
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
        <label htmlFor="quote-refs" className="font-mono text-[11px] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.65)]">
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

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="h-11 px-6 border-[0.5px] border-[rgba(240,240,240,0.15)] text-[rgba(240,240,240,0.55)] font-mono text-[11px] uppercase tracking-[0.08em] rounded-[2px] hover:border-[rgba(240,240,240,0.30)] transition-colors"
        >
          {t('back')}
        </button>
        <button
          type="button"
          disabled={!canProceed}
          onClick={onNext}
          className="h-11 px-6 bg-[#FF3E7F] text-white font-mono text-[11px] uppercase tracking-[0.08em] rounded-[2px] hover:bg-[#e6356e] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {t('next')}
        </button>
      </div>
    </div>
  )
}
