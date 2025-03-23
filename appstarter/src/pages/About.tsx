import { Link } from 'react-router-dom'
import '../App.css'
import { useState, useEffect, useRef, ReactNode } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import ThemeToggle from '../components/ThemeToggle'

// Define types for component props
interface TerminalTextProps {
  text: string;
  typingSpeed?: number;
  startDelay?: number;
  onComplete?: () => void;
}

// New interface for sequential text typing
interface SequentialTerminalTextProps {
  texts: string[];
  typingSpeed?: number;
  startDelay?: number;
  delayBetween?: number;
  onComplete?: () => void;
}

// Define types for CommandTyping props
interface CommandTypingProps {
  command: string;
  typingSpeed?: number;
  startDelay?: number;
  onComplete?: () => void;
  autoStart?: boolean;
}

// Terminal command typing animation component
const CommandTyping = ({ command, typingSpeed = 70, startDelay = 0, onComplete, autoStart = false }: CommandTypingProps) => {
  const [displayedCommand, setDisplayedCommand] = useState('');
  const [startTyping, setStartTyping] = useState(autoStart);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setStartTyping(true), startDelay);
    return () => clearTimeout(timeoutId);
  }, [startDelay]);

  useEffect(() => {
    if (!startTyping) return;
    
    if (displayedCommand.length < command.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedCommand(command.substring(0, displayedCommand.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeoutId);
    } else if (!completed) {
      setCompleted(true);
      if (onComplete) {
        setTimeout(() => onComplete(), 300);
      }
    }
  }, [displayedCommand, command, typingSpeed, startTyping, completed, onComplete]);

  return (
    <div className="terminal-line">
      <span className="terminal-prompt-symbol">$</span> {displayedCommand}
      {!completed && <span className="cursor">█</span>}
    </div>
  );
};

// Terminal typing animation component
const TerminalText = ({ text, typingSpeed = 30, startDelay = 0, onComplete }: TerminalTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [startTyping, setStartTyping] = useState(false);
  const [completed, setCompleted] = useState(false);
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => setStartTyping(true), startDelay);
    return () => clearTimeout(timeoutId);
  }, [startDelay]);

  useEffect(() => {
    if (!startTyping) return;
    
    if (displayedText.length < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(text.substring(0, displayedText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeoutId);
    } else if (!completed) {
      setCompleted(true);
      if (onComplete) {
        setTimeout(() => onComplete(), 300);
      }
    }
  }, [displayedText, text, typingSpeed, startTyping, completed, onComplete]);

  return (
    <p className="terminal-text" ref={containerRef}>
      {displayedText}
      {!completed && <span className="cursor">█</span>}
    </p>
  );
};

// Sequential Terminal Text component that types multiple texts one after another
const SequentialTerminalText = ({ 
  texts, 
  typingSpeed = 30, 
  startDelay = 0, 
  delayBetween = 800,
  onComplete 
}: SequentialTerminalTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleTextComplete = () => {
    if (currentIndex < texts.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, delayBetween);
    } else if (onComplete) {
      setTimeout(() => onComplete(), 500);
    }
  };
  
  return (
    <>
      {texts.slice(0, currentIndex + 1).map((text, index) => (
        <TerminalText
          key={index}
          text={text}
          typingSpeed={typingSpeed}
          startDelay={index === 0 ? startDelay : 0}
          onComplete={index === currentIndex ? handleTextComplete : undefined}
        />
      ))}
    </>
  );
};

// Define types for TerminalSection props
interface TerminalSectionProps {
  title?: string;
  children: ReactNode;
  command?: string;
  isVisible: boolean;
  onCommandComplete?: () => void;
}

// Terminal section with reveal animation
const TerminalSection = ({ title, children, command, isVisible, onCommandComplete }: TerminalSectionProps) => {
  const [showContent, setShowContent] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Only show content after command is completed
  const handleCommandComplete = () => {
    setShowContent(true);
  };
  
  // If no command is provided, show content immediately when visible
  useEffect(() => {
    if (isVisible && !command && !showContent) {
      setShowContent(true);
    }
  }, [isVisible, command, showContent]);

  if (!isVisible) return null;

  return (
    <div className="terminal-section-container visible" ref={sectionRef}>
      {command && (
        <CommandTyping 
          command={command}
          autoStart={true}
          onComplete={handleCommandComplete}
        />
      )}
      
      {title && showContent && (
        <h2 className="terminal-text terminal-prompt">
          {title}
        </h2>
      )}
      
      {showContent && (
        <div className="terminal-section fade-in">
          {children}
          {/* Adding a hidden element with onAnimationEnd to ensure the section is fully rendered */}
          <div className="section-complete-trigger" 
               style={{ display: 'none' }} 
               onAnimationEnd={() => {
                 if (!command && onCommandComplete) {
                   setTimeout(() => onCommandComplete(), 300);
                 }
               }}></div>
        </div>
      )}
    </div>
  );
};

