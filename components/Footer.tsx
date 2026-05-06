"use client"

import Fascia from "@/components/Fascia"
import LetterSwapForward from "@/components/fancy/LetterSwapForward"

const FOOTER_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
]

export default function Footer() {
  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="py-16 md:py-24 bg-white">
      {/* Fascia at top */}
      <div className="max-w-[1440px] mx-auto px-8 mb-12">
        <Fascia />
      </div>

      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left: wordmark + links */}
          <div className="space-y-6">
            {/* Wordmark — wght 300, releases tension */}
            <span
              className="text-lg block"
              style={{
                fontWeight: 300,
                fontVariationSettings: '"wght" 300',
                color: "#0A0A0A",
              }}
            >
              faja
            </span>

            {/* Nav links */}
            <div className="flex flex-wrap gap-4 md:gap-6">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="text-sm text-[#0A0A0A] no-underline hover:text-[#1A1A4D] transition-colors"
                  style={{
                    fontWeight: 300,
                    fontVariationSettings: '"wght" 300',
                  }}
                >
                  <LetterSwapForward label={link.label} staggerDuration={0.02} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: CTA */}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, "#contact")}
            className="btn-wipe px-6 py-3 text-sm rounded-full inline-flex"
            style={{ borderRadius: "999px" }}
          >
            <span>Start a project</span>
            <span className="ml-1">→</span>
          </a>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#1A1A4D] border-opacity-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <a
            href="mailto:hello@faja.co"
            className="text-sm text-[#0A0A0A] no-underline hover:text-[#1A1A4D] transition-colors"
            style={{
              fontWeight: 380,
              fontVariationSettings: '"wght" 380',
            }}
          >
            hello@faja.co
          </a>
          <p
            className="text-xs"
            style={{
              fontWeight: 300,
              fontVariationSettings: '"wght" 300',
              color: "#666666",
            }}
          >
            © 2026 faja. Built by faja.
          </p>
        </div>
      </div>
    </footer>
  )
}
