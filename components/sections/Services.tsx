"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { DURATION } from "@/lib/ease"
import RevealSection from "@/components/RevealSection"

const SERVICES = [
  {
    label: "Web & mobile",
    name: "Custom websites, web apps, and mobile applications.",
    description:
      "Built on clean architecture, written in quality code, designed to last and grow.",
  },
  {
    label: "AI & agents",
    name: "Intelligent tools, chatbots, and autonomous agents.",
    description:
      "Built around your business logic — not stitched together from generic templates.",
  },
  {
    label: "Automation",
    name: "Workflows that replace the hours your team spends doing what software should do instead.",
    description: "Measurable, reliable, and entirely yours.",
  },
]

function ServiceCard({
  label,
  name,
  description,
}: (typeof SERVICES)[number]) {
  const cardRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const rect = svgRef.current?.querySelector("rect")
    if (!card || !rect) return

    const len = rect.getTotalLength()
    gsap.set(rect, {
      strokeDasharray: len,
      strokeDashoffset: len,
    })

    const handleEnter = () => {
      gsap.to(rect, {
        strokeDashoffset: 0,
        duration: DURATION.draw,
        ease: "taut",
      })
    }

    const handleLeave = () => {
      gsap.to(rect, {
        strokeDashoffset: len,
        duration: DURATION.fast,
        ease: "taut",
      })
    }

    card.addEventListener("mouseenter", handleEnter)
    card.addEventListener("mouseleave", handleLeave)

    return () => {
      card.removeEventListener("mouseenter", handleEnter)
      card.removeEventListener("mouseleave", handleLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="relative group flex-1 min-w-0 p-8 md:p-10"
    >
      {/* SVG wire hover */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ overflow: "visible" }}
      >
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke="#1A1A4D"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Card border (static) */}
      <div className="absolute inset-0 border border-[#1A1A4D]" />

      {/* Content */}
      <div className="relative z-10">
        <span
          className="text-xs tracking-[0.15em] uppercase text-[#1A1A4D] mb-6 block"
          style={{ fontWeight: 300, fontVariationSettings: '"wght" 300' }}
        >
          {label}
        </span>
        <h3
          className="text-xl md:text-2xl mb-4 leading-tight"
          style={{
            fontWeight: 700,
            fontVariationSettings: '"wght" 700',
            color: "#0A0A0A",
          }}
        >
          {name}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{
            fontWeight: 380,
            fontVariationSettings: '"wght" 380',
            color: "#0A0A0A",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Vertical rules snap in
  useEffect(() => {
    const rules = containerRef.current?.querySelectorAll("[data-vrule]")
    if (!rules) return

    const ctx = gsap.context(() => {
      rules.forEach((rule) => {
        ScrollTrigger.create({
          trigger: rule,
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo(
              rule,
              { scaleY: 0 },
              {
                scaleY: 1,
                duration: DURATION.snap,
                ease: "taut",
                transformOrigin: "top center",
              }
            )
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <RevealSection id="services" className="py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Section headline */}
        <h2
          data-reveal="headline"
          className="text-4xl md:text-5xl mb-16"
          style={{
            fontWeight: 600,
            fontVariationSettings: '"wght" 600',
            color: "#0A0A0A",
          }}
        >
          What we build
        </h2>

        {/* Cards with vertical rules */}
        <div ref={containerRef} className="flex flex-col md:flex-row">
          {SERVICES.map((service, i) => (
            <div key={i} className="flex flex-row md:flex-col flex-1">
                <ServiceCard {...service} />
              {/* Vertical rule between cards (not after last) */}
              {i < SERVICES.length - 1 && (
                <div
                  data-vrule
                  className="w-px bg-[#1A1A4D] mx-0 self-stretch hidden md:block"
                  style={{ transform: "scaleY(0)" }}
                />
              )}
              {/* Horizontal rule on mobile */}
              {i < SERVICES.length - 1 && (
                <div className="h-px bg-[#1A1A4D] w-full md:hidden" />
              )}
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  )
}
