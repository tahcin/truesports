import Link from 'next/link'
import { site } from '@/content/site'
import { Logo } from './brand-mark'
import { HeaderChrome } from './header-chrome'
import { MobileNav } from './mobile-nav'
import { ProgramsMenu } from './programs-menu'
import { Button, Container } from './ui'

/**
 * Sticky header with "Book a Trial" always visible. A client hard
 * requirement (02-brief/website-requirements.md §3).
 *
 * NO `backdrop-blur` here, deliberately. An element with `backdrop-filter`
 * becomes a CONTAINING BLOCK for its fixed-position descendants, which
 * collapsed the fixed mobile menu panel (top-[72px] bottom-0) to a 33px
 * sliver, so the menu looked transparent. Solid background also skips an
 * expensive per-frame paint on mobile.
 *
 * This component stays a SERVER component. The scroll-reactive <header>
 * element lives in HeaderChrome and takes this markup as children, so none of
 * the logo, nav or CTA is shipped to the browser.
 */
export function SiteHeader() {
  return (
    <HeaderChrome>
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 md:h-[72px] md:gap-6">
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
            <Logo priority className="h-10 sm:h-12" />
          </Link>

          {/* Order and labels stay driven by content/site.ts. Programs is the
              one entry that expands, because it fans out to six pages.
              Five entries no longer fit beside two buttons at md, so the
              full nav starts at lg and tablets keep the hamburger.

              ⚠️ No whitespace-nowrap on this <nav>: the Programs panel
              renders inside it and inherits it, which stops the program
              summaries wrapping. Nowrap lives on the links themselves. */}
          <nav className="hidden items-center gap-6 text-[0.9375rem] text-ink-soft lg:flex xl:gap-8">
            {site.nav.map((item) =>
              item.href === '/programs' ? (
                <ProgramsMenu key={item.href} label={item.label} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative whitespace-nowrap py-1 transition-colors hover:text-ink"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-orange transition-[width] duration-250 group-hover:w-full" />
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            {/* Distinct Aerial Zone button: the sub-brand's own website, in
                its own purple, so it never reads as part of True Sport nav.
                Hidden on phones; the mobile menu carries its own entry. */}
            <a
              href={site.aerialZone.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-11 items-center whitespace-nowrap rounded-sm bg-az-red px-5 py-3 text-[0.9375rem] font-semibold text-cream transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_20px_-10px_rgba(237,51,56,0.6)] md:inline-flex"
            >
              {site.aerialZone.label}
            </a>
            <Button href="/contact" className="max-sm:px-4 max-sm:py-2.5 max-sm:text-sm">
              Book a Trial
            </Button>
            <MobileNav />
          </div>
        </div>
      </Container>
    </HeaderChrome>
  )
}
