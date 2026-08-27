import Link from 'next/link'
import type { ReactNode } from 'react'

/* ═══════════════════════════════════════════════════════════════════════
   Primitives. Server components throughout. Nothing here needs the client.
   ═══════════════════════════════════════════════════════════════════════ */

export function MicroLabel({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <span className={`micro text-ink-soft ${className}`}>{children}</span>
}

/** The site's signature: a short orange rule opening a section. */
export function Rule({ className = '' }: { className?: string }) {
  return <span aria-hidden className={`block h-[3px] w-11 bg-orange ${className}`} />
}

type ButtonProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'outline' | 'onDark'
  className?: string
  external?: boolean
}

/**
 * Primary button is INK on ORANGE. White on orange is 2.6:1 and fails WCAG.
 * ink on orange is ~8:1. See 05-design/design-direction.md §3.
 */
export function Button({
  href,
  children,
  variant = 'primary',
  className = '',
  external,
}: ButtonProps) {
  const base =
    'group inline-flex min-h-11 items-center gap-2 rounded-sm px-5 py-3 text-[0.9375rem] font-semibold transition-all duration-200'
  const styles = {
    primary: 'bg-orange text-ink hover:-translate-y-px hover:shadow-[0_8px_20px_-10px_rgba(36,31,33,0.5)]',
    outline: 'border border-hairline text-ink hover:border-ink hover:bg-ink/[0.03]',
    onDark: 'border border-cream/30 text-cream hover:border-cream hover:bg-cream/[0.07]',
  }[variant]

  const inner = (
    <>
      {children}
      <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles} ${className}`}>
        {inner}
      </a>
    )
  }
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {inner}
    </Link>
  )
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-block border-b-[1.5px] border-hairline pb-1 pt-2 font-medium transition-colors duration-200 hover:border-orange sm:pt-0 sm:pb-0.5"
    >
      {children}
    </Link>
  )
}

/* ── Layout ─────────────────────────────────────────────────────────── */

/**
 * FULL-BLEED. Deliberately has no max-width: the layout uses the whole
 * screen and the gutter grows with it.
 *
 * Readability is protected by ch-based measures on the text blocks
 * themselves (`max-w-[52ch]`, `max-w-[58ch]`, `max-w-[15ch]` on headlines),
 * not by squeezing the page into a fixed column. Type sizes are all
 * `clamp()`ed, so they stop growing at the top end and only scale down.
 * Net effect: it fills a wide screen without stretching indefinitely, and
 * reflows properly as the viewport narrows.
 */
export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`gutter w-full ${className}`}>{children}</div>
}

/**
 * A grid that draws only the rules BETWEEN its cards, never a frame around
 * them. Every child is expected to carry `border-b border-r`; the negative
 * margins push the outermost of each one past the clipping wrapper, so the
 * bottom row and the last column come out unbordered and there is no top or
 * left rule to begin with.
 *
 * Doing it this way rather than with nth-child rules is what keeps it working
 * across breakpoints: the column count changes four times here, and no
 * `nth-child(3n)` selector survives that.
 */
export function RuleGrid({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className="overflow-hidden">
      <div className={`-mb-px -mr-px grid ${className}`}>{children}</div>
    </div>
  )
}

export function Section({
  children,
  band = false,
  dark = false,
  className = '',
  id,
}: {
  children: ReactNode
  band?: boolean
  dark?: boolean
  className?: string
  id?: string
}) {
  const tone = dark
    ? 'bg-ink text-cream'
    : band
      ? 'bg-cream-deep border-y border-hairline'
      : ''
  return (
    <section id={id} className={`py-[clamp(3.5rem,9vw,6.5rem)] ${tone} ${className}`}>
      {children}
    </section>
  )
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  className = '',
}: {
  eyebrow?: string
  title: ReactNode
  lede?: string
  className?: string
}) {
  return (
    <div className={`mb-[clamp(2.25rem,5vw,3.5rem)] max-w-[56ch] ${className}`}>
      {eyebrow && (
        <>
          <Rule className="mb-4" />
          <MicroLabel className="mb-4 block">{eyebrow}</MicroLabel>
        </>
      )}
      <h2 className="font-display text-display-l">{title}</h2>
      {lede && <p className="mt-[1.1rem] max-w-[52ch] text-ink-soft">{lede}</p>}
    </div>
  )
}

/* ── Stat strip ─────────────────────────────────────────────────────────
   PADDING RULE FOR EVERY BORDERED GRID IN THIS PROJECT:

   A vertical hairline needs clearance on BOTH sides. A cell only gets `pr`
   by default, so the cell to its right ends up flush against the rule. Any
   cell that sits to the RIGHT of a rule needs matching left padding.

   Cells on the container's own left edge keep `pl-0`, so their content stays
   aligned with the page gutter and the rest of the page.
   ─────────────────────────────────────────────────────────────────────── */

export function StatStrip({ stats }: { stats: readonly { value: string; label: string }[] }) {
  return (
    <div className="border-y border-hairline bg-cream-deep">
      <Container>
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={[
                'py-[clamp(1.75rem,4vw,2.5rem)] pr-6 md:pr-8',
                // left clearance, except on the container edge
                i % 2 === 0 ? 'pl-0' : 'pl-6',
                i === 0 ? 'md:pl-0' : 'md:pl-8',
                // vertical rules
                i % 2 === 0 ? 'border-r border-hairline' : '',
                'md:border-r md:last:border-r-0',
                // row divider, mobile only
                i < 2 ? 'border-b border-hairline md:border-b-0' : '',
              ].join(' ')}
            >
              <dd className="mb-1.5 font-display text-[clamp(2.25rem,1.6rem+2.6vw,3.25rem)] leading-none text-green-deep">
                {s.value}
              </dd>
              <dt className="max-w-[18ch] text-[0.8125rem] leading-snug text-ink-soft">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  )
}

/* ── Asides ─────────────────────────────────────────────────────────────
   Both of these exist to solve the same problem: the layout is full-bleed,
   but a text column is capped at a `ch` measure, so on a wide screen the
   space beside it goes to waste. These fill it with something real rather
   than stretching the prose past a readable line length.
   ─────────────────────────────────────────────────────────────────────── */

/**
 * A summary of the facts a parent scans for before reading anything: sport,
 * age, trial. Rows are supplied already resolved, and a row is expected to be
 * OMITTED rather than faked when the data is absent. Where a value is simply
 * unknown, the caller passes "On request", which is true and is also the
 * next step.
 */
export function FactPanel({
  title = 'At a glance',
  rows,
  className = '',
}: {
  title?: string
  rows: readonly { label: string; value: string }[]
  className?: string
}) {
  return (
    <div className={`border border-hairline bg-cream p-[clamp(1.25rem,2vw,1.75rem)] ${className}`}>
      <MicroLabel className="mb-2 block text-ink-faint">{title}</MicroLabel>
      <dl>
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-baseline justify-between gap-5 border-b border-hairline py-3 last:border-b-0 last:pb-0"
          >
            <dt className="shrink-0 text-[0.8125rem] text-ink-soft">{r.label}</dt>
            <dd className="text-right text-[0.9375rem] font-semibold">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/**
 * A sentence promoted out of the body copy. Shares the orange left rule with
 * EnquirePanel on purpose: both are "the page speaking directly to you".
 */
export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="border-l-2 border-orange pl-5 font-display text-display-s text-ink">
      {children}
    </blockquote>
  )
}

/* ── Empty states ───────────────────────────────────────────────────────
   The photo-independence principle made concrete. When content is missing
   we say so deliberately and offer a next step. Never render a blank box.
   ─────────────────────────────────────────────────────────────────────── */

export function EnquirePanel({
  title,
  body,
  href = '/contact',
  cta = 'Enquire now',
}: {
  title: string
  body: string
  href?: string
  cta?: string
}) {
  return (
    /* Full hairline frame, not just the orange edge. Without it the panel
       has no visible box on a `band` section, where its own tint matches
       the background, so it reads as loose text with a rule beside it
       rather than as a card occupying its column. */
    <div className="border border-l-2 border-hairline border-l-orange bg-cream px-6 py-7 sm:px-8">
      <h3 className="font-display text-display-s mb-2">{title}</h3>
      <p className="mb-5 max-w-[46ch] text-[0.9375rem] text-ink-soft">{body}</p>
      <Button href={href}>{cta}</Button>
    </div>
  )
}

