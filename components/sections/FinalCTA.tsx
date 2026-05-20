'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { useState } from 'react'

export function FinalCTA() {
  const t = useTranslations('home')
  const locale = useLocale()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative bg-[#050505] overflow-hidden">
      {/* Top hairline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[rgba(232,232,232,0.06)]" aria-hidden="true" />

      {/* Pink signal - one blade, not a frame */}
      <div className="absolute top-0 left-0 w-1/3 h-px bg-[#FF3E7F]" aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-40 relative z-10">
        {/* Label */}
        <div className="flex items-center gap-3 mb-8 md:mb-10">
          <div className="w-5 h-px bg-[#FF3E7F]" />
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[rgba(232,232,232,0.5)]">
            {t('final_cta_label')}
          </span>
        </div>

        {/* Massive heading */}
        <h2 className="font-sans font-bold text-[clamp(2rem,7vw,6.5rem)] tracking-[-0.03em] text-[#E6E6E6] leading-[1.05] md:leading-[0.95] mb-8 max-w-4xl whitespace-pre-line">
          {t('final_cta_heading')}
        </h2>

        {/* Subtext */}
        <p className="text-[0.9375rem] md:text-[1rem] text-[rgba(232,232,232,0.4)] max-w-md mb-10 md:mb-14 leading-relaxed whitespace-pre-line">
          {t('final_cta_sub')}
        </p>

        {/* Button - clean, no clip-path */}
        <Link
          href={`/${locale}/quote`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-3.5 
            font-mono text-[0.75rem] uppercase tracking-[0.15em]
            border transition-all duration-200
            ${isHovered 
              ? 'border-[#FF3E7F] text-[#FF3E7F]' 
              : 'border-[rgba(232,232,232,0.15)] text-[rgba(232,232,232,0.7)]'
            }
          `}
        >
          <span>{t('final_cta_button')}</span>
          <span className={`
            text-[0.85rem] transition-opacity duration-200
            ${isHovered ? 'opacity-50' : 'opacity-0'}
          `}>
            ☺
          </span>
        </Link>

        {/* Bottom hairline - just a whisper */}
        <div className="mt-16 md:mt-24 w-full h-px bg-[rgba(232,232,232,0.06)]" aria-hidden="true" />
      </div>
    </section>
  )
}