function About() {
  const [showContent, setShowContent] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const { theme } = useTheme();
  
  useEffect(() => {
    // Simulate terminal startup
    setTimeout(() => setShowContent(true), 500);
  }, []);

  // Sequence management for sequential sections
  const activateNextSection = () => {
    console.log("Activating next section:", activeSection + 1);
    setActiveSection(prev => prev + 1);
  };

  // For debugging
  useEffect(() => {
    console.log("Active section changed to:", activeSection);
  }, [activeSection]);

  // Add light mode styles conditionally
  const terminalStyles = {
    backgroundColor: theme === 'light' ? 'var(--terminal-bg)' : 'var(--terminal-bg)',
    boxShadow: theme === 'light' ? '0 10px 20px var(--shadow-color)' : '0 10px 20px var(--shadow-color)',
    border: `1px solid var(--border-color)`,
  };
  
  const terminalHeaderStyles = {
    backgroundColor: theme === 'light' ? 'var(--terminal-header-bg)' : 'var(--terminal-header-bg)',
    borderBottom: `1px solid var(--border-color)`,
  };
  
  const terminalContentStyles = {
    backgroundColor: theme === 'light' ? 'var(--terminal-bg)' : 'var(--terminal-bg)',
    color: theme === 'light' ? 'var(--text-color)' : 'var(--terminal-text)',
    fontFamily: "'Fira Code', 'Source Code Pro', 'IBM Plex Mono', monospace",
  };

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
          <div className="hub-auth" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ThemeToggle />
          </div>
        </header>
        
        <main className="about-main container">
          {showContent && (
            <>
              <div className="terminal-window" style={terminalStyles}>
                <div className="terminal-header" style={terminalHeaderStyles}>
                  <div className="terminal-buttons">
                    <span className="terminal-button close"></span>
                    <span className="terminal-button minimize"></span>
                    <span className="terminal-button maximize"></span>
                  </div>
                  <div className="terminal-title">about.owl — bash</div>
                </div>
                <div className="terminal-content" style={terminalContentStyles}>
                  {/* Initial Command */}
                  <CommandTyping 
                    command="cat about.owl"
                    autoStart={true}
                    onComplete={() => setTimeout(() => activateNextSection(), 300)}
                  />
                  
                  {activeSection >= 1 && (
                    <h1 
                      className="terminal-text terminal-prompt animate-text"
                      onAnimationEnd={() => setTimeout(() => activateNextSection(), 500)}
                    >
                      About OWL
                    </h1>
                  )}
                  
                  {/* Introduction Section */}
                  <TerminalSection 
                    command="cat introduction.txt"
                    isVisible={activeSection >= 2}
                    onCommandComplete={() => {/* Will be triggered by SequentialTerminalText */}}
                  >
                    <SequentialTerminalText
                      texts={[
                        "OWL (Open World Learning) was founded with a mission to democratize education by making advanced concepts in subjects like physics, competitive programming, computer science, competitive mathematics, and AI for olympiads accessible to everyone for free.",
                        "We believe that knowledge should not be gatekept behind paywalls, and that everyone deserves access to high-quality educational resources regardless of their financial situation or background."
                      ]}
                      typingSpeed={30}
                      delayBetween={800}
                      onComplete={() => setTimeout(() => activateNextSection(), 1000)}
                    />
                  </TerminalSection>
                  
                  {/* Team Section */}
                  <TerminalSection 
                    title="Our Team"
                    command="ls -la team/"
                    isVisible={activeSection >= 3}
                    onCommandComplete={() => {/* Will be triggered by team member text completion */}}
                  >
                    <div className="team-grid">
                      <div className="team-member terminal-card">
                        <h3 className="team-member-name">Shubhankar Dixit</h3>
                        <p className="team-member-role terminal-text">Co-Founder & Lead Developer</p>
                        <TerminalText 
                          text="Shubhankar is passionate about making advanced education accessible to everyone. With a background in computer science and competitive programming, he leads the technical development of OWL and contributes to the programming curriculum."
                          typingSpeed={20}
                        />
                      </div>
                      
                      <div className="team-member terminal-card">
                        <h3 className="team-member-name">Georgiy Derkachev</h3>
                        <p className="team-member-role terminal-text">Co-Founder & Content Director</p>
                        <TerminalText 
                          text="Georgiy brings his expertise in physics and mathematics to OWL. He oversees the development of course content and ensures that complex concepts are presented in an accessible and engaging way for all learners."
                          typingSpeed={20}
                          startDelay={1500}
                          onComplete={() => setTimeout(() => activateNextSection(), 1000)}
                        />
                      </div>
                    </div>
                  </TerminalSection>
                  
                  {/* Vision Section */}
                  <TerminalSection 
                    title="Our Vision"
                    command="grep -i 'vision' manifesto.txt"
                    isVisible={activeSection >= 4}
                    onCommandComplete={() => {/* Will be triggered by SequentialTerminalText */}}
                  >
                    <SequentialTerminalText
                      texts={[
                        "We envision a world where advanced education is not a privilege but a right. OWL aims to be the go-to platform for learners who want to delve deep into challenging subjects without financial barriers.",
                        "By combining cutting-edge technology with expert-created content, we're building a community where knowledge flows freely and learners can reach their full potential."
                      ]}
                      typingSpeed={30}
                      delayBetween={800}
                      onComplete={() => setTimeout(() => activateNextSection(), 1000)}
                    />
                  </TerminalSection>
                  
                  {/* Final command prompt */}
                  {activeSection >= 5 && (
                    <div className="terminal-line">
                      <span className="terminal-prompt-symbol">$</span> <span className="blink-cursor">█</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="cta-buttons">
                <Link to="/hub" className="cta-primary">Back to Hub</Link>
                <Link to="/courses" className="cta-secondary">Explore Courses</Link>
              </div>
            </>
          )}
        </main>
        
        <footer className="footer">
          <p className="terminal-text">
            OWL © {new Date().getFullYear()} | <span className="highlight-free">Free</span> • <span className="highlight-accessible">Accessible</span> • <span className="highlight-open">Open</span> • <span className="highlight-advanced">Advanced</span>
          </p>
        </footer>
      </div>

      <style>
        {`
        .terminal-window {
          background-color: var(--terminal-bg);
          border-radius: 6px;
          box-shadow: 0 10px 20px var(--shadow-color);
          margin-bottom: 2rem;
          overflow: hidden;
          border: 1px solid var(--border-color);
        }
        
        .terminal-header {
          background-color: var(--terminal-header-bg);
          padding: 8px 15px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }
        
        .terminal-buttons {
          display: flex;
          gap: 8px;
          margin-right: 15px;
        }
        
        .terminal-button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        
        .terminal-button.close { background-color: var(--terminal-dot-red); }
        .terminal-button.minimize { background-color: var(--terminal-dot-yellow); }
        .terminal-button.maximize { background-color: var(--terminal-dot-green); }
        
        .terminal-title {
          color: var(--text-color);
          font-size: 0.9rem;
          font-family: 'Fira Code', 'Source Code Pro', 'IBM Plex Mono', monospace;
        }
        
        .terminal-content {
          padding: 20px;
          color: var(--terminal-text);
          font-family: 'Fira Code', 'Source Code Pro', 'IBM Plex Mono', monospace;
        }
        
        .terminal-line {
          margin-bottom: 15px;
          font-family: 'Fira Code', 'Source Code Pro', 'IBM Plex Mono', monospace;
          line-height: 1.4;
          color: var(--text-color);
        }
        
        .terminal-prompt-symbol {
          color: var(--terminal-green);
          margin-right: 8px;
          font-weight: bold;
        }
        
        .terminal-command {
          color: var(--highlight-open);
        }
        
        .cursor {
          display: inline-block;
          width: 0.6em;
          height: 1em;
          vertical-align: text-bottom;
          background-color: var(--text-color);
          color: transparent;
          animation: blink 1s step-end infinite;
          margin-left: 2px;
        }
        
        .blink-cursor {
          display: inline-block;
          width: 0.6em;
          height: 1em;
          vertical-align: text-bottom;
          background-color: var(--text-color);
          animation: blink 1s step-end infinite;
        }
        
        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .terminal-section-container {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          margin-bottom: 2rem;
        }
        
        .terminal-section-container.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .terminal-section {
          opacity: 0;
          transition: opacity 1s ease;
          padding: 15px;
          background-color: rgba(255,255,255,0.05);
          border-radius: 4px;
          margin-top: 10px;
        }
        
        .terminal-section.fade-in {
          opacity: 1;
        }
        
        .animate-text {
          animation: fadeIn 1s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .team-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 15px;
        }
        
        @media (max-width: 768px) {
          .team-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .team-member {
          padding: 15px;
          border: 1px solid #444;
          border-radius: 4px;
          background-color: rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }
        
        .team-member:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          background-color: rgba(0,0,0,0.3);
        }
        
        .team-member-name {
          color: var(--highlight-accessible);
          margin-bottom: 5px;
          font-weight: 600;
        }
        
        .team-member-role {
          color: var(--terminal-green);
          font-size: 0.9rem;
          margin-bottom: 10px;
          font-weight: 500;
        }

        /* Light mode adjustments */
        [data-theme="light"] .terminal-window {
          background-color: var(--terminal-bg);
          box-shadow: 0 10px 20px var(--shadow-color);
          border: 1px solid var(--border-color);
        }
        
        [data-theme="light"] .terminal-header {
          background-color: var(--terminal-header-bg);
          border-bottom: 1px solid var(--border-color);
        }
        
        [data-theme="light"] .terminal-content {
          color: var(--text-color);
        }
        
        [data-theme="light"] .terminal-line,
        [data-theme="light"] .terminal-text,
        [data-theme="light"] .team-member-role {
          color: var(--text-color);
        }
        
        [data-theme="light"] .terminal-prompt-symbol {
          color: var(--terminal-green);
        }
        
        [data-theme="light"] .team-member {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          box-shadow: 0 5px 15px var(--shadow-color);
        }
        
        [data-theme="light"] .team-member-name {
          color: var(--highlight-accessible);
        }
        
        [data-theme="light"] .terminal-section {
          background-color: rgba(212, 160, 23, 0.1);
          border: 1px solid var(--border-color);
        }
        `}
      </style>
    </div>
  )
}

export default About
