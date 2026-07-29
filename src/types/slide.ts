export type DiagramId =
  | 'timeline'
  | 'perceptron'
  | 'winter'
  | 'expert-system'
  | 'svm-margin'
  | 'compute-data'
  | 'deep-net'
  | 'attention'
  | 'scaling-curve'
  | 'agent-loop'

export interface Slide {
  id: string
  title: string
  body?: string
  bullets?: string[]
  note?: string
  diagram?: DiagramId
}

export interface SlideDeck {
  lectureId: string
  slides: Slide[]
}
