import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { Hero } from '@/components/sections/Hero'
import { WhoIsFor } from '@/components/sections/WhoIsFor'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { ServicesTeaser } from '@/components/sections/ServicesTeaser'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { getPayloadClient } from '@/lib/payload'
import {TextQuoteIcon} from "lucide-react";

type Props = { params: Promise<{ locale: string }> }

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  // Fetch featured projects from Payload
  let featuredProjects: any[] = []
  let methodologyPhases: any[] = []
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
    })
    featuredProjects = projectsResult.docs

    // Methodology phases
    const methodologyResult = await payload.find({
      collection: 'methodology',
      sort: 'order',
      limit: 10,
    })
    methodologyPhases = methodologyResult.docs

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

      <WhoIsFor />

      {featuredProjects.length > 0 && (
        <FeaturedProjects projects={featuredProjects} />
      )}

      <ServicesTeaser />

      {/* Methodology */}
      {methodologyPhases.length > 0 && (
        <section className="relative py-32 px-6 bg-[#0a0a0a] overflow-hidden">
          {/* Background image - variant */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/bg1.jpeg"
              alt=""
              fill
              className="object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <div className="w-6 h-[1px] bg-[#ff3e7f]"></div>
              <h2 className="font-label-mono text-accent-primary uppercase tracking-widest">METHODOLOGY</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {methodologyPhases.map((phase) => {
                const title = locale === 'es' && phase.titleEs ? phase.titleEs : phase.titleEn
                const description = locale === 'es' && phase.descriptionEs ? phase.descriptionEs : phase.descriptionEn
                return (
                  <div key={phase.id} className="space-y-4">
                    <span className="font-label-mono text-accent-primary">PHASE_0{phase.phase}</span>
                    <h4 className="font-headline-3xl uppercase text-[#f0f0f0]">{title}</h4>
                    <p className="font-meta-sm text-[rgba(240,240,240,0.6)]">{description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Clients */}
      {clients.length > 0 && (
        <section className="relative py-32 px-6 border-t-[0.5px] border-b-[0.5px] border-[rgba(240,240,240,0.15)] overflow-hidden">
          {/* Background image - horizontal variant */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/yebhozconfondo (1).png"
              alt=""
              fill
              className="object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-[#0a0a0a]" />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-between items-center gap-12 opacity-30">
              {clients.map((client) => (
                <span
                  key={client.id}
                  className="font-headline-3xl font-bold grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default"
                >
                  {client.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {featuredTestimonial && (
        <section className="py-32 px-6 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto">
            <span className="material-symbols-outlined text-[#ff3e7f] text-6xl mb-8" aria-hidden="true" data-icon="format_quote">  </span>
            <blockquote className="font-display text-[#f0f0f0] italic uppercase leading-tight">
              "{locale === 'es' && featuredTestimonial.textEs ? featuredTestimonial.textEs : featuredTestimonial.textEn}"
            </blockquote>
            <div className="mt-12 flex items-center gap-4">
              <div className="w-8 h-[1px] bg-[#ff3e7f]"></div>
              <p className="font-label-mono uppercase tracking-widest text-[#f0f0f0]">
                {featuredTestimonial.author}{featuredTestimonial.company ? `, ${featuredTestimonial.company}` : ''}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <FinalCTA />
    </>
  )
}