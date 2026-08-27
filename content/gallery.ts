/**
 * The gallery page. Curated from the client's photo drops, best-of only:
 * every image here earned its place, the rejects (blurry, screenshot,
 * near-duplicate) stay out of `public/`.
 *
 * Section order tells the company's story: our own centre first, then the
 * proof (competition day), then the three sports, then the delivery channels
 * (schools and communities) that make up most of the revenue.
 *
 * `span` carries the mosaic layout, same idiom as PhotoCollage: mobile-first
 * spans on a 2-col grid, md overrides on a 12-col grid. Portrait images get
 * narrow-tall tiles (md:col-span-3 md:row-span-3), landscapes wide-short
 * ones, so no photo is ever forced into a crop that fights its subject.
 */

export type GalleryTile = {
  src: string
  alt: string
  /** Tailwind span classes: mobile first, md overrides. */
  span: string
  /** object-position when the subject isn't centred. */
  position?: string
}

export type GallerySection = {
  eyebrow: string
  title: string
  lede?: string
  tiles: GalleryTile[]
}

export const gallerySections: GallerySection[] = [
  {
    eyebrow: 'At the centre',
    title: 'Aerial Zone, in session.',
    lede: 'Gymnastics at our own centre in Gottigere. Vault, beam and floor, and the one-on-one spotting that builds every skill safely.',
    tiles: [
      {
        src: '/photos/gallery/gymnastics-vault-straddle.jpg',
        alt: 'A young gymnast holds a straddle press on the vault at Aerial Zone',
        span: 'col-span-1 row-span-2 md:col-span-3 md:row-span-3',
      },
      {
        src: '/photos/gallery/gymnastics-handstand-beam.jpg',
        alt: 'A gymnast holds a handstand during beam practice at Aerial Zone',
        span: 'col-span-1 row-span-2 md:col-span-3 md:row-span-3',
      },
      {
        src: '/photos/gallery/gymnastics-floor-handstand.jpg',
        alt: 'A gymnast mid-handstand on the floor at the Aerial Zone centre',
        span: 'col-span-1 row-span-2 md:col-span-3 md:row-span-3',
      },
      {
        src: '/photos/gallery/gymnastics-coach-spotting.jpg',
        alt: 'A coach spots a young gymnast through a stretch at Aerial Zone',
        span: 'col-span-1 row-span-2 md:col-span-3 md:row-span-3',
      },
      {
        src: '/photos/gallery/aerial-zone-open-day.jpg',
        alt: 'Gymnasts, parents and coaches gathered at the Aerial Zone centre',
        span: 'col-span-2 row-span-2 md:col-span-7 md:row-span-2',
      },
      {
        src: '/photos/gymnastics-team-aerial-zone.jpg',
        alt: 'Gymnasts and coaches at the Aerial Zone centre',
        span: 'col-span-2 row-span-2 md:col-span-5 md:row-span-2',
        position: 'center 70%',
      },
    ],
  },
  {
    eyebrow: 'Competition day',
    title: 'The medals follow.',
    lede: 'Development over results. The medals are the proof, not the point, and there are plenty of both: club qualifiers, invitational meets and a national championship.',
    tiles: [
      {
        src: '/photos/gallery/gymnastics-podium-viva.jpg',
        alt: 'Podium finishers with certificates at an invitational gymnastics meet',
        span: 'col-span-1 row-span-2 md:col-span-3 md:row-span-3',
      },
      {
        src: '/photos/gallery/gymnastics-nationals-medal.jpg',
        alt: 'A young gymnast shows her medal at the National Gymnastics Championship',
        span: 'col-span-1 row-span-2 md:col-span-3 md:row-span-3',
      },
      {
        src: '/photos/gallery/gymnastics-club-competition.jpg',
        alt: 'Certificate winners at the Gymnastics Club Competition level qualifiers',
        span: 'col-span-2 row-span-2 md:col-span-6 md:row-span-3',
      },
      {
        src: '/photos/gallery/gymnastics-certificates-aerial-zone.jpg',
        alt: 'Young gymnasts hold their certificates at Aerial Zone',
        span: 'col-span-2 row-span-2 md:col-span-7 md:row-span-2',
      },
      {
        src: '/photos/gallery/gymnastics-podium-coaches.jpg',
        alt: 'Medalists on the podium with their coaches at Aerial Zone',
        span: 'col-span-2 row-span-2 md:col-span-5 md:row-span-2',
      },
      {
        src: '/photos/football-medals-goalpost.jpg',
        alt: 'Medal ceremony at the goalpost after a junior football tournament',
        span: 'col-span-2 row-span-2 md:col-span-5 md:row-span-2',
      },
      {
        src: '/photos/football-medals-ceremony.jpg',
        alt: 'Junior footballers with medals and certificates after a tournament',
        span: 'col-span-2 row-span-2 md:col-span-7 md:row-span-2',
      },
    ],
  },
  {
    eyebrow: 'Football',
    title: 'On the pitch.',
    lede: 'From the youngest squads still growing into their jerseys to match days on turf and dirt across Bengaluru.',
    tiles: [
      {
        src: '/photos/gallery/football-action-kick.jpg',
        alt: 'Mid-game action at a junior football session on turf',
        span: 'col-span-1 row-span-2 md:col-span-3 md:row-span-3',
      },
      {
        src: '/photos/football-match-action.jpg',
        alt: 'Junior footballers chasing the ball mid-match',
        span: 'col-span-1 row-span-2 md:col-span-5 md:row-span-3',
      },
      {
        src: '/photos/gallery/football-team-huddle.jpg',
        alt: 'Coach and players in a huddle before a match',
        span: 'col-span-2 row-span-2 md:col-span-4 md:row-span-3',
      },
      {
        src: '/photos/gallery/football-u5-numbered-jerseys.jpg',
        alt: 'The youngest squad lined up in their numbered jerseys',
        span: 'col-span-2 row-span-2 md:col-span-7 md:row-span-2',
        position: 'center 40%',
      },
      {
        src: '/photos/gallery/football-community-team-turf.jpg',
        alt: 'A Truesport Academy squad on a community turf court',
        span: 'col-span-2 row-span-2 md:col-span-5 md:row-span-2',
      },
      {
        src: '/photos/gallery/football-turf-session.jpg',
        alt: 'A football session on turf with the coaching team',
        span: 'col-span-2 row-span-2 md:col-span-4 md:row-span-2',
      },
      {
        src: '/photos/football-u7-lineup-front.jpg',
        alt: 'Young True Sport footballers lined up on the pitch, waving',
        span: 'col-span-1 row-span-2 md:col-span-4 md:row-span-2',
        position: 'center 65%',
      },
      {
        src: '/photos/football-u12-team-lineup-turf.jpg',
        alt: 'An under-12 team lined up on the turf before a game',
        span: 'col-span-1 row-span-2 md:col-span-4 md:row-span-2',
      },
    ],
  },
  {
    eyebrow: 'Basketball & swimming',
    title: 'In the pool, on the court.',
    lede: 'The rest of the roster: basketball at outdoor courts and swim classes in community pools.',
    tiles: [
      {
        src: '/photos/gallery/basketball-tournament-medals.jpg',
        alt: 'Basketball players with medals after a tournament at an outdoor court',
        span: 'col-span-2 row-span-2 md:col-span-7 md:row-span-2',
      },
      {
        src: '/photos/gallery/basketball-training-group.jpg',
        alt: 'A basketball training group with their coach at the court',
        span: 'col-span-2 row-span-2 md:col-span-5 md:row-span-2',
      },
      {
        src: '/photos/swimming-pool-group-crop.jpeg',
        alt: 'Swimming class group in the pool with their coach',
        span: 'col-span-2 row-span-2 md:col-span-5 md:row-span-2',
      },
      {
        src: '/photos/gallery/swimming-class-goggles.jpg',
        alt: 'A swim class in caps and goggles with their coaches by the pool',
        span: 'col-span-2 row-span-2 md:col-span-7 md:row-span-2',
      },
    ],
  },
  {
    eyebrow: 'Schools & communities',
    title: 'Where the children already are.',
    lede: 'Sessions inside partner schools and residential communities, from kindergarten award days to full-squad photos with the parents watching.',
    tiles: [
      {
        src: '/photos/gallery/school-glentree-certificates.jpg',
        alt: 'Students receive gymnastics certificates at Glentree Academy',
        span: 'col-span-2 row-span-2 md:col-span-7 md:row-span-2',
      },
      {
        src: '/photos/gallery/school-kindergarten-awards.jpg',
        alt: 'Kindergarten award day with the coaching team',
        span: 'col-span-2 row-span-2 md:col-span-5 md:row-span-2',
      },
      {
        src: '/photos/gallery/school-football-group.jpg',
        alt: 'The full football group at a partner school session',
        span: 'col-span-2 row-span-2 md:col-span-6 md:row-span-2',
      },
      {
        src: '/photos/community-football-group.jpg',
        alt: 'An evening community football session with children and parents',
        span: 'col-span-2 row-span-2 md:col-span-6 md:row-span-2',
      },
      {
        src: '/photos/community-football-group-alt.jpg',
        alt: 'Toddlers, parents and coaches around the parachute at a community session',
        span: 'col-span-2 row-span-2 md:col-span-12 md:row-span-2',
        position: 'center 60%',
      },
    ],
  },
]
