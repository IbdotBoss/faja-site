"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { DURATION } from "@/lib/ease"
import Fascia from "@/components/Fascia"

const STEPS = [
  {
    number: "01",
    name: "Scope",
    description:
      "We start with your business, not a template. We understand your bottleneck, map the system that fixes it, and plan the build before a line of code is written.",
  },
  {
    number: "02",
    name: "Build",
    description:
      "Clean code. Real architecture. Nothing half-done. We build to the highest standard we're capable of — because everything we ship has your business running on it.",
  },
  {
    number: "03",
    name: "Exceed",
    description:
      "You launch with something your business can operate and grow on. Not a starting point. A ceiling-raiser.",
  },
]

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const connectorRef = useRef<HTMLDivElement>(null)
  const squareRefs = useRef<(HTMLDivElement | null)[]>([])
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([])
  const descRefs = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const squares = squareRefs.current.filter(Boolean) as HTMLDivElement[]
      const labels = labelRefs.current.filter(Boolean) as HTMLSpanElement[]
      const descs = descRefs.current.filter(Boolean) as HTMLParagraphElement[]

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      })

      // Hide all content initially
      gsap.set(squares, { background: "transparent" })
      gsap.set(labels, { opacity: 0 })
      gsap.set(descs, { opacity: 0, y: 10 })
      gsap.set(connectorRef.current, { scaleX: 0, transformOrigin: "left center" })

      // 1. Fascia connector draws L→R over 900ms
      tl.to(connectorRef.current, {
        scaleX: 1,
        duration: DURATION.sequence,
        ease: "none", // linear connector draw
        transformOrigin: "left center",
      })

      // 2. At 33% — Square 01 fills + Scope scramble
      tl.call(
        () => {
          if (squares[0]) squares[0].style.background = "#1A1A4D"
          scrambleText(labels[0], "Scope", 0.25, SCRAMBLE_CHARS)
        },
        [],
        DURATION.sequence * 0.33
      )

      // 3. At 66% — Square 02 fills + Build scramble
      tl.call(
        () => {
          if (squares[1]) squares[1].style.background = "#1A1A4D"
          scrambleText(labels[1], "Build", 0.25, SCRAMBLE_CHARS)
        },
        [],
        DURATION.sequence * 0.66
      )

      // 4. At 100% — Square 03 fills + Exceed scramble
      tl.call(
        () => {
          if (squares[2]) squares[2].style.background = "#1A1A4D"
          scrambleText(labels[2], "Exceed", 0.25, SCRAMBLE_CHARS)
        },
        [],
        DURATION.sequence * 1.0
      )

      // 5. Descriptions drop in 100ms after each label
      tl.to(descs[0], { opacity: 1, y: 0, duration: 0.3, ease: "taut" }, DURATION.sequence * 0.33 + 0.1)
      tl.to(descs[1], { opacity: 1, y: 0, duration: 0.3, ease: "taut" }, DURATION.sequence * 0.66 + 0.1)
      tl.to(descs[2], { opacity: 1, y: 0, duration: 0.3, ease: "taut" }, DURATION.sequence * 1.0 + 0.1)
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="how-it-works" className="py-24 md:py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Fascia top */}
        <Fascia className="mb-16" />

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="flex flex-col md:flex-row items-start md:items-start gap-0">
          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-row md:flex-col flex-1">
              <div className="flex flex-col items-start md:items-start gap-3 w-full">
                {/* Step number */}
                <span
                  className="text-xs text-[#1A1A4D] tracking-[0.15em]"
                  style={{ fontWeight: 300, fontVariationSettings: '"wght" 300' }}
                >
                  {step.number}
                </span>

                {/* Square (12px × 12px, hollow, 1px border) */}
                <div
                  ref={(el) => {
                    squareRefs.current[i] = el
                  }}
                  className="w-3 h-3 border border-[#1A1A4D]"
                  style={{ borderRadius: 0 }}
                />

                {/* Step name — scramble target */}
                <span
                  ref={(el) => {
                    labelRefs.current[i] = el
                  }}
                  className="text-xl md:text-2xl mt-1 block"
                  style={{
                    fontWeight: 700,
                    fontVariationSettings: '"wght" 700',
                    color: "#0A0A0A",
                  }}
                >
                  {step.name}
                </span>

                {/* Step description */}
                <p
                  ref={(el) => {
                    descRefs.current[i] = el
                  }}
                  className="text-sm leading-relaxed mt-2 max-w-[320px]"
                  style={{
                    fontWeight: 380,
                    fontVariationSettings: '"wght" 380',
                    color: "#0A0A0A",
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Connector strip below steps */}
        <div className="mt-6">
          <div
            ref={connectorRef}
            className="h-px bg-[#1A1A4D] w-full"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  )
}

/**
 * Scrambles text character by character.
 */
function scrambleText(
  el: HTMLElement | null,
  finalText: string,
  duration: number,
  chars: string
) {
  if (!el) return
  const steps = Math.floor(duration / 0.03)
  const stepDur = duration / steps

  for (let step = 0; step <= steps; step++) {
    setTimeout(() => {
      let display = ""
      for (let i = 0; i < finalText.length; i++) {
        if (i < (step / steps) * finalText.length) {
          display += finalText[i]
        } else {
          display += chars[Math.floor(Math.random() * chars.length)]
        }
      }
      el.textContent = display
    }, stepDur * step * 1000)
  }
}
