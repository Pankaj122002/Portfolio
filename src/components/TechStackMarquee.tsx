const tech = [
  { name: 'Angular', color: '#DD0031' },
  { name: '.NET', color: '#512BD4' },
  { name: 'SQL Server', color: '#CC2927' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Azure', color: '#0078D4' },
  { name: 'Vercel', color: '#F5F5F7' },
  { name: 'Render', color: '#46E3B7' },
  { name: 'Python', color: '#3776AB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Tailwind', color: '#06B6D4' },
  { name: 'Cypress', color: '#69D3A7' },
  { name: 'Postman', color: '#FF6C37' },
  { name: 'VS Code', color: '#007ACC' },
  { name: 'Streamlit', color: '#FF4B4B' },
];

function Item({ name, color }: { name: string; color: string }) {
  return (
    <span className="flex items-center gap-3 px-5 text-base font-display font-medium whitespace-nowrap" style={{ color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      {name}
    </span>
  );
}

export default function TechStackMarquee() {
  return (
    <section className="relative py-16 overflow-hidden" style={{ zIndex: 10 }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

      {/* Row 1 */}
      <div className="flex overflow-hidden mb-3" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <div className="flex animate-marquee">
          {[...tech, ...tech].map((t, i) => <Item key={i} {...t} />)}
        </div>
      </div>

      {/* Row 2 — reversed */}
      <div className="flex overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <div className="flex animate-marquee-reverse">
          {[...tech, ...tech].map((t, i) => <Item key={i} {...t} />)}
        </div>
      </div>
    </section>
  );
}
