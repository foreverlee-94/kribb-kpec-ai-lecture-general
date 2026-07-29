import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import type { LectureNavItem } from '@/types/lecture'

interface SidebarNavItemProps {
  item: LectureNavItem
  collapsed: boolean
  onClick?: () => void
}

export function SidebarNavItem({ item, collapsed, onClick }: SidebarNavItemProps) {
  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      title={collapsed ? item.title : undefined}
      className={({ isActive }) =>
        clsx(
          'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
          collapsed ? 'justify-center' : 'gap-2',
          isActive
            ? 'bg-brand/10 text-brand'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
        )
      }
    >
      <span
        className={clsx(
          'inline-flex h-2 w-2 shrink-0 rounded-full bg-current',
          collapsed && 'h-2.5 w-2.5',
        )}
      />
      {!collapsed && <span className="truncate">{item.title}</span>}
    </NavLink>
  )
}
