import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { TopNav } from '@/components/layout/TopNav'
import { Sidebar } from '@/components/layout/Sidebar'
import { lectureNavItems } from '@/data/lectures'

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      <TopNav
        onMenuButtonClick={() => setMobileOpen((open) => !open)}
        onCollapseButtonClick={() => setCollapsed((c) => !c)}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          items={lectureNavItems}
          collapsed={collapsed}
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
