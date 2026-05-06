"use client"

import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"
import { gsap } from "@/lib/gsap"

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Connect Lenis to GSAP ticker
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Connect GSAP ScrollTrigger to Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Disable lag smoothing in GSAP for Lenis compatibility
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(() => {})
    }
  }, [])

  return <>{children}</>
}
