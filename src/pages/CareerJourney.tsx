import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { careerStops } from '../data/career'

const WAVE_STAGGER = 0.1 // seconds between one card starting and the next
const WAVE_SWAY = 28 // px of sideways travel at the crest of the wave

export function CareerJourney() {
  const reduce = useReducedMotion()
  const stops = [...careerStops].reverse()

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">My career journey</h1>
      <p className="mt-4 text-ink-soft">
        A path through fintech, edtech, aerospace, and electronics, told through the roles behind each case study.
      </p>

      <ol className="mt-12 space-y-6 border-l border-line pl-6">
        {stops.map((stop, i) => (
          <motion.li
            key={`${stop.company}-${stop.period}`}
            className="relative hover:z-10"
            initial={reduce ? false : { opacity: 0, y: -32, x: Math.sin(i * 0.9) * WAVE_SWAY }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 + i * WAVE_STAGGER, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="absolute -left-[1.65rem] top-6 h-2.5 w-2.5 rounded-full bg-gold" />
            <motion.div
              whileHover={reduce ? undefined : { scale: 1.1 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="rounded-2xl border border-line bg-surface p-5 shadow-sm"
            >
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
            </motion.div>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
