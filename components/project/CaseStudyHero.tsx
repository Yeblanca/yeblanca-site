import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { ExternalLink } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'

interface Props {
  titleEn: string
  titleEs: string
  taglineEn?: string
  taglineEs?: string
  client: string
  year: number
  serviceType: string
  stack: Array<{ tech: string }>
  liveUrl?: string
}

export function CaseStudyHero({
  titleEn,
  titleEs,
  taglineEn,
  taglineEs,
  client,
  year,
  serviceType,
  stack,
  liveUrl,
}: Props) {
  const locale = useLocale()
  const t = useTranslations('projects')

  const title = locale === 'es' ? titleEs : titleEn
  const tagline = locale === 'es' ? taglineEs : taglineEn

  return (
    <div className="pt-32 pb-16 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <SectionLabel label={`${serviceType} · ${year}`} />

        <h1 className="font-sans font-bold text-[clamp(2rem,6vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-[#f0f0f0] mb-4">
          {title}
        </h1>

        {tagline && (
          <p className="font-sans font-light text-[1.125rem] text-[rgba(240,240,240,0.60)] mb-8 max-w-xl">
            {tagline}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-6 mb-8">
          <div>
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.55)] mb-1">
              Client
            </p>
            <p className="font-sans font-light text-[0.9375rem] text-[rgba(240,240,240,0.75)]">
              {client}
            </p>
          </div>
          <div>
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.55)] mb-1">
              Year
            </p>
            <p className="font-sans font-light text-[0.9375rem] text-[rgba(240,240,240,0.75)]">
              {year}
            </p>
          </div>
        </div>

        {/* Stack pills */}
        {stack?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {stack.map(({ tech }) => (
              <span
                key={tech}
                className="inline-flex items-center h-8 px-3 border-[0.5px] border-[rgba(240,240,240,0.12)] rounded-[2px] font-mono text-[0.75rem] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.50)]"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-9 px-5 border border-[rgba(240,240,240,0.15)] rounded-[2px] font-mono text-[0.75rem] uppercase tracking-[0.08em] text-[rgba(240,240,240,0.60)] hover:border-[#FF3E7F] hover:text-[#FF3E7F] transition-colors"
          >
            <ExternalLink size={12} />
            {t('view_live')}
          </a>
        )}
      </div>
    </div>
  )
}
