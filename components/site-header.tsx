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
              one entry that expands, because it fans out to six pages. */}
          <nav className="hidden items-center gap-8 text-[0.9375rem] text-ink-soft md:flex">
            {site.nav.map((item) =>
              item.href === '/programs' ? (
                <ProgramsMenu key={item.href} label={item.label} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative py-1 transition-colors hover:text-ink"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-orange transition-[width] duration-250 group-hover:w-full" />
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
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
