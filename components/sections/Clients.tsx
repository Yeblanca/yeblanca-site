'use client'

import Image from 'next/image'

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
    <section aria-label="Clients" className="relative py-32 px-6 border-t-[0.5px] border-b-[0.5px] border-[rgba(240,240,240,0.15)] overflow-hidden">
      {/* Background image */}
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
  )
}