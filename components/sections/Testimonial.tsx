'use client'

import { Quote } from 'lucide-react'

interface Testimonial {
  textEn: string
  textEs?: string
  author: string
  company?: string
}

interface TestimonialProps {
  testimonial: Testimonial
  locale: string
}

export function TestimonialSection({ testimonial, locale }: TestimonialProps) {
  if (!testimonial) return null

  const text = locale === 'es' && testimonial.textEs ? testimonial.textEs : testimonial.textEn
  const attribution = testimonial.author + (testimonial.company ? `, ${testimonial.company}` : '')

  return (
    <section aria-label="Testimonial" className="py-32 px-6 bg-[#0a0a0a] border-t-[0.5px] border-[rgba(240,240,240,0.08)]">
      <div className="max-w-4xl mx-auto">
        <Quote
          size={48}
          className="text-[#ff3e7f] mb-8"
          aria-hidden="true"
        />
        <blockquote className="font-display text-[#f0f0f0] italic uppercase leading-tight">
          "{text}"
        </blockquote>
        <div className="mt-12 flex items-center gap-4">
          <div className="w-8 h-[1px] bg-[#ff3e7f]"></div>
          <p className="font-label-mono uppercase tracking-widest text-[#f0f0f0]">
            {attribution}
          </p>
        </div>
      </div>
    </section>
  )
}