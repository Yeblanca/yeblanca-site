import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Hero } from '@/components/sections/Hero'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { ServicesTeaser } from '@/components/sections/ServicesTeaser'
import { SectionLabel } from '@/components/ui/SectionLabel'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

type Props = { params: Promise<{ locale: string }> }

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'home' })

  // Fetch featured projects from Payload
  let featuredProjects: any[] = []
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      where: { featured: { equals: true } },
      limit: 3,
      sort: '-year',
    })
    featuredProjects = result.docs
  } catch {
    // Payload not ready yet — show empty state
  }

  return (
    <>
      <Hero />

      {featuredProjects.length > 0 && (
        <FeaturedProjects projects={featuredProjects} />
      )}

      <ServicesTeaser />

      {/* Final CTA */}
      <section className="py-24 md:py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <SectionLabel label={t('final_cta_label')} />
          <h2 className="font-sans font-bold text-[clamp(2rem,5vw,3rem)] tracking-[-0.03em] text-[#f0f0f0] mb-6">
            {t('final_cta_heading')}
          </h2>
          <p className="font-sans font-light text-[1rem] text-[rgba(240,240,240,0.55)] max-w-lg mb-10">
            {t('final_cta_sub')}
          </p>
          <Link
            href={`/${locale}/quote`}
            className="inline-flex items-center h-11 px-6 bg-[#FF3E7F] text-white font-mono text-[11px] uppercase tracking-[0.08em] rounded-[2px] hover:bg-[#e6356e] transition-colors"
          >
            {t('final_cta_button')}
          </Link>
        </div>
      </section>
    </>
  )
}
