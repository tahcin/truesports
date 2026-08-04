import type { Metadata } from 'next'
import Link from 'next/link'
import { site, whatsappHref } from '@/content/site'
import {
  Button,
  Container,
  EnquirePanel,
  FactPanel,
  MicroLabel,
  PullQuote,
  Rule,
  Section,
  SectionHead,
} from '@/components/ui'

export const metadata: Metadata = {
  title: 'Savya Fit',
  description:
    "True Sport's own sports platform. Fitness assessment tests, body composition analysis and BMI monitoring, so every child's development is tracked with data.",
  alternates: { canonical: '/programs/savya-fit' },
}

/**
 * Savya Fit is a technology product, not a coaching program, so it gets its
 * own template (02-brief/website-requirements.md §2.5).
 *
 * Kept deliberately STATIC so the site can launch independently of backend
 * readiness. The backend is being built separately. This page links out; it
 * does not embed.
 */
const features = [
  {
    title: 'Fitness assessment tests',
    detail:
      'Structured, repeatable assessments so progress is measured against a baseline rather than remembered.',
  },
  {
    title: 'Body composition analysis',
    detail: 'A fuller picture of physical development than weight alone can give.',
  },
  {
    title: 'BMI monitoring',
    detail: 'Tracked over time and across seasons, so trends are visible early.',
  },
  {
    title: 'Included with membership',
    detail: 'Every child in our community programs gets access. It is not an add-on.',
  },
]

/**
 * Every value here is already stated in the copy below. The panel exists to
 * fill the right of a full-bleed hero with something a reader actually
 * wants, not to introduce new claims.
 */
const facts = [
  { label: 'Category', value: 'Technology' },
  { label: 'Access', value: 'Included with membership' },
  { label: 'Available to', value: 'All community programs' },
  { label: 'Status', value: 'Rolling out now' },
]

export default function SavyaFitPage() {
  return (
    <>
      <div className="border-b border-hairline bg-cream-deep">
        <Container className="pt-[clamp(2.5rem,7vw,4.5rem)] pb-[clamp(2.5rem,6vw,4rem)]">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link href="/programs" className="micro -my-2 inline-block py-2 text-ink-faint transition-colors hover:text-ink">
              ← All programs
            </Link>
          </nav>

          {/* There is no logo and no photography for this product, so the
              facts panel is the only thing holding the right column. */}
          <div className="grid items-start gap-x-[clamp(2rem,4vw,4rem)] gap-y-7 lg:grid-cols-[minmax(0,1fr)_clamp(19rem,27vw,27rem)]">
            <div className="rise-group">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="micro rounded-sm bg-green/10 px-2 py-1 text-green-deep">
                  Technology
                </span>
                <span className="micro rounded-sm bg-ink/[0.05] px-2 py-1 text-ink-soft">
                  Included with membership
                </span>
              </div>
              <h1 className="mb-5 max-w-[19ch] font-display text-display-l">Savya Fit</h1>
              <p className="mb-6 max-w-[26ch] font-display text-display-s font-normal text-green-deep">
                Progress you can actually see.
              </p>
              <p className="mb-9 max-w-[54ch] text-lede text-ink-soft">
                Our own platform. Fitness assessments, body composition and BMI tracking, so a
                child&rsquo;s physical development is measured with data and science, not guessed at
                from the sidelines.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button href="/contact">Get started</Button>
                <Button
                  href={whatsappHref("Hi! I'd like to know more about Savya Fit.")}
                  variant="outline"
                  external
                >
                  WhatsApp us
                </Button>
              </div>
            </div>

            <FactPanel rows={facts} />
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid gap-x-[clamp(2rem,5vw,4rem)] gap-y-10 lg:grid-cols-[auto_minmax(0,1fr)] xl:grid-cols-[auto_minmax(0,1fr)_clamp(16rem,22vw,22rem)]">
            <div className="lg:w-[14rem]">
              <Rule className="mb-4" />
              <MicroLabel>What it does</MicroLabel>
            </div>
            <div className="max-w-[58ch] space-y-5 text-lede text-ink-soft">
              <p>
                Most children&rsquo;s sports programs measure nothing. A parent gets a vague sense
                that things are going well, and that is all.
              </p>
              <p>
                Savya Fit is our answer to that. Every member of our community programs is assessed
                on a structured schedule, and the results are tracked over time, so improvement is
                a number you can look at, not a feeling.
              </p>
            </div>
            <aside className="max-xl:max-w-[32rem] lg:col-start-2 xl:col-start-3 xl:row-start-1">
              <PullQuote>Improvement is a number you can look at, not a feeling.</PullQuote>
            </aside>
          </div>
        </Container>
      </Section>

      {/* The rollout note used to be a band of its own holding a single
          panel. It belongs with the feature list it qualifies. */}
      <Section band>
        <Container>
          <SectionHead eyebrow="Key features" title="What you get." />
          <ul className="grid gap-x-[clamp(2rem,4vw,3.5rem)] border-t border-hairline sm:grid-cols-2 xl:grid-cols-4">
            {features.map((f, i) => (
              <li
                key={f.title}
                className="grid grid-cols-[auto_1fr] gap-4 border-b border-hairline py-6"
              >
                <span className="font-display text-[1.0625rem] leading-normal text-orange">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <strong className="mb-1 block text-[0.9375rem] font-semibold">{f.title}</strong>
                  <span className="text-[0.9375rem] text-ink-soft">{f.detail}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-[clamp(2.5rem,5vw,3.5rem)] grid gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:items-start">
            <div>
              <Rule className="mb-4" />
              <MicroLabel>The platform</MicroLabel>
            </div>
            <EnquirePanel
              title="Rolling out now"
              body="Savya Fit is being rolled out across our community programs. Ask us how to get access for your child, or when it reaches your location."
              cta="Ask about access"
            />
          </div>
        </Container>
      </Section>

      <Section dark>
        <Container className="text-center">
          <Rule className="mx-auto mb-8 w-14" />
          <h2 className="mx-auto mb-5 max-w-[20ch] font-display text-display-l">
            Train with us, and see the difference.
          </h2>
          <p className="mx-auto mb-9 max-w-[46ch] text-cream/70">
            {/* Explicit {' '}: JSX drops the space between an expression and
                the text that follows it across a line break, which was
                rendering "True Sportcommunity program". */}
            Savya Fit comes free with every {site.name}{' '}
            community program. Start with a trial session and we&rsquo;ll set up the first
            assessment.
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
