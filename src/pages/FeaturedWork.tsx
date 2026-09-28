import { RevealSection } from '../components/RevealSection'
import { ShufflingCollage } from '../components/ShufflingCollage'

export function FeaturedWork() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <RevealSection className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Featured work</h1>
        <p className="mx-auto mt-4 max-w-md text-ink-soft">
          Twelve projects across fintech, edtech, aerospace, electronics, and enterprise software.
          Click any of them to jump straight to the case study.
        </p>
      </RevealSection>
      <RevealSection delay={0.1} className="mt-4">
        <ShufflingCollage />
      </RevealSection>
    </section>
  )
}
