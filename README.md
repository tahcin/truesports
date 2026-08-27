# True Sport website

The public site for **True Sport Solutions Pvt. Ltd.**, Bengaluru: certified coaching in
gymnastics, football, basketball and swimming for children, delivered at the Aerial Zone
centre, in partner schools and inside residential communities.

Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript. All routes prerender static.

The full owner's guide (Google Sheets enquiries, Vercel deployment, domain setup, WhatsApp
lead capture) is **[HANDOVER.pdf](HANDOVER.pdf)** at the root of this repository.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (needs network: the typeface loads from Fontshare)
```

## Editing content

All copy lives in `/content` as typed files; components never contain copy.

```
content/
  site.ts          nav, contact details, social links, partners
  home.ts          hero, stats, positioning, testimonials (real Google reviews)
  about.ts         vision, mission, story, founder, leadership
  coaches.ts       team page roster
  gallery.ts       gallery page photos and captions
  programs/*.ts    one file per program
types/program.ts   the contract every program file follows
```

Adding a program: create its content file and register it in `content/programs/index.ts`;
the page, OG card and sitemap entry follow automatically. Photos live in `public/photos/`
(gallery additions in `public/photos/gallery/`).

## Enquiries

The contact form posts to `/api/enquiry`, which forwards each enquiry to a Google Apps
Script webhook that appends a row to the enquiries spreadsheet. Setup instructions and the
script are in [`google-sheet-webhook/`](google-sheet-webhook/); the site reads the webhook
address from a `SHEET_WEBHOOK_URL` environment variable (locally in `.env.local`, on Vercel
in project settings). If the variable is unset the form falls back to WhatsApp, so no lead
is lost.

## Notes

- Satoshi loads from the Fontshare API; its free commercial licence does not permit
  self-hosting the files. OG cards fetch static weight cuts at build time.
- Missing data renders deliberately: null batches become "Enquire for details", empty
  galleries collapse, and coaches without headshots get typographic initials tiles.
- Images always go through `next/image` with an explicit `sizes` attribute.

---

Built by [Priyanshi](https://www.linkedin.com/in/priyanshisharma20/) and
[Tahcin](https://www.linkedin.com/in/tahcinsarwar/) as a BBA (Digital Business &
Entrepreneurship) live project, 2026.
