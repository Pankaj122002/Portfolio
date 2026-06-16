import { useRef, useState, useEffect } from 'react';

const skillGroups = [
  {
    group: 'Frontend',
    color: '#4F46E5',
    skills: ['React.js', 'Angular', 'TypeScript', 'Vite', 'HTML/CSS', 'Tailwind', 'Three.js', 'ECharts'],
  },
  {
    group: 'Backend',
    color: '#06B6D4',
    skills: ['.NET Core', 'ASP.NET MVC', 'Web API', 'C#', 'Entity Framework', 'ADO.NET'],
  },
  {
    group: 'Database',
    color: '#7C3AED',
    skills: ['SQL Server', 'Stored Procedures', 'CTEs', 'Window Functions', 'SSMS'],
  },
  {
    group: 'DevOps',
    color: '#10B981',
    skills: ['Docker', 'CI/CD', 'GitHub Actions', 'IIS 10', 'Render', 'Vercel'],
  },
  {
    group: 'Data & ML',
    color: '#F59E0B',
    skills: ['Python', 'scikit-learn', 'Pandas', 'NumPy', 'Streamlit'],
  },
  {
    group: 'AI Tools',
    color: '#EC4899',
    skills: ['ChatGPT', 'GitHub Copilot', 'Claude AI', 'Prompt Engineering'],
  },
];

interface TiltCardProps {
  group: string;
  color: string;
  skills: string[];
  index: number;
}

function TiltCard({ group, color, skills, index }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.02,1.02,1.02)`);
  };

  const onMouseLeave = () => setTransform('');

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="tilt-card"
      style={{
        transform: transform || 'perspective(1000px)',
        opacity: visible ? 1 : 0,
        translate: visible ? 'none' : '0 40px',
        transition: `opacity 0.7s ease ${index * 0.08}s, translate 0.7s ease ${index * 0.08}s, transform 0.15s ease`,
      }}
    >
      <div
        className="glass rounded-2xl p-4 h-full"
        style={{ boxShadow: 'none', transition: 'box-shadow 0.3s ease' }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${color}25`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-2 h-8 rounded-full"
            style={{ background: `linear-gradient(180deg, ${color}, transparent)` }}
          />
          <h3 className="font-display font-semibold text-apple text-lg">{group}</h3>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 text-xs rounded-full font-body font-medium transition-colors duration-200"
              style={{
                background: `${color}12`,
                color,
                border: `1px solid ${color}30`,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-16 px-4 md:px-8" style={{ zIndex: 10 }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs tracking-[0.25em] uppercase text-muted font-body">Arsenal</span>
          <h2
            className="font-display font-bold text-apple mt-3"
            style={{ fontSize: 'clamp(32px, 5vw, 60px)', lineHeight: 1.0, letterSpacing: '-0.03em' }}
          >
            Technical
            <br />
            <span className="gradient-text">Stack</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group, i) => (
            <TiltCard key={group.group} {...group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
