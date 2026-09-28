import { Link } from 'react-router-dom'
import type { CaseStudy } from '../data/work'

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const tags = [study.company, study.role, study.timeline].filter(Boolean).join(' / ')

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-md transition-transform duration-300 hover:-translate-y-1 md:h-[280px] md:flex-row">
      <Link
        to={`/work/${study.slug}`}
        tabIndex={-1}
        aria-hidden
        className="block overflow-hidden bg-white md:w-[280px] md:shrink-0"
      >
        <img
          src={`case-studies/${study.slug}.png`}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="flex flex-col justify-center gap-3 p-8 md:px-12 md:py-6">
        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft">{tags}</p>
        <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-4xl">{study.title}</h3>
        <p className="max-w-xl text-ink-soft">{study.summary}</p>
        <Link
          to={`/work/${study.slug}`}
          className="mt-2 inline-flex w-fit items-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bg transition-opacity hover:opacity-85"
        >
          View Case Study
        </Link>
      </div>
    </article>
  )
}
