import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    emoji: '🍕',
    title: 'Cheesy Bite Pizza',
    desc: 'Modern pizza ordering site with WhatsApp checkout, responsive design, and smooth animations.',
    url: 'https://cheesybitepizza.netlify.app/',
    chips: ['Angular', 'Bootstrap', 'WhatsApp API', 'Netlify'],
    accent: '#EF4444',
  },
  {
    id: 2,
    emoji: '🍛',
    title: 'Biryani Ordering Website',
    desc: 'Reactive Angular SPA with RxJS BehaviorSubject cart, WhatsApp checkout, and Cypress E2E tests.',
    url: 'https://biryani-website-three.vercel.app/',
    chips: ['Angular 19', 'RxJS', 'Bootstrap 5', 'Cypress', 'Vercel'],
    accent: '#F59E0B',
  },
  {
    id: 3,
    emoji: '💸',
    title: 'Enterprise Expense Tracker',
    desc: 'Full-featured expense management dashboard with Chart.js visualization and Material Design.',
    url: 'https://expense-tracker-a8s.pages.dev/dashboard',
    chips: ['Angular 21', 'Material', 'Chart.js', 'Cypress'],
    accent: '#10B981',
  },
  {
    id: 4,
    emoji: '📋',
    title: 'MyForm Application',
    desc: 'ASP.NET Core MVC form app containerized with Docker and deployed to Render.',
    url: 'https://myform-application.onrender.com/',
    chips: ['ASP.NET Core', 'Docker', 'Render', 'C#'],
    accent: '#4F46E5',
  },
  {
    id: 5,
    emoji: '🎓',
    title: 'Student Registration Portal',
    desc: 'Classic ASP.NET Web Forms student portal with IIS deployment and SQL Server backend.',
    url: 'http://student-registration-form.somee.com/',
    chips: ['ASP.NET Web Forms', 'IIS', 'C#', 'SQL Server'],
    accent: '#7C3AED',
  },
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px)');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(8px)`);
  };

  const onMouseLeave = () => setTransform('perspective(1000px)');

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform,
        opacity: visible ? 1 : 0,
        translate: visible ? 'none' : '0 40px',
        transition: `opacity 0.7s ease ${index * 0.1}s, translate 0.7s ease ${index * 0.1}s, transform 0.15s ease`,
      }}
    >
      <div
        className="glass rounded-2xl overflow-hidden h-full group cursor-pointer"
        style={{ transition: 'box-shadow 0.3s ease' }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 50px ${project.accent}20`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
        }}
      >
        {/* Visual header */}
        <div
          className="h-16 flex items-center justify-center relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${project.accent}18, ${project.accent}06)` }}
        >
          {/* Gradient shimmer on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(ellipse at center, ${project.accent}20, transparent 70%)`,
            }}
          />
          <span className="text-3xl select-none">{project.emoji}</span>
          {/* Glow border bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${project.accent}50, transparent)` }}
          />
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-display font-bold text-apple text-base mb-1.5">{project.title}</h3>
          <p className="text-muted text-xs leading-relaxed mb-3 line-clamp-2">{project.desc}</p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.chips.map((chip) => (
              <span key={chip} className="tech-chip !text-[10px] !px-2 !py-0.5">{chip}</span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-display font-medium text-white transition-all duration-200 hover:opacity-90"
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
              className="px-3 py-1.5 rounded-lg glass text-muted hover:text-apple transition-colors text-xs flex items-center justify-center"
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
    <section id="projects" className="relative py-16 px-4 md:px-8" style={{ zIndex: 10 }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs tracking-[0.25em] uppercase text-muted font-body">Work</span>
          <h2
            className="font-display font-bold text-apple mt-3"
            style={{ fontSize: 'clamp(32px, 5vw, 60px)', lineHeight: 1.0, letterSpacing: '-0.03em' }}
          >
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
