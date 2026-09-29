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
              whileHover={reduce ? undefined : { y: -4 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex flex-col gap-3 rounded-xl border border-gold bg-surface/15 p-8 shadow-sm md:px-10"
            >
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft">{stop.period}</p>
              <h3>
                {stop.role} · {stop.company}
              </h3>
              <p className="max-w-xl text-ink-soft">{stop.summary}</p>
              {stop.caseStudySlug && (
                <Link
                  to={`/work/${stop.caseStudySlug}`}
                  className="mt-2 inline-flex w-fit items-center rounded-full bg-gold/75 px-6 py-3 text-sm font-semibold text-ink transition-[filter] hover:brightness-95"
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
