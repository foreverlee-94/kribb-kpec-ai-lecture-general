import type { Slide } from '@/types/slide'
import { aiHistorySlides } from './ai-history'

export const slideDecksByLectureId: Record<string, Slide[]> = {
  intro: aiHistorySlides,
}

export function getSlideDeck(lectureId: string): Slide[] | undefined {
  return slideDecksByLectureId[lectureId]
}
