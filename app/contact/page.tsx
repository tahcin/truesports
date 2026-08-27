import type { Metadata } from 'next'
import { contactHero } from '@/content/contact'
import { site, whatsappHref } from '@/content/site'
import { EnquiryForm } from '@/components/enquiry-form'
import {
  Button,
  Container,
  MicroLabel,
  Section,
} from '@/components/ui'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Book a free trial session, enquire about a program, or partner with True Sport for your school or residential community in Bengaluru.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      {/* ── HEADER + SPLIT CARD ──────────────────────────────────────
          The page is full-bleed everywhere else, but a contact block that
          stretches across 1920px is exactly what made the loose two-column
          version fall apart: a capped text column, a floating form card,
          and a void between them. So this one block is CONTAINED: a compact
          header, then a single bordered card split into a dark channels
          panel and the form. One object, no drift. */}
      {/* Not <Section>: its clamp tops out at 6.5rem of top padding, which is
          right for mid-page bands but too deep for a page opener. */}
      <section className="pt-[clamp(1.5rem,3vw,2.25rem)] pb-[clamp(3rem,8vw,5.5rem)]">
        <Container>
          <div>
            <div className="mb-[clamp(1.5rem,3vw,2.25rem)]">
              <h1 className="mb-3 font-display text-display-l">
                {contactHero.headline}{' '}
                <strong className="font-medium text-green-deep">
                  {contactHero.headlineEmphasis}
                </strong>
              </h1>
              <p className="max-w-[52ch] text-lede text-ink-soft">{contactHero.lede}</p>
            </div>

            <div className="grid overflow-hidden border border-hairline lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
              {/* Channels panel. Dark, like the site's closing sections, so
                  the card reads as one designed object instead of two beige
                  boxes. WhatsApp leads: it is the primary conversion channel. */}
              <div className="flex flex-col bg-ink p-[clamp(1.75rem,3vw,3rem)] text-cream">
                <MicroLabel className="mb-8 block text-cream/60">Reach us directly</MicroLabel>

                <dl className="space-y-7">
                  <div>
                    <dt className="micro mb-1.5 text-cream/50">WhatsApp / Phone</dt>
                    <dd className="font-display text-[1.375rem]">
                      <a href={site.contact.phoneHref} className="hover:text-orange">
                        {site.contact.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="micro mb-1.5 text-cream/50">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${site.contact.email}`}
                        className="text-[0.9375rem] text-cream/85 hover:text-orange"
                      >
                        {site.contact.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="micro mb-1.5 text-cream/50">The centre</dt>
                    <dd>
                      <address className="text-[0.9375rem] not-italic leading-relaxed text-cream/85">
                        Aerial Zone, Kembathalli Main Rd
                        <br />
                        Gottigere, Bengaluru 560083
                      </address>
                    </dd>
                  </div>
                </dl>

                <div className="mt-10 lg:mt-auto">
                  <Button href={whatsappHref()} variant="onDark" external>
                    Chat on WhatsApp
                  </Button>
                  <p className="mt-4 text-[0.8125rem] text-cream/50">
                    Fastest reply. We usually respond the same day.
                  </p>
                </div>
              </div>

              {/* The card spans gutter to gutter like every other section, so
                  the form's inner measure is capped instead: full-bleed width
                  belongs to the card, not to a 900px text input. Centred, so
                  the spare width splits evenly instead of pooling on the
                  right and making the panel look half-finished. */}
              <div className="bg-cream p-[clamp(1.75rem,3vw,3rem)]">
                <div className="mx-auto w-full max-w-[40rem]">
                  <h2 className="mb-6 font-display text-display-s">Send us an enquiry</h2>
                  <EnquiryForm />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── MAP ──────────────────────────────────────────────────────
          Full-bleed, edge to edge, acting as the break into the next
          section. Sits outside <Container> deliberately: the gutter would
          otherwise inset it and lose the full-span effect. Uses the keyless
          `output=embed` form, so there is no Maps API key to manage. */}
      <div className="border-y border-hairline">
        <iframe
          src="https://maps.google.com/maps?q=Aerial+Zone+-+School+of+Gymnastics,+Kembathalli+Main+Rd,+Gottigere,+Bengaluru,+Karnataka+560083&z=15&output=embed"
          title="True Sport, Bengaluru"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[clamp(15rem,32vh,24rem)] w-full border-0 grayscale-[0.2]"
        />
      </div>

      {/* ── PARTNERSHIPS CROSS-LINK ──────────────────────────────────
          The full pitch for school administrators and RWA managers lives
          on /partner-with-us now; this band just routes them there. */}
      <Section band>
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
            <div>
              <h2 className="mb-2 font-display text-display-m">Not a parent?</h2>
              <p className="max-w-[46ch] text-[0.9375rem] text-ink-soft">
                We also run programs for schools and residential communities across Bengaluru.
              </p>
            </div>
            <Button href="/partner-with-us" variant="outline">
              Partner with us
            </Button>
          </div>
        </Container>
      </Section>

    </>
  )
}
