"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "@/lib/gsap"

interface FloatingCTAProps {
  label?: string
  href?: string
}

/**
 * Stripped PillNav from React Bits.
 * Removed: circle hover effect (glow), logo, active indicator dot, spring easing.
 * Kept: pill container structure, scroll-aware visibility.
 * Faja-adapted: white bg, indigo pill, taut ease, appears on scroll up.
 */
export default function FloatingCTA({
  label = "Start a project →",
  href = "#contact",
}: FloatingCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      // Show after scrolling past hero
      if (scrollY > window.innerHeight * 0.5) {
        if (scrollY < lastScrollY.current && !visible) {
          setVisible(true)
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: "taut",
            })
          }
        } else if (scrollY > lastScrollY.current && visible) {
          setVisible(false)
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              y: 20,
              opacity: 0,
              duration: 0.2,
              ease: "taut",
            })
          }
        }
      } else if (visible) {
        setVisible(false)
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.2,
            ease: "taut",
          })
        }
      }
      lastScrollY.current = scrollY
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [visible])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div
      ref={containerRef}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
      style={{ opacity: 0, transform: "translate(-50%, 20px)" }}
    >
      <a
        href={href}
        onClick={handleClick}
        className="inline-flex items-center gap-2 px-6 py-3 text-sm bg-[#1A1A4D] text-white rounded-full no-underline"
        style={{
          borderRadius: "999px",
          fontWeight: 380,
          fontVariationSettings: '"wght" 380',
        }}
      >
        {label}
      </a>
    </div>
  )
}
