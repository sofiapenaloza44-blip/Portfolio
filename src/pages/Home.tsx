import { Hero } from '../components/Hero'
import { Philosophy } from '../components/Philosophy'
import { Learnings } from '../components/Learnings'
import { CaseStudyCard } from '../components/CaseStudyCard'
import { IndustryIcon } from '../components/IndustryIcon'
import { RevealSection } from '../components/RevealSection'
import { ShufflingCollage } from '../components/ShufflingCollage'
import { industries } from '../data/work'

const [finance, edtech, designValue, aerospace, electronics] = industries

function SectionHeading({ group }: { group: (typeof industries)[number] }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <IndustryIcon icon={group.icon} size={28} className="text-gold" />
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{group.name}</h2>
    </div>
  )
}

export function Home() {
  return (
    <>
      <Hero />
      <Philosophy />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-16">
          <RevealSection>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Featured work</h2>
            <p className="mt-4 max-w-sm text-ink-soft">
              Nine projects across fintech, edtech, aerospace, and electronics. Click any of them to
              jump straight to the case study.
            </p>
          </RevealSection>
          <RevealSection delay={0.1}>
            <ShufflingCollage />
          </RevealSection>
        </div>

        <div className="mt-20">
          <SectionHeading group={finance} />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr]">
            <RevealSection>
              <CaseStudyCard caseStudy={finance.caseStudies[0]} featured />
            </RevealSection>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1">
              {finance.caseStudies.slice(1).map((cs, i) => (
                <RevealSection key={cs.slug} delay={0.1 + i * 0.05}>
                  <CaseStudyCard caseStudy={cs} />
                </RevealSection>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20">
          <SectionHeading group={edtech} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {edtech.caseStudies.map((cs, i) => (
              <RevealSection key={cs.slug} delay={i * 0.05}>
                <CaseStudyCard caseStudy={cs} featured />
              </RevealSection>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <SectionHeading group={designValue} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {designValue.caseStudies.map((cs, i) => (
              <RevealSection key={cs.slug} delay={i * 0.05}>
                <CaseStudyCard caseStudy={cs} />
              </RevealSection>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2">
            <IndustryIcon icon={aerospace.icon} size={28} className="text-gold" />
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{aerospace.name}</h2>
            <span className="text-ink-soft">and</span>
            <IndustryIcon icon={electronics.icon} size={28} className="text-gold" />
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{electronics.name}</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <RevealSection>
              <CaseStudyCard caseStudy={aerospace.caseStudies[0]} featured />
            </RevealSection>
            <RevealSection delay={0.05}>
              <CaseStudyCard caseStudy={electronics.caseStudies[0]} featured />
            </RevealSection>
          </div>
        </div>
      </section>

      <div className="border-t border-line bg-surface">
        <Learnings />
      </div>
    </>
  )
}
