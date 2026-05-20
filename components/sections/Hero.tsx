"use client"

import Link from "next/link"
import { useRef, useEffect } from "react"
import { useTranslations, useLocale } from "next-intl"
import { motion } from "motion/react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { SectionLabel } from "@/components/ui/SectionLabel"
import TextCursorProximity from "@/components/ui/text-cursor-proximity"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

export function Hero() {
  const t = useTranslations("home")
  const locale = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reducedMotion = useReducedMotion()

  // Pause decorative video when user prefers reduced motion
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (reducedMotion) {
      video.pause()
    } else {
      video.play().catch(() => {
        /* autoplay may be blocked by browser policy */
      })
    }
  }, [reducedMotion])

  return (
    <section className="relative min-h-[90vh] min-h-[90dvh] flex flex-col justify-center px-6 py-32 overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        role="presentation"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/images/3D_letter_Y_UI_202605121532.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay + subtle backdrop blur for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a] backdrop-blur-[2px]" />

      <motion.div
        ref={containerRef}
        className="relative z-10 max-w-5xl mx-auto w-full selection:bg-[#FF3E7F] selection:text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        {...(reducedMotion && { initial: "visible" })}
      >
        <motion.div variants={itemVariants}>
          <SectionLabel label={t("hero_eyebrow")} />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-sans font-bold text-[clamp(2.5rem,8vw,5rem)] leading-[1.05] tracking-[-0.03em] text-[#f0f0f0] mb-8"
        >
          <TextCursorProximity
            label={t("hero_headline")}
            className="inline"
            styles={{
              transform: {
                from: "scale(1)",
                to: "scale(1.15)",
              },
              color: {
                from: "#f0f0f0",
                to: "#FF3E7F",
              },
            }}
            falloff="gaussian"
            radius={250}
            containerRef={containerRef}
          />
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="font-sans font-light text-[1.125rem] md:text-[1.25rem] leading-[1.8] md:leading-[1.9] text-[rgba(240,240,240,0.65)] max-w-prose mb-14"
        >
          {t("hero_sub")}
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center h-11 px-6 border border-[rgba(240,240,240,0.15)] text-[#f0f0f0] font-mono text-[0.75rem] uppercase tracking-[0.08em] rounded-[2px] hover:border-[rgba(240,240,240,0.35)] transition-colors focus-visible:outline-2 focus-visible:outline-[#FF3E7F] focus-visible:outline-offset-2"
          >
            {t("cta_services")}
          </Link>
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center h-11 px-6 bg-[#FF3E7F] text-white font-mono text-[0.75rem] uppercase tracking-[0.08em] rounded-[2px] hover:bg-[#e6356e] transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            {t("cta_projects")}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
