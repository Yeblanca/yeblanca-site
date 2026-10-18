import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Hero } from '@/components/sections/Hero'
import { WhoIsFor } from '@/components/sections/WhoIsFor'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { ServicesTeaser } from '@/components/sections/ServicesTeaser'
import { DeliveryTiers } from '@/components/sections/DeliveryTiers'
import { Methodology } from '@/components/sections/Methodology'
import { Clients } from '@/components/sections/Clients'
import { NotForEveryone } from '@/components/sections/NotForEveryone'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { getPayloadClient } from '@/lib/payload'
import { getMediaUrl } from '@/lib/payload-media'
import type { ProjectCardData } from '@/components/project/ProjectCard'

type Props = { params: Promise<{ locale: string }> }

const OG_LOCALES: Record<string, string> = { en: 'en_US', es: 'es_MX' }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const title = t('title')
  const description = t('description')
  const url = `/${locale}`

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: { en: '/en', es: '/es', 'x-default': '/en' },
    },
    openGraph: {
      type: 'website',
      siteName: 'yeblanca',
      title,
      description,
      url,
      locale: OG_LOCALES[locale] ?? OG_LOCALES.en,
      alternateLocale: Object.entries(OG_LOCALES)
        .filter(([l]) => l !== locale)
        .map(([, v]) => v),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  // Get translations for methodology timeline
  const t = await getTranslations({ locale, namespace: 'home' })
  const methodologyTimeline = t.raw('methodology_timeline') as Array<{
    label: string
    title: string
    description: string
  }>

  // Fetch featured projects from Payload
  let featuredProjects: ProjectCardData[] = []
  let clients: any[] = []

  try {
    const payload = await getPayloadClient()

    // Featured projects
    const projectsResult = await payload.find({
      collection: 'projects',
      where: { featured: { equals: true } },
      limit: 3,
      sort: '-year',
      depth: 1,
    })
    featuredProjects = projectsResult.docs.map((p: any) => ({
      slug: p.slug,
      titleEn: p.titleEn,
      titleEs: p.titleEs,
      taglineEn: p.taglineEn,
      taglineEs: p.taglineEs,
      year: p.year,
      client: p.client,
      serviceType: p.serviceType,
      stack: p.stack || [],
      featured: p.featured,
      imageUrl: getMediaUrl(p.coverImage),
    }))

    // Clients
    const clientsResult = await payload.find({
      collection: 'clients',
      where: { featured: { equals: true } },
      sort: 'order',
      limit: 10,
    })
    clients = clientsResult.docs
  } catch {
    // Payload not ready yet — show empty state
  }

  return (
    <>
      <Hero />

      <Clients clients={clients} />

      {featuredProjects.length > 0 && (
        <FeaturedProjects projects={featuredProjects} />
      )}

      <WhoIsFor />

      <ServicesTeaser />

      <DeliveryTiers />

      <Methodology phases={methodologyTimeline} headline={t('methodology_headline')} />

      <NotForEveryone />

      {/* Final CTA */}
      <FinalCTA />
    </>
  )
}