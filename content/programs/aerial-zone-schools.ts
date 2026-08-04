import type { Program } from '@/types/program'

export const aerialZoneSchools: Program = {
  slug: 'aerial-zone-school-programs',
  name: 'Aerial Zone: School Programs',
  shortName: 'Aerial Zone Schools',
  tagline: 'Gymnastics, inside your campus.',
  ageGroup: 'For schools & institutions',
  sport: 'Gymnastics',
  audience: 'schools',
  accent: 'aerial-zone',
  logo: { src: '/brand/aerial-zone.png', width: 1234, height: 433 },
  summary:
    'Curriculum-based and after-school gymnastics, delivered inside your campus by certified coaches.',
  overview: [
    'We bring structured gymnastics into schools, either as part of the PE curriculum, as an after-school program, or both. Your students get professional coaching without leaving campus.',
    'Our coaches hold FIG international diplomas and SAI certification, and our Head of Operations previously ran gymnastics across every campus of the Vibgyor group. We know how school programs actually work: timetables, safety compliance, equipment, and reporting to parents.',
    'Ten schools currently run Aerial Zone programs. Fewer than twenty schools in all of Bengaluru have access to professional gymnastics coaching, in a city with over 30 lakh school-going children.',
  ],
  highlight: 'Ten schools currently run Aerial Zone programs.',
  outcomes: [
    'A structured, progressive gymnastics curriculum mapped to age groups',
    'FIG-certified and SAI-certified coaching staff',
    'Equipment and safety standards handled by us',
    'Physical literacy that supports every other sport on your timetable',
    'A differentiated PE offering few schools in the city can match',
  ],
  pricing: {
    tiers: [{ label: 'Annual program', detail: 'Per child, per academic year', price: '₹7,000 – ₹14,000' }],
    note: 'Final pricing depends on batch size, session frequency and equipment requirements. Get in touch and we will put together a proposal for your campus.',
  },
  batches: null,
  coaches: [
    {
      name: 'R. Chethan',
      role: 'Head of Operations and Head Coach of Gymnastics',
      credentials:
        "FIG International Diplomas Level 1, 2 and 3. NS-NIS 'A' Grade certified. Former Head of the Gymnastics Department at Vibgyor Group of Schools, managing programs across campuses nationwide.",
      photo: '/photos/team-chethan-r.jpg',
    },
  ],
  gallery: [],
  cta: { label: 'Partner with us', kind: 'partner' },
  metaDescription:
    'Curriculum-based and after-school gymnastics programs for schools in Bengaluru. FIG-certified coaches, equipment and safety handled. Ten partner schools and counting.',
}
