import type { LectureNavItem } from '@/types/lecture'

export const lectureNavItems: LectureNavItem[] = [
  {
    id: 'cs-basics',
    title: '① 컴퓨터공학 기초',
    path: '/lectures/cs-basics',
    description: '컴퓨터는 정보를 어떻게 다루는가 | 데이터, 자료구조, 알고리즘',
  },
  {
    id: 'image-processing',
    title: '② 영상처리 기초',
    path: '/lectures/image-processing',
    description: '이미지가 숫자로 표현되고 계산되는 방식 | 픽셀부터 컨볼루션까지',
  },
  {
    id: 'ai-history',
    title: '③ AI 기술의 역사',
    path: '/lectures/ai-history',
    description: '1960년대부터 현재까지, 두 차례의 겨울과 도약',
  },
  {
    id: 'ml-dl',
    title: '④ 머신러닝과 딥러닝',
    path: '/lectures/ml-dl',
    description: '데이터로부터 배운다는 것 | 학습의 원리와 과적합',
  },
  {
    id: 'llm-modern-ai',
    title: '⑤ 오늘날의 AI: LLM',
    path: '/lectures/llm-modern-ai',
    description: '트랜스포머부터 에이전트까지, 생성형 AI의 작동 방식과 한계',
  },
]
