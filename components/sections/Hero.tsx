"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { DURATION } from "@/lib/ease"
import Fascia from "@/components/Fascia"
import VariableFontCursorProximity from "@/components/fancy/VariableFontCursorProximity"

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLHeadingElement>(null)
  const line2Ref = useRef<HTMLHeadingElement>(null)
  const sublineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    // Skip animations on reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true })

      // Get fascia element
      const fascia = sectionRef.current?.querySelector(
        "[data-fascia]"
      ) as HTMLElement

      // VariableFontCursorProximity renders letters inside word wrappers:
      //   span.whitespace-nowrap > span.inline-block
      // Select only the inner letter spans (not the word wrappers)
      const line1Chars = line1Ref.current?.querySelectorAll(
        "span.whitespace-nowrap > span.inline-block"
      )
      const line2Chars = line2Ref.current?.querySelectorAll(
        "span.whitespace-nowrap > span.inline-block"
      )

      // 1. 300ms held state, then Fascia draws
      tl.set(fascia, { scaleX: 0, transformOrigin: "left center" })
      tl.to(
        fascia,
        {
          scaleX: 1,
          duration: DURATION.draw,
          ease: "taut",
          transformOrigin: "left center",
        },
        0.3
      )

      // 2. "Your business." character reveal
      if (line1Chars && line1Chars.length > 0) {
        tl.fromTo(
          line1Chars,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.6,
            ease: "taut",
            stagger: 0.022,
          },
          0.8
        )
      }

      // 3. 200ms pause → "No ceiling." reveal
      if (line2Chars && line2Chars.length > 0) {
        tl.fromTo(
          line2Chars,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.6,
            ease: "taut",
            stagger: 0.022,
          },
          1.0 + line1Chars!.length * 0.022 + 0.2
        )
      }

      // 4. "ceiling." scramble effect
      // "No ceiling." → last 8 letter spans are the "ceiling." letters
      if (line2Chars && line2Chars.length >= 8) {
        const ceilingLetters = Array.from(line2Chars).slice(-8)
        const finalText = "ceiling."
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ.-"
        const totalDuration = 0.7
        const steps = 14
        const stepDur = totalDuration / steps

        // Start after "No ceiling." lands
        const startTime = 1.0 + line1Chars!.length * 0.022 + 0.2 + 0.6

        for (let step = 0; step < steps; step++) {
          tl.call(
            () => {
              for (let i = 0; i < finalText.length; i++) {
                if (i < (step / steps) * finalText.length * 0.8) {
                  ceilingLetters[i].textContent = finalText[i]
                } else {
                  ceilingLetters[i].textContent =
                    chars[Math.floor(Math.random() * chars.length)]
                }
              }
            },
            [],
            startTime + step * stepDur
          )
        }

        // Final settle — and enable cursor proximity
        tl.call(
          () => {
            for (let i = 0; i < finalText.length; i++) {
              ceilingLetters[i].textContent = finalText[i]
            }
            // Enable cursor proximity after scramble completes
            sectionRef.current?.setAttribute("data-proximity", "enabled")
          },
          [],
          startTime + totalDuration
        )
      }

      // 5. Subline clip-path wipe
      tl.fromTo(
        sublineRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.7,
          ease: "taut",
        },
        2.4
      )

      // 6. CTAs snap in
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: DURATION.snap,
          ease: "taut",
        },
        2.8
      )

      timerRef.current = tl
      tl.play()
    })

    return () => ctx.revert()
  }, [])

  // Split text function removed — VariableFontCursorProximity handles rendering

  const handleCTAClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  const headlineStyle: React.CSSProperties = {
    fontSize: "clamp(64px, 8vw, 120px)",
    fontWeight: 700,
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center bg-white overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-8 w-full pt-20">
        {/* Fascia */}
        <div data-fascia className="w-full mb-16">
          <Fascia />
        </div>

        {/* Headline */}
        <div ref={headlineRef} className="mb-8">
          <VariableFontCursorProximity
            ref={line1Ref}
            as="h1"
            fromFontVariationSettings="'wght' 700"
            toFontVariationSettings="'wght' 850"
            containerRef={headlineRef}
            radius={200}
            falloff="gaussian"
            className="text-[#0A0A0A] leading-[1.05] tracking-[-0.02em]"
            style={headlineStyle}
          >
            Your business.
          </VariableFontCursorProximity>
          <VariableFontCursorProximity
            ref={line2Ref}
            as="h1"
            fromFontVariationSettings="'wght' 700"
            toFontVariationSettings="'wght' 850"
            containerRef={headlineRef}
            radius={200}
            falloff="gaussian"
            className="text-[#0A0A0A] leading-[1.05] tracking-[-0.02em]"
            style={headlineStyle}
          >
            No ceiling.
          </VariableFontCursorProximity>
        </div>

        {/* Subline */}
        <p
          ref={sublineRef}
          className="text-lg md:text-xl max-w-[600px] text-[#0A0A0A] mb-12 leading-relaxed"
          style={{ fontWeight: 380, fontVariationSettings: '"wght" 380' }}
        >
          Websites, apps, automation, and AI agents — built to their absolute
          limit so your business can operate beyond its own.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex items-center gap-6">
          <a
            href="#contact"
            onClick={(e) => handleCTAClick(e, "#contact")}
            className="btn-wipe px-8 py-3 text-sm rounded-full"
            style={{ borderRadius: "999px" }}
          >
            <span>Start a project</span>
            <span className="ml-1 arrow">→</span>
          </a>
          <a
            href="#work"
            onClick={(e) => handleCTAClick(e, "#work")}
            className="text-sm text-[#1A1A4D] hover:text-[#0A0A0A] no-underline transition-colors rounded-full"
            style={{ fontWeight: 380, fontVariationSettings: '"wght" 380' }}
          >
            See our work
          </a>
        </div>
      </div>
    </section>
  )
}
