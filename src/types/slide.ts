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
  | 'roadmap'
  | 'binary-data'
  | 'algorithm-flow'
  | 'pixel-grid'
  | 'image-filter'

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
