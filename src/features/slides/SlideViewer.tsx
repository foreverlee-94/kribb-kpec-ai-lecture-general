import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import type { Slide } from '@/types/slide'
import { SlideDiagram } from '@/features/slides/SlideDiagram'
import { diagramAspect } from '@/features/slides/diagramAspect'

interface SlideViewerProps {
  slides: Slide[]
  currentIndex: number
  onNavigate: (index: number) => void
  lectureId?: string
}

function BulletList({ bullets, className = 'mt-6' }: { bullets: string[]; className?: string }) {
  return (
    <ul className={clsx('max-w-3xl space-y-3', className)}>
      {bullets.map((bullet, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
          <span className="text-[clamp(0.875rem,0.8333rem+0.2083cqw,1rem)] leading-relaxed text-white/80">
            {bullet}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function SlideViewer({ slides, currentIndex, onNavigate, lectureId }: SlideViewerProps) {
  const total = slides.length
  const slide = slides[currentIndex]
  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < total - 1
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

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

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(document.fullscreenElement === wrapperRef.current)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      wrapperRef.current?.requestFullscreen()
    }
  }

  if (!slide) {
    return <p className="text-slate-600">해당 슬라이드를 찾을 수 없습니다.</p>
  }

  const controlBtnClass = clsx(
    'flex shrink-0 items-center gap-1.5 rounded-full border px-5 py-2.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40',
    isFullscreen
      ? 'border-white/60 text-white hover:bg-white/10'
      : 'border-near-black text-near-black hover:bg-near-black/5',
  )

  return (
    <div
      ref={wrapperRef}
      className={clsx(
        '@container flex flex-col gap-4',
        isFullscreen
          ? 'h-full w-full items-center justify-center bg-black p-6'
          : 'mx-auto w-full max-w-[1280px]',
      )}
    >
      <div
        onClick={() => canGoNext && onNavigate(currentIndex + 1)}
        className={clsx(
          'relative isolate flex aspect-video w-full flex-col overflow-y-auto rounded-[22px] border border-white/10 bg-deep-green p-[clamp(1.25rem,0.667rem+2.917cqw,3rem)]',
          canGoNext && 'cursor-pointer',
          isFullscreen ? 'max-w-[calc(100vh*16/9)] max-h-[calc(100vw*9/16)]' : 'max-h-[85vh]',
        )}
      >
        <div className="relative z-10 flex items-center justify-between">
          <span className="font-mono text-[11px] tracking-[0.28px] text-white/50 uppercase">
            {lectureId ?? 'lecture'} · Slide
          </span>
          <span className="font-mono text-[11px] tracking-[0.28px] text-white/50 uppercase">
            {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        <div className="relative z-10 flex flex-1 flex-col justify-start overflow-hidden">
          <div className="grid grid-cols-1 gap-6 @3xl:grid-cols-[1.3fr_1fr] @3xl:items-start">
            <div>
              <h1 className="font-display text-[clamp(1.375rem,1.083rem+1.458cqw,2.25rem)] leading-tight font-medium tracking-tight text-white">
                {slide.title}
              </h1>

              {slide.body && (
                <p className="mt-5 max-w-3xl text-[clamp(0.9375rem,0.875rem+0.3125cqw,1.125rem)] leading-relaxed text-white/80">
                  {slide.body}
                </p>
              )}

              {slide.bullets && <BulletList bullets={slide.bullets} />}
            </div>

            {slide.diagram && (
              <div
                style={{ aspectRatio: diagramAspect[slide.diagram] }}
                className="w-full min-h-32 rounded-lg border border-white/10 bg-white/5 p-3"
              >
                <SlideDiagram id={slide.diagram} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={clsx('flex items-center gap-4', isFullscreen ? 'w-full max-w-[calc(100vh*16/9)]' : '')}>
        <button
          type="button"
          onClick={() => onNavigate(currentIndex - 1)}
          disabled={!canGoPrev}
          className={controlBtnClass}
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
                i === currentIndex
                  ? 'bg-coral'
                  : isFullscreen
                    ? 'bg-white/20 hover:bg-white/30'
                    : 'bg-hairline hover:bg-hairline/70',
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => onNavigate(currentIndex + 1)}
          disabled={!canGoNext}
          className={controlBtnClass}
        >
          다음
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? '전체 화면 종료' : '전체 화면으로 보기'}
          className={clsx(
            'flex shrink-0 items-center justify-center rounded-full border p-2.5',
            isFullscreen
              ? 'border-white/60 text-white hover:bg-white/10'
              : 'border-near-black text-near-black hover:bg-near-black/5',
          )}
        >
          {isFullscreen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 4v3a2 2 0 0 1-2 2H4M20 9h-3a2 2 0 0 1-2-2V4M15 20v-3a2 2 0 0 1 2-2h3M4 15h3a2 2 0 0 1 2 2v3"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 9V6a2 2 0 0 1 2-2h3M20 9V6a2 2 0 0 0-2-2h-3M4 15v3a2 2 0 0 0 2 2h3M20 15v3a2 2 0 0 1-2 2h-3"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
