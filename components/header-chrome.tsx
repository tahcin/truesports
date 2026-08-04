'use client'

import { useEffect, useState, type ReactNode } from 'react'

/**
 * The <header> shell. A client component ONLY so it can react to scroll
 * position; everything inside it is still server-rendered and passed through
 * as `children`, so the logo, nav links and CTA never reach the client bundle.
 *
 * One job: the header's bg-cream is the SAME colour as the page background,
 * so the only thing that makes it visible at the top of the page is the
 * hairline. Drop the hairline and it blends into the hero. Nothing else needs
 * to change, and keeping bg-cream at all times is what stops content showing
 * through once you scroll.
 *
 * The header stays put all the way down the page, including over the footer.
 */

/** Small dead zone so elastic overscroll doesn't flicker the hairline. */
const TOP_THRESHOLD_PX = 4

export function HeaderChrome({ children }: { children: ReactNode }) {
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    /**
     * Reading scrollY does not force layout, so this is safe to run straight
     * off the scroll event with no rAF throttle. React bails out of the
     * re-render whenever the boolean is unchanged, which is almost every time.
     */
    const measure = () => setAtTop(window.scrollY <= TOP_THRESHOLD_PX)

    measure()
    window.addEventListener('scroll', measure, { passive: true })
    return () => window.removeEventListener('scroll', measure)
  }, [])

  return (
    <header
      data-at-top={atTop || undefined}
      className={`sticky top-0 z-50 border-b bg-cream transition-[border-color] duration-300 ${
        atTop ? 'border-transparent' : 'border-hairline'
      }`}
    >
      {children}
    </header>
  )
}
