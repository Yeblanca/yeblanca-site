'use client'

interface Client {
  id: string
  name: string
}

interface ClientsProps {
  clients: Client[]
}

export function Clients({ clients }: ClientsProps) {
  if (!clients || clients.length === 0) return null

  return (
    <section aria-label="Clients" className="relative py-16 md:py-24 px-6 border-t-[0.5px] border-b-[0.5px] border-[rgba(240,240,240,0.15)] overflow-hidden bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-x-8 gap-y-6 opacity-30">
          {clients.map((client) => (
            <span
              key={client.id}
              className="font-sans font-bold text-[clamp(1.25rem,4vw,2rem)] tracking-[-0.02em] uppercase grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default text-[#f0f0f0]"
            >
              {client.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
