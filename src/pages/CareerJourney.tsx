import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { animate, motion, useReducedMotion } from 'motion/react'
import { careerStops } from '../data/career'

const STACK_OFFSET = 12 // px each card peeks out below the one above it
const STACK_SHRINK = 0.02 // cards further down the pile are slightly smaller
const STACK_HOLD = 0.45 // seconds the pile is shown before it fans out
const STACK_STAGGER = 0.09

export function CareerJourney() {
  const reduce = useReducedMotion()
  const listRef = useRef<HTMLOListElement>(null)
  const stops = [...careerStops].reverse()

  // On landing, every card starts piled on top of the first one, then fans
  // out into its place in the timeline.
  useLayoutEffect(() => {
    const list = listRef.current
    if (reduce || !list) return
    const items = Array.from(list.children) as HTMLElement[]
    if (!items.length) return
    const firstTop = items[0].offsetTop

    const runs = items.map((el, i) => {
      const y = firstTop - el.offsetTop + i * STACK_OFFSET
      const scale = 1 - i * STACK_SHRINK
      el.style.transform = `translateY(${y}px) scale(${scale})`
      el.style.zIndex = String(items.length - i)
      const run = animate(
        el,
        { y: [y, 0], scale: [scale, 1] },
        { delay: STACK_HOLD + i * STACK_STAGGER, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
      )
      return run
    })

    Promise.all(runs.map((run) => run.finished)).then(() => {
      items.forEach((el) => el.style.removeProperty('z-index'))
    })

    return () => {
      runs.forEach((run) => run.stop())
      items.forEach((el) => {
        el.style.removeProperty('transform')
        el.style.removeProperty('z-index')
      })
    }
  }, [reduce])

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">My career journey</h1>
      <p className="mt-4 text-ink-soft">
        A path through fintech, edtech, aerospace, and electronics, told through the roles behind each case study.
      </p>

      <ol ref={listRef} className="mt-12 space-y-6 border-l border-line pl-6">
        {stops.map((stop) => (
          <li key={`${stop.company}-${stop.period}`} className="relative hover:z-10">
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
          </li>
        ))}
      </ol>
    </div>
  )
}
