import type { TeamMember } from './about'

/**
 * Our Coaches page content.
 *
 * The two football head coaches moved here from the About page team list
 * (client instruction, 2026-08-11: About keeps leadership only). Their bios
 * are the client's own text.
 */
export const coachesHero = {
  eyebrow: 'Our people',
  headline: 'The Team',
  lede: 'FIG international diplomas, SAI certification, AIFF licences, national medalists and Khelo India officials. Qualification is our baseline, not our headline.',
}

export const featuredCoaches: TeamMember[] = [
  {
    name: 'Coach Brijesh Sagar',
    role: 'Head Coach, Football',
    photo: '/photos/coach-brijesh-sagar.jpg',
    /** Portrait: face sits in the top quarter, keep the crop high. */
    photoPosition: 'center 18%',
    bio: "AIFF 'C' Licensed coach and qualified Strength & Conditioning Specialist with nearly a decade of coaching since 2016. Trained under the Brazilian Soccer Tots & School coaching camps and founder of Tiny Kicks Academy, a grassroots initiative starting from age three.",
  },
  {
    name: 'Coach Prajwal A S',
    role: 'Head Coach, Football',
    photo: '/photos/coach-prajwal-a-s.jpg',
    /** Full-body action shot: face is around a quarter of the way down. */
    photoPosition: 'center 22%',
    bio: "AIFF 'D' Licensed coach and Strength & Conditioning Specialist from Hubli. Selected for the India Senior Camp, a two-time national medalist who has represented Karnataka across age groups and competed in the Super Division League for three seasons.",
  },
]

export type RosterMember = {
  name: string
  role: string
}

/**
 * The Aerial Zone gymnastics staff, transcribed from the client's ID-card
 * sheet (supplied 2026-08-11). The card photos are ID thumbnails, not usable
 * web assets, so the page renders typographic initials tiles.
 *
 * R. Chethan is on the card sheet too but stays on the About page
 * (leadership). Card order preserved.
 *
 * ⚠️ Spellings to confirm with the client, the card print is small:
 * "Anita K T", "K Shree Raksha", "Shivaraj N A", "Aagneya S Viswanath".
 */
export const gymnasticsTeam: RosterMember[] = [
  { name: 'Adhil A', role: 'Coach, Gymnastics' },
  { name: 'Anita K T', role: 'Coach, Gymnastics' },
  { name: 'Gowtham', role: 'Coach, Gymnastics' },
  { name: 'Kiran', role: 'Coach, Gymnastics' },
  { name: 'K Shree Raksha', role: 'Coach, Gymnastics' },
  { name: 'Roopesh', role: 'Coach, Gymnastics' },
  { name: 'Shivaraj N A', role: 'Coach, Gymnastics' },
  { name: 'Sabarinath', role: 'Coach, Gymnastics' },
  { name: 'Shivaji', role: 'Coach, Gymnastics' },
  { name: 'Sowmya', role: 'Administration' },
  { name: 'Shivakumar', role: 'Coach, Gymnastics' },
  { name: 'Soorya Raj S', role: 'Coach, Gymnastics' },
  { name: 'Aagneya S Viswanath', role: 'Coach, Gymnastics' },
  { name: 'Shivananda R', role: 'Coach, Gymnastics' },
]
