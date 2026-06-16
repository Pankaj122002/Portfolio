import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 100000, display: '100K+', label: 'Lines of Code Written', color: '#4F46E5' },
  { value: 5, display: '5+', label: 'Apps Live in Production', color: '#06B6D4' },
  { value: 40, display: '40%', label: 'Query Speed Improvement', color: '#7C3AED' },
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
      className="text-center"
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
    <section className="relative py-24 px-4 md:px-8" style={{ zIndex: 10 }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
        {stats.map((s, i) => (
          <BigStat key={s.label} {...s} index={i} />
        ))}
      </div>
    </section>
  );
}
