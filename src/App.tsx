import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { ThemeProvider } from '@/providers/ThemeProvider'
import Layout from '@/components/Layout'
import Index from './pages/Index'
import About from './pages/About'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vibe-ui-theme">
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
