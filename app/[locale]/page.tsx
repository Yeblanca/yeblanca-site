import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Hero } from '@/components/sections/Hero'
import { WhoIsFor } from '@/components/sections/WhoIsFor'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { ServicesTeaser } from '@/components/sections/ServicesTeaser'
import { DeliveryTiers } from '@/components/sections/DeliveryTiers'
import { Methodology } from '@/components/sections/Methodology'
import { Clients } from '@/components/sections/Clients'
import { TestimonialSection } from '@/components/sections/Testimonial'
import { NotForEveryone } from '@/components/sections/NotForEveryone'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { getPayloadClient } from '@/lib/payload'
import { getMediaUrl } from '@/lib/payload-media'
import type { ProjectCardData } from '@/components/project/ProjectCard'

type Props = { params: Promise<{ locale: string }> }

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
  let featuredTestimonial: any = null

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

    // Featured testimonial
    const testimonialResult = await payload.find({
      collection: 'testimonials',
      where: { featured: { equals: true } },
      limit: 1,
    })
    featuredTestimonial = testimonialResult.docs[0] || null
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

      <TestimonialSection testimonial={featuredTestimonial} locale={locale} />

      <NotForEveryone />

      {/* Final CTA */}
      <FinalCTA />
    </>
  )
}