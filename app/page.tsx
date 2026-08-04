import Link from 'next/link'
import { hero, stats, positioning, testimonials, closing } from '@/content/home'
import { programs, savyaFit } from '@/content/programs'
import { site, whatsappHref } from '@/content/site'
import { BrandMark } from '@/components/brand-mark'
import { HelpCard, ProgramCard } from '@/components/program-card'
import { PartnerWall } from '@/components/partner-wall'
import { TestimonialMarquee } from '@/components/testimonial-marquee'
import { PhotoCollage } from '@/components/photo-collage'
import {
  Button,
  Container,
  MicroLabel,
  Rule,
  RuleGrid,
  Section,
  SectionHead,
  StatStrip,
  TextLink,
} from '@/components/ui'

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────
          No photograph, by design. There isn't a single action shot in
          the library. See 04-assets/ASSET-AUDIT.md.

          The hero and the stat strip together fill the first screen exactly.
          The header is sticky and therefore still IN FLOW, so its height comes
          off the top: h-16 on mobile, h-[72px] from md. dvh, not vh, so mobile
          browser chrome doesn't push the stats below the fold.

          min-h, never h: on a short viewport the hero must be allowed to grow
          past the screen rather than crush the display type. */}
      <div className="flex min-h-[calc(100dvh-4rem)] flex-col md:min-h-[calc(100dvh-72px)]">
        <div className="relative flex flex-1 items-center overflow-hidden">
          <BrandMark className="pointer-events-none absolute right-[2%] top-1/2 w-[min(34vw,460px)] -translate-y-1/2 opacity-90 max-md:hidden" />
          <Container className="relative z-10 py-[clamp(2.5rem,7vw,5rem)]">
            <div className="rise-group">
              <h1 className="mb-7 max-w-[15ch] font-display text-display-xl">
                {hero.headline}{' '}
                <strong className="font-medium text-green-deep md:whitespace-nowrap">
                  {hero.headlineEmphasis}
                </strong>
              </h1>
              <p className="mb-9 max-w-[46ch] text-lede text-ink-soft">{hero.sub}</p>
              <div className="flex flex-wrap items-center gap-6">
                <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
                <TextLink href={hero.secondaryCta.href}>{hero.secondaryCta.label}</TextLink>
              </div>
            </div>
          </Container>
        </div>

        <StatStrip stats={stats} />
      </div>

      {/* ── POSITIONING ──────────────────────────────────────────── */}
      <Section>
        <Container>
          <div className="grid items-start gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[1.1fr_1fr]">
            <div>
              <Rule className="mb-4" />
              <MicroLabel className="mb-5 block">{positioning.eyebrow}</MicroLabel>
              <blockquote className="font-display text-display-m sm:text-display-l">
                {positioning.quote}{' '}
                <strong className="font-medium text-green-deep">{positioning.quoteEmphasis}</strong>
              </blockquote>
            </div>
            <div>
              <p className="mb-7 text-ink-soft">{positioning.body}</p>
              <ul className="border-t border-hairline">
                {positioning.points.map((p, i) => (
                  <li
                    key={p.title}
                    className="grid grid-cols-[auto_1fr] gap-4 border-b border-hairline py-[1.1rem]"
                  >
                    <span className="font-display text-[1.0625rem] leading-normal text-orange">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <strong className="mb-0.5 block text-[0.9375rem] font-semibold">
                        {p.title}
                      </strong>
                      <span className="text-sm text-ink-soft">{p.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── PROGRAMS ─────────────────────────────────────────────── */}
      <Section band id="programs">
        <Container>
          <SectionHead
            eyebrow="Products & Services"
            title={site.platformLine}
            lede="Seven programs across gymnastics, football, basketball and technology, from six-month-old toddlers to competitive teenagers."
          />
          <RuleGrid className="sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {programs.map((p, i) => (
              <ProgramCard key={p.slug} program={p} index={i} />
            ))}

            {/* Savya Fit: a product, not a coaching program, so it gets its own tile */}
            <Link
              href={savyaFit.href}
              className="group relative flex flex-col sm:min-h-[15rem] border-b border-r border-hairline p-[clamp(1.5rem,3.5vw,2.25rem)] transition-colors duration-300 hover:bg-green/[0.045]"
            >
              <span
                aria-hidden
                className="absolute -top-px left-0 h-[2px] w-0 bg-orange transition-[width] duration-350 group-hover:w-full"
              />
              <span className="mb-3.5 font-display text-[0.9375rem] text-orange">07</span>
              <h3 className="mb-2.5 font-display text-display-s">{savyaFit.name}</h3>
              <span className="micro mb-3.5 self-start rounded-sm bg-green/10 px-2 py-1 text-green-deep">
                All members
              </span>
              <p className="mb-6 text-[0.9375rem] text-ink-soft">{savyaFit.summary}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold">
                Discover
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>

            <HelpCard />
          </RuleGrid>
        </Container>
      </Section>

      {/* ── PROOF ────────────────────────────────────────────────── */}
      <Section>
        <Container>
          <SectionHead
            eyebrow="Trusted by"
            title="Ten schools. Twenty institutions. Two decades."
          />
          <PartnerWall />
        </Container>
      </Section>

      <TestimonialMarquee testimonials={testimonials.items} />

      {/* ── PHOTO WALL ───────────────────────────────────────────── */}
      <PhotoCollage />

      {/* ── CLOSING CTA ──────────────────────────────────────────── */}
      <Section dark>
        <Container className="text-center">
          <Rule className="mx-auto mb-8 w-14" />
          <h2 className="mx-auto mb-5 max-w-[18ch] font-display text-display-l">
            {closing.headline}
          </h2>
          <p className="mx-auto mb-9 max-w-[44ch] text-cream/70">{closing.body}</p>
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
