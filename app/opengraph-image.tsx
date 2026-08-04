import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const alt = 'True Sport: Find the sport that fits your child.'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  return ogCard({
    eyebrow: 'Sports for all · Bengaluru',
    title: 'Find the sport that fits your child.',
    tag: 'Since 2009',
  })
}
