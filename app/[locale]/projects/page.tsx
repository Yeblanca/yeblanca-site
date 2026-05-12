import { setRequestLocale, getTranslations } from 'next-intl/server'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ProjectFilters } from '@/components/project/ProjectFilters'
import { getPayloadClient } from '@/lib/payload'

type Props = { params: Promise<{ locale: string }> }

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'projects' })

  let projects: any[] = []
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      limit: 100,
      sort: '-year',
    })
    projects = result.docs
  } catch {
    // Payload not ready
  }

  return (
    <div className="pt-32 pb-24 px-6 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-5xl mx-auto">
        <SectionLabel label={t('page_label')} />
        <h1 className="font-sans font-bold text-[clamp(2.5rem,6vw,4rem)] tracking-[-0.03em] text-[#f0f0f0] mb-16">
          {t('page_heading')}
        </h1>

        <ProjectFilters projects={projects} />
      </div>
    </div>
  )
}
