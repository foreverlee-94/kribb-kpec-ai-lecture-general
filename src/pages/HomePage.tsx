import { Link } from 'react-router-dom'
import { lectureNavItems } from '@/data/lectures'

export function HomePage() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-semibold text-slate-900">Welcome</h1>
      <p className="mt-1 text-slate-600">Pick a lecture from the sidebar, or from the list below.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {lectureNavItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className="rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-brand hover:shadow-sm"
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
