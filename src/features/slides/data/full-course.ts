import type { Slide } from '@/types/slide'
import { openingSlides } from './opening-slides'
import { aiHistorySlides } from './ai-history'
import { closingSlides } from './closing-slides'

export const fullCourseSlides: Slide[] = [...openingSlides, ...aiHistorySlides, ...closingSlides]
