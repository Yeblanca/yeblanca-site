import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { CaseStudyHero } from '@/components/project/CaseStudyHero'
import { LightboxImage } from '@/components/ui/LightboxImage'
import { getPayloadClient } from '@/lib/payload'
import { getMediaUrl } from '@/lib/payload-media'
import { convertLexicalToHTMLAsync } from '@payloadcms/richtext-lexical/html-async'
import { getPayloadPopulateFn } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const project = result.docs[0]
    if (project) {
      return {
        title: `${project.titleEn} — yeblanca`,
        description: project.taglineEn || project.descriptionEn?.substring(0, 160) || '',
      }
    }
  } catch {
    // Payload not ready
  }
  return { title: 'Project — yeblanca' }
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
      depth: 1,
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

  const rawDescription = locale === 'es' ? project.descriptionEs : project.descriptionEn

  // Convert Lexical rich text to HTML (with populate so upload nodes resolve to Cloudinary URLs)
  let descriptionHtml = ''
  if (rawDescription) {
    if (typeof rawDescription === 'string') {
      descriptionHtml = `<p>${rawDescription}</p>`
    } else {
      const payload = await getPayloadClient()
      const basePopulate = await getPayloadPopulateFn({
        currentDepth: 0,
        depth: 1,
        payload,
      })
      const populate = async (args: any) => {
        const doc: any = await basePopulate(args)
        if (args.collectionSlug === 'media' && doc) {
          const resolved = getMediaUrl(doc)
          if (resolved) doc.url = resolved
        }
        return doc
      }
      descriptionHtml = await convertLexicalToHTMLAsync({
        data: rawDescription as SerializedEditorState,
        populate: populate as any,
      })
    }
  }

  const coverImageUrl = getMediaUrl(project.coverImage)

  const galleryImages = (project.gallery || [])
    .map((item: any) => getMediaUrl(item.image))
    .filter(Boolean) as string[]

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
        coverImageUrl={coverImageUrl}
      />

      {/* Description */}
      {descriptionHtml && (
        <div className="px-6 py-16">
          <div className="max-w-3xl mx-auto">
            <div
              className="font-sans text-[1.125rem] text-[rgba(240,240,240,0.80)] leading-[1.8] [&_p]:mb-5 [&_p:last-child]:mb-0 [&_ul]:mb-5 [&_ul]:pl-5 [&_li]:mb-2 [&_a]:text-[#FF3E7F] [&_a:hover]:underline [&_strong]:font-medium [&_strong]:text-[#f0f0f0]"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          </div>
        </div>
      )}

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <div className="px-6 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {galleryImages.map((url, idx) => (
                <div
                  key={idx}
                  className="relative aspect-video bg-[#111111] border-[0.5px] border-[rgba(240,240,240,0.08)] rounded-[2px] overflow-hidden"
                >
                  <LightboxImage
                    src={url}
                    alt={`${project.titleEn} screenshot ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Next project */}
      {nextProject && (
        <div className="px-6 py-16 border-t border-[rgba(240,240,240,0.08)]">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <span className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.55)]">
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
