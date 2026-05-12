import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ProjectCard, type ProjectCardData } from '@/components/project/ProjectCard'

export function FeaturedProjects({ projects }: { projects: ProjectCardData[] }) {
  const t = useTranslations('home')
  const tn = useTranslations('projects')
  const locale = useLocale()

  return (
    <section className="py-24 md:py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <SectionLabel label={t('projects_label')} />
            <h2 className="font-sans font-medium text-[2rem] tracking-[-0.02em] text-[#f0f0f0]">
              {t('projects_heading')}
            </h2>
          </div>
          <Link
            href={`/${locale}/projects`}
            className="hidden md:inline-flex font-mono text-[11px] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.45)] hover:text-[rgba(240,240,240,0.75)] transition-colors"
          >
            {t('projects_cta')} →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href={`/${locale}/projects`}
            className="font-mono text-[11px] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.45)] hover:text-[rgba(240,240,240,0.75)] transition-colors"
          >
            {t('projects_cta')} →
          </Link>
        </div>
      </div>
    </section>
  )
}
