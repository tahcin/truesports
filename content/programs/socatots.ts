import type { Program } from '@/types/program'

/**
 * Brand spelling is SOCATOTS (per the official logo), not "Soccer Tots"
 * as written in the website guidelines. See 02-brief/business-scopes.md.
 *
 * Also a no-photos, no-batches case.
 */
export const socatots: Program = {
  slug: 'socatots',
  name: 'SOCATOTS',
  shortName: 'SOCATOTS',
  tagline: 'Their first sport, before they can spell it.',
  ageGroup: '6 months – 5 years',
  sport: 'Football',
  audience: 'parents',
  accent: null,
  logo: { src: '/brand/socatots.png', width: 225, height: 225 },
  summary:
    "The world's first EYFS-based toddler football program. Football as a medium for early movement and confidence.",
  overview: [
    'SOCATOTS is the world’s first toddler football program built on the Early Years Foundation Stage framework, the same framework that shapes early-years education itself.',
    'It is not football training in any competitive sense. Football is simply the medium: a ball is engaging, and chasing one teaches balance, coordination and spatial awareness better than almost anything else at this age.',
    'Sessions are designed by EYFS specialists and run in a safe, unhurried environment. Parents stay close, nobody is pushed, and the only measure of a good session is whether a child left it more confident than they arrived.',
  ],
  highlight:
    'The only measure of a good session is whether a child left it more confident than they arrived.',
  outcomes: [
    'Balance, coordination and early motor control',
    'Spatial awareness and confident movement',
    'Listening, turn-taking and following simple instructions',
    'Social confidence around other children',
    'A warm, unpressured first experience of sport',
  ],
  batches: null,
  coaches: [],
  gallery: [],
  cta: { label: 'Enquire about this program', kind: 'enquire' },
  metaDescription:
    "SOCATOTS in Bengaluru. The world's first EYFS-based toddler football program for ages 6 months to 5 years, developing balance, coordination and early confidence.",
}
