import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProgram, programs } from '@/content/programs'
import { site, whatsappHref } from '@/content/site'
import type { Batch, Coach, GalleryImage, Pricing, Program } from '@/types/program'
import {
  Button,
  Container,
  EnquirePanel,
  FactPanel,
  MicroLabel,
  PullQuote,
  Rule,
  RuleGrid,
  Section,
  SectionHead,
} from '@/components/ui'

/** All 6 program pages are prerendered at build. Nothing dynamic. */
export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }))
}

// Next 16: params is a Promise.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const program = getProgram(slug)
  if (!program) return {}

  return {
    title: program.name,
    description: program.metaDescription,
    alternates: { canonical: `/programs/${program.slug}` },
    openGraph: {
      title: `${program.name} · ${site.name}`,
      description: program.metaDescription,
      url: `/programs/${program.slug}`,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: `${site.name}: sports for all` }],
    },
  }
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const program = getProgram(slug)
  if (!program) notFound()

  const isAZ = program.accent === 'aerial-zone'
  const ctaHref = program.cta.kind === 'partner' ? '/contact?enquiry=school' : '/contact'
  const { hero, aside, band } = splitGallery(program)

  return (
    <>
      <ProgramHero program={program} isAZ={isAZ} ctaHref={ctaHref} heroImage={hero} />
      <Overview program={program} images={aside} />
      <Outcomes program={program} />
      <Details program={program} />
      <Coaches coaches={program.coaches} />
      <Gallery images={band} />
      <ClosingCta program={program} ctaHref={ctaHref} />
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   Every section below must render deliberately when its data is null or
   empty. That is the whole test of this template. Brazilian Soccer School
   has no photos, no batches, no pricing and one photo-less coach.

   The second test is WIDTH. The layout is full-bleed and the prose is
   capped at a `ch` measure, so any section that is a single left-aligned
   column leaves a void on a wide screen. Every section here either runs a
   second column or explains why it does not.
   ═══════════════════════════════════════════════════════════════════════ */

/**
 * Photographs are scarce, so they are placed where they do the most work
 * rather than always being herded into a gallery.
 *
 * No logo + photos exist: the first photo takes the hero's visual slot, so
 * the Truesport Academy pages get imagery above the fold on desktop instead
 * of a text-only hero (the sub-brand pages already have their logo there).
 * Of the remainder: two or fewer ALL go in the Overview aside, which would
 * otherwise hold a lone pull-quote in a tall column, and the gallery band
 * is dropped rather than rendered as one or two stranded tiles. Three or
 * more: the first leads the aside and the rest form a real band.
 */
function splitGallery(program: Program): {
  hero: GalleryImage | null
  aside: GalleryImage[]
  band: GalleryImage[]
} {
  const gallery = program.gallery
  const hero = !program.logo && gallery.length > 0 ? gallery[0] : null
  const rest = hero ? gallery.slice(1) : gallery
  if (rest.length <= 2) return { hero, aside: rest, band: [] }
  return { hero, aside: rest.slice(0, 1), band: rest.slice(1) }
}

/**
 * The facts a parent scans for before reading a word of prose. Every value
 * is derived from data that already exists on the program: nothing here is
 * authored, and a row is dropped rather than invented when there is nothing
 * true to put in it.
 */
function heroFacts(program: Program): { label: string; value: string }[] {
  const forSchools = program.audience === 'schools'

  const rows = [
    { label: 'Sport', value: program.sport },
    { label: forSchools ? 'For' : 'Ages', value: program.ageGroup ?? 'On request' },
    { label: forSchools ? 'Investment' : 'Fees', value: feeSummary(program.pricing) },
  ]

  if (program.coaches.length > 0) {
    // Names beat a count: "Brijesh Sagar & Prajwal A S" tells a parent who
    // they're trusting; "2 named coaches" tells them to keep scrolling.
    rows.push({
      label: 'Coaching',
      value:
        program.coaches.length <= 2
          ? program.coaches.map((c) => c.name.replace(/^Coach\s+/i, '')).join(' & ')
          : `${program.coaches.length} certified coaches`,
    })
  }

  // Keyed to AUDIENCE, not to cta.kind. Every parent-facing program is
  // promised a free first session by ClosingCta and by the enquiry panels,
  // including the two whose CTA reads "Enquire" rather than "Book a trial".
  // Keying this off cta.kind instead would have the panel stay silent on a
  // page that makes the promise twice further down.
  if (!forSchools) {
    rows.push({ label: 'Trial', value: 'First session free' })
  }

  return rows
}

/** A single published tier prints as-is. Several print as a floor. */
function feeSummary(pricing: Pricing | null): string {
  if (!pricing) return 'On request'
  const [first] = pricing.tiers
  return pricing.tiers.length > 1 ? `From ${first.price}` : first.price
}

/* ── Hero ───────────────────────────────────────────────────────────────
   Explicit grid placement, not source order, because the two columns want
   DIFFERENT orders on the two axes:

     mobile   logo → headline → facts
     desktop  headline | logo
                       | facts

   The logo has to lead on mobile because for Brazilian Soccer School and
   SOCATOTS it is the only imagery that exists. The facts panel must NOT
   lead: it means nothing before you know what you are looking at. DOM
   order gives the mobile stack; col-start/row-start rebuild the desktop
   pair from it.
   ─────────────────────────────────────────────────────────────────────── */

function ProgramHero({
  program,
  isAZ,
  ctaHref,
  heroImage,
}: {
  program: Program
  isAZ: boolean
  ctaHref: string
  heroImage: GalleryImage | null
}) {
  const hasVisual = Boolean(program.logo) || Boolean(heroImage)

  return (
    <div className="border-b border-hairline bg-cream-deep">
      <Container className="pt-[clamp(2.5rem,7vw,4.5rem)] pb-[clamp(2.5rem,6vw,4rem)]">
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link href="/programs" className="micro -my-2 inline-block py-2 text-ink-faint transition-colors hover:text-ink">
            ← All programs
          </Link>
        </nav>

        <div className="grid items-start gap-x-[clamp(2rem,4vw,4rem)] gap-y-7 lg:grid-cols-[minmax(0,1fr)_clamp(19rem,27vw,27rem)]">
          {program.logo && (
            <div className="flex items-center justify-center border border-hairline bg-cream p-6 max-lg:mb-1 max-lg:self-start lg:col-start-2 lg:row-start-1 lg:p-8">
              <Image
                src={program.logo.src}
                alt={`${program.name} logo`}
                width={program.logo.width}
                height={program.logo.height}
                priority
                sizes="(max-width: 1024px) 160px, 300px"
                className="h-auto w-[7.5rem] lg:w-full lg:max-w-[13rem]"
              />
            </div>
          )}

          <div
            className={`rise-group lg:col-start-1 lg:row-start-1 ${hasVisual ? 'lg:row-span-2' : ''}`}
          >
            <div className="mb-6 flex flex-wrap items-center gap-3">
              {/* Contained sub-brand accent. Never becomes page chrome. */}
              <span
                className={`micro rounded-sm px-2 py-1 ${
                  isAZ ? 'bg-az-purple/10 text-az-purple' : 'bg-green/10 text-green-deep'
                }`}
              >
                {program.sport}
              </span>
              {/* A missing age range is omitted, never shown as "TBC"; the
                  gap lives in 02-brief/open-questions.md, not in the hero. */}
              {program.ageGroup && (
                <span className="micro rounded-sm bg-ink/[0.05] px-2 py-1 text-ink-soft">
                  {program.ageGroup}
                </span>
              )}
            </div>

            {/* Measures are set per element, not on the wrapper. A single
                52ch cap on the whole block sizes everything to the BODY
                font, which is what was breaking the headline onto three
                lines while the rest of the screen sat empty. */}
            <h1 className="mb-5 max-w-[19ch] font-display text-display-l">{program.name}</h1>

            {program.tagline && (
              <p
                className={`mb-6 max-w-[26ch] font-display text-display-s font-normal ${
                  isAZ ? 'text-az-red' : 'text-green-deep'
                }`}
              >
                {program.tagline}
              </p>
            )}

            <p className="mb-9 max-w-[54ch] text-lede text-ink-soft">{program.summary}</p>

            <div className="flex flex-wrap items-center gap-4">
              <Button href={ctaHref}>{program.cta.label}</Button>
              <Button href={whatsappHref(`Hi! I'd like to know more about ${program.name}.`)} variant="outline" external>
                WhatsApp us
              </Button>
            </div>
          </div>

          {/* Photo hero for programs without a sub-brand logo. Sits after
              the text in DOM so mobile keeps its headline-first order. */}
          {heroImage && !program.logo && (
            <div className="border border-hairline bg-cream p-1.5 lg:col-start-2 lg:row-start-1">
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-[4/3]">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 27rem"
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <FactPanel
            rows={heroFacts(program)}
            className={`lg:col-start-2 ${hasVisual ? 'lg:row-start-2' : 'lg:row-start-1'}`}
          />
        </div>
      </Container>
    </div>
  )
}

function Overview({ program, images }: { program: Program; images: GalleryImage[] }) {
  const hasAside = images.length > 0 || Boolean(program.highlight)

  return (
    <Section>
      <Container>
        <div
          className={`grid gap-x-[clamp(2rem,5vw,4rem)] gap-y-10 ${
            hasAside
              ? /* Third column from lg (not xl, which left a 1024–1280 void
                   under the prose). The aside takes ALL remaining width, so
                   there is no gap-hole between capped prose and a floating
                   right-pinned box: prose, then photo, then page gutter. */
                'lg:grid-cols-[minmax(0,14rem)_minmax(0,58ch)_minmax(0,1fr)]'
              : 'lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]'
          }`}
        >
          <div>
            <Rule className="mb-4" />
            <MicroLabel>The program</MicroLabel>
          </div>

          <div className="max-w-[58ch] space-y-5 text-lede text-ink-soft">
            {program.overview.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          {hasAside && (
            /* Aside images are cropped to a landscape ratio on desktop no
               matter their native orientation: a portrait tower here made
               the whole section twice the prose's height, and the crop is
               what lets the photo span prose-edge to page-gutter without
               dominating. */
            <aside className="space-y-6 max-lg:max-w-[32rem] lg:col-start-3 lg:row-start-1">
              {images.map((img) => (
                <div key={img.src} className="border border-hairline bg-cream p-1.5">
                  <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[3/2]">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 1024px) 32rem, 45vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
              {program.highlight && <PullQuote>{program.highlight}</PullQuote>}
            </aside>
          )}
        </div>
      </Container>
    </Section>
  )
}

/**
 * Rules run HORIZONTALLY only. A vertical rule between columns needs
 * matching padding on both sides of it, which pushes the leftmost column
 * off the page gutter and out of line with the headline above. A column
 * gap does the same separating work and keeps that alignment at every one
 * of the three column counts.
 */
function Outcomes({ program }: { program: Program }) {
  if (program.outcomes.length === 0) return null
  return (
    <Section band>
      <Container>
        <SectionHead eyebrow="What they'll learn" title="Skills and outcomes." />
        <ul className="grid gap-x-[clamp(2rem,4vw,3.5rem)] border-t border-hairline sm:grid-cols-2 xl:grid-cols-3">
          {program.outcomes.map((o, i) => (
            <li
              key={o}
              className="grid grid-cols-[auto_1fr] gap-4 border-b border-hairline py-5"
            >
              <span className="font-display text-[1.0625rem] leading-normal text-orange">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[0.9375rem]">{o}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

/* ── Batches and fees ───────────────────────────────────────────────────
   These were two separate full-width bands. Every program in the catalogue
   has `batches: null`, and four of six also have `pricing: null`, so on
   most pages that was two consecutive screens of empty state.

   One band now, in four shapes, one per real data state.
   ─────────────────────────────────────────────────────────────────────── */

const TIMINGS_BODY =
  "Timings vary by location and age group, and we open new batches as they fill. Tell us your child's age and we'll send the current schedule."

function Details({ program }: { program: Program }) {
  const { batches, pricing } = program
  const title = program.audience === 'schools' ? 'Batches and investment.' : 'Batches and fees.'

  // Both published. Nobody today, but the template has to hold: a four
  // column table and a tier grid both want the full width, so they stack.
  if (batches && pricing) {
    return (
      <Section band>
        <Container>
          <SectionHead eyebrow="Practical details" title={title} />
          <BatchTable batches={batches} />
          <div className="mt-[clamp(2.5rem,5vw,3.5rem)]">
            <PricingBlock pricing={pricing} />
          </div>
        </Container>
      </Section>
    )
  }

  // Fees published, timings not. Aerial Zone Centre and Schools.
  if (pricing) {
    return (
      <Section band>
        <Container>
          <SectionHead eyebrow="Practical details" title={title} />
          <div className="grid gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,1fr)_clamp(17rem,23vw,21rem)] lg:items-start">
            <PricingBlock pricing={pricing} />
            <EnquirePanel
              title="Batch timings on request"
              body={TIMINGS_BODY}
              cta="Ask for timings"
            />
          </div>
        </Container>
      </Section>
    )
  }

  // Timings published, fees not.
  if (batches) {
    return (
      <Section band>
        <Container>
          <SectionHead eyebrow="Practical details" title={title} />
          <div className="grid gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,1fr)_clamp(17rem,23vw,21rem)] lg:items-start">
            <BatchTable batches={batches} />
            <EnquirePanel
              title="Fees on request"
              body="Fees depend on session frequency, location and age group. Get in touch and we'll send you the current plans."
              cta="Ask about fees"
            />
          </div>
        </Container>
      </Section>
    )
  }

  // Neither. The headline takes the left column so the panel is not a
  // narrow box adrift in an otherwise empty band.
  return (
    <Section band>
      <Container>
        <div className="grid gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:items-start">
          <SectionHead eyebrow="Practical details" title={title} className="mb-0" />
          <EnquirePanel
            title="Timings and fees on request"
            body="Timings vary by location and age group, and fees depend on how often your child trains. Tell us their age and we'll send the current schedule and plans. The first session is free either way."
            cta="Ask for timings and fees"
          />
        </div>
      </Container>
    </Section>
  )
}

function BatchTable({ batches }: { batches: Batch[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] border-t border-hairline text-left text-[0.9375rem]">
        <thead>
          <tr className="border-b border-hairline">
            <th className="micro py-3 pr-4 font-semibold">Batch</th>
            <th className="micro py-3 pr-4 font-semibold">Ages</th>
            <th className="micro py-3 pr-4 font-semibold">Days</th>
            <th className="micro py-3 pr-4 font-semibold">Time</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((b) => (
            <tr key={b.label} className="border-b border-hairline">
              <td className="py-4 pr-4 font-semibold">{b.label}</td>
              <td className="py-4 pr-4 text-ink-soft">{b.ages ?? 'Not specified'}</td>
              <td className="py-4 pr-4 text-ink-soft">{b.days}</td>
              <td className="py-4 pr-4 text-ink-soft">{b.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Written out in full because Tailwind cannot see an interpolated class. */
function tierColumns(count: number): string {
  if (count <= 1) return ''
  if (count === 2) return 'sm:grid-cols-2'
  return 'sm:grid-cols-2 xl:grid-cols-3'
}

function PricingBlock({ pricing }: { pricing: Pricing }) {
  return (
    <div>
      {/* RuleGrid, so a ragged last row leaves no rule pointing at nothing.
          Column count follows the tier count: Aerial Zone Schools publishes
          ONE tier, and in a three column grid that left a top rule and a
          vertical rule running out across empty space. One tier takes the
          full width instead. */}
      <RuleGrid className={`border-t border-hairline ${tierColumns(pricing.tiers.length)}`}>
        {pricing.tiers.map((t) => (
          <div
            key={t.label}
            className={`border-b border-r border-hairline p-6 ${
              t.highlight ? 'bg-green/[0.06]' : ''
            }`}
          >
            <p className="mb-1 text-[0.9375rem] font-semibold">{t.label}</p>
            {t.detail && <p className="mb-4 text-[0.8125rem] text-ink-soft">{t.detail}</p>}
            <p className="font-display text-[clamp(1.75rem,1.5rem+1vw,2.25rem)] leading-none text-green-deep">
              {t.price}
            </p>
          </div>
        ))}
      </RuleGrid>
      <div className="mt-6 space-y-1.5 text-[0.8125rem] text-ink-soft">
        {pricing.registration && <p>{pricing.registration}</p>}
        {pricing.note && <p className="max-w-[60ch]">{pricing.note}</p>}
      </div>
    </div>
  )
}

/**
 * Four of the six programs name a single coach. In a two column grid that
 * left a vertical hairline with nothing on the other side of it, so one
 * coach gets a full-width record instead: identity in a fixed left column,
 * credentials running across the rest.
 */
function Coaches({ coaches }: { coaches: Coach[] }) {
  if (coaches.length === 0) return null

  if (coaches.length === 1) {
    const coach = coaches[0]
    return (
      <Section>
        <Container>
          <SectionHead eyebrow="Coaching" title="Who they'll train with." />
          <div className="grid items-start gap-x-[clamp(2rem,5vw,4rem)] gap-y-5 border-y border-hairline py-8 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
            <div className="flex items-center gap-4">
              <CoachAvatar coach={coach} />
              <div>
                <p className="font-display text-display-s leading-tight">{coach.name}</p>
                <p className="micro mt-1 text-ink-faint">{coach.role}</p>
              </div>
            </div>
            <p className="max-w-[70ch] text-lede text-ink-soft">{coach.credentials}</p>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <Section>
      <Container>
        <SectionHead eyebrow="Coaching" title="Who they'll train with." />
        <ul className="grid gap-x-[clamp(2rem,4vw,4rem)] border-t border-hairline md:grid-cols-2">
          {coaches.map((c) => (
            <li key={c.name} className="border-b border-hairline py-7">
              <div className="mb-4 flex items-center gap-4">
                <CoachAvatar coach={c} />
                <div>
                  <p className="font-display text-display-s leading-tight">{c.name}</p>
                  <p className="micro mt-1 text-ink-faint">{c.role}</p>
                </div>
              </div>
              <p className="max-w-[52ch] text-[0.9375rem] text-ink-soft">{c.credentials}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

/** Only two staff have headshots. Everyone else gets a typographic tile. */
function CoachAvatar({ coach }: { coach: Coach }) {
  if (coach.photo) {
    return (
      <Image
        src={coach.photo}
        alt={coach.name}
        width={64}
        height={64}
        className="h-16 w-16 shrink-0 rounded-full border border-hairline object-cover"
        style={coach.photoPosition ? { objectPosition: coach.photoPosition } : undefined}
      />
    )
  }
  const initials = coach.name
    .replace(/^Coach\s+/i, '')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
  return (
    <span
      aria-hidden
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-hairline bg-cream-deep font-display text-[1.375rem] text-green-deep"
    >
      {initials}
    </span>
  )
}

/**
 * Only renders for a set big enough to be a band. Anything smaller has
 * already been placed in the Overview aside by splitGallery.
 */
function Gallery({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) return null
  return (
    <Section band>
      <Container>
        <SectionHead eyebrow="Gallery" title="Inside the sessions." />
        {/* Never fewer than three columns at lg, four from xl: letting two
            or three images share the full width blows them up to half a
            screen each. A ragged last cell is invisible in a gap-separated
            grid. */}
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((img) => (
            <li key={img.src} className="border border-hairline bg-cream p-1.5">
              <div
                className={`relative overflow-hidden ${
                  img.orientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

function ClosingCta({ program, ctaHref }: { program: Program; ctaHref: string }) {
  const isSchools = program.audience === 'schools'
  return (
    <Section dark>
      <Container className="text-center">
        <Rule className="mx-auto mb-8 w-14" />
        <h2 className="mx-auto mb-5 max-w-[20ch] font-display text-display-l">
          {isSchools ? 'Bring gymnastics to your campus.' : 'The first session is free.'}
        </h2>
        <p className="mx-auto mb-9 max-w-[46ch] text-cream/70">
          {isSchools
            ? "Tell us about your school and we'll put together a proposal: curriculum fit, timetabling, equipment and coaching, all covered."
            : "Come and try it. No pressure, no commitment. Just tell us your child's age and we'll find the right batch."}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href={ctaHref}>{program.cta.label}</Button>
          <Button
            href={whatsappHref(`Hi! I'd like to know more about ${program.name}.`)}
            variant="onDark"
            external
          >
            Chat on WhatsApp
          </Button>
        </div>
      </Container>
    </Section>
  )
}
