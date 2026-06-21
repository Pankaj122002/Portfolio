import { useRef, useState, useEffect } from 'react';
import { Globe, Palette, LayoutDashboard, Code2, Sparkles, Bug, Container } from 'lucide-react';

const services = [
  { icon: Globe, title: 'Business & Restaurant Websites', desc: 'Conversion-focused, fast-loading sites that turn visitors into customers.', color: '#6366F1' },
  { icon: Palette, title: 'Portfolio & Landing Pages', desc: 'Stunning pages with modern animations and glassmorphism effects.', color: '#06B6D4' },
  { icon: LayoutDashboard, title: 'Admin Dashboards & Data Viz', desc: 'Real-time dashboards with interactive charts and analytics.', color: '#8B5CF6' },
  { icon: Code2, title: '.NET Web API Development', desc: 'Robust REST APIs using .NET Core, EF Core, and SQL Server.', color: '#10B981' },
  { icon: Sparkles, title: 'AI-Integrated Web Apps', desc: 'Web apps augmented with ChatGPT, Claude, and custom AI workflows.', color: '#F59E0B' },
  { icon: Bug, title: 'Bug Fixing & Performance Audit', desc: 'Deep-dive perf audits, DB optimization, and production debugging.', color: '#EC4899' },
  { icon: Container, title: 'Docker & Deployment Setup', desc: 'Containerization, CI/CD pipelines, and cloud deployment automation.', color: '#A78BFA' },
];

function ServiceCard({ icon: Icon, title, desc, color, index }: typeof services[0] & { index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="glass-premium rounded-2xl p-4 md:p-5 group transition-all duration-400 gsap-stagger-child"
      style={{
        opacity: visible ? 1 : 0,
        translate: visible ? 'none' : '0 30px',
        transition: `opacity 0.6s ease ${index * 0.06}s, translate 0.6s ease ${index * 0.06}s, box-shadow 0.3s ease, border-color 0.3s ease`,
      }}
      onMouseEnter={(e) => { 
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 50px ${color}20, inset 0 1px 0 ${color}10`;
        (e.currentTarget as HTMLDivElement).style.borderColor = `${color}25`;
      }}
      onMouseLeave={(e) => { 
        (e.currentTarget as HTMLDivElement).style.boxShadow = '';
        (e.currentTarget as HTMLDivElement).style.borderColor = '';
      }}
    >
      <div
        className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
        style={{ background: `${color}12`, boxShadow: `0 0 0 0 ${color}00` }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 25px ${color}30`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = '';
        }}
      >
        <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color }} />
      </div>
      <h3 className="font-display font-semibold text-apple mb-1 text-[15px] md:text-base leading-snug">{title}</h3>
      <p className="text-muted text-[13px] md:text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-4 md:py-8 px-4 md:px-8 section-bg" style={{ zIndex: 10 }}>
      <div className="section-divider absolute top-0 left-0 right-0 gsap-line" style={{ transformOrigin: 'left' }} />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4 gsap-text-up">
          <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-muted font-body">Offering</span>
          <h2
            className="font-display font-bold text-apple mt-1"
            style={{ fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: 1.0, letterSpacing: '-0.03em' }}
          >
            What I
            <br />
            <span className="gradient-text">Build</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 gsap-stagger-parent">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>

        <div className="text-center mt-4 gsap-reveal">
          <a href="#contact" className="btn-ghost" onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Start a Project
          </a>
        </div>
      </div>
    </section>
  );
}
