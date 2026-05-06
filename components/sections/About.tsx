"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import RevealSection from "@/components/RevealSection"
import TextHighlighter from "@/components/fancy/TextHighlighter"
import VerticalCutReveal from "@/components/fancy/VerticalCutReveal"

const MANIFESTO = [
  "Most businesses aren't running at what they're capable of. Not because the ambition isn't there. Because the systems aren't. The website that doesn't convert. The process that takes three people to do what one should. The gap between what you can see for your business and what you can actually build — it's real, and it costs you every day.",
  "Websites, apps, automation, agents — everything built to its absolute limit so your business can operate beyond its own. No templates. No good enough. Every decision made for maximum effect.",
  "faja is for businesses that refuse to accept the ceiling their size sets for them.",
]

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Variable weight on scroll
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const wght = 380 + self.progress * 80 // 380 → 460
          const bodyEls = section.querySelectorAll("[data-about-body]")
          bodyEls.forEach((el) => {
            ;(el as HTMLElement).style.fontVariationSettings = `"wght" ${wght}`
          })
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <RevealSection id="about" className="py-24 md:py-32">
      <div ref={sectionRef} className="max-w-[800px] mx-auto px-8">
        {/* Paragraph 1 */}
        <p
          data-about-body
          data-reveal="body"
          className="text-lg md:text-xl leading-relaxed mb-8"
          style={{
            fontWeight: 380,
            fontVariationSettings: '"wght" 380',
            color: "#0A0A0A",
          }}
        >
          {MANIFESTO[0]}
        </p>

        {/* Highlighted line: "We build what closes it." */}
        <p className="text-lg md:text-xl leading-relaxed mb-8">
          <TextHighlighter
            color="#1A1A4D"
            className="text-lg md:text-xl px-1"
          >
            We build what closes it.
          </TextHighlighter>
        </p>

        {/* Paragraph 2 */}
        <p
          data-about-body
          data-reveal="body"
          className="text-lg md:text-xl leading-relaxed mb-8"
          style={{
            fontWeight: 380,
            fontVariationSettings: '"wght" 380',
            color: "#0A0A0A",
          }}
        >
          {MANIFESTO[1]}
        </p>

        {/* Final line with Vertical Cut Reveal */}
        <p
          className="text-lg md:text-xl leading-relaxed"
          style={{
            fontWeight: 460,
            fontVariationSettings: '"wght" 460',
            color: "#1A1A4D",
          }}
        >
          <VerticalCutReveal splitBy="words" staggerDuration={0.08}>
            {MANIFESTO[2]}
          </VerticalCutReveal>
        </p>
      </div>
    </RevealSection>
  )
}
