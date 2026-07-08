"use client"

import { useState, useEffect } from "react"

interface LightboxImageProps {
  src: string
  alt: string
  className?: string
}

export function LightboxImage({ src, alt, className }: LightboxImageProps) {
  const [open, setOpen] = useState(false)

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full h-full cursor-zoom-in p-0 border-0 bg-transparent text-left"
        aria-label={`${alt} — clic para ampliar`}
      >
        <img src={src} alt={alt} className={className} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} — ampliada`}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
