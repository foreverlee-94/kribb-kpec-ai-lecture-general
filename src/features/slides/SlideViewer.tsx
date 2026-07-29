import { useEffect } from 'react'
import clsx from 'clsx'
import type { Slide } from '@/types/slide'
import { SlideDiagram } from '@/features/slides/SlideDiagram'

interface SlideViewerProps {
  slides: Slide[]
  currentIndex: number
  onNavigate: (index: number) => void
  lectureId?: string
}

export function SlideViewer({ slides, currentIndex, onNavigate, lectureId }: SlideViewerProps) {
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
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 font-mono">
      <div className="relative isolate flex aspect-video max-h-[85vh] w-full flex-col overflow-y-auto rounded-2xl border border-[#2A2013] bg-[#0B0D0A] p-8 shadow-lg sm:p-10 lg:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[repeating-linear-gradient(to_bottom,rgba(232,163,61,0.05)_0px,rgba(232,163,61,0.05)_1px,transparent_1px,transparent_3px)]"
        />

        <span className="relative z-10 text-[11px] tracking-wide text-[#B97D26]">
          {lectureId ?? 'lecture'}/{slide.id}.md
        </span>

        <div className="relative z-10 flex flex-1 flex-col justify-center overflow-hidden">
          {slide.diagram === 'timeline' ? (
            <>
              <h1 className="text-2xl leading-tight font-bold text-[#FFC24D] lg:text-3xl">
                <span className="text-[#7A5518]">$ </span>
                {slide.title}
              </h1>
              {slide.body && (
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#D9A85C] lg:text-lg">
                  {slide.body}
                </p>
              )}
              <div className="mt-6 h-36 shrink-0 lg:h-44">
                <SlideDiagram id={slide.diagram} />
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1.3fr_1fr]">
              <div>
                <h1 className="text-2xl leading-tight font-bold text-[#FFC24D] lg:text-3xl">
                  <span className="text-[#7A5518]">$ </span>
                  {slide.title}
                </h1>

                {slide.body && (
                  <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#D9A85C] lg:text-lg">
                    {slide.body}
                  </p>
                )}

                {slide.bullets && (
                  <ul className="mt-6 max-w-3xl space-y-3">
                    {slide.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-[#E8A33D]">&gt;</span>
                        <span className="text-sm leading-relaxed text-[#D9A85C] lg:text-base">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {slide.diagram && (
                <div className="h-56 shrink-0 rounded-lg border border-[#2A2013] bg-black/20 p-3 md:h-64 lg:h-72">
                  <SlideDiagram id={slide.diagram} />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative z-10 mt-4 flex items-center justify-between border-t border-[#2A2013] pt-3 text-[10px] text-[#7A5518]">
          <span>kribb-ai-lecture</span>
          <span>
            [{String(currentIndex + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}]
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onNavigate(currentIndex - 1)}
          disabled={!canGoPrev}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#7A5518] bg-[#0B0D0A] px-5 py-2.5 text-sm font-medium text-[#E8A33D] hover:bg-[#1A1509] disabled:cursor-not-allowed disabled:opacity-40"
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
                i === currentIndex ? 'bg-[#E8A33D]' : 'bg-slate-200 hover:bg-slate-300',
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => onNavigate(currentIndex + 1)}
          disabled={!canGoNext}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#7A5518] bg-[#0B0D0A] px-5 py-2.5 text-sm font-medium text-[#E8A33D] hover:bg-[#1A1509] disabled:cursor-not-allowed disabled:opacity-40"
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
