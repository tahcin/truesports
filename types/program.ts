/**
 * THE CONTENT CONTRACT.
 *
 * A CMS schema added later mirrors this file exactly, so migrating means
 * swapping the data source, not rewriting pages. See 06-build/STACK.md.
 *
 * NULLABLE FIELDS ARE LOAD-BEARING. `ageGroup: null`, `batches: null` and
 * `gallery: []` are the real content state of Brazilian Soccer School and
 * SOCATOTS today, not hypothetical edge cases. Every component MUST render
 * deliberately when they are empty. That is the photo-independence principle
 * enforced by the type system instead of by memory.
 */

export type Batch = {
  label: string
  ages?: string
  days: string
  time: string
  location?: string
}

export type Coach = {
  name: string
  role: string
  credentials: string
  /** null → renders initials in a typographic tile. */
  photo: string | null
  /** CSS object-position for the circular crop, when the face isn't centred. */
  photoPosition?: string
}

export type GalleryImage = {
  src: string
  alt: string
  orientation: 'portrait' | 'landscape'
}

export type Program = {
  slug: string
  name: string
  /** Short form for nav, cards and breadcrumbs. */
  shortName: string
  /** Sub-brand line, e.g. "Flip. Fly. Fun." */
  tagline: string | null
  /** null → renders "Age group TBC" rather than an invented range. */
  ageGroup: string | null
  sport: string
  /** Drives CTA wording and page emphasis. */
  audience: 'parents' | 'schools'
  /** One line, used on cards and the hub. */
  summary: string
  /** 2–3 short paragraphs. */
  overview: string[]
  /**
   * One sentence lifted from `overview`, promoted to a pull-quote in the
   * Overview aside. Never write new copy here: it is a promotion of existing
   * words, not an extra claim.
   *
   * null → the aside falls back to the lead gallery image, and collapses
   * entirely if there is no image either.
   */
  highlight: string | null
  outcomes: string[]
  /** null → renders "Enquire for details" instead of an empty table. */
  batches: Batch[] | null
  coaches: Coach[]
  /** [] must render cleanly. Most programs have no photos. */
  gallery: GalleryImage[]
  /** Contained sub-brand accent. Never becomes page chrome. */
  accent: 'aerial-zone' | null
  /**
   * Official sub-brand logo, transparent PNG. null → the page falls back to
   * type alone. This is how Brazilian Soccer School and SOCATOTS get real
   * visual identity despite having zero photographs.
   */
  logo: { src: string; width: number; height: number } | null
  cta: { label: string; kind: 'trial' | 'partner' | 'enquire' }
  metaDescription: string
}
