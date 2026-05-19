"use client"

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { type ProjectCardData } from '@/components/project/ProjectCard'

/**
 * Generates a deterministic gradient + initial placeholder based on the project slug.
 * Falls back to a geometric pattern when no real image is available.
 */
function projectPlaceholder(project: ProjectCardData, index: number) {
  const gradients = [
    'from-[#1a0a14] via-[#2d1b28] to-[#1a0a14]',
    'from-[#0a141a] via-[#1b2d28] to-[#0a141a]',
    'from-[#140a1a] via-[#281b2d] to-[#140a1a]',
    'from-[#0a1a14] via-[#1b282d] to-[#0a1a14]',
  ]
  const g = gradients[index % gradients.length]
  const letter = (project.titleEn ?? 'P').charAt(0).toUpperCase()

  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${g} flex items-center justify-center`}
      aria-hidden="true"
    >
      <span className="font-sans font-bold text-[6rem] md:text-[8rem] text-[rgba(255,62,127,0.12)] select-none">
        {letter}
      </span>
    </div>
  )
}

export function FeaturedProjects({ projects }: { projects: ProjectCardData[] }) {
  const t = useTranslations('home')
  const locale = useLocale()

  if (!projects || projects.length === 0) return null

  return (
    <section className="py-24 md:py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <SectionLabel label={t('projects_label')} />
            <h2 className="font-sans font-medium text-[2rem] tracking-[-0.02em] text-[#f0f0f0]">
              {t('projects_heading')}
            </h2>
          </div>
          <Link
            href={`/${locale}/projects`}
            className="hidden md:inline-flex font-mono text-[0.75rem] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.65)] hover:text-[rgba(240,240,240,0.75)] transition-colors"
          >
            {t('projects_cta')} →
          </Link>
        </div>

        {/* Projects list */}
        <div className="flex flex-col gap-20 md:gap-28">
          {projects.map((project, i) => {
            const title = locale === 'es' ? project.titleEs : project.titleEn
            const tagline = locale === 'es' ? project.taglineEs : project.taglineEn
            const num = String(i + 1).padStart(3, '0')
            const isReversed = i % 2 !== 0

            return (
              <Link
                key={project.slug}
                href={`/${locale}/projects/${project.slug}`}
                className="group block"
              >
                <article>
                  <div
                    className={`flex flex-col ${
                      isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
                    } gap-8 md:gap-12 items-start`}
                  >
                    {/* Index + content */}
                    <div className="flex-1 space-y-6 w-full">
                      {/* Number row */}
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-[#FF3E7F]">
                          {num}
                        </span>
                        <div className="flex-1 h-px bg-[#FF3E7F]" />
                      </div>

                      {/* Title */}
                      <h3 className="font-sans font-medium text-[1.625rem] md:text-[2.25rem] leading-[1.1] tracking-[-0.02em] text-[#f0f0f0] uppercase">
                        {title}
                      </h3>

                      {/* Tagline */}
                      {tagline && (
                        <p className="font-sans font-light text-[1rem] leading-[1.7] text-[rgba(240,240,240,0.55)] max-w-lg">
                          {tagline}
                        </p>
                      )}

                      {/* Stack tags */}
                      {project.stack?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.stack.slice(0, 4).map(({ tech }) => (
                            <span
                              key={tech}
                              className="inline-flex items-center h-8 px-3 border-[0.5px] border-[rgba(240,240,240,0.12)] rounded-[2px] font-mono text-[0.75rem] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.40)]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Image / Placeholder */}
                    <div className="w-full md:w-[55%] aspect-video bg-[#111111] overflow-hidden border-[0.5px] border-[rgba(240,240,240,0.08)] rounded-[2px] group-hover:border-[#FF3E7F] transition-colors duration-500">
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                          loading="lazy"
                        />
                      ) : (
                        projectPlaceholder(project, i)
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mt-12 md:hidden">
          <Link
            href={`/${locale}/projects`}
            className="font-mono text-[0.75rem] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.65)] hover:text-[rgba(240,240,240,0.75)] transition-colors"
          >
            {t('projects_cta')} →
          </Link>
        </div>
      </div>
    </section>
  )
}
