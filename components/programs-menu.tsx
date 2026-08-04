'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { programs, savyaFit } from '@/content/programs'
import type { Program } from '@/types/program'

/**
 * Desktop "Programs" mega-menu. The second and last client component in the
 * header, kept deliberately small: no Radix, no headless-UI, no icon package.
 * See 06-build/STACK.md for why client islands stay rare and tiny.
 *
 * ⚠️ The panel is `position: absolute` and resolves against <header>, which is
 * a containing block because it is `sticky`. That is what makes it full-bleed
 * while the trigger sits inside the gutter. Do NOT add `relative` to the
 * wrapper div: the panel would then anchor to the trigger and collapse to its
 * width. For the same reason, do NOT put `backdrop-filter`, `filter` or
 * `transform` on <header>. See the warning in mobile-nav.tsx.
 */

/** Grace period so a diagonal mouse path from trigger to panel doesn't dismiss it. */
const CLOSE_DELAY_MS = 120

/**
 * "Gymnastics · Ages 3–15". Drops the sport when it is already the program's
 * short name, so Football does not read "Football / FOOTBALL", and drops a
 * null ageGroup rather than printing the "Age group TBC" placeholder that
 * ProgramCard uses. A nav menu is not the place to surface a content gap;
 * the program page and the card still do. See types/program.ts.
 */
export function metaLine(program: Program): string {
  return [program.sport === program.shortName ? null : program.sport, program.ageGroup]
    .filter(Boolean)
    .join(' · ')
}

export function ProgramsMenu({ label }: { label: string }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  /**
   * Close on route change. Adjusted during render rather than in an effect,
   * because setState in an effect body causes a cascading render and is a lint
   * error under React 19. Same pattern as mobile-nav.tsx.
   */
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const openNow = () => {
    cancelClose()
    setOpen(true)
  }

  const closeSoon = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS)
  }

  useEffect(() => cancelClose, [])

  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      triggerRef.current?.focus()
    }

    /**
     * Pointerdown, not click: closing on mousedown means a click landing on the
     * page behind the panel isn't swallowed by the dismissal.
     */
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false)
    }

    /** Tab out of the panel entirely, e.g. onward to "Book a Trial". */
    const onFocusIn = (e: FocusEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false)
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('focusin', onFocusIn)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('focusin', onFocusIn)
    }
  }, [open])

  /**
   * Mouse only. On a touch device wide enough for this nav (a tablet in
   * landscape), `pointerenter` fires immediately before `click`, so an
   * unguarded handler would open the panel and then the click would toggle it
   * straight back shut. Touch falls through to the click handler alone.
   */
  const onPointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') openNow()
  }
  const onPointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') closeSoon()
  }

  return (
    <div ref={wrapperRef} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? setOpen(false) : openNow())}
        aria-expanded={open}
        aria-controls="programs-panel"
        className="group relative flex items-center gap-1.5 py-1 transition-colors hover:text-ink aria-expanded:text-ink"
      >
        {label}
        <Chevron open={open} />
        {/* The same orange underline as the sibling nav links, held at full
            width while the panel is open so "open" reads like "hovered". */}
        <span
          aria-hidden
          className={`absolute bottom-0 left-0 h-[1.5px] bg-orange transition-[width] duration-250 group-hover:w-full ${
            open ? 'w-full' : 'w-0'
          }`}
        />
      </button>

      {open && (
        <div
          id="programs-panel"
          className="absolute inset-x-0 top-full animate-[panel-drop_180ms_cubic-bezier(0.2,0.7,0.3,1)] border-b border-hairline bg-cream shadow-[0_20px_32px_-26px_rgba(36,31,33,0.45)]"
        >
          <nav aria-label="Programs" className="gutter py-7">
            {/* PADDING RULE (see ui.tsx StatStrip): a vertical hairline needs
                clearance on both sides. Every cell carries px-6, and this
                wrapper is pulled 24px left so the first column's text still
                lands on the page gutter.

                The -ml-6 lives on the WRAPPER, not the grid, on purpose.
                overflow-hidden clips both edges, so a grid that overhung on
                the left would lose its first column's padding. Overhanging
                only on the right (-mr-px) means the clip removes exactly one
                thing: the outer vertical rule on the last column.

                The bottom rule is deliberately kept. It doubles as the
                divider above the Savya Fit row. */}
            <div className="-ml-6 overflow-hidden">
              <ul className="-mr-px grid grid-cols-2 lg:grid-cols-3">
                {programs.map((program) => (
                  <li key={program.slug} className="flex">
                    <Link
                      href={`/programs/${program.slug}`}
                      className="group flex w-full flex-col border-b border-r border-hairline px-6 py-5 transition-colors duration-200 hover:bg-green/[0.045]"
                    >
                      <span className="flex items-baseline gap-2 font-display text-[1.0625rem] font-medium leading-snug transition-colors duration-200 group-hover:text-green-deep">
                        {program.shortName}
                        <span
                          aria-hidden
                          className="-translate-x-1 text-sm opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                        >
                          →
                        </span>
                      </span>
                      {/* min-h reserves the line so the summaries stay aligned
                          across the row even when there is nothing to say here. */}
                      <span className="micro mt-1.5 block min-h-4 text-ink-faint">
                        {metaLine(program)}
                      </span>
                      <span className="mt-2.5 max-w-[34ch] text-[0.875rem] leading-snug text-ink-soft">
                        {program.summary}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
              {/* Savya Fit is a technology product, not a coaching program, so
                  it sits outside the grid. See content/programs/index.ts. */}
              <Link
                href={savyaFit.href}
                className="group flex items-baseline gap-2 text-[0.9375rem]"
              >
                <span className="font-medium transition-colors duration-200 group-hover:text-green-deep">
                  {savyaFit.name}
                </span>
                <span className="text-ink-faint">Our tracking platform</span>
                <span
                  aria-hidden
                  className="text-sm transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>

              <Link
                href="/programs"
                className="group inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold"
              >
                All programs
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}

/** Inline SVG rather than an icon package: one chevron does not justify a dependency. */
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 10 6"
      className={`h-[6px] w-2.5 transition-transform duration-250 ${open ? 'rotate-180' : ''}`}
    >
      <path
        d="M1 1l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
