import { RevealSection } from './RevealSection'

const items = [
  {
    question: 'How do I lead my teams?',
    answer:
      'Empowering designers through communication and decision-making, motivating them to produce high quality work that meets user needs and business objectives.',
  },
  {
    question: 'How am I a strategist?',
    answer:
      'By fostering a collaborative and innovative environment that encourages creativity while aligning with strategic goals, setting clear expectations, and giving constructive feedback.',
  },
  {
    question: 'How am I a product designer?',
    answer:
      'Advocating for interdisciplinary collaboration, working closely with product, marketing, and development teams so user-centered principles are applied holistically across the product.',
  },
  {
    question: 'How am I user-centered?',
    answer:
      "Prioritizing user research and actively integrating feedback throughout the design process, and building a culture that values users' needs, motivations, and pain points alongside business needs.",
  },
]

export function Philosophy() {
  return (
    <section className="border-y border-line">
      <div className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2">
        {items.map((item, i) => (
          <RevealSection
            key={item.question}
            delay={i * 0.05}
            className={`border-line px-4 py-10 sm:px-6 sm:py-12 ${i % 2 === 0 ? 'sm:border-r' : ''} ${
              i < 2 ? 'border-b' : ''
            }`}
          >
            <h2 className="text-lg font-semibold tracking-tight">{item.question}</h2>
            <p className="mt-3 max-w-md text-ink-soft">{item.answer}</p>
          </RevealSection>
        ))}
      </div>
    </section>
  )
}
