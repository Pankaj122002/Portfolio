import { Github, Linkedin, Mail, ArrowUp, User } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-10 px-4 md:px-8" style={{ zIndex: 10 }}>
      <div className="section-divider absolute top-0 left-0 right-0" />
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-display font-bold"
            style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)' }}
          >PP</div>
          <span className="font-display text-apple-muted text-sm">Pankaj Pal</span>
        </div>

        {/* Social + scroll top */}
        <div className="flex items-center gap-3">
          {[
            { icon: Github, href: 'https://github.com/Pankaj122002', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/pankajpal12/', label: 'LinkedIn' },
            { icon: User, href: 'https://pankaj122002.github.io/', label: 'Detailed Resume' },
            { icon: Mail, href: 'mailto:pankajpal01022002@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a key={label} href={href}
              onClick={(e) => {
                if (href.startsWith('mailto:') && !window.matchMedia('(max-width: 768px)').matches) {
                  e.preventDefault();
                  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${href.replace('mailto:', '')}`, '_blank');
                }
              }}
              {...(!href.startsWith('mailto:') && { target: '_blank', rel: 'noopener noreferrer' })}
              aria-label={label}
              className="p-2.5 rounded-full text-muted hover:text-apple transition-all duration-300 hover:bg-white/5"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2.5 rounded-full text-muted hover:text-apple transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]"
            style={{ background: 'rgba(255,255,255,0.04)' }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
