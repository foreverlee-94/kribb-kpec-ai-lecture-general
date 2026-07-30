import { useEffect, useRef, useState } from 'react'
import type { Slide } from '@/types/slide'

const STORAGE_PREFIX = 'slide-edits:'

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `slide-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function isSlideArray(value: unknown): value is Slide[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((s) => s && typeof s === 'object' && typeof (s as Slide).id === 'string' && typeof (s as Slide).title === 'string')
  )
}

function loadStoredSlides(lectureId: string): Slide[] | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + lectureId)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return isSlideArray(parsed) ? parsed : null
  } catch {
    return null
  }
}

function saveStoredSlides(lectureId: string, slides: Slide[]) {
  try {
    window.localStorage.setItem(STORAGE_PREFIX + lectureId, JSON.stringify(slides))
  } catch {
    // Quota exceeded / storage disabled — edits still work in-memory for this session.
  }
}

function clearStoredSlides(lectureId: string) {
  try {
    window.localStorage.removeItem(STORAGE_PREFIX + lectureId)
  } catch {
    // ignore
  }
}

export interface EditableDeck {
  slides: Slide[]
  hasEdits: boolean
  updateSlide: (index: number, patch: Partial<Slide>) => void
  updateBullet: (slideIndex: number, bulletIndex: number, value: string) => void
  addBullet: (slideIndex: number) => void
  removeBullet: (slideIndex: number, bulletIndex: number) => void
  addSlide: (afterIndex: number) => void
  removeSlide: (index: number) => void
  moveSlide: (index: number, direction: 'up' | 'down') => void
  resetToDefault: () => void
}

export function useEditableDeck(lectureId: string | undefined, defaultSlides: Slide[]): EditableDeck {
  const [slides, setSlides] = useState<Slide[]>(() => {
    const stored = lectureId ? loadStoredSlides(lectureId) : null
    return stored ?? defaultSlides
  })
  const [hasEdits, setHasEdits] = useState<boolean>(() => (lectureId ? loadStoredSlides(lectureId) !== null : false))

  const lectureIdRef = useRef(lectureId)
  useEffect(() => {
    if (lectureIdRef.current === lectureId) return
    lectureIdRef.current = lectureId
    const stored = lectureId ? loadStoredSlides(lectureId) : null
    setSlides(stored ?? defaultSlides)
    setHasEdits(stored !== null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lectureId])

  function commit(next: Slide[]) {
    setSlides(next)
    setHasEdits(true)
    if (lectureId) saveStoredSlides(lectureId, next)
  }

  function updateSlide(index: number, patch: Partial<Slide>) {
    commit(slides.map((s, i) => (i === index ? { ...s, ...patch } : s)))
  }

  function updateBullet(slideIndex: number, bulletIndex: number, value: string) {
    commit(
      slides.map((s, i) =>
        i === slideIndex && s.bullets ? { ...s, bullets: s.bullets.map((b, j) => (j === bulletIndex ? value : b)) } : s,
      ),
    )
  }

  function addBullet(slideIndex: number) {
    commit(slides.map((s, i) => (i === slideIndex ? { ...s, bullets: [...(s.bullets ?? []), ''] } : s)))
  }

  function removeBullet(slideIndex: number, bulletIndex: number) {
    commit(
      slides.map((s, i) => {
        if (i !== slideIndex || !s.bullets) return s
        const bullets = s.bullets.filter((_, j) => j !== bulletIndex)
        return { ...s, bullets: bullets.length > 0 ? bullets : undefined }
      }),
    )
  }

  function addSlide(afterIndex: number) {
    const newSlide: Slide = { id: generateId(), title: '새 슬라이드' }
    const next = [...slides]
    next.splice(afterIndex + 1, 0, newSlide)
    commit(next)
  }

  function removeSlide(index: number) {
    if (slides.length <= 1) return
    commit(slides.filter((_, i) => i !== index))
  }

  function moveSlide(index: number, direction: 'up' | 'down') {
    const target = direction === 'up' ? index - 1 : index + 1
    if (target < 0 || target >= slides.length) return
    const next = [...slides]
    ;[next[index], next[target]] = [next[target], next[index]]
    commit(next)
  }

  function resetToDefault() {
    if (lectureId) clearStoredSlides(lectureId)
    setSlides(defaultSlides)
    setHasEdits(false)
  }

  return { slides, hasEdits, updateSlide, updateBullet, addBullet, removeBullet, addSlide, removeSlide, moveSlide, resetToDefault }
}
