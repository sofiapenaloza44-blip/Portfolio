import { Certificate, CheckCircle, Hourglass } from '@phosphor-icons/react'
import { learnings, membership } from '../data/learnings'
import { RevealSection } from './RevealSection'

export function Learnings() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Latest learnings</h2>
      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,320px)_1fr]">
        <RevealSection>
          <div className="flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-6">
            <Certificate size={32} weight="light" className="text-gold" />
            <div className="mt-6">
              <p className="text-sm text-ink-soft">Member of</p>
              <p className="text-lg font-semibold tracking-tight">{membership.org}</p>
              <p className="mt-1 text-sm text-ink-soft">Since {membership.memberSince}</p>
            </div>
          </div>
        </RevealSection>
        <div className="divide-y divide-line">
          {learnings.map((item, i) => (
            <RevealSection key={item.title} delay={i * 0.05} className="flex items-start gap-4 py-5 first:pt-0">
              {item.status === 'completed' ? (
                <CheckCircle size={22} weight="light" className="mt-0.5 shrink-0 text-gold" />
              ) : (
                <Hourglass size={22} weight="light" className="mt-0.5 shrink-0 text-ink-soft" />
              )}
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-ink-soft">{item.issuer}</p>
                <p className="mt-1 text-sm text-ink-soft">{item.detail}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
