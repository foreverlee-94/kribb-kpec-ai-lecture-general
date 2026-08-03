import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getSlideDeck } from '@/features/slides/data/decks'
import { SlideViewer } from '@/features/slides/SlideViewer'

export function SlidesPage() {
  const { lectureId, slideIndex } = useParams<{ lectureId: string; slideIndex: string }>()
  const navigate = useNavigate()
  const deck = lectureId ? getSlideDeck(lectureId) : undefined

  if (!deck || deck.length === 0) {
    return <Navigate to={`/lectures/${lectureId}`} replace />
  }

  const parsedIndex = Number(slideIndex)
  const currentIndex = Number.isInteger(parsedIndex)
    ? Math.min(Math.max(parsedIndex, 0), deck.length - 1)
    : 0

  if (String(currentIndex) !== slideIndex) {
    return <Navigate to={`/lectures/${lectureId}/slides/${currentIndex}`} replace />
  }

  return (
    <SlideViewer
      slides={deck}
      currentIndex={currentIndex}
      onNavigate={(index) => navigate(`/lectures/${lectureId}/slides/${index}`)}
      lectureId={lectureId}
    />
  )
}
