import { useEffect, useRef } from 'react';
import { useHeroSequence } from '../hooks/useHeroSequence';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroScrollCanvasProps {
  scrollHeight: number;
  opacity?: number;
}

export default function HeroScrollCanvas({ scrollHeight, opacity = 1 }: HeroScrollCanvasProps) {
  const { canvasRef, isLoaded } = useHeroSequence(scrollHeight);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    
    // Fade out the entire canvas when About section hits the viewport
    const tl = gsap.to(wrapperRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%", // when top of about hits 80% of viewport
        end: "top 20%",   // when top of about hits 20% of viewport
        scrub: true,
      }
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0"
      style={{ zIndex: 0, pointerEvents: 'none' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          opacity: isLoaded ? opacity : 0,
          transition: 'opacity 0.8s ease',
          willChange: 'transform, opacity',
        }}
      />
      {/* Subtle cinematic overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </div>
  );
}
