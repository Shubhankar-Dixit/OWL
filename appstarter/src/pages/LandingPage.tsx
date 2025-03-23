import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import ThemeToggle from '../components/ThemeToggle'
import MatrixRain from '../components/MatrixRain'
import { useTheme } from '../contexts/ThemeContext'

function LandingPage() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const { theme } = useTheme();
  
  const phrases = [
    'Open World Learning',
    'Olympiad Level Content',
    'Free for Everyone',
    'Built with Love'
  ];

  // Common style objects for consistency
  const textStyle = {
    fontFamily: "'Fira Code', 'Source Code Pro', 'IBM Plex Mono', monospace",
    color: 'var(--text-color)'
  };
  
  const sectionStyle = {
    backgroundColor: theme === 'light' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(0, 0, 0, 0.5)',
    borderRadius: '6px',
    padding: '2rem',
    marginBottom: '2rem',
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--box-shadow)'
  };

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      {/* MatrixRain is a direct child of app-container */}
      <MatrixRain />
      
      {/* Theme toggle */}
      <ThemeToggle />
      
      {/* Main content */}
      <main style={{ position: 'relative', zIndex: 1 }}> 
        <section className="hero-section">
          <h1 className="hero-title terminal-text" style={textStyle}>
            <span 
              className="terminal-prompt owl-name" 
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
              style={{ position: 'relative', color: 'var(--terminal-green)', fontWeight: 'bold' }}
            >
              OWL
              {isTooltipVisible && (
                <div className="terminal-tooltip" style={{ 
                  zIndex: 10,
                  backgroundColor: theme === 'light' ? 'var(--container-bg)' : '#0c0c0c',
                  borderColor: theme === 'light' ? 'var(--border-color)' : '#333'
                }}> 
                  <div className="terminal-tooltip-header" style={{
                    backgroundColor: theme === 'light' ? 'var(--terminal-header-bg)' : '#1a1a1a',
                    borderColor: theme === 'light' ? 'var(--border-color)' : '#333'
                  }}>
                    <span className="terminal-dot red"></span>
                    <span className="terminal-dot yellow"></span>
                    <span className="terminal-dot green"></span>
                    <span className="terminal-title" style={{
                      color: theme === 'light' ? 'var(--text-color)' : '#aaa'
                    }}>owl_info.txt</span>
                  </div>
                  <div className="terminal-tooltip-body">
                    {phrases.map((phrase, index) => (
                      <div key={index} className="terminal-line" style={{
                        color: theme === 'light' ? 'var(--text-color)' : 'inherit',
                        borderColor: theme === 'light' ? 'var(--border-color)' : '#333'
                      }}>
                        <span className="terminal-prompt-symbol" style={{
                          color: theme === 'light' ? 'var(--terminal-green)' : 'var(--color-terminal-green)'
                        }}>$</span> {phrase}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </span>
          </h1>
          <p className="hero-subtitle terminal-text" style={textStyle}>
            Democratizing education through <span className="highlight-advanced">advanced</span> learning resources that are <span className="highlight-free">free</span>, <span className="highlight-accessible">accessible</span>, and <span className="highlight-open">open</span> to everyone.
          </p>
          
          <div className="terminal-section" style={{ 
            background: theme === 'light' ? 'rgba(0, 0, 0, 0.03)' : 'rgba(0, 0, 0, 0.3)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            padding: '1.5rem',
            fontFamily: "'Fira Code', 'Source Code Pro', 'IBM Plex Mono', monospace",
            boxShadow: 'var(--box-shadow)'
          }}>
            <p className="terminal-text terminal-prompt">
              Breaking barriers in education by providing high-quality resources for:
            </p>
            <ul className="terminal-text" style={{ listStyleType: 'none', padding: '0.5rem 0 0.5rem 1rem' }}>
              <li>• Physics</li>
              <li>• Competitive Programming</li>
              <li>• Computer Science</li>
              <li>• Competitive Mathematics</li>
              <li>• AI for Olympiads</li>
            </ul>
          </div>
          <div className="cta-buttons">
            <Link to="/hub" className="cta-primary" style={{ 
              backgroundColor: theme === 'light' ? 'var(--highlight-open)' : 'var(--background-color)',
              color: theme === 'light' ? 'white' : 'var(--color-highlight-accessible)',
              border: theme === 'light' ? 'none' : '1px solid var(--color-highlight-accessible)',
              fontFamily: "'Fira Code', 'Source Code Pro', 'IBM Plex Mono', monospace",
              fontWeight: 500,
              boxShadow: 'var(--box-shadow)'
            }}>Enter OWL Hub</Link>
            <Link to="/courses" className="cta-secondary" style={{ 
              backgroundColor: 'transparent',
              color: 'var(--text-color)',
              border: '1px solid var(--border-color)',
              fontFamily: "'Fira Code', 'Source Code Pro', 'IBM Plex Mono', monospace",
              fontWeight: 500,
              boxShadow: 'var(--box-shadow)'
            }}>Explore Courses</Link>
          </div>
        </section>

        <section className="features-section container" style={sectionStyle}>
          <h2 className="terminal-text terminal-prompt" style={textStyle}>Why OWL?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3 className="feature-title">
                <span className="highlight-free">Free</span> Education
              </h3>
              <p className="feature-description terminal-text" style={textStyle}>
                No paywalls. No subscriptions. Just quality education available to everyone, everywhere.
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">
                <span className="highlight-accessible">Accessible</span> Learning
              </h3>
              <p className="feature-description terminal-text" style={textStyle}>
                Designed for all learning styles and abilities, with resources that adapt to your needs.
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">
                <span className="highlight-open">Open</span> Resources
              </h3>
              <p className="feature-description terminal-text" style={textStyle}>
                Community-driven content that's continuously improved and expanded.
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">
                <span className="highlight-advanced">Advanced</span> Concepts
              </h3>
              <p className="feature-description terminal-text" style={textStyle}>
                Deep dive into complex topics usually reserved for expensive courses or institutions.
              </p>
            </div>
          </div>
        </section>

        <section className="courses-section" style={sectionStyle}>
          <div className="container">
            <h2 className="terminal-text terminal-prompt" style={textStyle}>Available Courses</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3 className="feature-title">Advanced Physics</h3>
                <p className="feature-description terminal-text" style={textStyle}>
                  From quantum mechanics to astrophysics, explore the universe's fundamental laws.
                </p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Competitive Programming</h3>
                <p className="feature-description terminal-text" style={textStyle}>
                  Master algorithms, data structures, and problem-solving techniques for competitions.
                </p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Computer Science Fundamentals</h3>
                <p className="feature-description terminal-text" style={textStyle}>
                  Build a solid foundation in CS principles, from theory to practical applications.
                </p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Competitive Mathematics</h3>
                <p className="feature-description terminal-text" style={textStyle}>
                  Develop mathematical thinking and techniques used in olympiads and competitions.
                </p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">AI for Olympiads</h3>
                <p className="feature-description terminal-text" style={textStyle}>
                  Learn how to leverage AI to enhance your preparation for academic competitions.
                </p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Coming Soon...</h3>
                <p className="feature-description terminal-text" style={textStyle}>
                  More courses are being developed. Join our community to suggest new topics.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" style={{ 
        position: 'relative', 
        zIndex: 1,
        background: theme === 'light' ? 'var(--footer-bg)' : 'rgba(0, 0, 0, 0.7)',
        color: 'var(--text-color)',
        fontFamily: "'Fira Code', 'Source Code Pro', 'IBM Plex Mono', monospace",
      }}> 
        <p className="terminal-text">
          OWL © {new Date().getFullYear()} | <span className="highlight-free">Free</span> • <span className="highlight-accessible">Accessible</span> • <span className="highlight-open">Open</span> • <span className="highlight-advanced">Advanced</span>
        </p>
        <p className="terminal-text footer-links">
          <Link to="/faq" className="footer-link">FAQ</Link>
        </p>
      </footer>
    </div>
  )
}

export default LandingPage
