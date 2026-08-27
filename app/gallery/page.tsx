import type { Metadata } from 'next'
import Image from 'next/image'
import { gallerySections } from '@/content/gallery'
import type { GallerySection } from '@/content/gallery'
import { whatsappHref } from '@/content/site'
import { Button, Container, MicroLabel, Rule, Section, SectionHead } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Photos from True Sport sessions across Bengaluru: gymnastics at Aerial Zone, football, basketball and swimming, school programs and competition days.',
  alternates: { canonical: '/gallery' },
}

/**
 * One mosaic per section, same idiom as PhotoCollage on the homepage: fixed
 * row units filled with `object-cover`, spans carried by the content file, so
 * the section height is bounded and the crops do the composition work.
 *
 * Each tile wears the site's photo frame (hairline border, cream mat) rather
 * than the homepage's frameless bleed: thirty phone-camera photos with mixed
 * lighting need the mat to read as one set. See design-direction.md §5.
 */
function GalleryBand({ section, band }: { section: GallerySection; band: boolean }) {
  return (
    <Section band={band}>
      <Container>
        <SectionHead eyebrow={section.eyebrow} title={section.title} lede={section.lede} />
        <ul className="grid grid-cols-2 gap-2.5 [grid-auto-rows:clamp(5rem,10vw,6.5rem)] sm:gap-3 md:grid-cols-12 md:[grid-auto-rows:clamp(6.5rem,9vw,9rem)]">
          {section.tiles.map((t) => (
            <li key={t.src} className={`border border-hairline bg-cream p-1.5 ${t.span}`}>
              <figure className="relative h-full overflow-hidden">
                <Image
                  src={t.src}
                  alt={t.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  style={t.position ? { objectPosition: t.position } : undefined}
                />
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

export default function GalleryPage() {
  return (
    <>
      {/* Text-only opener, same band as the About vision. The photos are the
          page; the hero's job is one line of framing, not a headline photo
          competing with thirty below it. */}
      <div className="border-b border-hairline bg-cream-deep">
        <Container className="pt-[clamp(3rem,8vw,5.5rem)] pb-[clamp(3rem,7vw,5rem)]">
          <div className="rise-group grid items-end gap-[clamp(2rem,4vw,4.5rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div>
              <Rule className="mb-4" />
              <MicroLabel className="mb-6 block">Gallery</MicroLabel>
              <h1 className="max-w-[13ch] font-display text-display-xl">Life at True Sport.</h1>
            </div>
            <p className="max-w-[42ch] text-lede text-ink-soft lg:pb-3">
              Sessions, meets and medal days across Bengaluru: at our Aerial Zone centre, inside
              partner schools, and on the turfs and pools of residential communities.
            </p>
          </div>
        </Container>
      </div>

      {gallerySections.map((section, i) => (
        <GalleryBand key={section.eyebrow} section={section} band={i % 2 === 1} />
      ))}

      <Section dark>
        <Container className="text-center">
          <Rule className="mx-auto mb-8 w-14" />
          <h2 className="mx-auto mb-5 max-w-[20ch] font-display text-display-l">
            Add your child to the picture.
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
