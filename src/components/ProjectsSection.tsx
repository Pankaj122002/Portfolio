import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  { id: 1, emoji: '🍕', title: 'Cheesy Bite Pizza', desc: 'Modern pizza ordering site with WhatsApp checkout, responsive design, and smooth animations.', url: 'https://cheesybitepizza.netlify.app/', chips: ['Angular', 'Bootstrap', 'WhatsApp API', 'Netlify'], accent: '#EF4444' },
  { id: 2, emoji: '🍛', title: 'Biryani Ordering Website', desc: 'Reactive Angular SPA with RxJS BehaviorSubject cart, WhatsApp checkout, and Cypress E2E tests.', url: 'https://biryani-website-three.vercel.app/', chips: ['Angular 19', 'RxJS', 'Bootstrap 5', 'Cypress', 'Vercel'], accent: '#F59E0B' },
  { id: 3, emoji: '💸', title: 'Enterprise Expense Tracker', desc: 'Full-featured expense management dashboard with Chart.js visualization and Material Design.', url: 'https://expense-tracker-a8s.pages.dev/dashboard', chips: ['Angular 21', 'Material', 'Chart.js', 'Cypress'], accent: '#10B981' },
  { id: 4, emoji: '📋', title: 'MyForm Application', desc: 'ASP.NET Core MVC form app containerized with Docker and deployed to Render.', url: 'https://myform-application.onrender.com/', chips: ['ASP.NET Core', 'Docker', 'Render', 'C#'], accent: '#6366F1' },
  { id: 5, emoji: '🎓', title: 'Student Registration Portal', desc: 'Classic ASP.NET Web Forms student portal with IIS deployment and SQL Server backend.', url: 'http://student-registration-form.somee.com/', chips: ['ASP.NET Web Forms', 'IIS', 'C#', 'SQL Server'], accent: '#8B5CF6' },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px)');
  const [visible, setVisible] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTransform(`perspective(1000px) rotateY(${(x - 0.5) * 10}deg) rotateX(${-(y - 0.5) * 10}deg) translateZ(10px)`);
    setGlowPos({ x: x * 100, y: y * 100 });
  };

  const onMouseLeave = () => setTransform('perspective(1000px)');

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="gsap-stagger-child"
      style={{
        transform,
        opacity: visible ? 1 : 0,
        translate: visible ? 'none' : '0 40px',
        transition: `opacity 0.7s ease ${index * 0.1}s, translate 0.7s ease ${index * 0.1}s, transform 0.15s ease`,
      }}
    >
      <div
        className="glass-premium rounded-2xl overflow-hidden h-full group cursor-pointer relative"
        style={{ transition: 'box-shadow 0.3s ease' }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 60px ${project.accent}25`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
        }}
      >
        {/* Mouse-following glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${project.accent}15, transparent 50%)`,
          }}
        />

        {/* Visual header */}
        <div
          className="h-20 flex items-center justify-center relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${project.accent}15, ${project.accent}05)` }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: `radial-gradient(ellipse at center, ${project.accent}20, transparent 70%)` }}
          />
          <span className="text-4xl select-none transition-transform duration-500 group-hover:scale-125">{project.emoji}</span>
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${project.accent}40, transparent)` }} />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-display font-bold text-apple text-base mb-2">{project.title}</h3>
          <p className="text-muted text-xs leading-relaxed mb-3 line-clamp-2">{project.desc}</p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.chips.map((chip) => (
              <span key={chip} className="tech-chip !text-[10px] !px-2 !py-0.5">{chip}</span>
            ))}
          </div>

          <div className="flex gap-2">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-display font-medium text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              style={{ background: `linear-gradient(135deg, ${project.accent}, ${project.accent}cc)` }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
            <a
              href="https://github.com/Pankaj122002"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg glass text-muted hover:text-apple transition-all duration-300 text-xs flex items-center justify-center hover:bg-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-8 md:py-12 px-4 md:px-8 section-bg" style={{ zIndex: 10 }}>
      <div className="section-divider absolute top-0 left-0 right-0 gsap-line" style={{ transformOrigin: 'left' }} />

      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-8 gsap-text-up">
          <span className="text-xs tracking-[0.25em] uppercase text-muted font-body">Work</span>
          <h2
            className="font-display font-bold text-apple mt-1 md:mt-2"
            style={{ fontSize: 'clamp(32px, 5vw, 60px)', lineHeight: 1.0, letterSpacing: '-0.03em' }}
          >
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 gsap-stagger-parent">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
