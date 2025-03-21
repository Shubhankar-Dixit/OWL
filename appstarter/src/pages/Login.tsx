import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import '../App.css'

function Login() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    // If user is already logged in, redirect to hub
    if (user) {
      console.log('User already logged in, redirecting to hub')
      navigate('/hub')
    }
  }, [user, navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setLoading(true)
    setError(null)
    setSuccessMessage(null)
    
    try {
      console.log('Attempting to login with email:', email)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      
      console.log('Login successful for user:', data.user?.id)
      setSuccessMessage('Login successful! Redirecting to hub...')
      
      // Small delay to show success message
      setTimeout(() => {
        navigate('/hub')
      }, 1000)
    } catch (error: any) {
      console.error('Login error:', error)
      
      let errorMessage = 'An error occurred during login'
      
      if (error.message) {
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please try again.'
        } else {
          errorMessage = error.message
        }
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <div className="auth-container">
        <div className="auth-card terminal-section">
          <h1 className="terminal-text terminal-prompt">Login to OWL</h1>
          
          {error && (
            <div className="auth-error">
              <p className="terminal-text">{error}</p>
            </div>
          )}
          
          {successMessage && (
            <div className="auth-success">
              <p className="terminal-text">{successMessage}</p>
            </div>
          )}
          
          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label htmlFor="email" className="terminal-text terminal-prompt">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="terminal-text terminal-prompt">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="auth-input"
              />
            </div>
            
            <div className="auth-actions">
              <button type="submit" className="cta-primary" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <Link to="/hub" className="auth-back-link">
                Back to Hub
              </Link>
            </div>
          </form>
          
          <div className="auth-footer">
            <p className="terminal-text">
              Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
            </p>
            <p className="terminal-text">
              <Link to="/reset-password" className="auth-link">Forgot Password?</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
