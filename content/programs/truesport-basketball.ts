import type { Program } from '@/types/program'

export const truesportBasketball: Program = {
  slug: 'truesport-academy-basketball',
  name: 'Truesport Academy: Basketball',
  shortName: 'Basketball',
  tagline: 'Coached by national medalists.',
  ageGroup: null,
  sport: 'Basketball',
  audience: 'parents',
  accent: null,
  logo: null,
  summary:
    'Led by national medalists and certified strength coaches, with a structured player development pathway.',
  overview: [
    'Basketball coaching delivered inside your residential community, with structured sessions, age-appropriate progression, and coaches who have actually played at national level.',
    'Our basketball staff are two-time national medalists who have represented Karnataka at National Championships and Khelo India, and who hold strength-and-conditioning certification. Sessions build fundamentals first: footwork, ball handling and shooting mechanics before anything else.',
    'Every member also gets access to Savya, our own platform, so fitness assessments and physical development are tracked with data rather than guessed at.',
  ],
  highlight:
    'Two-time national medalists who have represented Karnataka at National Championships and Khelo India.',
  outcomes: [
    'Ball handling, footwork and shooting mechanics',
    'Defensive positioning and reading the game',
    'Age-appropriate strength and conditioning',
    'Court awareness, communication and team play',
    'Tracked physical development through fitness assessments',
  ],
  batches: null,
  // No named coach currently listed for basketball. The Coaches section and
  // the hero's "Coaching" fact both drop out rather than render an empty
  // heading, the same way SOCATOTS behaves.
  coaches: [],
  gallery: [],
  cta: { label: 'Book a free trial', kind: 'trial' },
  metaDescription:
    'Basketball coaching for children inside Bengaluru residential communities, led by national medalists and certified strength and conditioning coaches.',
}
