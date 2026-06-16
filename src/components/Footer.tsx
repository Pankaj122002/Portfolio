import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-10 px-4 md:px-8" style={{ zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-display font-bold"
            style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}
          >PP</div>
          <span className="font-display text-apple-muted text-sm">Pankaj Pal</span>
        </div>



        {/* Social + scroll top */}
        <div className="flex items-center gap-3">
          {[
            { icon: Github, href: 'https://github.com/Pankaj122002', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/pankajpal12/', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:pankajpal01022002@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a key={label} href={href}
              {...(!href.startsWith('mailto:') && { target: '_blank', rel: 'noopener noreferrer' })}
              aria-label={label}
              className="p-2 rounded-full text-muted hover:text-apple transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2 rounded-full text-muted hover:text-apple transition-colors"
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
