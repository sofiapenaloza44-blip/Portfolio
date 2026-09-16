import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { CaseStudy } from './pages/CaseStudy'
import { CareerJourney } from './pages/CareerJourney'
import { NotFound } from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-dvh flex-col">
        <NavBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/career-journey" element={<CareerJourney />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
