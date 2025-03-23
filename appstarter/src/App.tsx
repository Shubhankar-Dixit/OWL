import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Hub from './pages/Hub'
import About from './pages/About'
import Courses from './pages/Courses'
import FAQ from './pages/FAQ'
import Documentation from './pages/Documentation'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/hub" element={<Hub />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/docs/:subject" element={<Documentation />} />
            <Route path="/docs/:subject/:topic" element={<Documentation />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App