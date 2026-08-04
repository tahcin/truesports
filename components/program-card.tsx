import Image from 'next/image'
import Link from 'next/link'
import type { Program } from '@/types/program'

/**
 * Program card. Deliberately has NO image slot, because it must look finished for
 * Brazilian Soccer School and SOCATOTS, which have zero photos.
 * Hairline borders, not shadows. See 05-design/design-direction.md §5.
 */
export function ProgramCard({
  program,
  index,
}: {
  program: Program
  index: number
}) {
  return (
    <Link
      href={`/programs/${program.slug}`}
      className="group relative flex flex-col sm:min-h-[15rem] border-b border-r border-hairline p-[clamp(1.5rem,3.5vw,2.25rem)] transition-colors duration-300 hover:bg-green/[0.045]"
    >
      {/* orange rule sweeps in on hover */}
      <span
        aria-hidden
        className="absolute -top-px left-0 h-[2px] w-0 bg-orange transition-[width] duration-350 group-hover:w-full"
      />

      <div className="mb-4 flex h-7 items-center justify-between gap-3">
        <span className="font-display text-[0.9375rem] text-orange">
          {String(index + 1).padStart(2, '0')}
        </span>
        {/* Real sub-brand logo where one exists. max-h + max-w + contain keeps
            the wide Aerial Zone wordmark and the square football badges at a
            comparable visual weight instead of a fixed height blowing the
            wide ones up. */}
        {program.logo && (
          <Image
            src={program.logo.src}
            alt=""
            width={program.logo.width}
            height={program.logo.height}
            sizes="120px"
            className="max-h-6 w-auto max-w-[6.5rem] object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
      </div>

      <h3 className="mb-1.5 font-display text-display-s">{program.name}</h3>

      <p className="micro mb-3.5 text-ink-faint">{metaLine(program)}</p>

      <p className="mb-6 max-w-[44ch] text-[0.9375rem] text-ink-soft">{program.summary}</p>

      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold">
        {program.cta.kind === 'partner' ? 'Partner with us' : 'Learn more'}
        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  )
}

/**
 * One quiet meta line per card: sport, plus the age range when we have one.
 * A missing age range is simply omitted, never shown as "TBC" (the gap is
 * tracked in 02-brief/open-questions.md, the card doesn't need to carry it).
 * The earlier multi-colour pills (purple/green/grey by accent) made the grid
 * read as clutter; one consistent treatment reads as a system.
 */
function metaLine(program: Program): string {
  return program.ageGroup ? `${program.sport} · ${program.ageGroup}` : program.sport
}

/** Fills the trailing grid cell and catches the "I don't know where to start" parent. */
export function HelpCard() {
  return (
    <Link
      href="/contact"
      className="group flex flex-col sm:min-h-[15rem] border-b border-r border-hairline bg-green/[0.06] p-[clamp(1.5rem,3.5vw,2.25rem)] transition-colors duration-300 hover:bg-green/[0.1]"
    >
      <span className="mb-3.5 font-display text-[0.9375rem] text-orange">→</span>
      <h3 className="mb-2.5 font-display text-display-s">Not sure which fits your child?</h3>
      <p className="mb-6 text-[0.9375rem] text-ink-soft">
        Tell us their age and what they enjoy. We&rsquo;ll suggest a starting point, and the
        first trial is free.
      </p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-green-deep">
        Talk to us
        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  )
}
