import { notFound } from 'next/navigation'
import Link from 'next/link'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { CaseStudyHero } from '@/components/project/CaseStudyHero'
import { getPayloadClient } from '@/lib/payload'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'projects', limit: 100 })
    return result.docs.flatMap((doc: any) =>
      ['en', 'es'].map((locale) => ({ locale, slug: doc.slug }))
    )
  } catch {
    return []
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'projects' })

  let project: any = null
  let nextProject: any = null

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    project = result.docs[0] || null

    if (project) {
      // Get next project (by year descending)
      const all = await payload.find({
        collection: 'projects',
        limit: 100,
        sort: '-year',
      })
      const idx = all.docs.findIndex((p: any) => p.slug === slug)
      nextProject = all.docs[(idx + 1) % all.docs.length] || null
    }
  } catch {
    // Payload not ready
  }

  if (!project) notFound()

  const description = locale === 'es' ? project.descriptionEs : project.descriptionEn

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <CaseStudyHero
        titleEn={project.titleEn}
        titleEs={project.titleEs}
        taglineEn={project.taglineEn}
        taglineEs={project.taglineEs}
        client={project.client}
        year={project.year}
        serviceType={project.serviceType}
        stack={project.stack || []}
        liveUrl={project.liveUrl}
      />

      {/* Description */}
      {description && (
        <div className="px-6 py-16">
          <div className="max-w-5xl mx-auto max-w-3xl">
            <div className="font-sans font-light text-[1rem] text-[rgba(240,240,240,0.70)] leading-[1.8] prose prose-invert">
              {/* Rich text content — rendered as plain text for now */}
              <p>{typeof description === 'string' ? description : JSON.stringify(description)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Next project */}
      {nextProject && (
        <div className="px-6 py-16 border-t border-[rgba(240,240,240,0.08)]">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.30)]">
              {t('next_project')}
            </span>
            <Link
              href={`/${locale}/projects/${nextProject.slug}`}
              className="font-sans font-medium text-[1.125rem] text-[#f0f0f0] hover:text-[#FF3E7F] transition-colors"
            >
              {locale === 'es' ? nextProject.titleEs : nextProject.titleEn} →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
