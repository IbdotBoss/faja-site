"use client"

import { useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { DURATION } from "@/lib/ease"
import Fascia from "@/components/Fascia"
import StackingCards, { StackingCardItem } from "@/components/fancy/StackingCards"
import { CASE_STUDIES, type CaseStudy } from "@/lib/case-studies"

function CaseCard({
  study,
}: {
  study: CaseStudy
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)
  const situationRef = useRef<HTMLParagraphElement>(null)
  const buildRef = useRef<HTMLParagraphElement>(null)
  const router = useRouter()

  // Scroll-driven weight scrub on situation + build text
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const els = [situationRef.current, buildRef.current].filter(Boolean) as HTMLElement[]
    if (els.length === 0) return

    const ctx = gsap.context(() => {
      els.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const wght = 380 + self.progress * 40
            el.style.fontVariationSettings = `"wght" ${wght}`
          },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  const handleClick = () => {
    const card = cardRef.current
    if (!card) return

    const overlay = document.createElement("div")
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: #1A1A4D;
      z-index: 9999;
      clip-path: inset(0 100% 0 0);
      pointer-events: none;
    `
    document.body.appendChild(overlay)

    gsap.to(overlay, {
      clipPath: "inset(0 0% 0 0)",
      duration: DURATION.draw,
      ease: "taut",
      onComplete: () => {
        router.push(`/work/${study.slug}`)
        // Clean up overlay after navigation starts
        setTimeout(() => overlay.remove(), 600)
      },
    })
  }

  const handleMouseEnter = () => {
    if (borderRef.current) {
      borderRef.current.style.borderWidth = "2px"
    }
  }

  const handleMouseLeave = () => {
    if (borderRef.current) {
      borderRef.current.style.borderWidth = "1px"
    }
  }

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer mb-6"
    >
      <div
        ref={borderRef}
        className="border border-[#0A0A0A] p-8 md:p-12 bg-white"
        style={{
          borderRadius: 0,
          borderWidth: "1px",
          transition: "border-width 0.08s cubic-bezier(0.85, 0, 0.15, 1)",
        }}
      >
        {/* Service label */}
        <span
          className="text-xs tracking-[0.15em] uppercase text-[#0A0A0A] mb-4 block"
          style={{ fontWeight: 300, fontVariationSettings: '"wght" 300' }}
        >
          {study.label}
        </span>

        {/* Headline */}
        <h3
          className="text-2xl md:text-3xl mb-6 leading-tight"
          style={{
            fontWeight: 700,
            fontVariationSettings: '"wght" 700',
            color: "#0A0A0A",
          }}
        >
          {study.headline}
        </h3>

        {/* Situation */}
        <p
          ref={situationRef}
          className="text-sm md:text-base mb-4 leading-relaxed"
          style={{
            fontWeight: 380,
            fontVariationSettings: '"wght" 380',
            color: "#0A0A0A",
          }}
        >
          {study.situation}
        </p>

        {/* What we build */}
        <p
          ref={buildRef}
          className="text-sm md:text-base mb-6 leading-relaxed"
          style={{
            fontWeight: 380,
            fontVariationSettings: '"wght" 380',
            color: "#0A0A0A",
          }}
        >
          {study.build}
        </p>

        {/* Before / After contrast */}
        <div className="border-l border-[#0A0A0A] pl-4 mb-4">
          <p
            className="text-sm mb-2"
            style={{ fontWeight: 300, fontVariationSettings: '"wght" 300', color: "#0A0A0A" }}
          >
            {study.before}
          </p>
          <p
            className="text-sm md:text-base"
            style={{
              fontWeight: 800,
              fontVariationSettings: '"wght" 800',
              color: "#0A0A0A",
            }}
          >
            {study.after}
          </p>
        </div>

        {/* Beyond moment */}
        <p
          className="text-xs leading-relaxed"
          style={{
            fontWeight: 380,
            fontVariationSettings: '"wght" 380',
            color: "#0A0A0A",
          }}
        >
          {study.beyond}
        </p>
      </div>
    </div>
  )
}

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={sectionRef} id="work" className="py-24 md:py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-8">
        <Fascia className="mb-16" />

        <h2
          className="text-4xl md:text-5xl mb-16"
          style={{
            fontWeight: 600,
            fontVariationSettings: '"wght" 600',
            color: "#0A0A0A",
          }}
        >
          Work
        </h2>

        <StackingCards totalCards={CASE_STUDIES.length} className="max-w-[800px]">
          {CASE_STUDIES.map((study, i) => (
            <StackingCardItem key={i} index={i} className="h-[550px]">
              <CaseCard study={study} />
            </StackingCardItem>
          ))}
        </StackingCards>
      </div>
    </section>
  )
}
