import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Hub from './pages/Hub'
import About from './pages/About'
import Courses from './pages/Courses'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

//comment