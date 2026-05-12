"use client"

import React, { useCallback, useRef } from "react"
import { useAnimationFrame } from "motion/react"
import { useMousePositionRef } from "@/hooks/use-mouse-position-ref"

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string
  styles?: Partial<{
    transform?: { from: string; to: string }
    color?: { from: string; to: string }
    opacity?: { from: number; to: number }
    letterSpacing?: { from: string; to: string }
  }>
  containerRef: React.RefObject<HTMLDivElement | null>
  radius?: number
  falloff?: "linear" | "exponential" | "gaussian"
}

export default function TextCursorProximity({
  label,
  styles = {},
  containerRef,
  radius = 50,
  falloff = "linear",
  className,
  onClick,
  ...props
}: TextProps) {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const mousePositionRef = useMousePositionRef(containerRef)
  const stylesRef = useRef(styles)

  // Keep styles ref updated
  stylesRef.current = styles

  // Parse label into words and letters for rendering
  const parsedLabel = React.useMemo(() => {
    const words = label.split(" ")
    const result: { letter: string; isSpace: boolean }[] = []

    words.forEach((word, wordIndex) => {
      word.split("").forEach((letter) => {
        result.push({ letter, isSpace: false })
      })
      if (wordIndex < words.length - 1) {
        result.push({ letter: " ", isSpace: true })
      }
    })

    return result
  }, [label])

  const letterCount = parsedLabel.filter(l => !l.isSpace).length

  // Calculate distance between two points
  const calculateDistance = useCallback((
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  }, [])

  // Calculate falloff based on distance and falloff type
  const calculateFalloff = useCallback((distance: number): number => {
    const normalizedDistance = Math.min(Math.max(1 - distance / radius, 0), 1)

    switch (falloff) {
      case "exponential":
        return Math.pow(normalizedDistance, 2)
      case "gaussian":
        return Math.exp(-Math.pow(distance / (radius / 2), 2) / 2)
      case "linear":
      default:
        return normalizedDistance
    }
  }, [falloff, radius])

  // Linear interpolation helper
  const lerp = (a: number, b: number, t: number): number => a + (b - a) * t

  // Parse CSS transform string to scale value
  const parseScale = (transform: string): number => {
    const match = transform.match(/scale\(([^)]+)\)/)
    return match ? parseFloat(match[1]) : 1
  }

  // Interpolate transform strings
  const lerpTransform = (from: string, to: string, t: number): string => {
    const fromScale = parseScale(from)
    const toScale = parseScale(to)
    const newScale = lerp(fromScale, toScale, t)
    return `scale(${newScale})`
  }

  // Interpolate between two strings (step at 0.5)
  const lerpString = (from: string, to: string, t: number): string => {
    return t < 0.5 ? from : to
  }

  // Animation frame to update letter styles based on cursor proximity
  useAnimationFrame(() => {
    if (!containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const currentStyles = stylesRef.current

    letterRefs.current.forEach((letterRef, index) => {
      if (!letterRef) return

      // Skip space characters
      const letterData = parsedLabel[index]
      if (letterData?.isSpace) return

      const rect = letterRef.getBoundingClientRect()
      const letterCenterX = rect.left + rect.width / 2 - containerRect.left
      const letterCenterY = rect.top + rect.height / 2 - containerRect.top

      const distance = calculateDistance(
        mousePositionRef.current.x,
        mousePositionRef.current.y,
        letterCenterX,
        letterCenterY
      )

      const proximity = calculateFalloff(distance)

      // Apply styles based on proximity with proper transforms
      if (currentStyles.transform) {
        letterRef.style.transform = lerpTransform(
          currentStyles.transform.from,
          currentStyles.transform.to,
          proximity
        )
        letterRef.style.willChange = 'transform'
      }

      if (currentStyles.color) {
        letterRef.style.color = lerpString(currentStyles.color.from, currentStyles.color.to, proximity)
      }

      if (currentStyles.opacity) {
        letterRef.style.opacity = lerp(currentStyles.opacity.from, currentStyles.opacity.to, proximity).toString()
      }

      if (currentStyles.letterSpacing) {
        letterRef.style.letterSpacing = lerpString(
          currentStyles.letterSpacing.from,
          currentStyles.letterSpacing.to,
          proximity
        )
      }
    })
  })

  return (
    <span
      className={`${className} inline`}
      onClick={onClick}
      {...props}
    >
      {parsedLabel.map((item, index) => (
        <span
          key={index}
          ref={(el: HTMLSpanElement | null) => {
            letterRefs.current[index] = el
          }}
          className={item.isSpace ? "inline-block w-[0.25em]" : "inline-block"}
          style={item.isSpace ? {} : { display: "inline-block" }}
        >
          {item.letter}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  )
}