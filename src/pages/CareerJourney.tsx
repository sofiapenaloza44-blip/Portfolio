import { Link } from 'react-router-dom'
import { careerStops } from '../data/career'
import { RevealSection } from '../components/RevealSection'

export function CareerJourney() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">My career journey</h1>
      <p className="mt-4 text-ink-soft">
        A path through fintech, edtech, aerospace, and electronics, told through the roles behind each case study.
      </p>

      <ol className="mt-12 space-y-10 border-l border-line pl-6">
        {careerStops.map((stop, i) => (
          <RevealSection key={`${stop.company}-${stop.period}`} delay={i * 0.04} className="relative">
            <span className="absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full bg-gold" />
            <p className="text-sm text-ink-soft">{stop.period}</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight">
              {stop.role} · {stop.company}
            </h2>
            <p className="mt-2 text-ink-soft">{stop.summary}</p>
            {stop.caseStudySlug && (
              <Link
                to={`/work/${stop.caseStudySlug}`}
                className="mt-2 inline-block text-sm font-medium text-ink underline decoration-gold decoration-2 underline-offset-4"
              >
                Read the case study
              </Link>
            )}
          </RevealSection>
        ))}
      </ol>
    </div>
  )
}
