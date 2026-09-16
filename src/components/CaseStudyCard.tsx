import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@phosphor-icons/react'
import type { CaseStudy } from '../data/work'

export function CaseStudyCard({
  caseStudy,
  featured = false,
}: {
  caseStudy: CaseStudy
  featured?: boolean
}) {
  return (
    <Link
      to={`/work/${caseStudy.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-transform duration-300 hover:-translate-y-1"
    >
      <div className={`overflow-hidden ${featured ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
        <img
          src={`https://picsum.photos/seed/${caseStudy.gallerySeeds[0]}/${featured ? 1200 : 800}/${featured ? 750 : 600}`}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
        {caseStudy.company && (
          <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">{caseStudy.company}</p>
        )}
        <h3 className={`font-semibold tracking-tight ${featured ? 'text-xl sm:text-2xl' : 'text-lg'}`}>
          {caseStudy.title}
        </h3>
        <p className="line-clamp-2 text-sm text-ink-soft">{caseStudy.summary}</p>
        <span className="mt-auto flex items-center gap-1 pt-2 text-sm font-medium text-ink">
          Read case study
          <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}
