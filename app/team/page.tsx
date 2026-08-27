import type { Metadata } from 'next'
import Image from 'next/image'
import { coachesHero, featuredCoaches, gymnasticsTeam } from '@/content/coaches'
import { whatsappHref } from '@/content/site'
import {
  Button,
  Container,
  MicroLabel,
  Rule,
  Section,
  SectionHead,
} from '@/components/ui'

export const metadata: Metadata = {
  title: 'Team',
  description:
    'The certified coaches behind True Sport: AIFF-licensed football head coaches and the Aerial Zone gymnastics coaching team in Bengaluru.',
  alternates: { canonical: '/team' },
}

/** Same typographic fallback the rest of the site uses for missing headshots. */
function initials(name: string): string {
  return name
    .replace(/^(Mr\.|Coach|Dr\.)\s+/i, '')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
}

export default function CoachesPage() {
  return (
    <>
      {/* ── HEADER ────────────────────────────────────────────────── */}
      <div className="border-b border-hairline bg-cream-deep">
        <Container className="pt-[clamp(2.5rem,7vw,4.5rem)] pb-[clamp(2.5rem,6vw,4rem)]">
          <div className="rise-group">
            <Rule className="mb-4" />
            <MicroLabel className="mb-6 block">{coachesHero.eyebrow}</MicroLabel>
            <h1 className="mb-5 max-w-[14ch] font-display text-display-xl">
              {coachesHero.headline}
            </h1>
            <p className="max-w-[52ch] text-lede text-ink-soft">{coachesHero.lede}</p>
          </div>
        </Container>
      </div>

      {/* ── HEAD COACHES ──────────────────────────────────────────────
          Full cards with photo and bio, same record layout as the About
          page leadership list, so the two pages read as one system. */}
      <Section>
        <Container>
          <SectionHead eyebrow="Football" title="Head coaches." />
          <ul className="grid border-t border-hairline md:grid-cols-2">
            {featuredCoaches.map((m) => (
              <li
                key={m.name}
                className="border-b border-hairline py-7 pr-6 md:odd:border-r md:odd:pr-10 md:even:pl-10"
              >
                <div className="mb-4 flex items-center gap-4">
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt={m.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 shrink-0 rounded-full border border-hairline object-cover"
                      style={m.photoPosition ? { objectPosition: m.photoPosition } : undefined}
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-hairline bg-cream-deep font-display text-[1.375rem] text-green-deep"
                    >
                      {initials(m.name)}
                    </span>
                  )}
                  <div>
                    <p className="font-display text-display-s leading-tight">{m.name}</p>
                    <p className="micro mt-1 text-ink-faint">{m.role}</p>
                  </div>
                </div>
                <p className="max-w-[52ch] text-[0.9375rem] text-ink-soft">{m.bio}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── GYMNASTICS ROSTER ─────────────────────────────────────────
          No usable headshots exist for this group (the source is an ID-card
          sheet), so everyone gets the site's typographic initials tile. */}
      <Section band>
        <Container>
          <SectionHead
            eyebrow="Gymnastics"
            title="The Aerial Zone coaching team."
            lede="The coaches and staff running our gymnastics centre and school programs, led by Head Coach R. Chethan."
          />
          <ul className="grid gap-x-[clamp(1.5rem,3vw,3rem)] border-t border-hairline sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {gymnasticsTeam.map((m) => (
              <li key={m.name} className="flex items-center gap-4 border-b border-hairline py-5">
                <span
                  aria-hidden
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-hairline bg-cream font-display text-[1.125rem] text-green-deep"
                >
                  {initials(m.name)}
                </span>
                <div>
                  <p className="text-[0.9375rem] font-semibold leading-tight">{m.name}</p>
                  <p className="micro mt-1 text-ink-faint">{m.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section dark>
        <Container className="text-center">
          <Rule className="mx-auto mb-8 w-14" />
          <h2 className="mx-auto mb-5 max-w-[22ch] font-display text-display-l">
            Train with people who hold a standard.
          </h2>
          <p className="mx-auto mb-9 max-w-[44ch] text-cream/70">
            The first session is free. Tell us your child&rsquo;s age and what they enjoy, and
            we&rsquo;ll take it from there.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact">Book a free trial</Button>
            <Button href={whatsappHref()} variant="onDark" external>
              Chat on WhatsApp
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
