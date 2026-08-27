import type { Program } from '@/types/program'

export const truesportFootball: Program = {
  slug: 'truesport-academy-football',
  name: 'Truesport Academy: Football',
  shortName: 'Football',
  tagline: 'Grassroots to competitive.',
  // Not supplied by the client, so this renders "Age group TBC" rather than an invented range.
  ageGroup: null,
  sport: 'Football',
  audience: 'parents',
  accent: null,
  logo: null,
  summary:
    'Grassroots to competitive, coached inside your community, with quarterly tournaments and a genuine route into club football.',
  overview: [
    'We coach football where your child already lives. Sessions run inside residential communities, so there is no traffic, no driving across the city, and no evening logistics. They walk down and play.',
    'The coaching is not casual. Our football staff hold AIFF licences and strength-and-conditioning certifications, and sessions are structured, age-appropriate and goal-oriented. Quarterly tournaments and practice matches give players real competitive experience.',
    'What sets this apart: True Sport runs its own registered club, affiliated with the State Sports Association. Talented players get access to official club-level tournaments, a pathway an ordinary coaching centre simply cannot offer.',
  ],
  highlight:
    'True Sport runs its own registered club, affiliated with the State Sports Association.',
  outcomes: [
    'Ball mastery, first touch and passing technique',
    'Positional awareness, decision-making and game intelligence',
    'Fitness, agility and age-appropriate strength conditioning',
    'Teamwork, communication and handling both winning and losing',
    'Competitive match experience through quarterly tournaments',
    'A route into official club football via our State Association affiliation',
  ],
  batches: null,
  coaches: [
    {
      name: 'Coach Brijesh Sagar',
      role: 'Head Coach, Football',
      credentials:
        "AIFF 'C' Licensed coach and qualified Strength & Conditioning Specialist, coaching since 2016. Trained under the Brazilian Soccer Tots & School coaching camps. Founder of Tiny Kicks Academy. Represented Mysore University at South Zone Inter-University level and competed in the Super Division League.",
      photo: '/photos/coach-brijesh-sagar.jpg',
      photoPosition: 'center 18%',
    },
    {
      name: 'Coach Prajwal A S',
      role: 'Head Coach, Football',
      credentials:
        "AIFF 'D' Licensed coach and Strength & Conditioning Specialist. Selected for the India Senior Camp, two-time national medalist, and has represented Karnataka across multiple age groups. Three seasons in the Super Division League.",
      photo: '/photos/coach-prajwal-a-s.jpg',
      photoPosition: 'center 22%',
    },
  ],
  gallery: [
    { src: '/photos/football-u7-lineup-front.jpg', alt: 'Young True Sport footballers lined up on the pitch, waving', orientation: 'landscape' },
    { src: '/photos/football-medals-ceremony.jpg', alt: 'Young players with medals and certificates after a True Sport tournament', orientation: 'landscape' },
    { src: '/photos/football-match-action.jpg', alt: 'Junior footballers chasing the ball mid-match', orientation: 'portrait' },
    { src: '/photos/football-medals-goalpost.jpg', alt: 'Medal ceremony at the goalpost after a junior tournament', orientation: 'landscape' },
    { src: '/photos/football-u12-team-lineup-turf.jpg', alt: 'True Sport junior team lined up on a green turf pitch', orientation: 'landscape' },
    { src: '/photos/community-football-group.jpg', alt: 'Families and players at a community football session', orientation: 'landscape' },
  ],
  cta: { label: 'Book a free trial', kind: 'trial' },
  metaDescription:
    'Structured football coaching inside Bengaluru residential communities. AIFF-licensed coaches, quarterly tournaments, and a pathway into official club football.',
}
