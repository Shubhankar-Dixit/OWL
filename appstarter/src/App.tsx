import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Hub from './pages/Hub'
import About from './pages/About'
import Courses from './pages/Courses'
import FAQ from './pages/FAQ'
import { AuthProvider } from './contexts/AuthContext'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/hub" element={<Hub />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App