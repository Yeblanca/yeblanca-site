"use client"

import Link from 'next/link'
import { useLocale } from 'next-intl'

export function WhoIsFor() {
  const locale = useLocale()
  
  const isSpanish = locale === 'es'
  
  const translations = isSpanish
    ? {
        eyebrow: 'Para quién es esto',
        titleWhite: '¿Te ',
        titlePink: 'suena familiar?',
        body: 'Tal vez nunca has tenido un sitio web y no sabes por dónde empezar.\n\nTal vez tienes uno — pero no está haciendo nada por tu negocio.\n\nTal vez estás operando con hojas de cálculo, WhatsApp y pura fuerza de voluntad — y sabes que debe haber una mejor manera, pero no sabes qué pedir.\n\nTal vez superaste Shopify, Wix, o lo que alguien te instaló hace tres años.\n\nCualquiera de estas es un buen punto de partida. Hemos estado ahí con clientes en cada etapa.',
        cta: 'Cuéntanos dónde estás →'
      }
    : {
        eyebrow: 'Who this is for',
        titleWhite: 'Sound ',
        titlePink: 'familiar?',
        body: "Maybe you've never had a website and you're not sure where to start.\n\nMaybe you have one — and it's not doing anything for the business.\n\nMaybe you're running your operation on spreadsheets, WhatsApp, and willpower — and you know there's a better way, but you're not sure what to ask for.\n\nMaybe you've outgrown Shopify, Wix, or whatever someone set up for you three years ago.\n\nAny of those is a good place to start. We've been there with clients at every stage.",
        cta: 'Tell us where you are →'
      }

  return (
    <section className="relative py-24 md:py-32 px-6 bg-[#0a0a0a] border-t-[0.5px] border-[rgba(240,240,240,0.08)]">
      <div className="max-w-6xl mx-auto">
        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left column - eyebrow + title */}
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.20em] text-[rgba(240,240,240,0.35)] block mb-6">
              {translations.eyebrow}
            </span>
            <h2 className="font-sans font-medium text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em]">
              <span className="text-[#f0f0f0]">{translations.titleWhite}</span>
              <span className="text-[#FF3E7F]">{translations.titlePink}</span>
            </h2>
          </div>

          {/* Right column - body */}
          <div className="lg:col-span-7">
            <div className="space-y-6">
              {translations.body.split('\n\n').map((paragraph, index) => (
                <p 
                  key={index} 
                  className="font-sans text-[1rem] md:text-[1.125rem] leading-[1.7] text-[rgba(240,240,240,0.55)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12">
              <Link
                href={`/${locale}/quote`}
                className="inline-flex items-center font-mono text-[11px] uppercase tracking-[0.10em] text-[#FF3E7F] hover:text-[#ff5c8d] transition-colors group"
              >
                {translations.cta}
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}