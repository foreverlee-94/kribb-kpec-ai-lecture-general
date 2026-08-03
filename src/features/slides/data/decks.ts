import type { Slide } from '@/types/slide'
import { fullCourseSlides } from './full-course'

export const slideDecksByLectureId: Record<string, Slide[]> = {
  intro: fullCourseSlides,
}

export function getSlideDeck(lectureId: string): Slide[] | undefined {
  return slideDecksByLectureId[lectureId]
}
