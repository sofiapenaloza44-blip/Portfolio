import { site } from '../data/site'

export function Footer() {
  return (
    <footer id="contact" className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-2xl font-semibold tracking-tight">Let's talk.</p>
          <p className="mt-2 max-w-sm text-ink-soft">
            Open to product design leadership roles and select consulting work.
          </p>
        </div>
        <div className="flex flex-col gap-1 text-sm text-ink-soft md:items-end">
          <a href={`mailto:${site.email}`} className="text-ink underline decoration-gold decoration-2 underline-offset-4">
            {site.email}
          </a>
          <a href={site.linkedinUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
            LinkedIn
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-8 text-xs text-ink-soft sm:px-6">
        © {new Date().getFullYear()} {site.name}
      </div>
    </footer>
  )
}
