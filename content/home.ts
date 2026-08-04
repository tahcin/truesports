/**
 * Home page copy.
 *
 * Vision and mission lines are DRAFTED BY US from the client's own materials
 * and are pending client sign-off. See 02-brief/draft-copy.md.
 */

/**
 * The home headline must NOT repeat the vision statement on /about
 * ("Every child, playing."). Both pages carried the same line for a while,
 * which weakened each of them. The vision belongs on About; the home hero
 * answers a parent's actual first question instead, which is the deck's
 * "Parental Confusion" pain point: they cannot tell which sport suits their
 * child, or who to trust with them.
 */
export const hero = {
  headline: 'Find the sport that',
  headlineEmphasis: 'fits your child.',
  sub: 'Certified coaching in gymnastics, football, basketball and swimming. At our centre, in your school, or inside your community.',
  primaryCta: { label: 'Book a free trial', href: '/contact' },
  secondaryCta: { label: 'Explore programs', href: '/programs' },
}

export const stats = [
  { value: '20+', label: 'Years in grassroots sport' },
  { value: '1000s', label: 'Of children trained' },
  { value: '10', label: 'Partner schools' },
  { value: '20+', label: 'Partner institutions' },
]

export const positioning = {
  eyebrow: 'Why we exist',
  quote: "Good coaching shouldn't be a privilege. We build the athlete,",
  quoteEmphasis: 'and the person.',
  body: "Parents tell us the same three things: they can't find structured programs run by people who are actually qualified, they worry about safety, and they have no idea where any of it leads. We built True Sport to answer all three.",
  points: [
    {
      title: 'Certified coaches, not enthusiasts',
      detail: "FIG Level 1–3, NS-NIS 'A' Grade, AIFF licensed, Khelo India officials.",
    },
    {
      title: 'Development before results',
      detail: 'Coordination, confidence and discipline first. The medals follow.',
    },
    {
      title: 'A real pathway',
      detail: 'Our own registered club, affiliated with the State Sports Association.',
    },
    {
      title: 'We come to you',
      detail: 'Our centre, your school, or your residential community.',
    },
  ],
}

/**
 * Real Google reviews of the Aerial Zone centre (client instruction: use the
 * Google Maps listing's reviews as testimonials). Wording lightly edited for
 * grammar; verify against the live listing before launch. Details in
 * 02-brief/draft-copy.md.
 */
export const testimonials = {
  isPlaceholder: false,
  items: [
    {
      quote:
        'The coaches are fantastic, providing individual attention to trainees. The facilities are top-notch.',
      name: 'Manolina D',
    },
    {
      quote:
        'A very good gymnastics centre in Bangalore. My daughter is learning very good skills every day.',
      name: 'Manjushree R',
    },
    {
      quote:
        'Well-trained coaches and a spacious facility with every apparatus. The most accessible place in South Bangalore.',
      name: 'Arpitha D',
    },
  ],
}

export const closing = {
  headline: 'The first session is free.',
  body: "Tell us your child's age and what they enjoy. We'll suggest where to start. No pressure, no commitment.",
}
