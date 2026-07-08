'use client'

import { useEffect, useState } from 'react'

interface Client {
  id: string
  name: string
}

interface ClientsProps {
  clients: Client[]
}

export function Clients({ clients }: ClientsProps) {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  if (!clients || clients.length === 0) return null

  // Fallback accesible: una sola fila, sin animación.
  // Solo se renderiza cuando el usuario pidió reduced-motion en su sistema.
  if (reduceMotion) {
    return (
      <section
        aria-label="Clients"
        className="relative py-16 md:py-24 px-6 border-t-[0.5px] border-b-[0.5px] border-subtle bg-bg"
      >
        <ul className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 max-w-6xl mx-auto opacity-30">
          {clients.map((c) => (
            <li
              key={c.id}
              className="font-sans font-bold text-[clamp(1.25rem,4vw,2rem)] tracking-[-0.02em] uppercase text-fg hover:opacity-100 hover:text-accent transition-[opacity,color] duration-300 cursor-default"
            >
              {c.name}
            </li>
          ))}
        </ul>
      </section>
    )
  }

  return (
    <section
      aria-label="Clients"
      className="group relative py-16 md:py-24 border-t-[0.5px] border-b-[0.5px] border-subtle overflow-hidden bg-bg"
    >
      <ul className="clients-marquee-track flex w-max">
        {clients.map((c) => (
          <ClientItem key={c.id} client={c} />
        ))}
        {clients.map((c) => (
          <ClientItem key={`dup-${c.id}`} client={c} aria-hidden />
        ))}
      </ul>
    </section>
  )
}

function ClientItem({
  client,
  ...rest
}: { client: Client } & React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      {...rest}
      className="font-sans font-bold text-[clamp(1.25rem,4vw,2rem)] tracking-[-0.02em] uppercase text-fg opacity-30 hover:opacity-100 hover:text-accent transition-[opacity,color] duration-300 cursor-default shrink-0 whitespace-nowrap px-6 md:px-8"
    >
      {client.name}
    </li>
  )
}
