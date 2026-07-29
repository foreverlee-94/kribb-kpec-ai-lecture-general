import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { HomePage } from '@/pages/HomePage'
import { LecturePage } from '@/pages/LecturePage'
import { SlidesPage } from '@/pages/SlidesPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="lectures/:lectureId" element={<LecturePage />} />
        <Route path="lectures/:lectureId/slides/:slideIndex" element={<SlidesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
