import type { Metadata } from 'next'
import { partnerHero, partnerships, sellingPoints } from '@/content/partner'
import { whatsappHref } from '@/content/site'
import { PartnerWall } from '@/components/partner-wall'
import {
  Button,
  Container,
  MicroLabel,
  Rule,
  Section,
  SectionHead,
} from '@/components/ui'

export const metadata: Metadata = {
  title: 'Partner with us',
  description:
    'Bring certified sports coaching into your school or residential community in Bengaluru. Gymnastics on your timetable, football and swimming inside your society, all run by True Sport.',
  alternates: { canonical: '/partner-with-us' },
}

export default function PartnerPage() {
  return (
    <>
      {/* ── HEADER ────────────────────────────────────────────────── */}
      <div className="border-b border-hairline bg-cream-deep">
        <Container className="pt-[clamp(2.5rem,7vw,4.5rem)] pb-[clamp(2.5rem,6vw,4rem)]">
          <div className="rise-group">
            <Rule className="mb-4" />
            <MicroLabel className="mb-6 block">{partnerHero.eyebrow}</MicroLabel>
            <h1 className="mb-5 max-w-[16ch] font-display text-display-xl">
              {partnerHero.headline}
            </h1>
            <p className="mb-9 max-w-[54ch] text-lede text-ink-soft">{partnerHero.lede}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/contact">Send an enquiry</Button>
              <Button
                href={whatsappHref("Hi! I'd like to talk about a partnership with True Sport.")}
                variant="outline"
                external
              >
                WhatsApp us
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* ── WHY US ────────────────────────────────────────────────── */}
      <Section>
        <Container>
          <SectionHead eyebrow="Why True Sport" title="What you get from day one." />
          <ul className="grid gap-x-[clamp(2rem,4vw,3.5rem)] border-t border-hairline md:grid-cols-3">
            {sellingPoints.map((s, i) => (
              <li key={s.title} className="border-b border-hairline py-7">
                <span className="mb-4 block font-display text-[1.25rem] leading-tight text-orange">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-3 max-w-[22ch] font-display text-display-s">{s.title}</h3>
                <p className="max-w-[46ch] text-[0.9375rem] text-ink-soft">{s.detail}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── THE TWO OFFERS ─────────────────────────────────────────
          Moved from the contact page. Same two audiences, same cards. */}
      <Section band>
        <Container>
          <SectionHead
            eyebrow="Two ways in"
            title="Schools and communities."
            lede="Different settings, same standard. Both start with the same conversation."
          />
          <div className="grid border-t border-hairline md:grid-cols-2">
            {partnerships.map((p) => (
              <div
                key={p.label}
                className="flex flex-col border-b border-hairline py-8 pr-6 md:odd:border-r md:odd:pr-12 md:even:pl-12"
              >
                <MicroLabel className="mb-3 block text-green-deep">{p.label}</MicroLabel>
                <h3 className="mb-3 font-display text-display-s">{p.title}</h3>
                <p className="mb-7 max-w-[46ch] text-[0.9375rem] text-ink-soft">{p.detail}</p>
                <div className="mt-auto">
                  <Button href={whatsappHref(`Hi! ${p.cta}. `)} variant="outline" external>
                    {p.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── PROOF ─────────────────────────────────────────────────── */}
      <Section>
        <Container>
          <SectionHead eyebrow="Trusted by" title="Where we already work." />
          <PartnerWall />
        </Container>
      </Section>

      <Section dark>
        <Container className="text-center">
          <Rule className="mx-auto mb-8 w-14" />
          <h2 className="mx-auto mb-5 max-w-[20ch] font-display text-display-l">
            Start the conversation.
          </h2>
          <p className="mx-auto mb-9 max-w-[46ch] text-cream/70">
            Tell us about your school or community and we&rsquo;ll put together a proposal:
            curriculum fit, timetabling, equipment and coaching, all covered.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact">Send an enquiry</Button>
            <Button
              href={whatsappHref("Hi! I'd like to talk about a partnership with True Sport.")}
              variant="onDark"
              external
            >
              Chat on WhatsApp
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
