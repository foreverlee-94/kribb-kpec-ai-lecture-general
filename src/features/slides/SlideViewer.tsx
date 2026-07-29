import { useEffect } from 'react'
import clsx from 'clsx'
import type { Slide } from '@/types/slide'

interface SlideViewerProps {
  slides: Slide[]
  currentIndex: number
  onNavigate: (index: number) => void
}

export function SlideViewer({ slides, currentIndex, onNavigate }: SlideViewerProps) {
  const total = slides.length
  const slide = slides[currentIndex]
  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < total - 1

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft' && canGoPrev) {
        onNavigate(currentIndex - 1)
      } else if (event.key === 'ArrowRight' && canGoNext) {
        onNavigate(currentIndex + 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, canGoPrev, canGoNext, onNavigate])

  if (!slide) {
    return <p className="text-slate-600">해당 슬라이드를 찾을 수 없습니다.</p>
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div className="min-h-80 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-brand">
          {currentIndex + 1} / {total}
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">{slide.title}</h1>
        {slide.body && <p className="mt-4 text-slate-700">{slide.body}</p>}
        {slide.bullets && (
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
            {slide.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate(currentIndex - 1)}
          disabled={!canGoPrev}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          이전
        </button>

        <div className="flex gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onNavigate(i)}
              aria-label={`${i + 1}번 슬라이드로 이동`}
              className={clsx(
                'h-2 w-2 rounded-full transition-colors',
                i === currentIndex ? 'bg-brand' : 'bg-slate-300 hover:bg-slate-400',
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => onNavigate(currentIndex + 1)}
          disabled={!canGoNext}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          다음
        </button>
      </div>
    </div>
  )
}
