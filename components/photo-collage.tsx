import Image from 'next/image'
import { Container, MicroLabel, Rule } from './ui'

/**
 * Asymmetric photo mosaic for the end of the homepage. Real photos from the
 * client's sessions: football, gymnastics and swimming.
 *
 * Every tile is a fixed grid cell filled with `object-cover`, so the section
 * has a bounded, predictable height (~4 row units on desktop) instead of the
 * full stacked height of the images. The spans are deliberately uneven, one
 * wide anchor per band, and the crops do the composition work. No JS.
 */

type Tile = {
  src: string
  alt: string
  /** Tailwind span classes: mobile first, md overrides. */
  span: string
  /** object-position when the subject isn't centred. */
  position?: string
}

const tiles: Tile[] = [
  {
    src: '/photos/football-medals-goalpost.jpg',
    alt: 'Medal ceremony at the goalpost after a junior football tournament',
    span: 'col-span-2 row-span-2 md:col-span-7 md:row-span-2',
  },
  {
    src: '/photos/football-u7-lineup-front.jpg',
    alt: 'Young True Sport footballers lined up on the pitch, waving',
    span: 'col-span-1 row-span-2 md:col-span-5 md:row-span-2',
    position: 'center 65%',
  },
  {
    src: '/photos/gymnastics-team-aerial-zone.jpg',
    alt: 'Gymnasts and coaches at the Aerial Zone centre',
    span: 'col-span-1 row-span-2 md:col-span-3 md:row-span-2',
    position: 'center 70%',
  },
  {
    src: '/photos/football-match-action.jpg',
    alt: 'Junior footballers chasing the ball mid-match',
    span: 'col-span-1 row-span-2 md:col-span-4 md:row-span-2',
  },
  {
    src: '/photos/swimming-pool-group.jpg',
    alt: 'Swimming class group in the pool',
    span: 'col-span-1 row-span-2 md:col-span-5 md:row-span-2',
  },
]

export function PhotoCollage({
  eyebrow = 'In pictures',
  title = 'A week at True Sport.',
}: {
  eyebrow?: string
  title?: string
}) {
  return (
    <section className="border-t border-hairline bg-cream py-[clamp(3.5rem,9vw,6.5rem)]">
      <Container>
        <div className="mb-[clamp(2rem,4vw,3rem)] max-w-[56ch]">
          <Rule className="mb-4" />
          <MicroLabel className="mb-4 block">{eyebrow}</MicroLabel>
          <h2 className="font-display text-display-l">{title}</h2>
        </div>

        <div className="grid grid-cols-2 gap-2.5 [grid-auto-rows:clamp(5rem,10vw,6.5rem)] sm:gap-3 md:grid-cols-12 md:[grid-auto-rows:clamp(6.5rem,9vw,9rem)]">
          {tiles.map((t) => (
            <figure key={t.src} className={`relative overflow-hidden ${t.span}`}>
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="(max-width: 768px) 50vw, 40vw"
                className="object-cover"
                style={t.position ? { objectPosition: t.position } : undefined}
              />
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}
