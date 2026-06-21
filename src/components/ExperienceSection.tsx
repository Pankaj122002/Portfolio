import { useState } from 'react';
import { motion } from 'framer-motion';

const milestones = [
  { year: '2020', title: 'B.Tech CSE', company: 'RKGIT Ghaziabad', achievement: 'Built foundational knowledge in CS, algorithms & software engineering', chips: ['C/C++', 'Data Structures', 'DBMS', 'OS'], color: '#06B6D4' },
  { year: "Jul'23", title: 'Data Analytics Intern', company: 'YBI Foundation', achievement: 'Analyzed real-world datasets, built visualizations and insight reports', chips: ['Python', 'Pandas', 'Matplotlib'], color: '#8B5CF6' },
  { year: "Sep'23", title: 'Data Science Intern', company: 'Learnwik Solutions', achievement: 'Built ML models hitting 85%+ accuracy with Streamlit dashboards', chips: ['scikit-learn', 'NumPy', 'Streamlit'], color: '#6366F1' },
  { year: '2024', title: 'Freelance Developer', company: 'Self-Employed', achievement: 'Delivered 5+ production apps — from restaurant sites to ML apps', chips: ['Angular', '.NET', 'Docker'], color: '#F59E0B' },
  { year: "Nov'24", title: 'Software Developer', company: 'Rossarah Services', achievement: 'IoT monitoring for 8+ energy meters, 40% query optimization, 7+ dashboards', chips: ['Angular', '.NET Core', 'SQL Server', 'Docker'], color: '#6366F1', current: true },
];

export default function ExperienceSection() {
  const [selectedCount, setSelectedCount] = useState(milestones.length);

  return (
    <section id="experience" className="relative py-12 md:py-16 px-4 md:px-8 section-bg" style={{ zIndex: 10 }}>
      <div className="section-divider absolute top-0 left-0 right-0 gsap-line" style={{ transformOrigin: 'left' }} />

      {/* Ambient */}
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10 gsap-text-up">
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
      <div className="max-w-6xl mx-auto mb-8 hidden md:block gsap-reveal">
        <div className="flex items-center gap-0">
          {milestones.map((m, i) => {
            const isActive = i < selectedCount;
            return (
              <button key={i} onClick={() => setSelectedCount(i + 1)} className="flex-1 flex flex-col items-center gap-2 group transition-transform hover:scale-105 hover:-translate-y-1">
                <span className="text-xs font-body transition-colors duration-300" style={{ color: isActive ? m.color : '#424245' }}>
                  {m.year}
                </span>
                <div className="flex items-center w-full">
                  {i > 0 && (
                    <div className="flex-1 h-px transition-all duration-700" style={{ background: isActive ? 'linear-gradient(90deg, #6366F1, #06B6D4)' : 'rgba(255,255,255,0.08)' }} />
                  )}
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0 transition-all duration-500"
                    style={{
                      background: isActive ? m.color : 'rgba(255,255,255,0.12)',
                      boxShadow: isActive ? `0 0 20px ${m.color}, 0 0 40px ${m.color}40` : 'none',
                      transform: isActive ? 'scale(1.5)' : 'scale(1)',
                    }}
                  />
                  {i < milestones.length - 1 && (
                    <div className="flex-1 h-px transition-all duration-700" style={{ background: i < selectedCount - 1 ? 'linear-gradient(90deg, #6366F1, #06B6D4)' : 'rgba(255,255,255,0.08)' }} />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Cards Container */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 transition-all duration-500 w-full overflow-x-auto scrollbar-hide pb-4">
          {milestones.slice(0, selectedCount).map((m, i) => (
            <div key={i} className="flex-1 min-w-[180px] lg:min-w-[200px] flex flex-col transition-all duration-500 animate-fade-in">
              {/* Mobile Knot Line */}
              <div className="flex flex-col items-center md:hidden pt-4 pb-2">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: m.color, boxShadow: `0 0 20px ${m.color}` }} />
                {i < selectedCount - 1 && <div className="w-px h-8 bg-white/10 mt-2" />}
              </div>
              
              <div
                className="glass-premium rounded-2xl p-4 md:p-5 h-full transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 cursor-default flex-1 flex flex-col"
                style={{
                  border: `1px solid ${m.color}40`,
                  boxShadow: `0 0 40px ${m.color}10, inset 0 1px 0 ${m.color}10`,
                }}
              >
                {/* Year badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-display font-semibold px-3 py-1 rounded-full" style={{ background: `${m.color}15`, color: m.color }}>
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
                <p className="text-apple-muted text-xs leading-relaxed mb-4 flex-1">{m.achievement}</p>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {m.chips.map((chip) => (
                    <span key={chip} className="tech-chip !text-[10px] !px-2 !py-0.5">{chip}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
