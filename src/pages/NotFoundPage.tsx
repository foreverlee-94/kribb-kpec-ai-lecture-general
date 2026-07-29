import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <h1 className="font-display text-2xl font-medium text-slate-900">404 — Page not found</h1>
      <Link to="/" className="mt-4 inline-block text-brand hover:underline">
        Back to home
      </Link>
    </div>
  )
}
