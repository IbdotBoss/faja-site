"use client"

import { useRef, useLayoutEffect, useState, ReactNode } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "motion/react"

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) setWidth(ref.current.offsetWidth)
    }
    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [ref])

  return width
}

interface ScrollVelocityProps {
  texts: ReactNode[]
  velocity?: number
  className?: string
  damping?: number
  stiffness?: number
  numCopies?: number
}

/**
 * Horizontal marquee text that responds to scroll velocity.
 * Stripped from React Bits — no spring physics, no dropshadow.
 * Direction reverses based on scroll direction.
 */
export function ScrollVelocity({
  texts = [],
  velocity = 100,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
}: ScrollVelocityProps) {
  return (
    <section className="overflow-hidden py-8 md:py-12">
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          className={className}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
        >
          {text}
        </VelocityText>
      ))}
    </section>
  )
}

function VelocityText({
  children,
  baseVelocity = 100,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
}: {
  children: ReactNode
  baseVelocity?: number
  className?: string
  damping?: number
  stiffness?: number
  numCopies?: number
}) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping, stiffness })
  const velocityFactor = useTransform(
    smoothVelocity,
    [0, 1000],
    [0, 5],
    { clamp: false }
  )

  const copyRef = useRef<HTMLSpanElement>(null)
  const copyWidth = useElementWidth(copyRef)

  function wrap(min: number, max: number, v: number): number {
    const range = max - min
    return ((((v - min) % range) + range) % range) + min
  }

  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return "0px"
    return `${wrap(-copyWidth, 0, v)}px`
  })

  const directionFactor = useRef<number>(1)
  const frozen = useRef(false)
  useAnimationFrame((_t, delta) => {
    const vf = velocityFactor.get()

    // Freeze marquee when scroll velocity is below threshold
    if (Math.abs(vf) < 0.15) {
      if (!frozen.current) {
        frozen.current = true
      }
      // Slowly drift at minimum speed to prevent stutter
      const drift = baseVelocity * (delta / 1000) * 0.05
      baseX.set(baseX.get() + drift)
      return
    }

    frozen.current = false

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
    if (vf < 0) directionFactor.current = -1
    else if (vf > 0) directionFactor.current = 1
    moveBy += directionFactor.current * moveBy * vf
    baseX.set(baseX.get() + moveBy)
  })

  const spans = []
  for (let i = 0; i < numCopies; i++) {
    spans.push(
      <span
        className={`flex-shrink-0 ${className}`}
        key={i}
        ref={i === 0 ? copyRef : null}
      >
        {children}&nbsp;
      </span>
    )
  }

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap text-4xl md:text-5xl font-bold tracking-[-0.02em]"
        style={{ x }}
      >
        {spans}
      </motion.div>
    </div>
  )
}

export default ScrollVelocity
