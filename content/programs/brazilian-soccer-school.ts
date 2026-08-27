import type { Program } from '@/types/program'

/**
 * ⚠️ THE HARD CASE. This program has NO photos and NO batch data.
 * It is marked "Currently Inactive" in the pitch deck but included in the
 * sitemap per the website guidelines (guidelines are the latest source).
 *
 * If this page looks deliberate rather than unfinished, the template works.
 */
export const brazilianSoccerSchool: Program = {
  slug: 'brazilian-soccer-school',
  name: 'Brazilian Soccer School',
  shortName: 'Brazilian Soccer School',
  tagline: '600% more touches. That is the whole idea.',
  ageGroup: null,
  sport: 'Football',
  audience: 'parents',
  accent: null,
  logo: { src: '/brand/brazilian-soccer-school.png', width: 223, height: 216 },
  summary:
    'World-class technical training. Heavier, low-bounce balls mean 600% more ball contact, and genuine mastery.',
  overview: [
    'Brazilian Soccer School is a licensed methodology built on a single insight: technique comes from repetition, and repetition comes from touching the ball more often.',
    'Sessions use specially made heavier, low-bounce balls. The ball stays on the ground and stays at your feet, which produces roughly 600% more ball contact than a conventional training session. Over months, that difference compounds into control most players never develop.',
    'The result is a technically confident, creative player: comfortable in tight spaces, quick to make decisions, and genuinely ready for advanced levels of the game.',
  ],
  highlight: 'Roughly 600% more ball contact than a conventional training session.',
  outcomes: [
    'Exceptional close control and ball mastery',
    'Confidence receiving and turning under pressure',
    'Faster decision-making in tight spaces',
    'Tactical understanding and game awareness',
    'A technical foundation that transfers to any level of football',
  ],
  batches: null,
  coaches: [
    {
      name: 'Coach Brijesh Sagar',
      role: 'Head Coach, Football',
      credentials:
        "AIFF 'C' Licensed coach and Strength & Conditioning Specialist. Trained under the Brazilian Soccer Tots & School coaching camps, bringing the international methodology directly into grassroots football in India.",
      photo: '/photos/coach-brijesh-sagar.jpg',
      photoPosition: 'center 18%',
    },
  ],
  gallery: [],
  cta: { label: 'Enquire about this program', kind: 'enquire' },
  metaDescription:
    'Brazilian Soccer School in Bengaluru. A licensed technical football methodology using heavier, low-bounce balls for 600% more ball contact and genuine mastery.',
}
