/**
 * ─────────────────────────────────────────────────────────────────────────
 * TYPEFACE: Satoshi (Indian Type Foundry, via Fontshare)
 *
 * ✅ LICENCE RESOLVED. The ITF Free Font License permits personal AND
 * commercial use with no attribution required. This removes the PP Editorial
 * launch blocker entirely. Nothing needs to be bought before going live.
 *
 * ⚠️ ONE CONDITION: ITF does not permit self-hosting the webfont without
 * their written consent. They ask that you load it from the Fontshare API.
 * That is why this is NOT `next/font/local` with vendored .woff2 files, which
 * is what we would normally do. The stylesheet link lives in app/layout.tsx.
 *
 * Trade-off we accepted: we lose next/font's self-hosting benefit and take
 * one extra origin on the critical path, mitigated with preconnect. If the
 * client would rather have the perf, request written consent from ITF. They
 * generally grant it, and this file becomes a normal localFont() call.
 *
 * Satoshi covers BOTH display and body, so contrast comes from weight and
 * size rather than a second family. That satisfies the client's "maximum two
 * font families" rule with room to spare.
 * ─────────────────────────────────────────────────────────────────────────
 */

/**
 * Weights actually used: 300 Light (big display), 400 Regular (body),
 * 500 Medium (headings, emphasis), 700 Bold (micro-labels).
 *
 * No italic. The design deliberately uses weight and colour for emphasis
 * instead, so weight 401 is NOT requested. That's one fewer file to download.
 */
export const FONTSHARE_CSS =
  'https://api.fontshare.com/v2/css?f%5B%5D=satoshi@300,400,500,700&display=swap'

/** Satori needs a real font buffer and cannot fetch CSS. See lib/og.tsx. */
export const SATOSHI_TTF = {
  medium:
    'https://cdn.fontshare.com/wf/P2LQKHE6KA6ZP4AAGN72KDWMHH6ZH3TA/ZC32TK2P7FPS5GFTL46EU6KQJA24ZYDB/7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP.ttf',
  bold: 'https://cdn.fontshare.com/wf/LAFFD4SDUCDVQEXFPDC7C53EQ4ZELWQI/PXCT3G6LO6ICM5I3NTYENYPWJAECAWDD/GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR.ttf',
} as const
