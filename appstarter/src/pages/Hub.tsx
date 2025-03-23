import { Link } from 'react-router-dom'
import '../App.css'
import ThemeToggle from '../components/ThemeToggle'
import { useTheme } from '../contexts/ThemeContext'

function Hub() {
  const { theme } = useTheme();
  
  // Common styling to ensure consistency
  const textStyle = {
    fontFamily: "'Fira Code', 'Source Code Pro', 'IBM Plex Mono', monospace",
    color: 'var(--text-color)'
  };
  
  const cardStyle = {
    backgroundColor: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--box-shadow)'
  };
  
  return (
    <div className="app-container">
      <div className="hub-container">
        {/* Header section with consistent styling */}
        <header className="hub-header" style={{ 
          backgroundColor: 'var(--header-bg)',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div className="hub-logo terminal-text">
            <Link to="/" className="hub-home-link" style={{ 
              color: 'var(--terminal-green)',
              fontFamily: "'Fira Code', 'Source Code Pro', 'IBM Plex Mono', monospace"
            }}>OWL</Link>
          </div>
          
          {/* Navigation with consistent styling */}
          <div className="hub-nav">
            <div className="docs-dropdown">
              <button className="docs-dropdown-btn terminal-text" style={{ 
                color: 'var(--text-color)',
                fontFamily: "'Fira Code', 'Source Code Pro', 'IBM Plex Mono', monospace"
              }}>
                Documentation
              </button>
              <div className="docs-dropdown-content" style={{
                backgroundColor: theme === 'light' ? 'var(--container-bg)' : '#1a1a1a',
                borderColor: theme === 'light' ? 'var(--border-color)' : '#333'
              }}>
                <Link to="/docs/physics" className="docs-dropdown-item terminal-text" style={{
                  color: theme === 'light' ? 'var(--text-color)' : '#e0e0e0'
                }}>Physics</Link>
                <Link to="/docs/competitive-programming" className="docs-dropdown-item terminal-text" style={{
                  color: theme === 'light' ? 'var(--text-color)' : '#e0e0e0'
                }}>Competitive Programming</Link>
                <Link to="/docs/mathematics" className="docs-dropdown-item terminal-text" style={{
                  color: theme === 'light' ? 'var(--text-color)' : '#e0e0e0'
                }}>Mathematics</Link>
              </div>
            </div>
          </div>
          
          {/* Auth section with consistent styling */}
          <div className="hub-auth" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ThemeToggle />
            <Link to="/login" className="hub-login-btn terminal-text" style={{
              color: theme === 'light' ? 'var(--text-color)' : '#e0e0e0',
              borderColor: theme === 'light' ? 'var(--border-color)' : '#444'
            }}>Login</Link>
            <Link to="/signup" className="hub-signup-btn terminal-text" style={{
              color: theme === 'light' ? 'var(--highlight-accessible)' : 'var(--color-highlight-accessible)',
              borderColor: theme === 'light' ? 'var(--highlight-accessible)' : 'var(--color-highlight-accessible)'
            }}>Sign Up</Link>
          </div>
        </header>
        
        {/* Main content with consistent styling */}
        <main className="hub-main">
          <h1 className="terminal-text terminal-prompt" style={textStyle}>OWL Hub</h1>
          <p className="terminal-text" style={textStyle}>
            Welcome to the OWL Hub. Explore our resources and community.
          </p>
          
          {/* Hub grid with consistent styling */}
          <div className="hub-grid">
            <Link to="/courses" className="hub-card" style={cardStyle}>
              <h2 className="hub-card-title">Courses</h2>
              <p className="hub-card-description terminal-text">
                Explore our <span className="highlight-advanced">advanced</span> courses in various subjects.
              </p>
            </Link>
            
            <Link to="/about" className="hub-card" style={cardStyle}>
              <h2 className="hub-card-title">About Us</h2>
              <p className="hub-card-description terminal-text">
                Learn about our mission and the team behind OWL.
              </p>
            </Link>
            
            <Link to="/community" className="hub-card" style={cardStyle}>
              <h2 className="hub-card-title">Community</h2>
              <p className="hub-card-description terminal-text">
                Join discussions and connect with other learners.
              </p>
            </Link>
            
            <Link to="/resources" className="hub-card" style={cardStyle}>
              <h2 className="hub-card-title">Resources</h2>
              <p className="hub-card-description terminal-text">
                Access additional learning materials and tools.
              </p>
            </Link>
          </div>
        </main>
        
        {/* Footer with consistent styling */}
        <footer className="footer" style={{
          backgroundColor: 'var(--footer-bg)',
          color: 'var(--text-color)'
        }}>
          <p className="terminal-text">
            OWL © {new Date().getFullYear()} | <span className="highlight-free">Free</span> • <span className="highlight-accessible">Accessible</span> • <span className="highlight-open">Open</span> • <span className="highlight-advanced">Advanced</span>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default Hub
