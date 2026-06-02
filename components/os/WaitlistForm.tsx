'use client'

import { useState } from 'react'

interface WaitlistFormProps {
  businessTypes: string[]
  labels: {
    email: string
    business: string
    type: string
    submit: string
    success: string
    error: string
  }
}

export function WaitlistForm({ businessTypes, labels }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, businessName, businessType }),
      })

      if (!res.ok) throw new Error('Failed')

      setStatus('success')
      setEmail('')
      setBusinessName('')
      setBusinessType('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="p-8 bg-[#111111] border-[0.5px] border-[rgba(255,62,127,0.30)] max-w-lg">
        <p className="font-sans font-light text-[1rem] text-[#FF3E7F]">
          {labels.success}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} id="waitlist" className="max-w-lg space-y-5">
      <div>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={labels.email}
          className="w-full h-12 px-4 bg-[#111111] border-[0.5px] border-[rgba(240,240,240,0.12)] rounded-[2px] font-sans font-light text-[0.9375rem] text-[#f0f0f0] placeholder:text-[rgba(240,240,240,0.30)] focus:outline-none focus:border-[#FF3E7F] transition-colors"
        />
      </div>

      <div>
        <input
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder={labels.business}
          className="w-full h-12 px-4 bg-[#111111] border-[0.5px] border-[rgba(240,240,240,0.12)] rounded-[2px] font-sans font-light text-[0.9375rem] text-[#f0f0f0] placeholder:text-[rgba(240,240,240,0.30)] focus:outline-none focus:border-[#FF3E7F] transition-colors"
        />
      </div>

      <div>
        <label className="block font-mono text-[0.75rem] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.55)] mb-2">
          {labels.type}
        </label>
        <select
          required
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          className="w-full h-12 px-4 bg-[#111111] border-[0.5px] border-[rgba(240,240,240,0.12)] rounded-[2px] font-sans font-light text-[0.9375rem] text-[#f0f0f0] focus:outline-none focus:border-[#FF3E7F] transition-colors appearance-none cursor-pointer"
        >
          <option value="" disabled className="text-[rgba(240,240,240,0.30)]">
            {labels.type}
          </option>
          {businessTypes.map((type) => (
            <option key={type} value={type} className="bg-[#111111] text-[#f0f0f0]">
              {type}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center h-12 px-8 bg-[#FF3E7F] text-white font-mono text-[0.75rem] uppercase tracking-[0.08em] rounded-[2px] hover:bg-[#e6356e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? '...' : labels.submit}
      </button>

      {status === 'error' && (
        <p className="font-sans font-light text-[0.875rem] text-red-400">
          {labels.error}
        </p>
      )}
    </form>
  )
}
