import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start px-4 py-32 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-ink-soft">That page doesn't exist.</p>
      <Link to="/" className="mt-6 text-sm font-medium text-ink underline decoration-gold decoration-2 underline-offset-4">
        Back to the portfolio
      </Link>
    </div>
  )
}
