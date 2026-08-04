import { ImageResponse } from 'next/og'
import { SATOSHI_TTF } from './fonts'

/**
 * Typographic OG cards, with no photography.
 *
 * At WhatsApp thumbnail size a dusk photo of forty kids is an unreadable
 * smudge, and two of our programs have no photos at all. Type reads at any
 * size. See 05-design/design-direction.md §7.
 *
 * WhatsApp constraints (it is the fussiest scraper and our primary channel):
 *   • 1200×630, PNG, not WebP, scraper support is patchy
 *   • keep the file small; heavy images fall back to a tiny thumbnail
 *   • important text stays in the middle ~80%, platforms crop edges differently
 */
export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

const CREAM = '#FFFCF5'
const INK = '#241F21'
const INK_SOFT = '#5A5457'
const GREEN = '#2E7D38'
const ORANGE = '#F5911F'
const AZ_PURPLE = '#704596'

/**
 * Satori (which powers ImageResponse) has NO system fonts. A CSS stack like
 * `system-ui, sans-serif` silently renders as a generic fallback rather than
 * erroring. Every face used in a card must be supplied as a real buffer.
 *
 * Fonts are FETCHED AT BUILD TIME from the Fontshare CDN rather than vendored
 * into the repo, because ITF's licence permits use but not redistribution of
 * the font files. Embedding glyphs in a generated PNG is use, not
 * redistribution.
 *
 * ⚠️ Satori cannot parse VARIABLE fonts. It throws
 * `Cannot read properties of undefined (reading '256')`. Both URLs below point
 * at STATIC weight cuts. Do not swap them for a variable file.
 *
 * ⚠️ This makes the production build require network access.
 */
let cachedFonts: { medium: ArrayBuffer; bold: ArrayBuffer } | null = null

async function loadFonts() {
  if (!cachedFonts) {
    const [medium, bold] = await Promise.all([
      fetch(SATOSHI_TTF.medium).then((r) => r.arrayBuffer()),
      fetch(SATOSHI_TTF.bold).then((r) => r.arrayBuffer()),
    ])
    cachedFonts = { medium, bold }
  }
  return cachedFonts
}

const FONT = 'Satoshi'

export async function ogCard({
  title,
  eyebrow,
  tag,
  accent,
}: {
  title: string
  eyebrow: string
  tag?: string | null
  accent?: 'aerial-zone' | null
}) {
  const tagColor = accent === 'aerial-zone' ? AZ_PURPLE : GREEN
  const fonts = await loadFonts()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: CREAM,
          padding: '72px 80px',
          fontFamily: FONT,
        }}
      >
        {/* top: the orange rule + eyebrow */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: 72, height: 5, background: ORANGE, marginBottom: 28 }} />
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: INK_SOFT,
              fontFamily: FONT,
              fontWeight: 700,
            }}
          >
            {eyebrow}
          </div>
        </div>

        {/* middle: the title, kept well inside the safe area */}
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 42 ? 68 : 86,
            lineHeight: 1.05,
            letterSpacing: -3,
            fontWeight: 500,
            color: INK,
            maxWidth: 940,
          }}
        >
          {title}
        </div>

        {/* bottom: wordmark + optional tag */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, color: INK }}>
              True
              <span style={{ color: GREEN }}>Sport</span>
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 18,
                letterSpacing: 2.5,
                textTransform: 'uppercase',
                color: INK_SOFT,
                fontFamily: FONT,
                fontWeight: 500,
              }}
            >
              sports for all
            </div>
          </div>

          {tag && (
            <div
              style={{
                display: 'flex',
                fontSize: 20,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: tagColor,
                border: `2px solid ${tagColor}`,
                borderRadius: 4,
                padding: '10px 18px',
                fontFamily: FONT,
                fontWeight: 700,
              }}
            >
              {tag}
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: FONT, data: fonts.medium, style: 'normal', weight: 500 },
        { name: FONT, data: fonts.bold, style: 'normal', weight: 700 },
      ],
    }
  )
}
