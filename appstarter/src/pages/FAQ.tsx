import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

function FAQ() {
  const [currentCommand, setCurrentCommand] = useState('')
  const [terminalHistory, setTerminalHistory] = useState<Array<{type: string, content: string | React.ReactNode}>>([
    { type: 'output', content: 'Welcome to OWL FAQ Terminal! Type "help" to see available commands.' },
  ])

  const faqData = [
    {
      command: 'about',
      question: 'What is OWL?',
      answer: 'OWL (Open World Learning) is a platform dedicated to democratizing education by providing free, accessible, and advanced learning resources for everyone. We focus on subjects like physics, competitive programming, mathematics, and more.'
    },
    {
      command: 'cost',
      question: 'How much does OWL cost?',
      answer: 'OWL is completely free. We believe that quality education should be accessible to everyone regardless of financial situation. There are no subscriptions, paywalls, or hidden fees.'
    },
    {
      command: 'courses',
      question: 'What courses do you offer?',
      answer: 'We offer courses in Advanced Physics, Competitive Programming, Computer Science Fundamentals, Competitive Mathematics, and AI for Olympiads. We are continuously expanding our course offerings based on community needs.'
    },
    {
      command: 'join',
      question: 'How do I join OWL?',
      answer: 'You can create a free account by clicking on the "Sign Up" button in the hub. Registration takes just a minute, and you\'ll have immediate access to all our resources.'
    },
    {
      command: 'contribute',
      question: 'Can I contribute to OWL?',
      answer: 'Yes! We welcome contributions from the community. Whether you\'re an expert in a subject, a developer, or just passionate about education, there are many ways to get involved. Contact us through the platform for more information.'
    },
    {
      command: 'team',
      question: 'Who is behind OWL?',
      answer: 'OWL was founded by Shubhankar Dixit and Georgiy Derkachev, with a vision to make advanced education accessible to everyone. Our team includes educators, developers, and subject matter experts dedicated to creating high-quality learning resources.'
    }
  ]

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const trimmedCommand = currentCommand.trim().toLowerCase()
    const newHistory = [...terminalHistory, { type: 'command', content: `> ${currentCommand}` }]
    
    if (trimmedCommand === 'help') {
      newHistory.push({ 
        type: 'output', 
        content: (
          <div>
            <p>Available commands:</p>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {faqData.map(faq => (
                <li key={faq.command}><span className="highlight-accessible">{faq.command}</span> - {faq.question}</li>
              ))}
              <li><span className="highlight-accessible">clear</span> - Clear the terminal</li>
              <li><span className="highlight-accessible">help</span> - Show this help message</li>
              <li><span className="highlight-accessible">home</span> - Go back to homepage</li>
              <li><span className="highlight-accessible">all</span> - Show all FAQ questions and answers</li>
            </ul>
          </div>
        ) 
      })
    } else if (trimmedCommand === 'clear') {
      setTerminalHistory([{ type: 'output', content: 'Terminal cleared. Type "help" to see available commands.' }])
      setCurrentCommand('')
      return
    } else if (trimmedCommand === 'home') {
      window.location.href = '/'
      return
    } else if (trimmedCommand === 'all') {
      newHistory.push({ 
        type: 'output', 
        content: (
          <div>
            {faqData.map(faq => (
              <div key={faq.command} style={{ marginBottom: '1rem' }}>
                <p><span className="highlight-accessible">Q: {faq.question}</span></p>
                <p>A: {faq.answer}</p>
              </div>
            ))}
          </div>
        ) 
      })
    } else {
      const faqItem = faqData.find(item => item.command === trimmedCommand)
      if (faqItem) {
        newHistory.push({ 
          type: 'output', 
          content: (
            <div>
              <p><span className="highlight-accessible">Q: {faqItem.question}</span></p>
              <p>A: {faqItem.answer}</p>
            </div>
          ) 
        })
      } else {
        newHistory.push({ 
          type: 'output', 
          content: `Command not found: ${trimmedCommand}. Type "help" to see available commands.` 
        })
      }
    }
    
    setTerminalHistory(newHistory)
    setCurrentCommand('')
  }

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
            <Link to="/about" className="hub-nav-link">About</Link>
            <Link to="/faq" className="hub-nav-link active">FAQ</Link>
          </div>
        </header>
        
        <main className="faq-main container">
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
              </div>
              <div className="terminal-title">OWL FAQ Terminal</div>
            </div>
            <div className="terminal-body">
              <div className="terminal-output">
                {terminalHistory.map((item, index) => (
                  <div key={index} className={`terminal-line ${item.type}`}>
                    {typeof item.content === 'string' ? item.content : item.content}
                  </div>
                ))}
              </div>
              <form onSubmit={handleCommandSubmit} className="terminal-input-container">
                <span className="terminal-prompt-symbol">$</span>
                <input
                  type="text"
                  className="terminal-input"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  autoFocus
                  placeholder="Type a command (try 'help')"
                />
              </form>
            </div>
          </div>
          
          <div className="faq-suggestions">
            <h3 className="terminal-text terminal-prompt">Quick Commands</h3>
            <div className="faq-commands-grid">
              {faqData.map(faq => (
                <button 
                  key={faq.command} 
                  className="faq-command-btn"
                  onClick={() => {
                    setCurrentCommand(faq.command)
                    setTimeout(() => {
                      handleCommandSubmit({ preventDefault: () => {} } as React.FormEvent)
                    }, 100)
                  }}
                >
                  {faq.command}
                </button>
              ))}
              <button 
                className="faq-command-btn"
                onClick={() => {
                  setCurrentCommand('help')
                  setTimeout(() => {
                    handleCommandSubmit({ preventDefault: () => {} } as React.FormEvent)
                  }, 100)
                }}
              >
                help
              </button>
              <button 
                className="faq-command-btn"
                onClick={() => {
                  setCurrentCommand('clear')
                  setTimeout(() => {
                    handleCommandSubmit({ preventDefault: () => {} } as React.FormEvent)
                  }, 100)
                }}
              >
                clear
              </button>
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
          <p className="terminal-text footer-links">
            <Link to="/faq" className="footer-link">FAQ</Link>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default FAQ
