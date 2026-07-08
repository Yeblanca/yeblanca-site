'use client'

import { PhaseCard } from './MethodologyCard'

interface MethodologyPhase {
  label: string
  title: string
  description: string
}

interface MethodologyProps {
  phases: MethodologyPhase[]
  headline?: string
}

export function Methodology({ phases, headline = 'Methodology' }: MethodologyProps) {
  if (!phases || phases.length === 0) return null

  return (
    <section
      aria-labelledby="methodology-heading"
      className="py-16 md:py-32 bg-bg relative border-t-[0.5px] border-border"
    >
      <div className="px-6 md:px-24 max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <div className="w-8 h-[1px] bg-accent" />
          <h2
            id="methodology-heading"
            className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-muted-50"
          >
            {headline}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-accent-muted -translate-x-1/2 hidden md:block" />

          <div className="space-y-16 md:space-y-32">
            {phases.map((phase, index) => (
              <PhaseCard
                key={index}
                phase={phase}
                alignment={index % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
