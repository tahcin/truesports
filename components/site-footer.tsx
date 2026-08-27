import Link from 'next/link'
import type { ReactNode } from 'react'
import { site } from '@/content/site'
import { programs, savyaFit } from '@/content/programs'
import { Logo } from './brand-mark'
import { Container, MicroLabel } from './ui'

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream/60">
      <Container>
        {/* Two columns from the very smallest screen, NOT one. Stacked, the
            two link lists ran to 1060px on a 390px phone, which is a mile of
            scrolling for eleven links. The logo and contact blocks span both
            columns; at lg everything flattens into the original four. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-cream/15 py-11 sm:gap-y-10 sm:py-14 lg:grid-cols-4 lg:gap-10">
          <div className="col-span-2 lg:col-span-1">
            <Logo onDark className="h-10 sm:h-11" />
            <p className="mt-4 max-w-[30ch] text-[0.8125rem] leading-relaxed sm:mt-5">
              {site.platformLine}
            </p>
          </div>

          <div>
            <MicroLabel className="mb-3 block text-cream/40 sm:mb-4">Programs</MicroLabel>
            <ul className="text-sm sm:space-y-2.5 sm:text-[0.8125rem]">
              {programs.map((p) => (
                <li key={p.slug}>
                  <FooterLink href={`/programs/${p.slug}`}>{p.shortName}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href={savyaFit.href}>{savyaFit.name}</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <MicroLabel className="mb-3 block text-cream/40 sm:mb-4">Company</MicroLabel>
            <ul className="text-sm sm:space-y-2.5 sm:text-[0.8125rem]">
              <li>
                <FooterLink href="/about">About us</FooterLink>
              </li>
              <li>
                <FooterLink href="/team">Team</FooterLink>
              </li>
              <li>
                <FooterLink href="/gallery">Gallery</FooterLink>
              </li>
              <li>
                <FooterLink href="/programs">All programs</FooterLink>
              </li>
              <li>
                <FooterLink href="/contact">Contact</FooterLink>
              </li>
              <li>
                <FooterLink href="/partner-with-us">Partner with us</FooterLink>
              </li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <MicroLabel className="mb-3 block text-cream/40 sm:mb-4">Get in touch</MicroLabel>
            {/* TBC: placeholder contact details, see content/site.ts */}
            <address className="space-y-2 text-[0.8125rem] not-italic leading-relaxed sm:space-y-2.5">
              <p>{site.contact.phone}</p>
              <p>{site.contact.email}</p>
              <p className="text-cream/40">
                {site.contact.address.line1}
                <br />
                {site.contact.address.city}, {site.contact.address.region}
              </p>
            </address>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-x-3 gap-y-1.5 py-6 text-[0.75rem] sm:py-7">
          <span className="text-cream/35">
            Built by{' '}
            <a
              href="https://www.linkedin.com/in/priyanshisharma20/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-cream"
            >
              Priyanshi
            </a>{' '}
            and{' '}
            <a
              href="https://www.linkedin.com/in/tahcinsarwar/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-cream"
            >
              Tahcin
            </a>
          </span>
          <span>
            © {new Date().getFullYear()} {site.legalName} · {site.city}
          </span>
        </div>
      </Container>
    </footer>
  )
}

/**
 * py-2 keeps the tap target at ~38px on mobile while shaving 4px per link off
 * the old py-2.5. Across eleven links that is real height. From sm the list
 * switches to space-y and the padding goes away entirely, because a mouse
 * does not need the target.
 */
function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="block py-2 transition-colors hover:text-cream sm:py-0">
      {children}
    </Link>
  )
}
