import { useEffect, useRef } from 'react';

export default function FloatingBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate some random floating particles
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Create particles
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full bg-white/20 blur-[1px]';
      
      // Random size
      const size = Math.random() * 4 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random animation duration and delay
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * -20;
      
      particle.style.animation = `float-particle ${duration}s linear infinite ${delay}s`;
      
      container.appendChild(particle);
    }
    
    return () => {
      if (container) {
        container.innerHTML = ''; // Cleanup
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0, overflow: 'hidden' }}>
      
      {/* Deep Space Background Layer */}
      <div className="absolute inset-0 bg-[#020202]" />

      {/* Large Glowing Orbs (CSS animated) */}
      <div 
        className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full blur-[100px] mix-blend-screen opacity-30"
        style={{ 
          background: 'radial-gradient(circle, #4F46E5 0%, transparent 70%)',
          animation: 'float-orb 15s ease-in-out infinite alternate' 
        }}
      />
      <div 
        className="absolute top-[60%] right-[10%] w-[500px] h-[500px] rounded-full blur-[120px] mix-blend-screen opacity-20"
        style={{ 
          background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)',
          animation: 'float-orb 20s ease-in-out infinite alternate-reverse' 
        }}
      />
      <div 
        className="absolute bottom-[-10%] left-[30%] w-[600px] h-[600px] rounded-full blur-[120px] mix-blend-screen opacity-20"
        style={{ 
          background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
          animation: 'float-orb 25s ease-in-out infinite alternate' 
        }}
      />

      {/* Grid pattern overlay for tech feel */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          transform: 'perspective(500px) rotateX(60deg) scale(2.5) translateY(-20%)',
          transformOrigin: 'top center',
          animation: 'grid-move 20s linear infinite'
        }}
      />

      {/* Container for JS generated small particles */}
      <div ref={containerRef} className="absolute inset-0" />
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-orb {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 0 4rem; }
        }
      `}} />
    </div>
  );
}
