import type { Metadata } from 'next'
import Image from 'next/image'
import { vision, story, mission, founder, team } from '@/content/about'
import { whatsappHref } from '@/content/site'
import { stats } from '@/content/home'
import { BrandMark } from '@/components/brand-mark'
import { PartnerWall } from '@/components/partner-wall'
import {
  Button,
  Container,
  MicroLabel,
  Rule,
  Section,
  SectionHead,
  StatStrip,
} from '@/components/ui'

export const metadata: Metadata = {
  title: 'About us',
  description:
    'True Sport has run grassroots youth sport in Bengaluru for over two decades. Founded by international gymnastics official Dr. Anuradha Namashivaya, registered since 2009.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      {/* ── VISION: the client asked for one bold statement, large ──
          Statement left, supporting line right, so the full-bleed width is
          actually used instead of leaving half the screen empty. */}
      <div className="relative overflow-hidden border-b border-hairline bg-cream-deep">
        <BrandMark className="pointer-events-none absolute -right-[10%] top-1/2 w-[min(30vw,400px)] -translate-y-1/2 opacity-40 max-lg:hidden" />
        <Container className="relative z-10 pt-[clamp(3rem,8vw,5.5rem)] pb-[clamp(3rem,7vw,5rem)]">
          <div className="rise-group grid items-end gap-[clamp(2rem,4vw,4.5rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div>
              <Rule className="mb-4" />
              <MicroLabel className="mb-6 block">Our vision</MicroLabel>
              {/* The measure belongs on the h1, NOT the wrapper: `ch` resolves
                  against the element's own font-size, so 24ch on a 17px
                  wrapper was 279px, and squeezed an 84px headline into three
                  cramped lines. */}
              <h1 className="max-w-[13ch] font-display text-display-xl">{vision.headline}</h1>
            </div>
            <p className="max-w-[42ch] text-lede text-ink-soft lg:pb-3">{vision.body}</p>
          </div>
        </Container>
      </div>

      {/* ── STORY ─────────────────────────────────────────────────── */}
      <Section>
        <Container>
          <div className="grid gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[14rem_minmax(0,1fr)]">
            <div>
              <Rule className="mb-4" />
              <MicroLabel>Who we are</MicroLabel>
            </div>
            {/* Prose runs in two columns on wide screens. A single 58ch column
                left ~750px of dead space at 1920; this keeps the line length
                readable while actually filling the width. */}
            <div className="text-lede text-ink-soft xl:columns-2 xl:gap-[clamp(2.5rem,4vw,5rem)]">
              {story.map((p) => (
                <p key={p} className="mb-5 max-w-[58ch] break-inside-avoid last:mb-0">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <StatStrip stats={stats} />

      {/* ── MISSION ───────────────────────────────────────────────── */}
      <Section>
        <Container>
          <SectionHead eyebrow="Our mission" title="Five things we hold ourselves to." />
          <ul className="border-t border-hairline">
            {mission.map((m, i) => (
              <li
                key={m.title}
                className="grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-2 border-b border-hairline py-7 md:grid-cols-[3.5rem_minmax(0,26ch)_minmax(0,1fr)]"
              >
                <span className="font-display text-[1.25rem] leading-tight text-orange">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-display-s leading-tight">{m.title}</h3>
                <p className="max-w-[68ch] text-[0.9375rem] text-ink-soft">{m.detail}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── FOUNDER ───────────────────────────────────────────────── */}
      <Section band>
        <Container>
          <SectionHead eyebrow="Founder" title={founder.name} />
          {/* Three columns on wide screens: photo, bio, highlights. Stacking
              the bio and highlights left the right third of the screen empty. */}
          <div className="grid gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,18rem)_minmax(0,1.25fr)_minmax(0,1fr)]">
            <div>
              <div className="relative aspect-[3/4] overflow-hidden border border-hairline bg-cream">
                <Image
                  src={founder.photo}
                  alt={founder.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 18rem"
                  className="object-cover"
                  priority
                />
              </div>
              {/* No role caption here: the section eyebrow already says
                  "Founder", and repeating it under the photo reads as a bug. */}
            </div>

            <p className="max-w-[58ch] text-ink-soft">{founder.bio}</p>

            <ul className="border-t border-hairline xl:border-t-0">
              {founder.highlights.map((h, i) => (
                <li
                  key={h.label}
                  className="grid grid-cols-[auto_1fr] gap-4 border-b border-hairline py-4 xl:first:border-t xl:first:border-hairline"
                >
                  <span className="font-display text-[1.0625rem] leading-normal text-orange">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <strong className="block text-[0.9375rem] font-semibold">{h.label}</strong>
                    <span className="text-sm text-ink-soft">{h.detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ── TEAM ──────────────────────────────────────────────────── */}
      <Section>
        <Container>
          <SectionHead
            eyebrow="Leadership"
            title="The people behind True Sport."
            lede="The team running operations and coaching standards day to day. The full coaching roster has a page of its own."
          />
          <ul className="grid border-t border-hairline md:grid-cols-2">
            {team.map((m) => (
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
                      {m.name
                        .replace(/^(Mr\.|Coach|Dr\.)\s+/i, '')
                        .split(' ')
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join('')}
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
          <div className="mt-8">
            <Button href="/team" variant="outline">
              Meet the team
            </Button>
          </div>
        </Container>
      </Section>

      {/* ── PARTNERS ──────────────────────────────────────────────── */}
      <Section band>
        <Container>
          <SectionHead eyebrow="Trusted by" title="Where we work." />
          <PartnerWall />
        </Container>
      </Section>

      <Section dark>
        <Container className="text-center">
          <Rule className="mx-auto mb-8 w-14" />
          <h2 className="mx-auto mb-5 max-w-[20ch] font-display text-display-l">
            Come and meet us.
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
