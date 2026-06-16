import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, MessageCircle, ChevronDown } from 'lucide-react';

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

export default function HeroSection() {
  const words = ['Pankaj', 'Pal'];
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ zIndex: 10 }}
    >
      {/* Main heading */}
      <div className="mb-4 overflow-hidden">
        <h1
          className="font-display font-bold text-primary tracking-tight"
          style={{ fontSize: 'clamp(40px, 9vw, 104px)', lineHeight: 1.0 }}
        >
          {words.map((word, wi) => (
            <span key={word} className="inline-block mr-[0.2em] overflow-hidden">
              {word.split('').map((char, ci) => (
                <LetterReveal key={ci} text={char} delay={300 + (wi * word.length + ci) * 80} start={isVisible} />
              ))}
            </span>
          ))}
        </h1>
      </div>

      {/* Role typing */}
      <div className="mb-6">
        <TypingText start={isVisible} />
      </div>

      {/* Subline */}
      <p
        className="text-primary max-w-xl mx-auto text-base md:text-lg leading-relaxed mb-10 font-body"
        style={{ opacity: 1, transition: 'opacity 1s ease', transitionDelay: '1.2s' }}
      >
        I build systems that handle real-time IoT data,<br />
        ship fast, and scale without breaking.
      </p>

      {/* CTA */}
      <a
        href="#projects"
        className="btn-pill mb-12"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        Explore My Work
        <ChevronDown className="w-5 h-5" />
      </a>

      {/* Social icons — centered */}
      <div className="flex items-center justify-center gap-5">
        {[
          { icon: Github, href: 'https://github.com/Pankaj122002', label: 'GitHub' },
          { icon: Linkedin, href: 'https://www.linkedin.com/in/pankajpal12/', label: 'LinkedIn' },
          { icon: Mail, href: 'mailto:pankajpal01022002@gmail.com', label: 'Email' },
          { icon: MessageCircle, href: 'https://wa.me/918954040631', label: 'WhatsApp' },
        ].map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            {...(!href.startsWith('mailto:') && { target: '_blank', rel: 'noopener noreferrer' })}
            aria-label={label}
            className="group relative p-4 rounded-full transition-all duration-300"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <Icon className="w-5 h-5 text-primary group-hover:text-cyan transition-colors duration-200" />
            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[11px] text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {label}
            </span>
          </a>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2"
        style={{ transform: 'translateX(-50%)' }}
      >
        <span className="text-[11px] text-primary tracking-[0.25em] uppercase">Scroll</span>
        <div
          className="w-1.5 h-1.5 rounded-full bg-primary"
          style={{ animation: 'bounce-slow 2s ease-in-out infinite' }}
        />
      </div>
    </section>
  );
}
