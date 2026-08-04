'use client'

import { useRef } from 'react'

/**
 * Slows the testimonial marquee while the pointer is over it.
 *
 * Why this needs JS at all: you cannot smoothly retime a CSS animation.
 * Changing `animation-duration` mid-run keeps the elapsed time but recomputes
 * progress as `elapsed / duration`, so doubling the duration halves the
 * progress and the track visibly jumps backwards.
 *
 * `Animation.playbackRate` is built for exactly this. It preserves the current
 * position and simply advances more slowly, so the change is seamless.
 *
 * This is a wrapper, not a rewrite: the cards inside stay server-rendered and
 * arrive as `children`. The only client code is the two pointer handlers, a
 * few hundred bytes. That is the whole reason we did not take the `motion`
 * dependency, which would have been ~40-50KB for the same effect.
 *
 * All columns slow together, not just the hovered one. If you pause to read
 * one card, neighbouring columns racing past is the distracting part.
 */
export function MarqueeHoverSpeed({
  children,
  hoverRate = 0.3,
  className = '',
  style,
}: {
  children: React.ReactNode
  /** Fraction of normal speed while hovered. */
  hoverRate?: number
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  const setRate = (rate: number) => {
    // Under prefers-reduced-motion the tracks have `animation: none`, so
    // getAnimations() is empty and this is a no-op. Nothing to guard.
    ref.current?.querySelectorAll('[data-marquee-track]').forEach((el) => {
      el.getAnimations().forEach((a) => {
        a.playbackRate = rate
      })
    })
  }

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onPointerEnter={() => setRate(hoverRate)}
      onPointerLeave={() => setRate(1)}
    >
      {children}
    </div>
  )
}
