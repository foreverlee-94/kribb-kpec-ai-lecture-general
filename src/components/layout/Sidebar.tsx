import clsx from 'clsx'
import type { LectureNavItem } from '@/types/lecture'
import { SidebarNavItem } from './SidebarNavItem'

interface SidebarProps {
  items: LectureNavItem[]
  collapsed: boolean
  open: boolean
  onClose: () => void
}

export function Sidebar({ items, collapsed, open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <nav
        className={clsx(
          'z-30 flex flex-col gap-1 border-r border-slate-200 bg-white p-2 transition-all duration-200',
          'fixed inset-y-0 left-0 md:static',
          collapsed ? 'md:w-16' : 'md:w-64',
          open ? 'w-64 translate-x-0' : 'w-64 -translate-x-full md:translate-x-0',
        )}
        aria-label="Lecture navigation"
      >
        {items.map((item) => (
          <SidebarNavItem key={item.id} item={item} collapsed={collapsed} onClick={onClose} />
        ))}
      </nav>
    </>
  )
}
