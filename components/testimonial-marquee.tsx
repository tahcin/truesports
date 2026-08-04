import { MarqueeHoverSpeed } from './marquee-hover-speed'
import { Container, MicroLabel, Rule } from './ui'

/**
 * Vertical testimonial marquee. Adapted from a shadcn/motion component, but
 * built natively: **no dependencies**, and the cards stay server-rendered.
 *
 * The reference version pulled in `motion`, `react-use-measure` and
 * `@radix-ui/react-avatar` (~40-50KB gzipped) and ran a JS animation loop
 * permanently. We committed to two client components total when we chose
 * Next over Astro, and the audience is parents on mid-range Androids. A CSS
 * `translateY(-50%)` on a duplicated track gets the identical effect for free.
 *
 * The one exception is the hover slow-down, which wraps the columns in the
 * tiny `MarqueeHoverSpeed` client component. CSS cannot retime a running
 * animation without jumping. See that file.
 *
 * It also drops the reference's `rounded-3xl` + `shadow-lg` cards, which
 * fight our "hairline borders, not drop shadows" rule.
 *
 * ⚠️ Column content is ROTATED, not sliced. The reference expects nine
 * testimonials across three columns; we have three. Rotating means each
 * column starts on a different quote instead of leaving two columns empty.
 */

type Testimonial = { quote: string; name: string }

/** "[Parent name]" → "PN". Placeholder names would otherwise yield "[". */
function initials(name: string) {
  const words = name.replace(/[^\p{L}\s]/gu, ' ').trim().split(/\s+/).filter(Boolean)
  return words.slice(0, 2).map((w) => w[0].toUpperCase()).join('') || '“'
}

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="w-full border border-hairline bg-cream p-6 sm:p-7">
      <blockquote className="font-display text-[1.1875rem] font-light leading-snug">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span
          aria-hidden
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-hairline bg-cream-deep font-display text-[0.8125rem] text-green-deep"
        >
          {initials(t.name)}
        </span>
        <span className="text-[0.8125rem] font-semibold leading-tight">{t.name}</span>
      </figcaption>
    </figure>
  )
}

/**
 * One scrolling column. Children are rendered twice and the track shifts by
 * -50%, so the seam is invisible. The duplicate is `aria-hidden` so screen
 * readers hear each quote once.
 */
function Column({
  items,
  seconds,
  className = '',
}: {
  items: Testimonial[]
  seconds: number
  className?: string
}) {
  return (
    <div className={`flex-1 overflow-hidden ${className}`}>
      <div
        data-marquee-track
        className="flex flex-col gap-5"
        style={{ animation: `marquee-y ${seconds}s linear infinite` }}
      >
        {items.map((t) => (
          <Card key={t.name + t.quote} t={t} />
        ))}
        <div aria-hidden className="contents">
          {items.map((t) => (
            <Card key={`dup-${t.name}${t.quote}`} t={t} />
          ))}
        </div>
      </div>
    </div>
  )
}

const rotate = <T,>(arr: T[], by: number) => arr.map((_, i) => arr[(i + by) % arr.length])

export function TestimonialMarquee({
  testimonials,
  eyebrow = 'From parents',
  title = 'What families tell us.',
}: {
  testimonials: Testimonial[]
  eyebrow?: string
  title?: string
}) {
  if (testimonials.length === 0) return null

  return (
    <section className="border-y border-hairline bg-cream-deep py-[clamp(3.5rem,9vw,6.5rem)]">
      <Container>
        <div className="mb-[clamp(2.25rem,5vw,3.5rem)] max-w-[56ch]">
          <Rule className="mb-4" />
          <MicroLabel className="mb-4 block">{eyebrow}</MicroLabel>
          <h2 className="font-display text-display-l">{title}</h2>
        </div>

        <MarqueeHoverSpeed
          className="flex max-h-[34rem] justify-center gap-5"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)',
          }}
        >
          {/* Different durations keep the columns out of sync, so the same
              quote is rarely level with itself across columns. */}
          <Column items={testimonials} seconds={13} />
          <Column items={rotate(testimonials, 1)} seconds={18} className="hidden md:block" />
          <Column items={rotate(testimonials, 2)} seconds={15} className="hidden lg:block" />
        </MarqueeHoverSpeed>
      </Container>
    </section>
  )
}
