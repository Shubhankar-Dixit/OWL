import { Link } from 'react-router-dom'
import '../App.css'

function About() {
  return (
    <div className="app-container">
      <div className="hub-container">
        <header className="hub-header">
          <div className="hub-logo terminal-text">
            <Link to="/hub" className="hub-home-link">OWL</Link>
          </div>
          <div className="hub-nav">
            <Link to="/hub" className="hub-nav-link">Hub</Link>
            <Link to="/courses" className="hub-nav-link">Courses</Link>
            <Link to="/about" className="hub-nav-link active">About</Link>
          </div>
        </header>
        
        <main className="about-main container">
          <h1 className="terminal-text terminal-prompt">About OWL</h1>
          <div className="terminal-section">
            <p className="terminal-text">
              OWL (Accessible Learning & Innovation System) was founded with a mission to democratize education by making advanced concepts in subjects like physics, competitive programming, computer science, competitive mathematics, and AI for olympiads accessible to everyone for free.
            </p>
            <p className="terminal-text">
              We believe that knowledge should not be gatekept behind paywalls, and that everyone deserves access to high-quality educational resources regardless of their financial situation or background.
            </p>
          </div>
          
          <h2 className="terminal-text terminal-prompt">Our Team</h2>
          <div className="team-grid">
            <div className="team-member terminal-section">
              <h3 className="team-member-name">Shubhankar Dixit</h3>
              <p className="team-member-role terminal-text">Co-Founder & Lead Developer</p>
              <p className="team-member-bio terminal-text">
                Shubhankar is passionate about making advanced education accessible to everyone. With a background in computer science and competitive programming, he leads the technical development of OWL and contributes to the programming curriculum.
              </p>
            </div>
            
            <div className="team-member terminal-section">
              <h3 className="team-member-name">Georgiy Derkachev</h3>
              <p className="team-member-role terminal-text">Co-Founder & Content Director</p>
              <p className="team-member-bio terminal-text">
                Georgiy brings his expertise in physics and mathematics to OWL. He oversees the development of course content and ensures that complex concepts are presented in an accessible and engaging way for all learners.
              </p>
            </div>
          </div>
          
          <h2 className="terminal-text terminal-prompt">Our Vision</h2>
          <div className="terminal-section">
            <p className="terminal-text">
              We envision a world where advanced education is not a privilege but a right. OWL aims to be the go-to platform for learners who want to delve deep into challenging subjects without financial barriers.
            </p>
            <p className="terminal-text">
              By combining cutting-edge technology with expert-created content, we're building a community where knowledge flows freely and learners can reach their full potential.
            </p>
          </div>
          
          <div className="cta-buttons">
            <Link to="/hub" className="cta-primary">Back to Hub</Link>
            <Link to="/courses" className="cta-secondary">Explore Courses</Link>
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

export default About
