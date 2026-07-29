import { Link } from 'react-router-dom'
import { lectureNavItems } from '@/data/lectures'

export function HomePage() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-2xl font-medium text-slate-900">Welcome</h1>
      <p className="mt-1 text-slate-600">Pick a lecture from the sidebar, or from the list below.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {lectureNavItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className="rounded-lg bg-stone p-4 transition-colors hover:bg-stone/70"
          >
            <h2 className="font-medium text-slate-900">{item.title}</h2>
            {item.description && (
              <p className="mt-1 text-sm text-slate-600">{item.description}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
