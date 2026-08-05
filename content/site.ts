/**
 * Site-wide configuration.
 *
 * Contact details confirmed by the client on 2026-08-05 (see 02-brief/company-brief.md §4b).
 * Remaining TBC: email address and centre hours.
 */

export const site = {
  name: 'True Sport',
  legalName: 'True Sport Solutions Pvt. Ltd.',
  tagline: 'Sports for all',
  platformLine: 'One platform. Every sport. Every age.',

  // Custom domain (truesportsolutions.in) not bought/connected yet; absolute
  // URLs (OG image, sitemap, canonicals) must resolve or link previews break.
  url: 'https://truesportsolutions.vercel.app',

  description:
    'Certified coaching in gymnastics, football, basketball and swimming for children in Bengaluru. At our centre, in your school, or inside your community.',

  founded: 2009,
  city: 'Bengaluru',

  contact: {
    phone: '+91 89047 28080',
    phoneHref: 'tel:+918904728080',
    whatsapp: '918904728080',
    /** TBC: email not confirmed yet; proposed on the confirmed domain. */
    email: 'hello@truesportsolutions.in',
    address: {
      line1: '10, Aerial Zone - School of Gymnastics, FITON, Kembathalli Main Rd',
      locality: 'Opp. HIM Sree Bayalu Anjaneya Swamy Temple, South Avenue, Gottigere',
      city: 'Bengaluru',
      region: 'Karnataka',
      postalCode: '560083',
      country: 'IN',
    },
    mapsUrl: 'https://maps.app.goo.gl/CW1iGmUYy2iSss3SA',
    /** TBC: centre hours not confirmed. */
    hours: 'Mon–Sat, [hours TBC]',
  },

  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/aerialzonegymnastics' },
    { label: 'Facebook', href: 'https://share.google/qasozU5XMSMYBMAQm' },
  ],

  nav: [
    { label: 'Programs', href: '/programs' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
} as const

export const whatsappHref = (message = "Hi! I'd like to book a free trial for my child.") =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`

/** Partner schools and communities. Real names from the pitch deck. */
export const partners = [
  'Skalvi International School',
  'Jain Public School',
  'Delhi Public School',
  'The Brigade Schools',
  'Glentree Academy',
  'Aradhana Academy',
  'Bloom Montessori',
  'Praniti',
  'Abheek',
  'L&T South City',
  'Gopalan Olympia',
] as const
