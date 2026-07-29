export interface Slide {
  id: string
  title: string
  body?: string
  bullets?: string[]
  note?: string
}

export interface SlideDeck {
  lectureId: string
  slides: Slide[]
}
