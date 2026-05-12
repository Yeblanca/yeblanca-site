'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { QuoteStep1 } from './QuoteStep1'
import { QuoteStep2 } from './QuoteStep2'
import { QuoteStep3 } from './QuoteStep3'

export interface QuoteFormData {
  serviceType: string
  budget: string
  timeline: string
  projectName: string
  description: string
  currentStack: string
  referenceUrls: string
  name: string
  email: string
  company: string
  preferredLanguage: string
  source: string
}

type Step = 1 | 2 | 3

export function QuoteForm({ preselectedService }: { preselectedService?: string }) {
  const t = useTranslations('quote')
  const locale = useLocale()
  const [step, setStep] = useState<Step>(1)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [data, setData] = useState<Partial<QuoteFormData>>({
    serviceType: preselectedService || '',
    preferredLanguage: locale,
  })

  function update(updates: Partial<QuoteFormData>) {
    setData((prev) => ({ ...prev, ...updates }))
  }

  async function handleSubmit() {
    setIsSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setError(t('error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const stepLabels: Record<Step, string> = {
    1: t('step1_label'),
    2: t('step2_label'),
    3: t('step3_label'),
  }

  const stepTitles: Record<Step, string> = {
    1: t('step1_title'),
    2: t('step2_title'),
    3: t('step3_title'),
  }

  if (submitted) {
    return (
      <div className="text-center py-24 space-y-6">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-4 h-px bg-[#FF3E7F]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.45)]">
            {t('step3_label').split(' ')[0]}
          </span>
        </div>
        <h2 className="font-sans font-bold text-[2rem] tracking-[-0.02em] text-[#f0f0f0]">
          {t('success_heading')}
        </h2>
        <p className="font-sans font-light text-[rgba(240,240,240,0.60)] max-w-md mx-auto">
          {t('success_body')}
        </p>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center h-11 px-6 border-[0.5px] border-[rgba(240,240,240,0.15)] text-[rgba(240,240,240,0.60)] font-mono text-[11px] uppercase tracking-[0.08em] rounded-[2px] hover:border-[rgba(240,240,240,0.30)] transition-colors"
        >
          {t('success_cta')}
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      {/* Step indicator */}
      <SectionLabel label={stepLabels[step]} />
      <h1 className="font-sans font-bold text-[2rem] tracking-[-0.02em] text-[#f0f0f0] mb-12">
        {stepTitles[step]}
      </h1>

      {/* Progress bar */}
      <div className="flex gap-1 mb-12">
        {([1, 2, 3] as const).map((s) => (
          <div
            key={s}
            className={`h-px flex-1 transition-colors ${
              s <= step ? 'bg-[#FF3E7F]' : 'bg-[rgba(240,240,240,0.10)]'
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <QuoteStep1 data={data} onChange={update} onNext={() => setStep(2)} />
      )}
      {step === 2 && (
        <QuoteStep2
          data={data}
          onChange={update}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <QuoteStep3
          data={data}
          onChange={update}
          onSubmit={handleSubmit}
          onBack={() => setStep(2)}
          isSubmitting={isSubmitting}
        />
      )}

      {error && (
        <p className="mt-4 font-mono text-[11px] text-[#FF3E7F]">{error}</p>
      )}
    </div>
  )
}
