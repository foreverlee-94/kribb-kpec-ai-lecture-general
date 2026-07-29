import { Navigate, useParams } from 'react-router-dom'
import { lectureNavItems } from '@/data/lectures'
import { getSlideDeck } from '@/features/slides/data/decks'

export function LecturePage() {
  const { lectureId } = useParams<{ lectureId: string }>()
  const lecture = lectureNavItems.find((item) => item.id === lectureId)
  const deck = lectureId ? getSlideDeck(lectureId) : undefined

  if (deck && deck.length > 0) {
    return <Navigate to="slides/0" replace />
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-semibold text-slate-900">
        {lecture?.title ?? 'Lecture not found'}
      </h1>
      <p className="mt-2 text-slate-600">Content coming soon.</p>
    </div>
  )
}
