import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { List, X } from '@phosphor-icons/react'
import { site } from '../data/site'

const links = [
  { label: 'Portfolio', to: '/' },
  { label: 'Career journey', to: '/career-journey' },
  { label: 'CV', href: site.cvUrl },
  { label: 'LinkedIn', href: site.linkedinUrl },
  { label: 'Contact', href: `mailto:${site.email}` },
]

function NavLink({ link, active, onClick }: { link: (typeof links)[number]; active: boolean; onClick?: () => void }) {
  if (link.to) {
    return (
      <Link
        to={link.to}
        onClick={onClick}
        className={
          active
            ? 'text-ink underline decoration-gold decoration-2 underline-offset-4'
            : 'transition-colors hover:text-ink'
        }
      >
        {link.label}
      </Link>
    )
  }
  return (
    <a
      href={link.href}
      target={link.href?.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      onClick={onClick}
      className="transition-colors hover:text-ink"
    >
      {link.label}
    </a>
  )
}

export function NavBar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="whitespace-nowrap text-base font-semibold tracking-tight">
          {site.name}
        </Link>

        <ul className="hidden items-center gap-6 text-sm text-ink-soft md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <NavLink link={link} active={location.pathname === link.to} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center text-ink md:hidden"
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-line px-4 py-3 text-sm text-ink-soft md:hidden">
          {links.map((link) => (
            <li key={link.label} className="py-2">
              <NavLink link={link} active={location.pathname === link.to} onClick={() => setOpen(false)} />
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
