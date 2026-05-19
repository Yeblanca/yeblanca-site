'use client'

import { useTranslations } from 'next-intl'

export function SkipLink() {
  const t = useTranslations('common')

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#FF3E7F] focus:text-white focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.08em] focus:rounded-[2px] focus:outline-none"
    >
      {t('skip_to_main')}
    </a>
  )
}
