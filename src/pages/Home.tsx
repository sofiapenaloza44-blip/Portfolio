import { Hero } from '../components/Hero'
import { Philosophy } from '../components/Philosophy'
import { Learnings } from '../components/Learnings'
import { RevealSection } from '../components/RevealSection'
import { CaseStudyCard } from '../components/CaseStudyCard'
import { Link } from 'react-router-dom'
import { findCaseStudy, type CaseStudy } from '../data/work'

const MAIN_CASES = [
  'teradata-ai-assistant-trust',
  'teradata-one-identity',
  'stori-compliant-application',
]
  .map((slug) => findCaseStudy(slug))
  .filter((c): c is CaseStudy => !!c)

export function Home() {
  return (
    <>
      <Hero />
      <Philosophy />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <RevealSection className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Main case studies</h2>
          <p className="mx-auto mt-4 max-w-md text-ink-soft">
            Three projects that show how I design for trust, identity, and compliance.
          </p>
        </RevealSection>
        <div className="mt-12 space-y-10">
          {MAIN_CASES.map((study, i) => (
            <RevealSection key={study.slug} delay={i * 0.05}>
              <CaseStudyCard study={study} />
            </RevealSection>
          ))}
        </div>
        <RevealSection className="mt-12 text-center">
          <Link
            to="/featured-work"
            className="inline-block text-sm font-medium text-ink underline decoration-gold decoration-2 underline-offset-4"
          >
            See all featured work
          </Link>
        </RevealSection>
      </section>

      <div className="border-t border-line bg-surface">
        <Learnings />
      </div>
    </>
  )
}
