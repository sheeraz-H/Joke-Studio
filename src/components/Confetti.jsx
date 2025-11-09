import React, { useEffect, useRef, useState } from 'react';

const Confetti = ({ trigger = false, duration = 3000, particleCount = 40 }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
        y: window.innerHeight / 2 + (Math.random() - 0.5) * 80,
        vx: (Math.random() - 0.5) * 6,
        vy: -(Math.random() * 8 + 2),
        radius: Math.random() * 6 + 3,
        color: `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`,
        life: 100 + Math.random() * 40
      });
    }
    particlesRef.current = particles;
    setIsActive(true);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const particle = particlesRef.current[i];
        
        // Update particle physics
        particle.vy += 0.25; // gravity
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 1;

        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.ellipse(particle.x, particle.y, particle.radius, particle.radius * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Remove dead particles
        if (particle.life <= 0 || particle.y > canvas.height + 50) {
          particlesRef.current.splice(i, 1);
        }
      }

      // Continue animation if particles remain
      if (particlesRef.current.length > 0) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsActive(false);
      }
    };

    animate();

    // Auto-stop after duration
    const timeoutId = setTimeout(() => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      particlesRef.current = [];
      setIsActive(false);
    }, duration);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(timeoutId);
      particlesRef.current = [];
    };
  }, [trigger, duration, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
      aria-hidden="true"
      style={{ display: isActive ? 'block' : 'none' }}
    />
  );
};

export default Confetti;