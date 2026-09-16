import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, Info } from '@phosphor-icons/react'
import { findCaseStudy, findIndustryForCaseStudy } from '../data/work'
import { RevealSection } from '../components/RevealSection'

export function CaseStudy() {
  const { slug = '' } = useParams()
  const caseStudy = findCaseStudy(slug)
  const industry = findIndustryForCaseStudy(slug)

  if (!caseStudy || !industry) {
    return <Navigate to="/" replace />
  }

  return (
    <article>
      <div className="mx-auto max-w-3xl px-4 pt-12 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink">
          <ArrowLeft size={16} />
          Back to work
        </Link>

        <div className="mt-8 flex items-start gap-3 rounded-xl border border-line bg-surface p-4 text-sm text-ink-soft">
          <Info size={18} className="mt-0.5 shrink-0 text-gold" />
          <p>
            The overview below is Sofia's own description of this project. The challenge, process, and outcome
            sections are demo content, drafted to show the shape of a full case study. They will be replaced with
            the real specifics once the source files are available.
          </p>
        </div>

        <RevealSection className="mt-10">
          <p className="text-sm font-medium uppercase tracking-wide text-ink-soft">{industry.name}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{caseStudy.title}</h1>
          <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-line py-4 text-sm sm:grid-cols-4">
            {caseStudy.company && (
              <div>
                <dt className="text-ink-soft">Company</dt>
                <dd className="font-medium">{caseStudy.company}</dd>
              </div>
            )}
            <div>
              <dt className="text-ink-soft">Role</dt>
              <dd className="font-medium">{caseStudy.role}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Timeline</dt>
              <dd className="font-medium">{caseStudy.timeline}</dd>
            </div>
          </dl>
        </RevealSection>
      </div>

      <RevealSection className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
        <img
          src={`https://picsum.photos/seed/${caseStudy.gallerySeeds[0]}/1600/900`}
          alt=""
          className="aspect-video w-full rounded-2xl object-cover grayscale"
        />
      </RevealSection>

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <RevealSection className="prose-section">
          <h2 className="text-xl font-semibold tracking-tight">Overview</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">{caseStudy.overview}</p>
        </RevealSection>

        <RevealSection className="mt-12" delay={0.05}>
          <h2 className="text-xl font-semibold tracking-tight">The challenge</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">{caseStudy.challenge}</p>
        </RevealSection>

        <RevealSection className="mt-12" delay={0.05}>
          <h2 className="text-xl font-semibold tracking-tight">Process</h2>
          <ol className="mt-4 space-y-4">
            {caseStudy.process.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="text-sm font-semibold text-gold">{String(i + 1).padStart(2, '0')}</span>
                <span className="leading-relaxed text-ink-soft">{step}</span>
              </li>
            ))}
          </ol>
        </RevealSection>

        <RevealSection className="mt-12" delay={0.05}>
          <h2 className="text-xl font-semibold tracking-tight">Outcome</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">{caseStudy.outcome}</p>
        </RevealSection>

        {caseStudy.gallerySeeds.length > 1 && (
          <RevealSection className="mt-12 grid grid-cols-2 gap-4" delay={0.05}>
            {caseStudy.gallerySeeds.slice(1).map((seed) => (
              <img
                key={seed}
                src={`https://picsum.photos/seed/${seed}/800/600`}
                alt=""
                loading="lazy"
                className="aspect-[4/3] w-full rounded-xl object-cover grayscale"
              />
            ))}
          </RevealSection>
        )}
      </div>
    </article>
  )
}
