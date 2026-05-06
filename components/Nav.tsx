"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"
import { EASE_SNAP_CSS } from "@/lib/ease"
import LetterSwapForward from "@/components/fancy/LetterSwapForward"

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
]

// CSS cubic-bezier equivalent of the "taut" CustomEase (M0,0 C0.7,0 0.85,1 1,1)
const TAUT_CSS = "cubic-bezier(0.7, 0, 0.85, 1)"

export default function Nav() {
  const navRef = useRef<HTMLDivElement>(null)
  const wordmarkRef = useRef<HTMLAnchorElement>(null)
  const lastScrollY = useRef(0)
  const [navHidden, setNavHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const onScroll = () => {
      // Don't hide nav when menu is open
      if (menuOpen) return

      const scrollY = window.scrollY

      // Wordmark weight transition
      if (wordmarkRef.current) {
        const progress = Math.min(scrollY / (window.innerHeight * 0.2), 1)
        const wght = 500 + progress * 200 // 500 → 700
        wordmarkRef.current.style.fontVariationSettings = `"wght" ${wght}`
      }

      // Nav hide/show
      if (scrollY > 80 && scrollY > lastScrollY.current && !navHidden) {
        setNavHidden(true)
        gsap.to(nav, {
          y: "-100%",
          duration: 0.3,
          ease: EASE_SNAP_CSS,
        })
      } else if (
        (scrollY < lastScrollY.current || scrollY <= 80) &&
        navHidden
      ) {
        setNavHidden(false)
        gsap.to(nav, {
          y: "0%",
          duration: 0.3,
          ease: EASE_SNAP_CSS,
        })
      }

      lastScrollY.current = scrollY
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [navHidden, menuOpen])

  const scrollToSection = useCallback((href: string) => {
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    scrollToSection(href)
  }

  const handleMobileLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    // Small delay so the overlay starts closing before scroll
    setTimeout(() => {
      scrollToSection(href)
    }, 100)
  }

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 bg-white border-b border-transparent"
        style={{ transition: `border-color 0.3s ${EASE_SNAP_CSS}` }}
      >
        <div className="max-w-[1440px] mx-auto px-8 h-16 flex items-center justify-between">
          {/* Wordmark */}
          <a
            ref={wordmarkRef}
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="text-lg tracking-tight text-[#0A0A0A] no-underline"
            style={{
              fontWeight: 500,
              fontVariationSettings: '"wght" 500',
            }}
          >
            faja
          </a>

          {/* Center nav links — desktop */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                label={link.label}
                href={link.href}
                onClick={handleClick}
              />
            ))}
          </div>

          {/* CTA — desktop */}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, "#contact")}
            className="btn-wipe px-5 py-2 text-sm rounded-full hidden md:inline-flex"
            style={{ borderRadius: "999px" }}
          >
            <span>Start a project</span>
            <span className="ml-1">→</span>
          </a>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="md:hidden relative w-6 h-6 flex flex-col items-center justify-center gap-[5px] z-[60]"
          >
            {/* Top line */}
            <span
              className="block w-5 h-px bg-[#0A0A0A] origin-center"
              style={{
                transition: `transform 200ms ${TAUT_CSS}`,
                transform: menuOpen ? "translateY(3px) rotate(45deg)" : "translateY(0) rotate(0deg)",
              }}
            />
            {/* Bottom line */}
            <span
              className="block w-5 h-px bg-[#0A0A0A] origin-center"
              style={{
                transition: `transform 200ms ${TAUT_CSS}`,
                transform: menuOpen ? "translateY(-3px) rotate(-45deg)" : "translateY(0) rotate(0deg)",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center md:hidden"
        style={{
          clipPath: menuOpen ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          transition: `clip-path 400ms ${TAUT_CSS}`,
        }}
        aria-hidden={!menuOpen}
      >
        {/* Links */}
        <nav className="flex flex-col items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleMobileLinkClick(e, link.href)}
              className="text-3xl text-[#0A0A0A] no-underline hover:text-[#1A1A4D] transition-colors"
              style={{ fontWeight: 300 }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => handleMobileLinkClick(e, "#contact")}
          className="btn-wipe px-6 py-3 text-base rounded-full mt-12"
          style={{ borderRadius: "999px" }}
        >
          <span>Start a project</span>
          <span className="ml-1">→</span>
        </a>
      </div>
    </>
  )
}

function NavLink({
  label,
  href,
  onClick,
}: {
  label: string
  href: string
  onClick: (e: React.MouseEvent, href: string) => void
}) {
  return (
    <div className="relative overflow-hidden h-5">
      <a
        href={href}
        onClick={(e) => onClick(e, href)}
        className="text-sm text-[#0A0A0A] no-underline transition-colors hover:text-[#1A1A4D] block"
        style={{ fontWeight: 300 }}
      >
        <LetterSwapForward label={label} staggerDuration={0.03} />
      </a>
    </div>
  )
}
