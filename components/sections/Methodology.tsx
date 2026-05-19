'use client'

interface MethodologyPhase {
  label: string
  title: string
  description: string
}

interface MethodologyProps {
  phases: MethodologyPhase[]
}

export function Methodology({ phases }: MethodologyProps) {
  if (!phases || phases.length === 0) return null

  return (
    <section aria-labelledby="methodology-heading" className="py-32 overflow-hidden">
      <div className="px-6 md:px-24 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-24">
          <div className="w-6 h-[1px] bg-accent-primary"></div>
          <h2 id="methodology-heading" className="font-label-mono text-label-mono text-accent-primary uppercase tracking-widest">METHODOLOGY</h2>
        </div>
        <div className="relative">
          {/* Central Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-outline-variant transform -translate-x-1/2 hidden md:block"></div>
          <div className="space-y-24 md:space-y-32">
            {phases.map((phase, index) => {
              const isEven = (index + 1) % 2 === 0
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center">
                  {isEven ? (
                    <>
                      <div className="w-full md:w-1/2"></div>
                      <div className="absolute left-1/2 w-3 h-3 bg-accent-primary transform -translate-x-1/2 hidden md:block z-10"></div>
                      <div className="w-full md:w-1/2 md:pl-12 text-left">
                        <span className="font-label-mono text-label-mono text-accent-primary mb-2 block">{phase.label}</span>
                        <h4 className="font-headline-3xl text-headline-3xl uppercase mb-4">{phase.title}</h4>
                        <p className="font-body-base text-body-base text-on-surface-variant max-w-md">{phase.description}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full md:w-1/2 md:pr-12 text-left md:text-right">
                        <span className="font-label-mono text-label-mono text-accent-primary mb-2 block">{phase.label}</span>
                        <h4 className="font-headline-3xl text-headline-3xl uppercase mb-4">{phase.title}</h4>
                        <p className="font-body-base text-body-base text-on-surface-variant max-w-md md:ml-auto">{phase.description}</p>
                      </div>
                      <div className="absolute left-1/2 w-3 h-3 bg-accent-primary transform -translate-x-1/2 hidden md:block z-10"></div>
                      <div className="w-full md:w-1/2"></div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}