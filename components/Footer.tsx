"use client"

import Fascia from "@/components/Fascia"

export default function Footer() {
  return (
    <footer className="py-16 md:py-24 bg-white">
      {/* Fascia at top */}
      <div className="max-w-[1440px] mx-auto px-8 mb-12">
        <Fascia />
      </div>

      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left: wordmark only — the exhale */}
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

          {/* Right: just the email */}
          <a
            href="mailto:hello@faja.co"
            className="text-sm text-[#0A0A0A] no-underline transition-colors"
            style={{
              fontWeight: 380,
              fontVariationSettings: '"wght" 380',
            }}
          >
            hello@faja.co
          </a>
        </div>

        {/* Bottom bar — one line */}
        <div className="mt-16 pt-8 border-t border-[#0A0A0A] border-opacity-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
