/**
 * About page copy.
 *
 * ✍️ Vision, Mission and the "Who we are" opener were DRAFTED BY US from the
 * client's own materials and are PENDING CLIENT SIGN-OFF. These are the
 * company's claims about itself, so they must own the final wording.
 * See 02-brief/draft-copy.md.
 *
 * Team bios below are NOT drafted. They are the client's own text.
 */

export const vision = {
  headline: 'Every child, playing.',
  body: "A future where good coaching isn't a privilege. Where every child, in every school and every neighbourhood, has a sport, a coach they can trust, and a pathway of their own.",
}

export const story = [
  'True Sport began with a small idea: that the athletes who inspire children deserve to be seen. That first project was Sportzdivas, bringing elite women athletes into the limelight, and it set the tone for everything since.',
  "Officially registered in 2009 and working in grassroots sport for over two decades, we've since trained thousands of children across Bengaluru through our gymnastics centre, our partner schools, and the residential communities we coach in every week.",
  "We believe sport isn't only about winning and losing. It's about preparing a child for the future, in far more facets of life than the scoreboard ever shows. That belief is why our programs are built around development rather than results, why our coaches are certified rather than merely enthusiastic, and why we measure a child's progress with real assessment rather than a guess.",
  'Today we coach gymnastics, football, basketball and swimming, from toddlers taking their first steps to competitive athletes chasing a state cap.',
]

export const mission = [
  {
    title: 'Bring the coaching to the child',
    detail:
      'Through our own centre, partner schools, and residential communities, so distance, travel and timing never decide whether a child gets to play.',
  },
  {
    title: 'Coach to a standard, not to a shortcut',
    detail:
      'Every session is led by certified coaches working to international standards, in safe, purpose-equipped environments. Credentials are the baseline, not the boast.',
  },
  {
    title: 'Build the whole child',
    detail:
      "Coordination, confidence, discipline and resilience come first. The medals follow. They're the proof, not the point.",
  },
  {
    title: 'Start early. Build for life',
    detail:
      'Age-appropriate programs from toddlers to teenagers, designed so each stage sets up the next, and the fundamentals transfer to any sport a child chooses later.',
  },
  {
    title: 'Open a real pathway',
    detail:
      'Through our own registered club, affiliated with the State Sports Association, talented players reach official tournaments, a route most coaching centres simply cannot offer.',
  },
]

export const founder = {
  name: 'Dr. Anuradha Namashivaya',
  role: 'Founder',
  photo: '/photos/founder-anuradha.jpg',
  bio: "Elite gymnast, coach, administrator, and now International Technical Official for Artistic Gymnastics with the Indian Gymnastics Association. Dr. Anuradha holds a Master's in Sports Management from AISTS Lausanne, Switzerland, having moved from dentistry into sports management. She is an international judge, Vice President of the Karnataka Gymnastics Association, and General Secretary of the Mysore District Gymnastics Association. A former international gymnast with over 15 years of competition behind her, she has won medals at national and international level including the Miss Fitness World Championships. With 20+ years in sports education and grassroots development, she contributed to drafting Karnataka's sports policy under Rahul Dravid and Prakash Padukone's leadership, and was recently felicitated with the Karnataka State Olympic Association's highest award.",
  highlights: [
    { label: 'From athlete to judge', detail: 'Elite gymnast, coach, administrator and International Technical Official.' },
    { label: 'Academic excellence', detail: "Master's in Sports Management, AISTS Switzerland." },
    { label: 'Two decades of dedication', detail: '20+ years in sports education and grassroots development.' },
    { label: 'Recognised achievement', detail: "Karnataka State Olympic Association's highest award." },
  ],
}

export type TeamMember = {
  name: string
  role: string
  photo: string | null
  /** CSS object-position for the circular crop, when the face isn't centred. */
  photoPosition?: string
  bio: string
}

export const team: TeamMember[] = [
  {
    name: 'Mr. Vijayendra P',
    role: 'Administration',
    photo: '/photos/team-vijayendra-p.jpg',
    bio: 'MBA from the University of Mysore and a results-driven professional with a career spanning over three decades, including 15 years across banking and financial institutions and an entrepreneurial background in hospitality, automobile, real estate and sports. He was part of the Organising Committee of the Commonwealth Games, Delhi 2010.',
  },
  {
    name: 'Mr. R. Chethan',
    /** Title per client instruction, 2026-08-05 (dump/dump.txt). */
    role: 'Head of Operations and Head Coach of Gymnastics',
    photo: '/photos/team-chethan-r.jpg',
    bio: "Over 12 years in gymnastics, and formerly Head of the Gymnastics Department at Vibgyor Group of Schools, managing programs across campuses nationwide. He holds FIG International Diplomas Level 1, 2 and 3 in Men's Artistic Gymnastics and is an NS-NIS 'A' Grade certified coach. A national-level gymnast, state medalist and certified National Judge, he served at Khelo India 2025.",
  },
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
