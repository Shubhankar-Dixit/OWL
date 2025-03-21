import { Link } from 'react-router-dom'
import '../App.css'

function Courses() {
  return (
    <div className="app-container">
      <div className="hub-container">
        <header className="hub-header">
          <div className="hub-logo terminal-text">
            <Link to="/hub" className="hub-home-link">OWL</Link>
          </div>
          <div className="hub-nav">
            <Link to="/hub" className="hub-nav-link">Hub</Link>
            <Link to="/courses" className="hub-nav-link active">Courses</Link>
            <Link to="/about" className="hub-nav-link">About</Link>
          </div>
        </header>
        
        <main className="courses-main container">
          <h1 className="terminal-text terminal-prompt">Courses</h1>
          <p className="terminal-text">
            Explore our <span className="highlight-free">free</span> and <span className="highlight-advanced">advanced</span> courses designed to help you master complex subjects.
          </p>
          
          <div className="course-categories">
            <div className="course-category">
              <h2 className="terminal-text terminal-prompt">Physics</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <h3 className="feature-title">Quantum Mechanics</h3>
                  <p className="feature-description terminal-text">
                    Dive into the fascinating world of quantum physics and understand the behavior of particles at the subatomic level.
                  </p>
                  <Link to="/courses/quantum-mechanics" className="course-link">Start Learning</Link>
                </div>
                <div className="feature-card">
                  <h3 className="feature-title">Astrophysics</h3>
                  <p className="feature-description terminal-text">
                    Explore the cosmos, from stars and galaxies to black holes and the expanding universe.
                  </p>
                  <Link to="/courses/astrophysics" className="course-link">Start Learning</Link>
                </div>
              </div>
            </div>
            
            <div className="course-category">
              <h2 className="terminal-text terminal-prompt">Competitive Programming</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <h3 className="feature-title">Algorithms Masterclass</h3>
                  <p className="feature-description terminal-text">
                    Learn advanced algorithms and problem-solving techniques used in competitive programming contests.
                  </p>
                  <Link to="/courses/algorithms" className="course-link">Start Learning</Link>
                </div>
                <div className="feature-card">
                  <h3 className="feature-title">Data Structures Deep Dive</h3>
                  <p className="feature-description terminal-text">
                    Master complex data structures and their applications in solving computational problems.
                  </p>
                  <Link to="/courses/data-structures" className="course-link">Start Learning</Link>
                </div>
              </div>
            </div>
            
            <div className="course-category">
              <h2 className="terminal-text terminal-prompt">Competitive Mathematics</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <h3 className="feature-title">Olympiad Number Theory</h3>
                  <p className="feature-description terminal-text">
                    Develop mathematical thinking and techniques for solving number theory problems in competitions.
                  </p>
                  <Link to="/courses/number-theory" className="course-link">Start Learning</Link>
                </div>
                <div className="feature-card">
                  <h3 className="feature-title">Combinatorics</h3>
                  <p className="feature-description terminal-text">
                    Explore the art of counting, arrangement, and combination in this essential course for math competitions.
                  </p>
                  <Link to="/courses/combinatorics" className="course-link">Start Learning</Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="cta-buttons">
            <Link to="/hub" className="cta-primary">Back to Hub</Link>
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

export default Courses
