import { useRef, useState, useEffect } from 'react';

const skillGroups = [
  { group: 'LANGUAGES', color: '#6366F1', skills: ['C#', 'Python', 'SQL', 'JavaScript(AJAX, jQuery)', 'TypeScript'] },
  { group: 'FRAMEWORKS', color: '#06B6D4', skills: ['.NET Framework', 'ASP.NET Web API', 'ASP.NET MVC', 'Web Forms', 'Angular 19/21', 'React.js (v18)', 'React Three Fiber', 'React Three Drei', 'Entity Framework', 'ADO.NET', 'Vite'] },
  { group: 'DATABASE', color: '#8B5CF6', skills: ['SQL Server', 'SSMS', 'Stored Procedures', 'CTEs', 'Window Functions', 'Supabase'] },
  { group: 'FRONTEND', color: '#F59E0B', skills: ['HTML', 'CSS', 'HTML5 Canvas API', 'Tailwind CSS', 'ECharts', 'Streamlit', 'Bootstrap', 'Angular Material', 'Chart.js', 'Three.js', 'GSAP (ScrollTrigger)', 'Framer Motion', 'Lenis'] },
  { group: 'PYTHON & MACHINE LEARNING', color: '#10B981', skills: ['scikit-learn', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'BeautifulSoup', 'TextBlob'] },
  { group: 'DEPLOYMENT & DEVOPS', color: '#3B82F6', skills: ['IIS 10.0', 'FTP/FTPS Web Publish', 'Docker', 'Render', 'Vercel', 'Netlify', 'GitHub Pages', 'Firebase Hosting', 'GitHub Actions', 'CI/CD Pipelines'] },
  { group: 'TOOLS & PRACTICES', color: '#EC4899', skills: ['Visual Studio 2022', 'Git / GitHub', 'Google Colab', 'Cypress', 'Vitest', 'React Hook Form', 'Zod', 'EmailJS', 'sharp (Node.js)', 'GitHub Copilot', 'Claude AI', 'ChatGPT', 'OOP', 'REST API'] },
];

interface TiltCardProps { group: string; color: string; skills: string[]; index: number; }

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
      className="tilt-card gsap-stagger-child"
      style={{
        transform: transform || 'perspective(1000px)',
        opacity: visible ? 1 : 0,
        translate: visible ? 'none' : '0 40px',
        transition: `opacity 0.7s ease ${index * 0.08}s, translate 0.7s ease ${index * 0.08}s, transform 0.15s ease`,
      }}
    >
      <div
        className="glass-premium rounded-2xl p-5 h-full transition-all duration-300"
        style={{ boxShadow: 'none' }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 50px ${color}20, inset 0 1px 0 ${color}15`;
          (e.currentTarget as HTMLDivElement).style.borderColor = `${color}30`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = '';
          (e.currentTarget as HTMLDivElement).style.borderColor = '';
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
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
              className="px-3 py-1.5 text-xs rounded-full font-body font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: `${color}12`,
                color,
                border: `1px solid ${color}25`,
                boxShadow: `0 0 0 0 ${color}00`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLSpanElement).style.boxShadow = `0 0 15px ${color}30`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLSpanElement).style.boxShadow = `0 0 0 0 ${color}00`;
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
    <section id="skills" className="relative py-20 px-4 md:px-8 section-bg" style={{ zIndex: 10 }}>
      <div className="section-divider absolute top-0 left-0 right-0 gsap-line" style={{ transformOrigin: 'left' }} />

      {/* Ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 gsap-text-up">
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 gsap-stagger-parent">
          {skillGroups.map((group, i) => (
            <TiltCard key={group.group} {...group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
