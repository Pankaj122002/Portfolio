import { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import { useScrollProgress } from './hooks/useScrollProgress';
import ThreeBackground from './components/ThreeBackground';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
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
import gsap from 'gsap';

function DesktopOnly({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    setOk(window.matchMedia('(min-width: 1024px)').matches);
  }, []);
  return ok ? <>{children}</> : null;
}

export default function App() {
  const [phase, setPhase] = useState<'video' | 'pp' | 'main'>('video');
  const scrollProgress = useScrollProgress();

  const handleVideoComplete = useCallback(() => setPhase('pp'), []);
  const handlePPComplete = useCallback(() => setPhase('main'), []);

  // Lenis smooth scroll — only after main phase starts
  useEffect(() => {
    if (phase !== 'main') return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Fade in main content smoothly
    gsap.fromTo('#main-content', 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', clearProps: 'transform' }
    );

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
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

      {/* Three.js always mounted — drives the persistent canvas */}
      {phase === 'main' && <ThreeBackground scrollProgress={scrollProgress} />}

      {/* Custom cursor — desktop only */}
      <DesktopOnly>
        <CustomCursor />
      </DesktopOnly>

      {/* PP Loading Screen (Explosion) over the final frame of the video */}
      {phase === 'pp' && <LoadingScreen onComplete={handlePPComplete} />}

      {/* Main content */}
      <div
        id="main-content"
        style={{
          position: 'relative',
          zIndex: 10,
          opacity: phase === 'main' ? 1 : 0, 
          display: phase === 'main' ? 'block' : 'none'
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
    </div>
  );
}
