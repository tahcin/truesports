import { getProgram, programs } from '@/content/programs'
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const alt = 'True Sport program'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }))
}

// Next 16: params is a Promise in image generation functions too.
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const program = getProgram(slug)

  if (!program) {
    return ogCard({ eyebrow: 'True Sport', title: 'Every child, playing.' })
  }

  return ogCard({
    eyebrow: `${program.sport} · Bengaluru`,
    title: program.name,
    // null → no tag at all. Never invent an age range on a public card,
    // and never leak an internal "TBC" marker into a shared link preview.
    tag: program.ageGroup,
    accent: program.accent,
  })
}
