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
  | 'data-structures'
  | 'convolution'
  | 'gradient-descent'
  | 'overfit-curve'
  | 'activation-functions'
  | 'minima-landscape'
  | 'frequency-filters'
  | 'rnn-sequence'
  | 'cnn-layers'
  | 'lstm-cell'
  | 'xor-problem'
  | 'xor-network'
  | 'backprop-graph'
  | 'backprop-numeric'
  | 'transformer-architecture'
  | 'encode-decode-analogy'
  | 'output-layer-compare'
  | 'softmax-example'
  | 'onehot-vector'

export interface SlideImage {
  src: string
  alt: string
  aspect: number
  credit: string
  creditUrl?: string
}

export interface Slide {
  id: string
  title: string
  body?: string
  bullets?: string[]
  note?: string
  diagram?: DiagramId
  image?: SlideImage
}

export interface SlideDeck {
  lectureId: string
  slides: Slide[]
}
