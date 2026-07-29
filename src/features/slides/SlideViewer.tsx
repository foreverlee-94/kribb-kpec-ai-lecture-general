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
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4">
      <div className="relative flex aspect-video max-h-[85vh] w-full flex-col overflow-y-auto rounded-2xl border border-slate-200 bg-white p-8 shadow-lg sm:p-10 lg:p-12">
        <span className="text-sm font-semibold tracking-wide text-brand uppercase">
          {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>

        <div className="flex flex-1 flex-col justify-center">
          <h1 className="text-3xl leading-tight font-bold tracking-tight text-slate-900 lg:text-4xl">
            {slide.title}
          </h1>

          {slide.body && (
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600 lg:text-xl">
              {slide.body}
            </p>
          )}

          {slide.bullets && (
            <ul className="mt-6 max-w-3xl space-y-4">
              {slide.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" />
                  <span className="text-base leading-relaxed text-slate-700 lg:text-lg">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onNavigate(currentIndex - 1)}
          disabled={!canGoPrev}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          이전
        </button>

        <div className="flex flex-1 gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onNavigate(i)}
              aria-label={`${i + 1}번 슬라이드로 이동`}
              className={clsx(
                'h-1.5 flex-1 rounded-full transition-colors',
                i === currentIndex ? 'bg-brand' : 'bg-slate-200 hover:bg-slate-300',
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => onNavigate(currentIndex + 1)}
          disabled={!canGoNext}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          다음
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
