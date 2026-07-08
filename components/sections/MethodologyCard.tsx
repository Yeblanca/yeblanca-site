'use client'

type MethodologyPhase = {
  label: string
  title: string
  description: string
}

export type PhaseCardProps = {
  phase: MethodologyPhase
  alignment: 'left' | 'right'
}

export function PhaseCard({ phase, alignment }: PhaseCardProps) {
  const isLeft = alignment === 'left'

  return (
    <div className="relative flex flex-col md:flex-row items-center">
      {/* Left content */}
      <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-16 md:text-right' : ''}`}>
        {isLeft && (
          <div className="relative">
            <span className="font-mono text-[0.6875rem] tracking-[0.25em] uppercase text-[rgba(255,62,127,0.6)] block mb-3">
              {phase.label}
            </span>
            <h4 className="font-sans font-medium text-[1.5rem] md:text-[2rem] tracking-tight uppercase text-fg mb-3 leading-none">
              {phase.title}
            </h4>
            <p className="font-sans text-[1.125rem] leading-[1.75] text-muted max-w-md md:ml-auto">
              {phase.description}
            </p>
          </div>
        )}
      </div>

      {/* Center dot */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:block z-10">
        <div className="w-2 h-2 bg-accent" />
      </div>

      {/* Right content */}
      <div className={`w-full md:w-1/2 ${!isLeft ? 'md:pl-16 text-left' : ''}`}>
        {!isLeft && (
          <div className="relative">
            <span className="font-mono text-[0.6875rem] tracking-[0.25em] uppercase text-[rgba(255,62,127,0.6)] block mb-3">
              {phase.label}
            </span>
            <h4 className="font-sans font-medium text-[1.5rem] md:text-[2rem] tracking-tight uppercase text-fg mb-3 leading-none">
              {phase.title}
            </h4>
            <p className="font-sans text-[1.125rem] leading-[1.75] text-muted max-w-md">
              {phase.description}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}