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
    <section aria-label="Testimonial" className="py-16 md:py-32 px-6 bg-bg border-t-[0.5px] border-border">
      <div className="max-w-4xl mx-auto">
        <Quote
          size={40}
          className="text-accent mb-6 md:mb-8"
          aria-hidden="true"
        />
        <blockquote className="font-sans font-bold text-[clamp(1.25rem,4vw,2rem)] md:text-[clamp(1.5rem,3vw,2.5rem)] text-fg uppercase leading-[1.3] md:leading-[1.2] tracking-[-0.01em]">
          "{text}"
        </blockquote>
        <div className="mt-8 md:mt-12 flex items-center gap-4">
          <div className="w-8 h-[1px] bg-accent"></div>
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.15em] text-muted">
            {attribution}
          </p>
        </div>
      </div>
    </section>
  )
}
