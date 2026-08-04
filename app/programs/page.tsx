import type { Metadata } from 'next'
import Link from 'next/link'
import { programs, savyaFit } from '@/content/programs'
import { site } from '@/content/site'
import { HelpCard, ProgramCard } from '@/components/program-card'
import { Container, MicroLabel, Rule, RuleGrid, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Programs',
  description:
    'Gymnastics, football, basketball and toddler movement programs for children in Bengaluru. At our centre, in your school, or inside your community.',
  alternates: { canonical: '/programs' },
}

export default function ProgramsPage() {
  return (
    <>
      <div className="border-b border-hairline bg-cream-deep">
        <Container className="pt-[clamp(3rem,8vw,5rem)] pb-[clamp(2.5rem,6vw,4rem)]">
          <div className="rise-group max-w-[54ch]">
            <Rule className="mb-4" />
            <MicroLabel className="mb-5 block">Products &amp; Services</MicroLabel>
            <h1 className="mb-6 font-display text-display-l">{site.platformLine}</h1>
            <p className="text-lede text-ink-soft">
              Seven programs across gymnastics, football, basketball and technology, from
              six-month-old toddlers to competitive teenagers. Three ways to reach us: come to our
              centre, or we come to your school or your community.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <RuleGrid className="sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {programs.map((p, i) => (
              <ProgramCard key={p.slug} program={p} index={i} />
            ))}

            <Link
              href={savyaFit.href}
              className="group relative flex flex-col sm:min-h-[15rem] border-b border-r border-hairline p-[clamp(1.5rem,3.5vw,2.25rem)] transition-colors duration-300 hover:bg-green/[0.045]"
            >
              <span
                aria-hidden
                className="absolute -top-px left-0 h-[2px] w-0 bg-orange transition-[width] duration-350 group-hover:w-full"
              />
              <span className="mb-3.5 font-display text-[0.9375rem] text-orange">07</span>
              <h3 className="mb-2.5 font-display text-display-s">{savyaFit.name}</h3>
              <span className="micro mb-3.5 self-start rounded-sm bg-green/10 px-2 py-1 text-green-deep">
                All members
              </span>
              <p className="mb-6 text-[0.9375rem] text-ink-soft">{savyaFit.summary}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold">
                Discover
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>

            <HelpCard />
          </RuleGrid>
        </Container>
      </Section>
    </>
  )
}
