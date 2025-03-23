import { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Characters to display
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
      // Semi-transparent background to create fade effect
      // For light mode, use a light grey background
      if (theme === 'light') {
        ctx.fillStyle = 'rgba(245, 245, 245, 0.05)'; // Light grey background
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'var(--terminal-green)'; // Terminal green for light mode - use CSS variable
      } else {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'var(--terminal-green)'; // Use CSS variable
      }
      
      ctx.font = `${fontSize}px "Fira Code", monospace`; // Use Fira Code for consistency
      
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
      
      requestAnimationFrame(draw);
    };
    
    // Start the animation
    const animationId = requestAnimationFrame(draw);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]); // Re-run when theme changes
  
  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, // Ensure it's visible but behind content
        opacity: theme === 'light' ? 0.15 : 0.2, // Reduced opacity for light mode
        pointerEvents: 'none',
      }}
    />
  );
}

export default MatrixRain;
