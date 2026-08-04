import type { Program } from '@/types/program'

export const aerialZoneCentre: Program = {
  slug: 'aerial-zone-centre',
  name: 'Aerial Zone: Centre for Gymnastics',
  shortName: 'Aerial Zone Centre',
  tagline: 'Flip. Fly. Fun.',
  ageGroup: 'Ages 3–15',
  sport: 'Gymnastics',
  audience: 'parents',
  accent: 'aerial-zone',
  logo: { src: '/brand/aerial-zone.png', width: 1234, height: 433 },
  summary:
    'Our own facility. Artistic, rhythmic and acrobatic gymnastics with a clear track from first cartwheel to competition batch.',
  overview: [
    'Aerial Zone is our own gymnastics centre, a purpose-built space with professional apparatus, sprung flooring and safety matting, where passion meets precision.',
    'We coach artistic, rhythmic and acrobatic gymnastics across all skill levels. Every child starts where they are, and the progression is structured: clear levels, real milestones, and a competition batch for those who want to go further.',
    'Around 130 children train with us each month. Most arrive because another parent told them to.',
  ],
  highlight:
    'Around 130 children train with us each month. Most arrive because another parent told them to.',
  outcomes: [
    'Core strength, flexibility and body control',
    'Balance, coordination and spatial awareness',
    'Confidence on professional apparatus: bars, beam, vault and floor',
    'Discipline and focus that carries into the classroom',
    'A structured path from beginner through to competitive gymnastics',
  ],
  // Real published rates from the centre's own fee sheet (04-assets/reference-graphics).
  pricing: {
    tiers: [
      { label: '2 days a week', detail: '8 sessions a month', price: '₹3,800' },
      { label: '3 days a week', detail: '12 sessions a month', price: '₹5,250' },
      { label: '4 days a week', detail: '16 sessions a month', price: '₹6,400' },
      { label: '5 days a week', detail: '20 sessions a month', price: '₹7,000' },
      { label: 'Competition batch', detail: 'For the advanced track', price: '₹7,000', highlight: true },
    ],
    registration: '₹500 one-time registration',
    note: 'Monthly rates, inclusive of 18% GST. Discounted 3-month and 6-month plans are available. Ask us.',
  },
  // Timings not supplied by the client.
  batches: null,
  coaches: [
    {
      name: 'R. Chethan',
      role: 'Head of Operations and Head Coach of Gymnastics',
      credentials:
        "FIG International Diplomas Level 1, 2 and 3 in Men's Artistic Gymnastics. NS-NIS 'A' Grade certified (Sports Authority of India). National-level gymnast, state medalist and certified National Judge who served at Khelo India 2025. Previously Head of Gymnastics at Vibgyor Group of Schools.",
      photo: '/photos/team-chethan-r.jpg',
    },
  ],
  gallery: [
    { src: '/photos/facility-main-hall.jpg', alt: 'The main gymnastics hall at Aerial Zone', orientation: 'portrait' },
    { src: '/photos/facility-apparatus.jpg', alt: 'Parallel bars, vault and landing mats', orientation: 'portrait' },
    { src: '/photos/facility-reception.jpg', alt: 'Aerial Zone reception', orientation: 'portrait' },
  ],
  cta: { label: 'Book a free trial', kind: 'trial' },
  metaDescription:
    'Artistic, rhythmic and acrobatic gymnastics for ages 3–15 at our own Bengaluru centre. FIG-certified coaching, professional apparatus, and a clear path to the competition batch.',
}
