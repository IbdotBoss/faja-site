"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { DURATION } from "@/lib/ease"

interface FasciaProps {
  className?: string
  controlled?: boolean
}

export default function Fascia({ className = "", controlled = false }: FasciaProps) {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
      className={`w-full h-px bg-[#1A1A4D] origin-left ${className}`}
      style={{ transform: "scaleX(0)" }}
    />
  )
}
