import { useEffect, useRef, useState } from 'react';
import { User, ChevronRight } from 'lucide-react';

const bullets = [
  { text: "Full Stack .NET Developer building apps for 8+ integrated energy meters.", highlight: "Full Stack .NET Developer" },
  { text: "Engineered SQL Server databases with sub-second IoT query response.", highlight: "sub-second IoT query" },
  { text: "Delivered 7+ real-time dashboards visualizing high-frequency metrics.", highlight: "real-time dashboards" },
  { text: "Trained Python Machine Learning models achieving 85%+ accuracy.", highlight: "85%+ accuracy" },
  { text: "Deployed containerized applications via Docker with automated CI/CD.", highlight: "Docker" },
  { text: "Skilled in prompt engineering to maximize AI productivity.", highlight: "AI productivity" }
];

const stats = [
  { value: 8, suffix: '+', label: 'IoT Devices' },
  { value: 30, suffix: '+', label: 'API Endpoints' },
  { value: 40, suffix: '%', label: 'Faster Queries' },
  { value: 20, suffix: '+', label: 'Technologies' },
];

function AnimatedCount({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const dur = 1800;
    const start = Date.now();
    const run = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(run);
    };
    run();
  }, [started, target]);

  return <div ref={ref} className="tabular-nums">{count}{suffix}</div>;
}

function RevealBullet({ text, highlight, index }: { text: string; highlight: string; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, {
      threshold: 0.1,
      rootMargin: '-50px 0px',
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const renderText = () => {
    if (!highlight) return text;
    const idx = text.indexOf(highlight);
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span 
          className="font-semibold" 
          style={{ 
            color: '#818CF8', 
            textShadow: '0 0 20px rgba(129, 140, 248, 0.5)', 
            margin: '0 4px' 
          }}
        >
          {highlight}
        </span>
        {text.slice(idx + highlight.length)}
      </>
    );
  };

  return (
        <li
      ref={ref}
      className="relative flex items-start text-base md:text-lg text-white/95 font-light leading-relaxed mb-2 md:mb-3"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.08}s, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.08}s`,
      }}
    >
      <ChevronRight className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-[#A78BFA] opacity-80" />
      <span>{renderText()}</span>
    </li>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative py-12 md:py-16 px-4 md:px-8 section-bg" style={{ zIndex: 10 }}>
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-0 right-0 gsap-line" style={{ transformOrigin: 'left' }} />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="mb-4 md:mb-6 gsap-text-up">
          <span className="text-xs tracking-[0.25em] uppercase text-muted font-body" style={{ letterSpacing: '0.25em' }}>
            About
          </span>
          <h2 className="mt-2 md:mt-3" style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.0 }}>
            <span className="font-display font-bold text-white opacity-90">The Developer</span>
            <br />
            <span className="font-display font-bold gradient-text tracking-tight">Behind the Code</span>
          </h2>
        </div>

        {/* Story lines — each reveals on scroll */}
        <div className="relative pl-6 md:pl-10 mb-6 md:mb-8 mt-4 md:mt-6 max-w-5xl">
          {/* Vertical accent line */}
          <div className="absolute top-2 bottom-2 left-0 w-1" style={{ background: 'linear-gradient(to bottom, #A78BFA, rgba(167,139,250,0.05))', borderRadius: '4px' }} />
          
          <ul className="space-y-2 md:space-y-3">
            {bullets.map((b, i) => (
              <RevealBullet key={i} text={b.text} highlight={b.highlight} index={i} />
            ))}
          </ul>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 gsap-stagger-parent">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-premium rounded-xl md:rounded-2xl p-4 md:p-6 text-center gsap-stagger-child transition-all duration-300 hover:border-indigo/20"
            >
              <div
                className="font-display font-bold gradient-text mb-1"
                style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', lineHeight: 1.0 }}
              >
                <AnimatedCount target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-muted text-[10px] md:text-xs tracking-wide uppercase">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Detailed Resume CTA */}
        <div className="mt-6 md:mt-8 flex justify-center gsap-reveal">
          <a
            href="https://pankaj122002.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <User className="w-4 h-4 mr-1.5" />
            View Detailed Resume
          </a>
        </div>
      </div>
    </section>
  );
}
