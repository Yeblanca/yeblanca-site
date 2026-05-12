import Link from 'next/link'
import { useLocale } from 'next-intl'

export interface ProjectCardData {
  slug: string
  titleEn: string
  titleEs: string
  taglineEn?: string
  taglineEs?: string
  year: number
  client: string
  serviceType: string
  stack: Array<{ tech: string }>
  featured?: boolean
  index?: number
}

export function ProjectCard({ project, index = 0 }: { project: ProjectCardData; index?: number }) {
  const locale = useLocale()
  const title = locale === 'es' ? project.titleEs : project.titleEn
  const tagline = locale === 'es' ? project.taglineEs : project.taglineEn
  const num = String(index + 1).padStart(3, '0')

  return (
    <Link
      href={`/${locale}/projects/${project.slug}`}
      className={`group block p-6 bg-[#111111] border-[0.5px] border-[rgba(240,240,240,0.08)] rounded-[2px] hover:border-[#FF3E7F] transition-colors ${
        project.featured ? 'border-l-2 border-l-[#FF3E7F]' : ''
      }`}
    >
      {/* Index marker */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-4 h-px bg-[#FF3E7F] shrink-0" />
        <span className="font-mono text-[11px] text-[rgba(240,240,240,0.40)] tracking-[0.10em]">
          {num}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-sans font-medium text-[1.125rem] text-[#f0f0f0] leading-tight mb-2">
        {title}
      </h3>

      {/* Tagline */}
      {tagline && (
        <p className="font-sans font-light text-[0.875rem] text-[rgba(240,240,240,0.55)] mb-5 leading-relaxed">
          {tagline}
        </p>
      )}

      {/* Meta */}
      <div className="flex items-center gap-2 mb-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.40)]">
          {project.serviceType}
        </span>
        <span className="text-[rgba(240,240,240,0.20)]">·</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.40)]">
          {project.year}
        </span>
      </div>

      {/* Stack pills */}
      {project.stack?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map(({ tech }) => (
            <span
              key={tech}
              className="inline-flex items-center h-5 px-2 border-[0.5px] border-[rgba(240,240,240,0.12)] rounded-[2px] font-mono text-[9px] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.40)]"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
