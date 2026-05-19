'use client'

import { useState } from 'react'

type MethodologyPhase = {
  label: string
  title: string
  description: string
}

export type PhaseCardProps = {
  phase: MethodologyPhase
  alignment: 'left' | 'right'
  isVisible: boolean
  delay: number
}

export function PhaseCard({ phase, alignment, isVisible, delay }: PhaseCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isLeft = alignment === 'left'

  return (
    <div
      className={`relative flex flex-col md:flex-row items-center transition-all duration-200 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      {/* Left content */}
      <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-16 md:text-right' : ''}`}>
        {isLeft && (
          <div
            className="relative cursor-default"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Bloom effect */}
            <div
              className={`absolute -inset-4 transition-all duration-200 ease-out ${
                isHovered ? 'bg-[#FF3E7F]/5' : 'bg-transparent'
              }`}
            />
            {/* Signal line */}
            <div
              className={`absolute top-1/2 left-0 w-[1px] bg-[#FF3E7F] transition-all duration-200 ${
                isHovered ? 'h-[60%] opacity-100' : 'h-0 opacity-0'
              }`}
            />

            <span className="relative font-mono text-[10px] tracking-[0.25em] uppercase text-[rgba(255,62,127,0.6)] block mb-3">
              {phase.label}
            </span>
            <h4 className="relative font-sans font-medium text-[1.5rem] md:text-[2rem] tracking-tight uppercase text-[#f0f0f0] mb-3 leading-none">
              {phase.title}
            </h4>
            <p className="relative font-sans text-[13px] leading-[1.6] text-[rgba(240,240,240,0.4)] max-w-sm">
              {phase.description}
            </p>

            {/* Glitch line */}
            <div
              className={`absolute top-0 right-0 w-4 h-[1px] bg-[#FF3E7F] transition-all duration-200 ${
                isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
              }`}
            />
          </div>
        )}
      </div>

      {/* Center dot */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:block z-10">
        <div
          className={`absolute inset-0 rounded-full transition-all duration-200 ${
            isHovered ? 'bg-[#FF3E7F]/20 scale-[3]' : 'bg-transparent scale-100'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
        <div className={`w-2 h-2 bg-[#FF3E7F] transition-transform duration-200 ${isHovered ? 'scale-150' : 'scale-100'}`} />
      </div>

      {/* Right content */}
      <div className={`w-full md:w-1/2 ${!isLeft ? 'md:pl-16 text-left' : ''}`}>
        {!isLeft && (
          <div
            className="relative cursor-default"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Bloom effect */}
            <div
              className={`absolute -inset-4 transition-all duration-200 ease-out ${
                isHovered ? 'bg-[#FF3E7F]/5' : 'bg-transparent'
              }`}
            />
            {/* Signal line */}
            <div
              className={`absolute top-1/2 right-0 w-[1px] bg-[#FF3E7F] transition-all duration-200 ${
                isHovered ? 'h-[60%] opacity-100' : 'h-0 opacity-0'
              }`}
            />

            <span className="relative font-mono text-[10px] tracking-[0.25em] uppercase text-[rgba(255,62,127,0.6)] block mb-3">
              {phase.label}
            </span>
            <h4 className="relative font-sans font-medium text-[1.5rem] md:text-[2rem] tracking-tight uppercase text-[#f0f0f0] mb-3 leading-none">
              {phase.title}
            </h4>
            <p className="relative font-sans text-[13px] leading-[1.6] text-[rgba(240,240,240,0.4)] max-w-sm">
              {phase.description}
            </p>

            {/* Glitch line */}
            <div
              className={`absolute top-0 left-0 w-4 h-[1px] bg-[#FF3E7F] transition-all duration-200 ${
                isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
              }`}
            />
          </div>
        )}
      </div>
    </div>
  )
}