"use client"

import { useEffect, useRef, ReactNode } from "react"
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap"
import { DURATION } from "@/lib/ease"
import Fascia from "@/components/Fascia"

interface RevealSectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function RevealSection({
  children,
  className = "",
  id,
}: RevealSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const fasciaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const section = sectionRef.current
    if (!section) return

    // Skip GSAP timeline on reduced motion — show everything immediately
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Find the Fascia element inside this section
      const fascia = section.querySelector("[data-fascia]") as HTMLElement
      const headlines = section.querySelectorAll("[data-reveal='headline']")
      const bodyElements = section.querySelectorAll("[data-reveal='body']")

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      })

      // 1. Fascia draws
      if (fascia) {
        tl.fromTo(
          fascia,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: DURATION.draw,
            ease: "taut",
            transformOrigin: "left center",
          },
          0
        )
      }

      // 2. Headlines clip-path reveal
      headlines.forEach((el, i) => {
        tl.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.6,
            ease: "taut",
          },
          i === 0 ? 0.5 : 0.7
        )
      })

      // 3. Body line-by-line reveal
      bodyElements.forEach((el, i) => {
        const split = new SplitText(el as HTMLElement, {
          type: "lines",
          linesClass: "split-line",
        })

        tl.fromTo(
          split.lines,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.5,
            ease: "taut",
            stagger: 0.04,
          },
          1.0 + i * 0.1
        )
      })

      // Fascia retraction on scroll out
      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        onLeaveBack: () => {
          if (fascia) {
            gsap.to(fascia, {
              scaleX: 0,
              duration: DURATION.fast,
              ease: "taut",
              transformOrigin: "right center",
            })
          }
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id={id} className={className}>
      <div ref={fasciaRef} data-fascia className="w-full">
        <Fascia controlled className="mb-16" />
      </div>
      {children}
    </section>
  )
}
