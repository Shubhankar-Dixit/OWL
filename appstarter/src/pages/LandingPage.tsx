import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

function LandingPage() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  
  const phrases = [
    'Open World Learning',
    'Olympiad Level Content',
    'Free for Everyone',
    'Built with Love'
  ];

  return (
    <div className="app-container">
      <main>
        <section className="hero-section">
          <h1 className="hero-title terminal-text">
            <span 
              className="terminal-prompt owl-name" 
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
            >
              OWL
              {isTooltipVisible && (
                <div className="terminal-tooltip">
                  <div className="terminal-tooltip-header">
                    <span className="terminal-dot red"></span>
                    <span className="terminal-dot yellow"></span>
                    <span className="terminal-dot green"></span>
                    <span className="terminal-title">owl_info.txt</span>
                  </div>
                  <div className="terminal-tooltip-body">
                    {phrases.map((phrase, index) => (
                      <div key={index} className="terminal-line">
                        <span className="terminal-prompt-symbol">$</span> {phrase}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </span>
          </h1>
          <p className="hero-subtitle terminal-text">
            Democratizing education through <span className="highlight-advanced">advanced</span> learning resources that are <span className="highlight-free">free</span>, <span className="highlight-accessible">accessible</span>, and <span className="highlight-open">open</span> to everyone.
          </p>
          <div className="terminal-section">
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
            <Link to="/hub" className="cta-primary">Enter OWL Hub</Link>
            <Link to="/courses" className="cta-secondary">Explore Courses</Link>
          </div>
        </section>

        <section className="features-section container">
          <h2 className="terminal-text terminal-prompt">Why OWL?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3 className="feature-title">
                <span className="highlight-free">Free</span> Education
              </h3>
              <p className="feature-description terminal-text">
                No paywalls. No subscriptions. Just quality education available to everyone, everywhere.
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">
                <span className="highlight-accessible">Accessible</span> Learning
              </h3>
              <p className="feature-description terminal-text">
                Designed for all learning styles and abilities, with resources that adapt to your needs.
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">
                <span className="highlight-open">Open</span> Resources
              </h3>
              <p className="feature-description terminal-text">
                Community-driven content that's continuously improved and expanded.
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">
                <span className="highlight-advanced">Advanced</span> Concepts
              </h3>
              <p className="feature-description terminal-text">
                Deep dive into complex topics usually reserved for expensive courses or institutions.
              </p>
            </div>
          </div>
        </section>

        <section className="courses-section">
          <div className="container">
            <h2 className="terminal-text terminal-prompt">Available Courses</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3 className="feature-title">Advanced Physics</h3>
                <p className="feature-description terminal-text">
                  From quantum mechanics to astrophysics, explore the universe's fundamental laws.
                </p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Competitive Programming</h3>
                <p className="feature-description terminal-text">
                  Master algorithms, data structures, and problem-solving techniques for competitions.
                </p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Computer Science Fundamentals</h3>
                <p className="feature-description terminal-text">
                  Build a solid foundation in CS principles, from theory to practical applications.
                </p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Competitive Mathematics</h3>
                <p className="feature-description terminal-text">
                  Develop mathematical thinking and techniques used in olympiads and competitions.
                </p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">AI for Olympiads</h3>
                <p className="feature-description terminal-text">
                  Learn how to leverage AI to enhance your preparation for academic competitions.
                </p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Coming Soon...</h3>
                <p className="feature-description terminal-text">
                  More courses are being developed. Join our community to suggest new topics.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
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
