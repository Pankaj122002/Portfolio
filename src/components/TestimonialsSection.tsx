import { useEffect, useRef } from 'react';

const testimonials = [
  {
    quote: 'Pankaj delivered a high-quality dashboard that monitors our energy devices in real-time. Performance exceeded expectations.',
    author: 'Project Manager',
    company: 'Rossarah Services',
  },
  {
    quote: 'Exceptional attention to detail and clean code practices. The Angular application handles complex data operations flawlessly.',
    author: 'Senior Developer',
    company: 'Tech Partner',
  },
  {
    quote: 'The IoT monitoring solution transformed our operations. Real-time dashboards and impressive data visualization made decision-making effortless.',
    author: 'Operations Lead',
    company: 'Energy Sector',
  },
];

function Card({ quote, author, company }: typeof testimonials[0]) {
  return (
    <div className="flex-shrink-0 w-80 md:w-96 px-3">
      <div className="glass rounded-2xl p-7">
        <div className="flex gap-1 mb-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className="w-4 h-4" fill="#F59E0B" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-muted text-sm leading-relaxed mb-6">&ldquo;{quote}&rdquo;</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-display font-bold" style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}>
            {author.charAt(0)}
          </div>
          <div>
            <p className="text-apple text-sm font-medium">{author}</p>
            <p className="text-muted text-xs">{company}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let pos = 0;
    let id: number;
    const tick = () => {
      pos -= 0.4;
      if (el.scrollWidth / 2 + pos <= 0) pos = 0;
      el.style.transform = `translateX(${pos}px)`;
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden" style={{ zIndex: 10 }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

      <div className="text-center mb-10">
        <span className="text-xs tracking-[0.25em] uppercase text-muted font-body">Testimonials</span>
      </div>

      <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
        <div ref={trackRef} className="flex" style={{ willChange: 'transform' }}>
          {[...testimonials, ...testimonials].map((t, i) => <Card key={i} {...t} />)}
        </div>
      </div>
    </section>
  );
}
