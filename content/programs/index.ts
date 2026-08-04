import type { Program } from '@/types/program'
import { aerialZoneCentre } from './aerial-zone-centre'
import { aerialZoneSchools } from './aerial-zone-schools'
import { truesportFootball } from './truesport-football'
import { truesportBasketball } from './truesport-basketball'
import { brazilianSoccerSchool } from './brazilian-soccer-school'
import { socatots } from './socatots'

/** Display order across the hub, the home grid and the footer. */
export const programs: Program[] = [
  aerialZoneCentre,
  aerialZoneSchools,
  truesportFootball,
  truesportBasketball,
  brazilianSoccerSchool,
  socatots,
]

export const getProgram = (slug: string): Program | undefined =>
  programs.find((p) => p.slug === slug)

export const programSlugs = programs.map((p) => p.slug)

/**
 * Savya Fit is listed alongside the programs but is a technology product,
 * not a coaching program, so it gets its own page and template.
 * See 02-brief/website-requirements.md §2.5.
 */
export const savyaFit = {
  slug: 'savya-fit',
  name: 'Savya Fit',
  summary:
    'Our own platform. Fitness assessments, body composition and BMI tracking, so progress is measured, not guessed.',
  href: '/programs/savya-fit',
} as const
