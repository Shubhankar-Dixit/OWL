import { Link } from 'react-router-dom'
import '../App.css'

function Hub() {
  return (
    <div className="app-container">
      <div className="hub-container">
        <header className="hub-header">
          <div className="hub-logo terminal-text">
            <Link to="/" className="hub-home-link">OWL</Link>
          </div>
          <div className="hub-auth">
            <Link to="/login" className="hub-login-btn">Login</Link>
            <Link to="/signup" className="hub-signup-btn">Sign Up</Link>
          </div>
        </header>
        
        <main className="hub-main">
          <h1 className="terminal-text terminal-prompt">OWL Hub</h1>
          <p className="terminal-text">Welcome to the OWL Hub. Explore our resources and community.</p>
          
          <div className="hub-grid">
            <Link to="/courses" className="hub-card">
              <h2 className="hub-card-title">Courses</h2>
              <p className="hub-card-description terminal-text">
                Explore our <span className="highlight-advanced">advanced</span> courses in various subjects.
              </p>
            </Link>
            
            <Link to="/about" className="hub-card">
              <h2 className="hub-card-title">About Us</h2>
              <p className="hub-card-description terminal-text">
                Learn about our mission and the team behind OWL.
              </p>
            </Link>
            
            <Link to="/community" className="hub-card">
              <h2 className="hub-card-title">Community</h2>
              <p className="hub-card-description terminal-text">
                Join discussions and connect with other learners.
              </p>
            </Link>
            
            <Link to="/resources" className="hub-card">
              <h2 className="hub-card-title">Resources</h2>
              <p className="hub-card-description terminal-text">
                Access additional learning materials and tools.
              </p>
            </Link>
          </div>
        </main>
        
        <footer className="footer">
          <p className="terminal-text">
            OWL © {new Date().getFullYear()} | <span className="highlight-free">Free</span> • <span className="highlight-accessible">Accessible</span> • <span className="highlight-open">Open</span> • <span className="highlight-advanced">Advanced</span>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default Hub
