"use client"

import { useEffect, useRef } from "react"
import Fascia from "@/components/Fascia"

const TIERS = [
  {
    name: "Establish",
    price: "From £5,000",
    description:
      "Your digital foundation. A custom website or app built to perform from day one.",
    features: [
      "Custom website or web app",
      "Mobile-responsive, performance-optimised",
      "Integrated contact or booking",
      "Launch-ready in weeks, not months",
    ],
    accent: false,
  },
  {
    name: "Accelerate",
    price: "From £8,000",
    description:
      "Your foundation, made intelligent. We add the AI tools or automation that make it actively work for you.",
    features: [
      "Everything in Establish",
      "AI integration or automation stack",
      "Custom workflows built around your business",
      "Ongoing optimisation retainer available",
    ],
    accent: true,
  },
  {
    name: "Beyond",
    price: "From £15,000",
    description:
      "The full system. Website, app, automation, and agents — built together so every part of your business operates at its ceiling.",
    features: [
      "Full-stack digital build",
      "Automation and AI agent integration",
      "Architecture designed to scale",
      "Dedicated build team, retainer included",
    ],
    accent: false,
  },
]

function PricingCard({
  tier,
}: {
  tier: (typeof TIERS)[number]
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const visible = useRef(false)

  // IntersectionObserver for CSS-only perimeter draw
  useEffect(() => {
    const card = cardRef.current
    if (!card || !tier.accent) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible.current) {
          visible.current = true
          card.style.borderColor = "#1A1A4D"
        } else if (!entry.isIntersecting && visible.current) {
          visible.current = false
          card.style.borderColor = "transparent"
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(card)
    return () => observer.disconnect()
  }, [tier.accent])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div
      ref={cardRef}
      className="relative flex-1 min-w-0 p-8 md:p-10 bg-white"
      style={{
        border: tier.accent
          ? "1px solid transparent"
          : "1px solid #0A0A0A",
        borderRadius: 0,
        ...(tier.accent && {
          transition:
            "border-color 0.5s cubic-bezier(0.85, 0, 0.15, 1)",
        }),
      }}
    >
      <div className="relative z-10">
        {/* Tier name */}
        <h3
          className="text-2xl md:text-3xl mb-3"
          style={{
            fontWeight: 700,
            fontVariationSettings: '"wght" 700',
            color: "#0A0A0A",
          }}
        >
          {tier.name}
        </h3>

        {/* Price */}
        <p
          className="text-3xl md:text-4xl mb-4"
          style={{
            fontWeight: 300,
            fontVariationSettings: '"wght" 300',
            color: "#0A0A0A",
          }}
        >
          {tier.price}
        </p>

        {/* Description */}
        <p
          className="text-sm mb-6 leading-relaxed"
          style={{
            fontWeight: 380,
            fontVariationSettings: '"wght" 380',
            color: "#0A0A0A",
          }}
        >
          {tier.description}
        </p>

        {/* Feature bullets */}
        <ul className="space-y-3 mb-8 list-none p-0">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="w-3 h-3 border border-[#0A0A0A] mt-1 shrink-0"
                style={{ borderRadius: 0 }}
              />
              <span
                className="text-sm"
                style={{
                  fontWeight: 380,
                  fontVariationSettings: '"wght" 380',
                  color: "#0A0A0A",
                }}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          onClick={handleClick}
          className="btn-wipe px-8 py-3 text-sm rounded-full inline-flex"
          style={{ borderRadius: "999px" }}
        >
          <span>Start a project</span>
          <span className="ml-1 arrow">→</span>
        </a>
      </div>
    </div>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-8">
        <Fascia className="mb-16" />

        {/* Tiers */}
        <div className="flex flex-col md:flex-row gap-0 mb-16">
          {TIERS.map((tier, i) => (
            <div key={i} className="flex-1">
              <PricingCard tier={tier} />
              {i < TIERS.length - 1 && (
                <div className="h-px bg-[#0A0A0A] opacity-20 md:hidden mx-8" />
              )}
            </div>
          ))}
        </div>

        {/* Below tiers */}
        <div className="text-center space-y-2">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }}
            className="text-sm text-[#0A0A0A] no-underline hover:text-[#666666] transition-colors"
          >
            Not sure which is right? Talk to us first. →
          </a>
          <p
            className="text-xs"
            style={{
              fontWeight: 300,
              fontVariationSettings: '"wght" 300',
              color: "#666666",
            }}
          >
            Minimum engagement £2,000. We work with a small number of clients
            at a time.
          </p>
        </div>
      </div>
    </section>
  )
}
