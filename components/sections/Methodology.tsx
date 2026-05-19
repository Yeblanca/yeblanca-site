'use client'

import { useEffect, useState, useRef } from 'react'
import { PhaseCard } from './MethodologyCard'

interface MethodologyPhase {
  label: string
  title: string
  description: string
}

interface MethodologyProps {
  phases: MethodologyPhase[]
}

export function Methodology({ phases }: MethodologyProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  if (!phases || phases.length === 0) return null

  return (
    <section
      ref={sectionRef}
      aria-labelledby="methodology-heading"
      className="py-32 overflow-hidden bg-[#0a0a0a] relative"
    >
      {/* Diferenciador: Dots pattern - REDUCIDO 50% */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden="true">
        <div 
          className="absolute inset-0 animate-subtle-drift"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Corner accent - REDUCIDO 50% */}
      <div 
        className="absolute bottom-0 right-0 w-[300px] h-[300px] pointer-events-none opacity-[0.1]"
        style={{
          background: 'linear-gradient(135deg, transparent 40%, rgba(255,62,127,0.35) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Horizontal divider line - MAS NOTORIA */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,62,127,0.4)] to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Nueva línea vertical a la izquierda - divisor de sección - REDUCIDA */}
      <div 
        className="absolute left-8 top-0 bottom-0 w-[1px] bg-[rgba(255,62,127,0.15)] pointer-events-none hidden md:block"
        aria-hidden="true"
      />

      <div className="px-6 md:px-24 max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div
          className={`flex items-center gap-4 mb-24 transition-all duration-200 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="w-8 h-[1px] bg-[#FF3E7F]" />
          <h2
            id="methodology-heading"
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-[rgba(240,240,240,0.5)]"
          >
            Methodology
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[rgba(255,62,127,0.15)] -translate-x-1/2 hidden md:block" />

          <div className="space-y-24 md:space-y-32">
            {phases.map((phase, index) => (
              <PhaseCard
                key={index}
                phase={phase}
                alignment={index % 2 === 0 ? 'left' : 'right'}
                isVisible={isVisible}
                delay={(index + 1) * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}