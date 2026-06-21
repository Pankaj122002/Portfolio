import { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import HeroSection, { HERO_SCROLL_HEIGHT } from './components/HeroSection';
import HeroScrollCanvas from './components/HeroScrollCanvas';
import FloatingBackground from './components/FloatingBackground';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ServicesSection from './components/ServicesSection';
import StatisticsSection from './components/StatisticsSection';
import TechStackMarquee from './components/TechStackMarquee';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import IntroExperience from './components/Intro3D/IntroExperience';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function DesktopOnly({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    setOk(window.matchMedia('(min-width: 1024px)').matches);
  }, []);
  return ok ? <>{children}</> : null;
}

export default function App() {
  // Simplified phase: 'video' (intro) → 'main'
  const [phase, setPhase] = useState<'video' | 'main'>('video');

  const handleVideoComplete = useCallback(() => setPhase('main'), []);

  // Register GSAP scroll animations after main phase
  useScrollAnimations(phase);

  // Lenis smooth scroll — only after main phase starts
  useEffect(() => {
    if (phase !== 'main') return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    });

    let ctx: gsap.Context;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    
    const updateLenis = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    ctx = gsap.context(() => {
      // Fade in main content smoothly
      gsap.fromTo('#main-content', 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', clearProps: 'transform' }
      );
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
      if (ctx) ctx.revert();
    };
  }, [phase]);

  return (
    <div className="min-h-screen bg-background" style={{ color: '#F5F5F7', backgroundColor: '#000000' }}>
      
      {/* 3D Intro Video plays automatically initially */}
      {phase !== 'main' && (
        <div id="intro-container" className="fixed inset-0 z-20 pointer-events-none" style={{ opacity: 1 }}>
          <IntroExperience onComplete={handleVideoComplete} />
        </div>
      )}

      {/* Persistent Animated Floating Background for all non-hero sections */}
      {phase === 'main' && <FloatingBackground />}

      {/* Hero scroll canvas — Replaces ThreeBackground and covers the FloatingBackground initially */}
      {phase === 'main' && <HeroScrollCanvas scrollHeight={HERO_SCROLL_HEIGHT} />}

      {/* Custom cursor — desktop only */}
      <DesktopOnly>
        <CustomCursor />
      </DesktopOnly>

      {/* Main content */}
      {phase === 'main' && (
        <div
          id="main-content"
          style={{
            position: 'relative',
            zIndex: 10,
            opacity: 0, // Let GSAP handle the fade in
          }}
        >
          <Navigation />

          <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <ServicesSection />
            <StatisticsSection />
            <TechStackMarquee />
            <TestimonialsSection />
            <ContactSection />
          </main>

          <Footer />
        </div>
      )}
    </div>
  );
}
