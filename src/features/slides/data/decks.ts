import type { Slide } from '@/types/slide'
import { csBasicsSlides } from './cs-basics'
import { imageProcessingSlides } from './image-processing'
import { aiHistorySlides } from './ai-history'
import { mlDlSlides } from './ml-dl'
import { llmModernSlides } from './llm-modern'

export const slideDecksByLectureId: Record<string, Slide[]> = {
  'cs-basics': csBasicsSlides,
  'image-processing': imageProcessingSlides,
  'ai-history': aiHistorySlides,
  'ml-dl': mlDlSlides,
  'llm-modern-ai': llmModernSlides,
}

export function getSlideDeck(lectureId: string): Slide[] | undefined {
  return slideDecksByLectureId[lectureId]
}
