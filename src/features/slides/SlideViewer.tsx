import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import type { DiagramId, Slide } from '@/types/slide'
import { SlideDiagram } from '@/features/slides/SlideDiagram'
import { diagramAspect } from '@/features/slides/diagramAspect'
import { diagramLabels } from '@/features/slides/diagramLabels'
import type { EditableDeck } from '@/features/slides/useEditableDeck'

interface SlideViewerProps {
  slides: Slide[]
  currentIndex: number
  onNavigate: (index: number) => void
  lectureId?: string
  editActions: EditableDeck
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

function EditableBulletList({
  bullets,
  onChange,
  onRemove,
  onAdd,
  className = 'mt-6',
}: {
  bullets: string[]
  onChange: (index: number, value: string) => void
  onRemove: (index: number) => void
  onAdd: () => void
  className?: string
}) {
  return (
    <div className={clsx('max-w-3xl space-y-2', className)}>
      {bullets.map((bullet, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
          <input
            type="text"
            value={bullet}
            onChange={(e) => onChange(i, e.target.value)}
            className="flex-1 rounded-md border border-white/30 bg-white/5 px-2 py-1 text-[clamp(0.875rem,0.8333rem+0.2083cqw,1rem)] leading-relaxed text-white/90 focus:border-coral focus:outline-none"
          />
          <button
            type="button"
            onClick={() => onRemove(i)}
            aria-label="이 항목 삭제"
            className="shrink-0 rounded-full border border-white/30 px-2 py-0.5 text-xs text-white/70 hover:bg-white/10"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="rounded-full border border-dashed border-white/30 px-3 py-1 text-xs text-white/70 hover:bg-white/10"
      >
        + 항목 추가
      </button>
    </div>
  )
}

const secondaryBtnClass =
  'rounded-full border border-near-black px-3 py-1.5 text-xs font-medium text-near-black hover:bg-near-black/5 disabled:cursor-not-allowed disabled:opacity-40'

export function SlideViewer({ slides, currentIndex, onNavigate, lectureId, editActions }: SlideViewerProps) {
  const total = slides.length
  const slide = slides[currentIndex]
  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < total - 1
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isEditing) return
      if (event.key === 'ArrowLeft' && canGoPrev) {
        onNavigate(currentIndex - 1)
      } else if (event.key === 'ArrowRight' && canGoNext) {
        onNavigate(currentIndex + 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, canGoPrev, canGoNext, onNavigate, isEditing])

  useEffect(() => {
    function handleFullscreenChange() {
      const nowFullscreen = document.fullscreenElement === wrapperRef.current
      setIsFullscreen(nowFullscreen)
      if (nowFullscreen) setIsEditing(false)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const lectureIdRef = useRef(lectureId)
  useEffect(() => {
    if (lectureIdRef.current !== lectureId) {
      lectureIdRef.current = lectureId
      setIsEditing(false)
    }
  }, [lectureId])

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      wrapperRef.current?.requestFullscreen()
    }
  }

  function handleExport() {
    const payload = JSON.stringify(slides, null, 2)
    const blob = new Blob([payload], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${lectureId ?? 'lecture'}-slides.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  function handleAddSlide() {
    editActions.addSlide(currentIndex)
    onNavigate(currentIndex + 1)
  }

  function handleRemoveSlide() {
    if (total <= 1) return
    if (!window.confirm('이 슬라이드를 삭제할까요?')) return
    const nextIndex = currentIndex === total - 1 ? currentIndex - 1 : currentIndex
    editActions.removeSlide(currentIndex)
    if (nextIndex !== currentIndex) onNavigate(nextIndex)
  }

  function handleMoveUp() {
    if (currentIndex === 0) return
    editActions.moveSlide(currentIndex, 'up')
    onNavigate(currentIndex - 1)
  }

  function handleMoveDown() {
    if (currentIndex === total - 1) return
    editActions.moveSlide(currentIndex, 'down')
    onNavigate(currentIndex + 1)
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
        onClick={() => !isEditing && canGoNext && onNavigate(currentIndex + 1)}
        className={clsx(
          'relative isolate flex aspect-video w-full flex-col overflow-y-auto rounded-[22px] border border-white/10 bg-deep-green p-[clamp(1.25rem,0.667rem+2.917cqw,3rem)]',
          canGoNext && !isEditing && 'cursor-pointer',
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
          <div className="grid grid-cols-1 gap-6 @3xl:grid-cols-[1.3fr_1fr] @3xl:items-center">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={slide.title}
                  onChange={(e) => editActions.updateSlide(currentIndex, { title: e.target.value })}
                  placeholder="슬라이드 제목"
                  className="font-display w-full rounded-md border border-white/30 bg-white/5 px-2 py-1 text-[clamp(1.375rem,1.083rem+1.458cqw,2.25rem)] leading-tight font-medium tracking-tight text-white placeholder:text-white/40 focus:border-coral focus:outline-none"
                />
              ) : (
                <h1 className="font-display text-[clamp(1.375rem,1.083rem+1.458cqw,2.25rem)] leading-tight font-medium tracking-tight text-white">
                  {slide.title}
                </h1>
              )}

              {isEditing ? (
                <textarea
                  value={slide.body ?? ''}
                  onChange={(e) => editActions.updateSlide(currentIndex, { body: e.target.value })}
                  placeholder="본문 (선택)"
                  rows={3}
                  className="mt-5 w-full max-w-3xl resize-y rounded-md border border-white/30 bg-white/5 px-2 py-1.5 text-[clamp(0.9375rem,0.875rem+0.3125cqw,1.125rem)] leading-relaxed text-white/90 placeholder:text-white/40 focus:border-coral focus:outline-none"
                />
              ) : (
                slide.body?.trim() && (
                  <p className="mt-5 max-w-3xl text-[clamp(0.9375rem,0.875rem+0.3125cqw,1.125rem)] leading-relaxed text-white/80">
                    {slide.body}
                  </p>
                )
              )}

              {isEditing ? (
                <EditableBulletList
                  bullets={slide.bullets ?? []}
                  onChange={(i, v) => editActions.updateBullet(currentIndex, i, v)}
                  onRemove={(i) => editActions.removeBullet(currentIndex, i)}
                  onAdd={() => editActions.addBullet(currentIndex)}
                />
              ) : (
                slide.bullets && slide.bullets.length > 0 && <BulletList bullets={slide.bullets} />
              )}
            </div>

            {(isEditing || slide.diagram) && (
              <div className="flex flex-col gap-2">
                {isEditing && (
                  <select
                    value={slide.diagram ?? ''}
                    onChange={(e) =>
                      editActions.updateSlide(currentIndex, {
                        diagram: (e.target.value || undefined) as DiagramId | undefined,
                      })
                    }
                    className="w-full rounded-md border border-white/30 bg-deep-green px-2 py-1.5 text-xs text-white/90 focus:border-coral focus:outline-none"
                  >
                    <option value="" className="text-near-black">
                      없음
                    </option>
                    {(Object.keys(diagramLabels) as DiagramId[]).map((id) => (
                      <option key={id} value={id} className="text-near-black">
                        {diagramLabels[id]}
                      </option>
                    ))}
                  </select>
                )}
                {slide.diagram && (
                  <div
                    style={{ aspectRatio: diagramAspect[slide.diagram] }}
                    className="w-full min-h-32 rounded-lg border border-white/10 bg-white/5 p-3"
                  >
                    <SlideDiagram id={slide.diagram} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {!isFullscreen && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsEditing((v) => !v)}
            className={clsx(
              'flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium',
              isEditing ? 'border-coral bg-coral/10 text-coral' : 'border-near-black text-near-black hover:bg-near-black/5',
            )}
          >
            {isEditing ? '편집 종료' : '편집'}
          </button>

          {isEditing && (
            <>
              <span className="mx-1 h-5 w-px bg-hairline" />
              <button type="button" onClick={handleAddSlide} className={secondaryBtnClass}>
                + 슬라이드 추가
              </button>
              <button type="button" onClick={handleRemoveSlide} disabled={total <= 1} className={secondaryBtnClass}>
                슬라이드 삭제
              </button>
              <button type="button" onClick={handleMoveUp} disabled={currentIndex === 0} className={secondaryBtnClass}>
                이전으로 이동
              </button>
              <button
                type="button"
                onClick={handleMoveDown}
                disabled={currentIndex === total - 1}
                className={secondaryBtnClass}
              >
                다음으로 이동
              </button>
            </>
          )}

          <div className="flex-1" />

          {(isEditing || editActions.hasEdits) && (
            <>
              <button type="button" onClick={handleExport} className={secondaryBtnClass}>
                내보내기
              </button>
              <button type="button" onClick={editActions.resetToDefault} className={secondaryBtnClass}>
                기본값으로 되돌리기
              </button>
            </>
          )}
        </div>
      )}

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
