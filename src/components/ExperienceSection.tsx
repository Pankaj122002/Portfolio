import { useEffect, useRef, useState } from 'react';

const milestones = [
  {
    year: '2020',
    title: 'B.Tech CSE',
    company: 'RKGIT Ghaziabad',
    achievement: 'Built foundational knowledge in CS, algorithms & software engineering',
    chips: ['C/C++', 'Data Structures', 'DBMS', 'OS'],
    color: '#06B6D4',
  },
  {
    year: "Jul'23",
    title: 'Data Analytics Intern',
    company: 'YBI Foundation',
    achievement: 'Analyzed real-world datasets, built visualizations and insight reports',
    chips: ['Python', 'Pandas', 'Matplotlib'],
    color: '#7C3AED',
  },
  {
    year: "Sep'23",
    title: 'Data Science Intern',
    company: 'Learnwik Solutions',
    achievement: 'Built ML models hitting 85%+ accuracy with Streamlit dashboards',
    chips: ['scikit-learn', 'NumPy', 'Streamlit'],
    color: '#4F46E5',
  },
  {
    year: '2024',
    title: 'Freelance Developer',
    company: 'Self-Employed',
    achievement: 'Delivered 5+ production apps — from restaurant sites to ML apps',
    chips: ['Angular', '.NET', 'Docker'],
    color: '#F59E0B',
  },
  {
    year: "Nov'24",
    title: 'Software Developer',
    company: 'Rossarah Services',
    achievement: 'IoT monitoring for 8+ energy meters, 40% query optimization, 7+ dashboards',
    chips: ['Angular', '.NET Core', 'SQL Server', 'Docker'],
    color: '#4F46E5',
    current: true,
  },
];

export default function ExperienceSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Keyboard / click navigation
  const goTo = (idx: number) => setActiveIdx(Math.max(0, Math.min(milestones.length - 1, idx)));

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const cardWidth = el.children[0]?.clientWidth ?? 360;
    el.scrollTo({ left: activeIdx * (cardWidth + 24), behavior: 'smooth' });
  }, [activeIdx]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-16 px-4 md:px-8"
      style={{ zIndex: 10 }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <span className="text-xs tracking-[0.25em] uppercase text-muted font-body">Timeline</span>
        <h2
          className="font-display font-bold text-apple mt-3"
          style={{ fontSize: 'clamp(32px, 5vw, 60px)', lineHeight: 1.0, letterSpacing: '-0.03em' }}
        >
          Professional
          <br />
          <span className="gradient-text">Journey</span>
        </h2>
      </div>

      {/* Timeline progress bar */}
      <div className="max-w-6xl mx-auto mb-8 hidden md:block">
        <div className="flex items-center gap-0">
          {milestones.map((m, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="flex-1 flex flex-col items-center gap-2 group"
            >
              {/* Year label */}
              <span
                className="text-xs font-body transition-colors"
                style={{ color: i === activeIdx ? m.color : '#424245' }}
              >
                {m.year}
              </span>

              {/* Dot + line */}
              <div className="flex items-center w-full">
                {i > 0 && (
                  <div
                    className="flex-1 h-px transition-all duration-500"
                    style={{ background: i <= activeIdx ? '#4F46E5' : 'rgba(255,255,255,0.08)' }}
                  />
                )}
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0 transition-all duration-300"
                  style={{
                    background: i <= activeIdx ? m.color : 'rgba(255,255,255,0.12)',
                    boxShadow: i === activeIdx ? `0 0 16px ${m.color}` : 'none',
                    transform: i === activeIdx ? 'scale(1.4)' : 'scale(1)',
                  }}
                />
                {i < milestones.length - 1 && (
                  <div
                    className="flex-1 h-px transition-all duration-500"
                    style={{ background: i < activeIdx ? '#4F46E5' : 'rgba(255,255,255,0.08)' }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable cards */}
      <div
        ref={trackRef}
        className="max-w-6xl mx-auto overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex flex-col md:flex-row gap-4 md:w-max">
          {milestones.map((m, i) => (
            <div key={i} className="flex gap-4">
              {/* Mobile Knot Line */}
              <div className="flex flex-col items-center md:hidden pt-8">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: m.color, boxShadow: i === activeIdx ? `0 0 16px ${m.color}` : 'none' }} />
                {i < milestones.length - 1 && <div className="w-px h-full bg-white/10 mt-2 mb-[-1rem]" />}
              </div>
              
              <div
                className="flex-shrink-0 scroll-snap-align-start w-full md:w-[214px]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div
                  className="glass rounded-2xl p-4 h-full transition-all duration-500"
                  style={{
                    border: i === activeIdx ? `1px solid ${m.color}40` : '1px solid rgba(255,255,255,0.06)',
                    boxShadow: i === activeIdx ? `0 0 40px ${m.color}15` : 'none',
                  }}
                  onClick={() => goTo(i)}
                >
                  {/* Year badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-sm font-display font-semibold px-3 py-1 rounded-full"
                      style={{ background: `${m.color}15`, color: m.color }}
                    >
                      {m.year}
                    </span>
                    {m.current && (
                      <span className="flex items-center gap-1.5 text-xs text-muted">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Current
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-apple text-lg mb-1">{m.title}</h3>
                  <p className="text-muted text-sm mb-4">{m.company}</p>
                  <p className="text-apple-muted text-xs leading-relaxed mb-3">{m.achievement}</p>

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-2">
                    {m.chips.map((chip) => (
                      <span key={chip} className="tech-chip">{chip}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
