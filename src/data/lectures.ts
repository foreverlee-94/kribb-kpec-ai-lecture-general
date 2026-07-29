import type { LectureNavItem } from '@/types/lecture'

export const lectureNavItems: LectureNavItem[] = [
  {
    id: 'intro',
    title: 'Lecture 01 — AI 기술 발전의 역사',
    path: '/lectures/intro',
    description: '1960년대부터 현재까지',
  },
  {
    id: 'topic-a',
    title: 'Lecture 02 — Topic A',
    path: '/lectures/topic-a',
    description: 'Core concepts',
  },
  {
    id: 'topic-b',
    title: 'Lecture 03 — Topic B',
    path: '/lectures/topic-b',
    description: 'Building on Topic A',
  },
  {
    id: 'interactive-demo',
    title: 'Lecture 04 — Interactive Demo',
    path: '/lectures/interactive-demo',
    description: 'Charts, simulations, and live code (placeholder)',
  },
  {
    id: 'quiz-demo',
    title: 'Lecture 05 — Quiz',
    path: '/lectures/quiz-demo',
    description: 'Check your understanding (placeholder)',
  },
]
