import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { ThemeProvider } from '@/providers/ThemeProvider'
import Index from './pages/Index'
import About from './pages/About'
import { Users } from './pages/Users'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vibe-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
