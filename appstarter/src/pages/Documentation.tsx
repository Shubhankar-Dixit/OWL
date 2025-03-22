import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import '../App.css'
import { Subjects, SubjectKey, Topic } from '../types/documentation'

function Documentation() {
  const { subject, topic } = useParams()
  const navigate = useNavigate()
  const [activeSubject, setActiveSubject] = useState<string>(subject || 'physics')
  const [activeTopic, setActiveTopic] = useState<string>(topic || '')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Define subjects and their topics
  const subjects: Subjects = {
    physics: {
      name: 'Physics',
      topics: [
        { id: 'mechanics', name: 'Mechanics' },
        { id: 'thermodynamics', name: 'Thermodynamics' },
        { id: 'quantum', name: 'Quantum Physics' }
      ]
    },
    'competitive-programming': {
      name: 'Competitive Programming',
      topics: [
        { id: 'algorithms', name: 'Algorithms' },
        { id: 'data-structures', name: 'Data Structures' },
        { id: 'dynamic-programming', name: 'Dynamic Programming' }
      ]
    },
    mathematics: {
      name: 'Mathematics',
      topics: [
        { id: 'calculus', name: 'Calculus' },
        { id: 'linear-algebra', name: 'Linear Algebra' },
        { id: 'discrete-math', name: 'Discrete Mathematics' }
      ]
    }
  }

  useEffect(() => {
    if (subject && subject in subjects) {
      setActiveSubject(subject)
      if (topic) {
        setActiveTopic(topic)
      } else if (subjects[subject as keyof typeof subjects].topics.length > 0) {
        // Navigate to the first topic if none is selected
        navigate(`/docs/${subject}/${subjects[subject as keyof typeof subjects].topics[0].id}`)
      }
    } else {
      // Default to physics if no subject is provided
      navigate('/docs/physics')
    }
  }, [subject, topic, navigate])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSubjectChange = (newSubject: string) => {
    if (newSubject !== activeSubject) {
      navigate(`/docs/${newSubject}`)
    }
  }

  const handleTopicChange = (newTopic: string) => {
    if (newTopic !== activeTopic) {
      navigate(`/docs/${activeSubject}/${newTopic}`)
    }
  }

  // Mock content for demonstration
  const getContent = () => {
    if (!activeSubject || !activeTopic) return null

    return (
      <div className="doc-content">
        <h1 className="doc-title">{subjects[activeSubject as keyof typeof subjects]?.topics.find((t: Topic) => t.id === activeTopic)?.name || 'Topic'}</h1>
        
        <div className="doc-authors">
          <span>Authors: John Doe, Jane Smith</span>
          <button className="edit-button">Edit This Page</button>
        </div>

        <div className="doc-table-of-contents">
          <h3>Table of Contents</h3>
          <ul>
            <li><a href="#introduction">Introduction</a></li>
            <li><a href="#basic-concepts">Basic Concepts</a></li>
            <li><a href="#advanced-topics">Advanced Topics</a></li>
            <li><a href="#examples">Examples</a></li>
            <li><a href="#quiz">Quiz</a></li>
          </ul>
        </div>

        <section id="introduction">
          <h2>Introduction</h2>
          <p className="terminal-text">
            Welcome to our comprehensive guide on {subjects[activeSubject as keyof typeof subjects]?.topics.find((t: Topic) => t.id === activeTopic)?.name}. 
            This documentation will help you understand the fundamental concepts and advanced applications.
          </p>
        </section>

        <section id="basic-concepts">
          <h2>Basic Concepts</h2>
          <p className="terminal-text">
            Let's start with the basic principles that form the foundation of this topic.
          </p>

          <div className="code-block">
            <div className="code-header">
              <span>Example Code</span>
              <div className="code-actions">
                <button>Copy</button>
                <select>
                  <option>JavaScript</option>
                  <option>Python</option>
                  <option>C++</option>
                </select>
              </div>
            </div>
            <pre className="code-content">
              {`function example() {
  console.log("This is a sample code block");
  return "Understanding concepts through code";
}`}
            </pre>
          </div>
        </section>

        <section id="advanced-topics">
          <h2>Advanced Topics</h2>
          <p className="terminal-text">
            Now that we understand the basics, let's dive into more advanced concepts.
          </p>

          <div className="spoiler">
            <div className="spoiler-header" onClick={() => console.log('Toggle spoiler')}>
              <h3>Click to reveal solution</h3>
            </div>
            <div className="spoiler-content">
              <p className="terminal-text">
                This is the solution to the problem. It involves applying the concepts we've learned in a specific way.
              </p>
            </div>
          </div>
        </section>

        <section id="examples">
          <h2>Examples</h2>
          <p className="terminal-text">
            Let's look at some practical examples to solidify our understanding.
          </p>

          <div className="problem-box">
            <h3>Focus Problem: Understanding Time Complexity</h3>
            <p className="terminal-text">
              Analyze the time complexity of the following algorithm and explain your reasoning.
            </p>
            <pre className="code-content">
              {`function analyzeComplexity(n) {
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      count++;
    }
  }
  return count;
}`}
            </pre>
          </div>
        </section>

        <section id="quiz">
          <h2>Quiz</h2>
          <div className="quiz-container">
            <h3>Test Your Knowledge</h3>
            <div className="quiz-question">
              <p className="terminal-text">What is the time complexity of the algorithm shown in the examples section?</p>
              <div className="quiz-options">
                <label>
                  <input type="radio" name="complexity" value="o-n" /> O(n)
                </label>
                <label>
                  <input type="radio" name="complexity" value="o-n2" /> O(n²)
                </label>
                <label>
                  <input type="radio" name="complexity" value="o-logn" /> O(log n)
                </label>
                <label>
                  <input type="radio" name="complexity" value="o-nlogn" /> O(n log n)
                </label>
              </div>
              <button className="quiz-submit">Submit Answer</button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="app-container">
      <div className="docs-container">
        <header className="hub-header">
          <div className="hub-logo terminal-text">
            <Link to="/hub" className="hub-home-link">OWL</Link>
          </div>
          <div className="hub-nav">
            <Link to="/hub" className="hub-nav-link">Hub</Link>
            <Link to="/courses" className="hub-nav-link">Courses</Link>
            <Link to="/docs" className="hub-nav-link active">Docs</Link>
            <Link to="/about" className="hub-nav-link">About</Link>
          </div>
          <div className="hub-auth">
            <Link to="/login" className="hub-login-btn">Login</Link>
            <Link to="/signup" className="hub-signup-btn">Sign Up</Link>
          </div>
        </header>
        
        <div className="docs-layout">
          <button className="mobile-menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? 'Close Menu' : 'Open Menu'}
          </button>
          
          <aside className={`docs-sidebar ${isMenuOpen ? 'open' : ''}`}>
            <div className="subject-selector">
              <select 
                value={activeSubject} 
                onChange={(e) => handleSubjectChange(e.target.value)}
                className="subject-dropdown"
              >
                {Object.entries(subjects).map(([key, subjectData]) => (
                  <option key={key} value={key}>{subjectData.name}</option>
                ))}
              </select>
            </div>
            
            <nav className="docs-nav">
              <h3 className="terminal-text terminal-prompt">Topics</h3>
              <ul className="topic-list">
                {activeSubject && subjects[activeSubject as keyof typeof subjects]?.topics.map((topicItem) => (
                  <li key={topicItem.id} className={topicItem.id === activeTopic ? 'active' : ''}>
                    <a 
                      href={`#${topicItem.id}`} 
                      onClick={(e) => {
                        e.preventDefault()
                        handleTopicChange(topicItem.id)
                      }}
                      className="terminal-text"
                    >
                      {topicItem.name}
                    </a>
                  </li>
                ))}
              </ul>
              
              <div className="sidebar-footer">
                <h3 className="terminal-text terminal-prompt">Resources</h3>
                <ul className="resource-list">
                  <li><a href="#" className="terminal-text">Additional Reading</a></li>
                  <li><a href="#" className="terminal-text">Practice Problems</a></li>
                  <li><a href="#" className="terminal-text">Video Tutorials</a></li>
                </ul>
                
                <h3 className="terminal-text terminal-prompt">Settings</h3>
                <ul className="settings-list">
                  <li><a href="#" className="terminal-text">Dark Mode</a></li>
                  <li><a href="#" className="terminal-text">Font Size</a></li>
                  <li><a href="#" className="terminal-text">Language</a></li>
                </ul>
              </div>
            </nav>
          </aside>
          
          <main className="docs-main">
            {getContent()}
          </main>
        </div>
        
        <footer className="footer">
          <p className="terminal-text">
            OWL © {new Date().getFullYear()} | <span className="highlight-free">Free</span> • <span className="highlight-accessible">Accessible</span> • <span className="highlight-open">Open</span> • <span className="highlight-advanced">Advanced</span>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default Documentation