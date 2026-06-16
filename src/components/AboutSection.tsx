import { useEffect, useRef, useState } from 'react';
import { User, ChevronRight } from 'lucide-react';

const bullets = [
  { text: "Full Stack .NET Developer building apps for 8+ integrated energy meters.", highlight: "Full Stack .NET Developer" },
  { text: "Engineered SQL Server databases with sub-second IoT query response.", highlight: "sub-second IoT query" },
  { text: "Delivered 7+ real-time dashboards visualizing high-frequency metrics.", highlight: "real-time dashboards" },
  { text: "Trained Python Machine Learning models achieving 85%+ accuracy.", highlight: "85%+ accuracy" },
  { text: "Deployed containerized applications via Docker with automated CI/CD.", highlight: "Docker" },
  { text: "Skilled in prompt engineering to maximize AI productivity.", highlight: "AI productivity" },
  { text: "Built this highly interactive 3D portfolio using React.js, Vite, Three.js, and Tailwind CSS.", highlight: "React.js, Vite, Three.js" }
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
            color: '#60A5FA', 
            textShadow: '0 0 15px rgba(96, 165, 250, 0.6)', 
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
      className="relative flex items-start text-lg md:text-xl text-white/95 font-light leading-relaxed mb-8"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.05}s, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.05}s`,
      }}
    >
      <ChevronRight className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-[#FCD34D] opacity-70" />
      <span>{renderText()}</span>
    </li>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative py-16 px-4 md:px-8" style={{ zIndex: 10 }}>
      {/* Subtle top separator */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="mb-8">
          <span
            className="text-xs tracking-[0.25em] uppercase text-muted font-body"
            style={{ letterSpacing: '0.25em' }}
          >
            About
          </span>
          <h2
            className="mt-3"
            style={{ fontSize: 'clamp(36px, 5vw, 68px)', lineHeight: 1.0 }}
          >
            <span className="font-display font-bold text-white opacity-90">The Developer</span>
            <br />
            <span className="font-display font-bold gradient-text tracking-tight">Behind the Code</span>
          </h2>
        </div>

        {/* Story lines — each reveals on scroll */}
        <div className="relative pl-8 md:pl-10 mb-16 mt-12 max-w-5xl">
          {/* Vertical Golden Line */}
          <div className="absolute top-2 bottom-2 left-0 w-1" style={{ background: 'linear-gradient(to bottom, #FCD34D, rgba(252,211,77,0.1))', borderRadius: '4px' }} />
          
          <ul className="space-y-6">
            {bullets.map((b, i) => (
              <RevealBullet key={i} text={b.text} highlight={b.highlight} index={i} />
            ))}
          </ul>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-6 text-center"
            >
              <div
                className="font-display font-bold gradient-text mb-1"
                style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: 1.0 }}
              >
                <AnimatedCount target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-muted text-xs tracking-wide uppercase">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Detailed Resume CTA */}
        <div className="mt-12 flex justify-center">
          <a
            href="https://pankaj122002.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill"
            style={{ opacity: 0.9 }}
          >
            <User className="w-4 h-4 mr-1.5" />
            View Detailed Resume
          </a>
        </div>
      </div>
    </section>
  );
}
