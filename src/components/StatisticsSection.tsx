import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 100000, display: '100K+', label: 'Lines of Code Written', color: '#6366F1' },
  { value: 5, display: '5+', label: 'Apps Live in Production', color: '#06B6D4' },
  { value: 40, display: '40%', label: 'Query Speed Improvement', color: '#8B5CF6' },
  { value: 85, display: '85%+', label: 'ML Model Accuracy', color: '#10B981' },
];

function BigStat({ display, label, color, index }: { display: string; label: string; color: string; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="text-center gsap-stagger-child"
      style={{
        opacity: visible ? 1 : 0,
        translate: visible ? 'none' : '0 24px',
        transition: `opacity 0.7s ease ${index * 0.12}s, translate 0.7s ease ${index * 0.12}s`,
      }}
    >
      <div
        className="font-display font-bold tabular-nums"
        style={{
          fontSize: 'clamp(36px, 7vw, 88px)',
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          color,
          textShadow: `0 0 40px ${color}30`,
        }}
      >
        {display}
      </div>
      <p className="text-muted text-sm mt-3 max-w-[140px] mx-auto leading-tight">{label}</p>
    </div>
  );
}

export default function StatisticsSection() {
  return (
    <section className="relative py-28 px-4 md:px-8" style={{ zIndex: 10 }}>
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="section-divider absolute bottom-0 left-0 right-0" />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.03) 0%, transparent 60%)' }} />

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 gsap-stagger-parent">
        {stats.map((s, i) => (
          <BigStat key={s.label} {...s} index={i} />
        ))}
      </div>
    </section>
  );
}
