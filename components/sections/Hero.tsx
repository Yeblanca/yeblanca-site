"use client"

import Link from 'next/link'
import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useTheme } from '@/lib/theme-context'
import { SectionLabel } from '@/components/ui/SectionLabel'
import TextCursorProximity from '@/components/ui/text-cursor-proximity'

export function Hero() {
  const t = useTranslations('home')
  const locale = useLocale()
  const { resolvedTheme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)

  const isDark = resolvedTheme === 'dark'

  return (
    <section className="relative min-h-[90vh] min-h-[90dvh] flex flex-col justify-center px-6 py-32 overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/images/3D_letter_Y_UI_202605121532.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]" />

      <div className="relative z-10 max-w-5xl mx-auto w-full" ref={containerRef}>
        <SectionLabel label={t('hero_eyebrow')} />

        <h1 className="font-sans font-bold text-[clamp(2.5rem,8vw,5rem)] leading-[1.05] tracking-[-0.03em] text-[#f0f0f0] mb-8">
          <TextCursorProximity
            label={t('hero_headline')}
            className="inline"
            styles={{
              transform: {
                from: 'scale(1)',
                to: 'scale(1.15)',
              },
              color: {
                from: '#f0f0f0',
                to: '#FF3E7F',
              },
            }}
            falloff="gaussian"
            radius={250}
            containerRef={containerRef}
          />
        </h1>

        <p className="font-sans font-light text-[1.125rem] leading-[1.7] text-[rgba(240,240,240,0.60)] max-w-xl mb-12">
          {t('hero_sub')}
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center h-11 px-6 border border-[rgba(240,240,240,0.15)] text-[#f0f0f0] font-mono text-[11px] uppercase tracking-[0.08em] rounded-[2px] hover:border-[rgba(240,240,240,0.35)] transition-colors"
          >
            {t('cta_services')}
          </Link>
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center h-11 px-6 bg-[#FF3E7F] text-white font-mono text-[11px] uppercase tracking-[0.08em] rounded-[2px] hover:bg-[#e6356e] transition-colors"
          >
            {t('cta_projects')}
          </Link>
        </div>
      </div>
    </section>
  )
}