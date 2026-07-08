'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'

const inputClass =
  'w-full bg-transparent border-[0.5px] border-subtle rounded-[2px] px-4 py-3 font-sans font-light text-[1rem] text-fg placeholder:text-muted-45 focus:outline-none focus:border-[#FF3E7F] transition-colors'

export default function ContactPage() {
  const t = useTranslations('contact')
  const locale = useLocale()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [preferredLanguage, setPreferredLanguage] = useState(locale)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, preferredLanguage }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="pt-32 pb-24 px-6 bg-bg min-h-screen">
      <div className="max-w-5xl mx-auto">
        <SectionLabel label={t('page_label')} />
        <h1 className="font-sans font-bold text-[clamp(2.5rem,6vw,4rem)] tracking-[-0.03em] text-fg mb-6">
          {t('page_heading')}
        </h1>
        <p className="font-sans text-[1.125rem] text-muted mb-16 max-w-lg">
          {t('page_sub')}
        </p>

        {status === 'success' ? (
          <p className="font-mono text-[0.8125rem] text-accent uppercase tracking-[0.10em]">
            {t('success')}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="contact-name" className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-muted">
                  {t('name_label')}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-email" className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-muted">
                  {t('email_label')}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-message" className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-muted">
                {t('message_label')}
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                className={`${inputClass} resize-none`}
              />
            </div>

            <fieldset className="space-y-3 border-0 p-0 m-0">
              <legend className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-muted mb-3">
                {t('language_label')}
              </legend>
              <div role="radiogroup" aria-label={t('language_label')} className="flex gap-3">
                {(['en', 'es'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    role="radio"
                    aria-checked={preferredLanguage === lang}
                    onClick={() => setPreferredLanguage(lang)}
                    className={`h-9 px-4 rounded-[2px] font-mono text-[0.75rem] uppercase tracking-[0.08em] border-[0.5px] transition-colors ${
                      preferredLanguage === lang
                        ? 'bg-accent-muted border-accent-border text-accent'
                        : 'border-border-strong text-muted-55 hover:border-border-hover'
                    }`}
                  >
                    {lang === 'en' ? 'English' : 'Español'}
                  </button>
                ))}
              </div>
            </fieldset>

            {status === 'error' && (
              <p role="alert" className="font-mono text-[0.75rem] text-accent">{t('error')}</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="h-11 px-6 bg-accent text-white font-mono text-[0.75rem] uppercase tracking-[0.08em] rounded-[2px] hover:bg-accent-dark transition-colors disabled:opacity-50"
            >
              {status === 'submitting' ? t('submitting') : t('submit')}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
