import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

function smoothTo(hash: string) {
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = navLinks.map((l) => l.href.slice(1));
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        zIndex: 50,
        background: scrolled ? 'rgba(0,0,0,0.7)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); smoothTo('#hero'); }}
          className="flex items-center gap-2.5 group"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-display font-bold"
            style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}
          >
            PP
          </div>
          <span className="font-display font-semibold text-apple text-sm hidden sm:block">
            Pankaj Pal
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => { e.preventDefault(); smoothTo(link.href); }}
              className="text-sm font-body transition-colors relative"
              style={{ color: active === link.href.slice(1) ? '#F5F5F7' : '#86868B' }}
            >
              {link.name}
              {active === link.href.slice(1) && (
                <span
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, #4F46E5, #06B6D4)' }}
                />
              )}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="mailto:pankajpal01022002@gmail.com"
          className="hidden md:flex items-center px-5 py-2 rounded-full text-sm font-display font-medium text-white transition-all duration-200"
          style={{ background: '#4F46E5' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#4338CA'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#4F46E5'; }}
        >
          Hire Me
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-5 h-0.5 bg-apple block transition-transform duration-300"
              style={{
                transform: mobileOpen
                  ? i === 0 ? 'rotate(45deg) translate(3px,3px)' : i === 1 ? 'scaleX(0)' : 'rotate(-45deg) translate(3px,-3px)'
                  : 'none',
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: mobileOpen ? '300px' : 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="px-4 py-5 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => { e.preventDefault(); smoothTo(link.href); setMobileOpen(false); }}
              className="block py-1 text-base font-body"
              style={{ color: active === link.href.slice(1) ? '#F5F5F7' : '#86868B' }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="mailto:pankajpal01022002@gmail.com"
            className="block w-full text-center py-3 rounded-full text-white text-sm font-display font-medium"
            style={{ background: '#4F46E5' }}
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}
