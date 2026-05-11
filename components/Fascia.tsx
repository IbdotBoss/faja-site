"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { DURATION } from "@/lib/ease"

interface FasciaProps {
  className?: string
  controlled?: boolean
  dark?: boolean
}

export default function Fascia({ className = "", controlled = false, dark = false }: FasciaProps) {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    // Skip own ScrollTrigger when controlled by a parent (RevealSection)
    if (controlled) return

    const line = lineRef.current
    if (!line) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: line,
        start: "top bottom",
        onEnter: () => {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: DURATION.draw,
              ease: "taut",
              transformOrigin: "left center",
            }
          )
        },
        onLeaveBack: () => {
          gsap.to(line, {
            scaleX: 0,
            duration: DURATION.fast,
            ease: "taut",
            transformOrigin: "right center",
          })
        },
      })
    })

    return () => ctx.revert()
  }, [controlled])

  return (
    <div
      ref={lineRef}
      className={`w-full h-px origin-left ${dark ? "bg-[#0A0A0A]" : "bg-[#1A1A4D]"} ${className}`}
      /** When controlled, parent owns the animation; when standalone, GSAP animates from scaleX(0).
       *  Only apply inline scaleX(0) when controlled=false AND no reduced motion.
       *  When controlled, the parent decides initial state. */
      style={
        !controlled
          ? { transform: "scaleX(0)" }
          : undefined
      }
    />
  )
}
