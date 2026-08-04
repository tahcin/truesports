'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { programs, savyaFit } from '@/content/programs'
import { site, whatsappHref } from '@/content/site'
import { metaLine } from './programs-menu'

/**
 * The ONLY client component in the header. Kept deliberately small, because we
 * accepted a JS-weight cost when choosing Next.js over Astro, so client
 * components stay rare and tiny. See 06-build/STACK.md.
 *
 * ⚠️ The panel is `position: fixed`. Do NOT put `backdrop-filter`, `filter` or
 * `transform` on <header>: any of those make it a containing block for fixed
 * descendants, which collapses this panel to a sliver and makes the menu look
 * transparent. That was a real bug, not a hypothetical.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)
  const pathname = usePathname()

  /**
   * Close the menu when the route changes, e.g. the browser back button while
   * the panel is open. Adjusted during render rather than in an effect:
   * `setState` inside an effect body causes a cascading render and is a lint
   * error under React 19. https://react.dev/learn/you-might-not-need-an-effect
   */
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  // lock body scroll while the panel is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px]"
      >
        <span
          className={`block h-[1.5px] w-5 bg-ink transition-transform duration-200 ${
            open ? 'translate-y-[6.5px] rotate-45' : ''
          }`}
        />
        <span
          className={`block h-[1.5px] w-5 bg-ink transition-opacity duration-200 ${
            open ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block h-[1.5px] w-5 bg-ink transition-transform duration-200 ${
            open ? '-translate-y-[6.5px] -rotate-45' : ''
          }`}
        />
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="gutter fixed inset-x-0 bottom-0 top-[64px] z-50 flex flex-col overflow-y-auto border-t border-hairline bg-cream pb-10 pt-4"
        >
          <nav className="flex flex-col">
            {site.nav.map((item) =>
              item.href === '/programs' ? (
                <div key={item.href} className="border-b border-hairline">
                  {/* TWO hit targets, deliberately. The label still navigates
                      to the hub, so expanding never becomes the only way
                      forward and /programs is never stranded. */}
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === item.href ? 'page' : undefined}
                      className={`flex-1 py-5 font-display text-display-m ${
                        pathname === item.href ? 'text-green-deep' : ''
                      }`}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setProgramsOpen((v) => !v)}
                      aria-expanded={programsOpen}
                      aria-controls="mobile-programs"
                      aria-label={
                        programsOpen ? 'Collapse programs list' : 'Expand programs list'
                      }
                      className="-mr-2 flex h-12 w-12 items-center justify-center text-ink-soft"
                    >
                      <svg
                        aria-hidden
                        viewBox="0 0 14 8"
                        className={`h-2 w-3.5 transition-transform duration-250 ${
                          programsOpen ? 'rotate-180' : ''
                        }`}
                      >
                        <path
                          d="M1 1l6 6 6-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {programsOpen && (
                    <ul id="mobile-programs" className="pb-5 pl-4">
                      {programs.map((program) => (
                        <li key={program.slug}>
                          <Link
                            href={`/programs/${program.slug}`}
                            onClick={() => setOpen(false)}
                            className="block border-l border-hairline py-2.5 pl-4"
                          >
                            <span className="font-medium">{program.shortName}</span>
                            <span className="micro mt-0.5 block text-ink-faint">
                              {metaLine(program)}
                            </span>
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href={savyaFit.href}
                          onClick={() => setOpen(false)}
                          className="block border-l border-hairline py-2.5 pl-4"
                        >
                          <span className="font-medium">{savyaFit.name}</span>
                          <span className="micro mt-0.5 block text-ink-faint">
                            Our tracking platform
                          </span>
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={`border-b border-hairline py-5 font-display text-display-m ${
                    pathname === item.href ? 'text-green-deep' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="mt-auto pt-8">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center gap-2 rounded-sm border border-hairline px-5 font-semibold"
            >
              Chat on WhatsApp
            </a>
            <p className="mt-4 text-[0.8125rem] text-ink-faint">
              {site.tagline} · Since {site.founded} · {site.city}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
