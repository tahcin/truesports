import Image from 'next/image'
import { partners } from '@/content/site'

/**
 * The real associated-schools logo wall, recovered from the pitch deck and
 * knocked out to transparency.
 *
 * ⚠️ It is a single FLAT COMPOSITE, not individual logo files. That means we
 * can't lay them out responsively, can't control spacing, and can't add or
 * remove a school without editing the image. The alt text carries the school
 * names for accessibility and SEO, since per-logo alt text is impossible.
 *
 * ASK THE CLIENT for individual school logo files. Then this becomes a proper
 * responsive grid and the composite goes away.
 */
export function PartnerWall() {
  return (
    <div className="border border-hairline bg-cream p-6 sm:p-10">
      <Image
        src="/brand/partner-schools.png"
        alt={`Partner schools: ${partners.slice(0, 9).join(', ')}`}
        width={822}
        height={626}
        sizes="(max-width: 768px) 100vw, 720px"
        className="mx-auto h-auto w-full max-w-[42rem]"
      />
    </div>
  )
}
