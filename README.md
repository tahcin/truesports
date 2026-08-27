# True Sport website

Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript. No CMS yet.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build. All routes prerender static
npm run lint
```

---

## Where content lives

**All copy is in `/content`. None of it is inside components.** This is the discipline that
keeps a CMS migration cheap later. See `../STACK.md`.

```
content/
  site.ts              nav, contact details, partners  ⚠️ placeholders
  home.ts              hero, stats, positioning, testimonials  ⚠️ placeholder quotes
  about.ts             vision, mission, story, team
  programs/
    index.ts           display order + lookup helpers
    *.ts               one file per program (becomes one CMS document later)
types/program.ts       THE CONTRACT. A CMS schema mirrors this exactly
```

Adding a program: create the content file, add it to `programs` in `index.ts`. The page, the
OG card and the sitemap entry all follow automatically.

---

## Two things that will bite you

### 1. The font is NOT self-hosted, on purpose

Satoshi (Fontshare) is **free for commercial use**. No licence to buy. But ITF does not permit
self-hosting the webfont without written consent, so it loads from the Fontshare API via a
stylesheet link in `app/layout.tsx`, not `next/font/local`.

That costs us `next/font`'s self-hosting benefit and one extra origin, mitigated with
`preconnect`. If you want the performance back, request written consent from ITF and convert
`lib/fonts.ts` to a normal `localFont()` call.

### 2. Satori will not take a variable font

`ImageResponse` (OG cards) throws `Cannot read properties of undefined (reading '256')` if you
hand it a variable font. `lib/og.tsx` fetches **static** weight cuts (500 and 700) from the
Fontshare CDN at build time. Satori also has **no system fonts at all**. A CSS stack like
`system-ui, sans-serif` silently renders as a generic fallback instead of erroring, so every
face used in a card must be registered as a buffer.

Fonts are fetched rather than vendored because the ITF licence permits use but not
redistribution of the files. **This means the production build needs network access.**

---

## Nullable content is load-bearing

`ageGroup: null`, `batches: null` and `gallery: []` are the **real** state of
Brazilian Soccer School and SOCATOTS. Not hypothetical edge cases. There isn't one action shot
in the whole asset library (`../../04-assets/ASSET-AUDIT.md`), so:

- Nothing renders a blank box. Missing data becomes an `EnquirePanel` with a next step.
- A null `ageGroup` renders **"Age group TBC"** on-site, and **no tag at all** on the OG card,
  never an invented range, and never an internal marker leaked into a shared link.
- Coaches without headshots get a typographic initials tile. Only 2 of 7 staff have photos.
- `/programs/brazilian-soccer-school` is the page to check after any template change. If it
  still looks deliberate rather than unfinished, the template holds.

---

## Before launch

> ⚠️ **The on-page warning banners have been removed.** Placeholder content no longer flags
> itself in the browser, so this list is now the only guard. Work through it before the site
> goes live or is shown to the client as finished.

- [ ] **Replace the invented testimonials** in `content/home.ts`. They render on the homepage
      completely unlabelled now. Publishing fabricated parent quotes for a real children's
      sports business is dishonest and a genuine liability. `testimonials.isPlaceholder` is still
      `true` in the content file, so `grep isPlaceholder` finds them.
- [ ] Replace **all** placeholder contact details in `content/site.ts`, phone, WhatsApp number,
      email, address, hours, socials
- [ ] Wire up the enquiry form. It currently hands off to WhatsApp because no endpoint has been
      chosen (`components/enquiry-form.tsx`)
- [ ] Set the real domain in `content/site.ts` → `url` (OG images need absolute URLs)
- [ ] Point the `/contact` map at the real address (swap the `q=` parameter). It is currently
      centred on Bengaluru city.
- [ ] Test WhatsApp link previews by hand, **there is no WhatsApp debugger**, and it's the
      client's primary conversion channel
- [ ] Confirm photo consent for the children in `public/photos`
- [ ] Add Savya Fit screenshots. That section has no imagery and no longer says so on the page.

---

## Performance

We chose Next.js over Astro knowing Astro's zero-JS baseline is lighter. The mitigations are
non-optional:

- **Only two client components exist**, `mobile-nav.tsx` and `enquiry-form.tsx`. Keep it that way.
- Everything else is a React Server Component.
- All 23 routes prerender static. Nothing is server-rendered at request time.
- Images go through `next/image` **with an explicit `sizes`**, omit it and a 40px logo
  downloads at 3840px.
- Add an asset request: the client's **original vector logos**. Everything in `public/brand` is
  raster recovered from the pitch deck.

Current client JS: ~192 KB gzipped across all chunks, essentially all React + Next runtime.
