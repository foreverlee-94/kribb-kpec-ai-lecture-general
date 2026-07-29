interface TopNavProps {
  title?: string
  onMenuButtonClick: () => void
  onCollapseButtonClick: () => void
}

export function TopNav({
  title = 'KRIBB AI Lecture',
  onMenuButtonClick,
  onCollapseButtonClick,
}: TopNavProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4">
      <button
        type="button"
        onClick={onMenuButtonClick}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 md:hidden"
        aria-label="Toggle navigation menu"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <button
        type="button"
        onClick={onCollapseButtonClick}
        className="hidden h-9 w-9 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 md:inline-flex"
        aria-label="Toggle sidebar width"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <span className="text-brand font-display text-base font-medium">{title}</span>
    </header>
  )
}
