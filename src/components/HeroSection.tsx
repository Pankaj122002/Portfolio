import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, MessageCircle, ChevronDown, User } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const roles = [
  '.NET Developer',
  'Angular Specialist',
  'IoT Dashboard Builder',
  'DevOps Engineer',
  'AI-Powered Dev',
];

function LetterReveal({ text, delay = 0, start = false }: { text: string; delay?: number, start?: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay, start]);

  return (
    <span className="inline-block overflow-hidden">
      <span
        className="inline-block transition-all duration-700"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(110%)',
          opacity: visible ? 1 : 0,
        }}
      >
        {text}
      </span>
    </span>
  );
}

function TypingText({ start = false }: { start?: boolean }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!start) return;
    const role = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < role.length) {
      timeout = setTimeout(() => setText(role.slice(0, text.length + 1)), 90);
    } else if (!deleting && text.length === role.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 45);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIdx, start]);

  return (
    <div className="h-8 md:h-10">
      <span className="text-xl md:text-2xl text-primary font-body tracking-tight">
        {text}
        <span className="animate-pulse text-indigo">|</span>
      </span>
    </div>
  );
}

export const HERO_SCROLL_HEIGHT = 4000;

export default function HeroSection() {
  const words = ['Pankaj', 'Pal'];
  
  useEffect(() => {
    // Pin the hero content so it stays on screen while scrolling the background
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: `+=${HERO_SCROLL_HEIGHT - window.innerHeight}`,
        pin: "#hero-content",
        scrub: 1,
      }
    });

    const isDesktop = window.innerWidth > 768;

    // Animate content splitting to the corners
    tl.to("#hero-left-group", {
      x: isDesktop ? "-28vw" : "-15vw",
      y: isDesktop ? "-5vh" : "-5vh",
      scale: isDesktop ? 0.95 : 0.8,
      ease: "power2.inOut",
      duration: 1
    }, 0)
    .to("#hero-right-group", {
      x: isDesktop ? "35vw" : "20vw",
      y: isDesktop ? "5vh" : "10vh",
      scale: isDesktop ? 0.95 : 0.8,
      ease: "power2.inOut",
      duration: 1
    }, 0)
    .to({}, { duration: 1.5 }) // Hold position longer
    .to("#hero-content-inner", {
      opacity: 0,
      duration: 0.5
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative"
      style={{ height: `${HERO_SCROLL_HEIGHT}px`, zIndex: 10 }}
    >
      {/* Pinned content wrapper */}
      <div
        id="hero-content"
        className="h-screen w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        style={{ zIndex: 10 }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, transparent 80%)',
          }}
        />

        <div id="hero-content-inner" className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center mt-16 md:mt-0">
          
          {/* Left Group: Name and Profile Titles */}
          <div id="hero-left-group" className="flex flex-col items-center mb-6">
            <div className="mb-2 overflow-hidden">
              <h1
                className="font-display font-bold text-primary tracking-tight transition-transform duration-500 hover:scale-105 hover:text-white"
                style={{ fontSize: 'clamp(40px, 9vw, 104px)', lineHeight: 1.0, textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
              >
                {words.map((word, wi) => (
                  <span key={word} className="inline-block mr-[0.2em] overflow-hidden">
                    {word.split('').map((char, ci) => (
                      <LetterReveal key={ci} text={char} delay={300 + (wi * word.length + ci) * 80} start={true} />
                    ))}
                  </span>
                ))}
              </h1>
            </div>
            
            <div className="transition-transform duration-300 hover:scale-105">
              <TypingText start={true} />
            </div>
          </div>

          {/* Right Group: Tagline, Button, Socials */}
          <div id="hero-right-group" className="flex flex-col items-center">
            <p
              className="text-primary max-w-xl text-base md:text-lg leading-relaxed mb-8 font-body transition-colors duration-300 hover:text-white"
              style={{ opacity: 1, textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}
            >
              I build systems that handle real-time IoT data,<br />
              ship fast, and scale without breaking.
            </p>

            <a
              href="#projects"
              className="btn-pill mb-10"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Explore My Work</span>
              <ChevronDown className="w-5 h-5" />
            </a>

            <div className="flex items-center justify-center gap-4 md:gap-5 flex-wrap">
              {[
                { icon: Github, href: 'https://github.com/Pankaj122002', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/pankajpal12/', label: 'LinkedIn' },
                { icon: User, href: 'https://pankaj122002.github.io/', label: 'Detailed Resume' },
                { icon: Mail, href: 'mailto:pankajpal01022002@gmail.com', label: 'Email' },
                { icon: MessageCircle, href: 'https://wa.me/918954040631', label: 'WhatsApp' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => {
                    if (href.startsWith('mailto:') && !window.matchMedia('(max-width: 768px)').matches) {
                      e.preventDefault();
                      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${href.replace('mailto:', '')}`, '_blank');
                    }
                  }}
                  {...(!href.startsWith('mailto:') && { target: '_blank', rel: 'noopener noreferrer' })}
                  aria-label={label}
                  className="group relative p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-2"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
                >
                  <Icon className="w-5 h-5 text-primary group-hover:text-cyan transition-colors duration-200" />
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[11px] text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2"
          style={{ transform: 'translateX(-50%)' }}
        >
          <span className="text-[11px] text-primary tracking-[0.25em] uppercase" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>Scroll</span>
          <div
            className="w-1.5 h-1.5 rounded-full bg-primary"
            style={{ animation: 'bounce-slow 2s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
}
