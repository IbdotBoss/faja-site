"use client"

import { useRef, useEffect } from "react"
import { useScroll, useTransform, useSpring, motion, MotionValue } from "motion/react"

interface ScrollAndSwapOptions {
  /** Container ref for scroll tracking */
  containerRef: React.RefObject<HTMLElement | null>
  /** Offset for scroll trigger range */
  offset?: [string, string]
  /** Spring config for smoothing */
  springConfig?: { stiffness?: number; damping?: number }
  /** Transformation range */
  transformRange?: [number, number]
}

/**
 * Custom hook — rewritten from Fancy ScrollAndSwapText source.
 * Returns a MotionValue (0→1) representing scroll progress through
 * the tracked element. Use this to drive any scroll-tied animation:
 * wordmark weight, text reveal, parallax, etc.
 *
 * Overrides motion's spring defaults — uses taut-like damping.
 */
export function useScrollAndSwap({
  containerRef,
  offset = ["start end", "end start"],
  springConfig = { stiffness: 150, damping: 18 },
  transformRange = [0, 1],
}: ScrollAndSwapOptions): MotionValue<number> {
  const targetRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: targetRef,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    offset: offset as any,
  })

  const springProgress = useSpring(scrollYProgress, {
    stiffness: springConfig.stiffness ?? 150,
    damping: springConfig.damping ?? 18,
  })

  const progress = useTransform(
    springProgress,
    [0, 1],
    transformRange
  )

  return progress
}

/**
 * Component wrapper for useScrollAndSwap — renders a div that
 * tracks scroll progress and provides it as MotionValue.
 * Pass children a MotionValue<number> to animate based on scroll.
 */
export function ScrollAndSwapTracker({
  children,
  containerRef,
  offset,
  springConfig,
  className,
}: ScrollAndSwapOptions & { children: (progress: MotionValue<number>) => React.ReactNode; className?: string }) {
  const targetRef = useRef<HTMLDivElement>(null)
  const progress = useScrollAndSwap({ containerRef, offset, springConfig })

  return (
    <div ref={targetRef} className={className}>
      {children(progress)}
    </div>
  )
}
