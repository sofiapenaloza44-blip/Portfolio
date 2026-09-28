import { Hero } from '../components/Hero'
import { Philosophy } from '../components/Philosophy'
import { Learnings } from '../components/Learnings'
import { RevealSection } from '../components/RevealSection'
import { ShufflingCollage } from '../components/ShufflingCollage'

export function Home() {
  return (
    <>
      <Hero />
      <Philosophy />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <RevealSection className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Featured work</h2>
          <p className="mx-auto mt-4 max-w-md text-ink-soft">
            Twelve projects across fintech, edtech, aerospace, electronics, and enterprise
            software. Click any of them to jump straight to the case study.
          </p>
        </RevealSection>
        <RevealSection delay={0.1} className="mt-4">
          <ShufflingCollage />
        </RevealSection>
      </section>

      <div className="border-t border-line bg-surface">
        <Learnings />
      </div>
    </>
  )
}
