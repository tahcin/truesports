import Image from 'next/image'

/**
 * The leaping figure from the True Sport logo, abstracted into pure geometry.
 *
 * This is the photo-independence principle made concrete: it gives the hero
 * brand presence and motion without needing a photograph, which matters,
 * because there isn't a single action shot in the asset library.
 * See 04-assets/ASSET-AUDIT.md.
 */
export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 480" fill="none" aria-hidden className={`text-orange ${className}`}>
      {/* the sweep: two arcs echoing the logo's motion lines */}
      <path
        d="M104 128C96 300 190 420 372 440"
        stroke="currentColor"
        strokeWidth="22"
        strokeLinecap="round"
        opacity="0.22"
      />
      <path
        d="M164 92C132 258 206 376 348 410"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        opacity="0.16"
      />
      {/* reaching arm */}
      <path
        d="M186 250C214 158 270 108 332 82"
        stroke="currentColor"
        strokeWidth="27"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* trailing arm */}
      <path
        d="M238 226C246 176 258 146 272 124"
        stroke="currentColor"
        strokeWidth="18"
        strokeLinecap="round"
        opacity="0.34"
      />
      {/* the ball */}
      <circle cx="360" cy="80" r="42" fill="currentColor" opacity="0.88" />
    </svg>
  )
}

/**
 * The real client logo. Sourced from the pitch deck at 1742×847 and processed
 * to a transparent PNG (03-brand/logos → public/brand).
 *
 * `onDark` swaps to a variant where the near-black "sports for all" tagline is
 * recoloured to cream. On the ink footer the original simply disappears.
 *
 * ⚠️ These are RASTER. Ask the client for the original vector (SVG/AI). It
 * would render sharper at every size and give us a proper favicon.
 */
export function Logo({
  onDark = false,
  className = '',
  priority = false,
  sizes = '200px',
}: {
  onDark?: boolean
  className?: string
  priority?: boolean
  /** Without this next/image requests a 3840px file for a 40px logo. */
  sizes?: string
}) {
  return (
    <Image
      src={onDark ? '/brand/truesport-on-dark.png' : '/brand/truesport.png'}
      alt="True Sport, sports for all"
      width={1554}
      height={779}
      priority={priority}
      sizes={sizes}
      className={`w-auto ${className}`}
    />
  )
}
