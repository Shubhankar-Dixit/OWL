import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

// Matrix Rain component for the background animation
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d'); // Fixed: Added quotes around '2d'
    if (!ctx) return;
    
    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Characters to display (only 0s and 1s for binary rain)
    const characters = '01';
    
    // Column settings
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Initialize drops at random positions above the screen
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }
    
    // Function to handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation function
    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Green text for the matrix effect
      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < columns; i++) {
        // Get a random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Move the drop down
        drops[i]++;
        
        // Send the drop back to the top randomly after it goes off screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }
      
      requestAnimationFrame(draw); // Fixed: Corrected function name
    };
    
    // Start the animation
    const animationId = requestAnimationFrame(draw); // Fixed: Corrected function name
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId); // Fixed: Corrected function name
      window.removeEventListener('resize', handleResize); // Fixed: Corrected method name
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="matrix-rain"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, // Changed from -1 to 0
        opacity: 0.2,
        pointerEvents: 'none',
      }}
    />
  );
}

function LandingPage() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  
  const phrases = [
    'Open World Learning',
    'Olympiad Level Content',
    'Free for Everyone',
    'Built with Love'
  ];

  return (
    <div className="app-container" style={{ background: 'transparent', position: 'relative' }}>
      <MatrixRain />
      <main style={{ 
        position: 'relative', 
        zIndex: 1,
        background: 'transparent' /* Ensure main has transparent background */
      }}> 
        <section className="hero-section" style={{ background: 'transparent' /* Ensure section has transparent background */ }}>
          <h1 className="hero-title terminal-text" style={{ background: 'transparent' /* Ensure title has transparent background */ }}>
            <span 
              className="terminal-prompt owl-name" 
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
              style={{ 
                position: 'relative',
                background: 'transparent', /* Ensure OWL text has transparent background */
                color: '#fff' /* Ensure text is white for better visibility */
              }}
            >
              OWL
              {isTooltipVisible && (
                <div className="terminal-tooltip" style={{ zIndex: 10 /* Added: zIndex */ }}> 
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
          <p className="hero-subtitle terminal-text" style={{ background: 'transparent' /* Ensure subtitle has transparent background */ }}>
            Democratizing education through <span className="highlight-advanced">advanced</span> learning resources that are <span className="highlight-free">free</span>, <span className="highlight-accessible">accessible</span>, and <span className="highlight-open">open</span> to everyone.
          </p>
          <div className="terminal-section" style={{ background: 'rgba(0, 0, 0, 0.3)' /* Very light background for better readability */ }}>
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

        <section className="features-section container" style={{ background: 'rgba(0, 0, 0, 0.5)' /* Semi-transparent background */ }}>
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

        <section className="courses-section" style={{ background: 'rgba(0, 0, 0, 0.5)' /* Semi-transparent background */ }}>
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
                <h3 className="feature-title">Competitive Programming</h3> {/* Fixed: Closing tag */}
                <p className="feature-description terminal-text">
                  Master algorithms, data structures, and problem-solving techniques for competitions.
                </p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Computer Science Fundamentals</h3> {/* Fixed: Closing tag */}
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
            </div> {/* Fixed: Closing tag */}
          </div>
        </section>
      </main>

      <footer className="footer" style={{ 
        position: 'relative', 
        zIndex: 1,
        background: 'rgba(0, 0, 0, 0.7)' /* Semi-transparent darker background for footer */
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
