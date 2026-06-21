import { useState } from 'react';
import { Mail, Linkedin, Github, Phone, MapPin, Send } from 'lucide-react';

const budgets = ['Select budget range', 'Under ₹10,000', '₹10,000 – ₹50,000', '₹50,000 – ₹1,00,000', '₹1,00,000+'];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', budget: budgets[0], message: '' });
  const [focus, setFocus] = useState('');

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const sendViaWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) return alert("Please fill in at least your name and message.");
    const text = encodeURIComponent(`Hi Pankaj,\n\nI'm reaching out from your portfolio site:\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nBudget: ${form.budget}\n\nMessage:\n${form.message}`);
    window.open(`https://wa.me/918954040631?text=${text}`, '_blank');
  };

  const sendViaEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) return alert("Please fill in at least your name and message.");
    const body = encodeURIComponent(`Hi Pankaj,\n\nI'm reaching out from your portfolio site:\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nBudget: ${form.budget}\n\nMessage:\n${form.message}`);
    if (!window.matchMedia('(max-width: 768px)').matches) {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=pankajpal01022002@gmail.com&su=Portfolio+Inquiry+from+${encodeURIComponent(form.name)}&body=${body}`, '_blank');
    } else {
      window.open(`mailto:pankajpal01022002@gmail.com?subject=Portfolio Inquiry from ${form.name}&body=${body}`, '_blank');
    }
  };

  return (
    <section id="contact" className="relative pt-16 pb-8 md:py-12 px-4 md:px-8 section-bg" style={{ zIndex: 10 }}>
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[600px] h-[600px] rounded-full" style={{ border: '1px solid rgba(99,102,241,0.06)', animation: 'breath 4s ease-in-out infinite' }} />
        <div className="absolute w-[800px] h-[800px] rounded-full" style={{ border: '1px solid rgba(6,182,212,0.04)', animation: 'breath 4s ease-in-out infinite', animationDelay: '1s' }} />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 gsap-text-up">
          <span className="text-xs tracking-[0.25em] uppercase text-muted font-body">Get in touch</span>
          <h2
            className="font-display font-bold text-apple mt-1"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.0, letterSpacing: '-0.03em' }}
          >
            Let&apos;s Build
            <br />
            <span className="gradient-text">Something</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-3 md:gap-4 gsap-reveal">
          {/* Form */}
          <div className="glass-premium rounded-2xl p-3 md:p-4 h-full flex flex-col">
              <form className="space-y-2 flex flex-col flex-1">
                {[
                  { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                  { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                  { id: 'phone', label: 'Phone', type: 'tel', placeholder: 'Your phone number' },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-[10px] text-muted mb-0.5 tracking-wide">{label}</label>
                    <input
                      id={id} name={id} type={type} value={form[id as keyof typeof form]}
                      onChange={change} required placeholder={placeholder}
                      onFocus={() => setFocus(id)} onBlur={() => setFocus('')}
                      className="input-apple text-sm py-1.5 px-3"
                      style={{ borderColor: focus === id ? '#6366F1' : undefined, boxShadow: focus === id ? '0 0 0 3px rgba(99,102,241,0.15), 0 0 20px rgba(99,102,241,0.1)' : undefined }}
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="budget" className="block text-[10px] text-muted mb-0.5 tracking-wide">Budget</label>
                  <select
                    id="budget" name="budget" value={form.budget} onChange={change}
                    onFocus={() => setFocus('budget')} onBlur={() => setFocus('')}
                    className="input-apple appearance-none text-sm py-1.5 px-3"
                    style={{ borderColor: focus === 'budget' ? '#6366F1' : undefined, boxShadow: focus === 'budget' ? '0 0 0 3px rgba(99,102,241,0.15)' : undefined }}
                  >
                    {budgets.map((b) => <option key={b} value={b} className="bg-[#0a0a0a]">{b}</option>)}
                  </select>
                </div>

                <div className="flex-1 flex flex-col">
                  <label htmlFor="message" className="block text-[10px] text-muted mb-0.5 tracking-wide">Message</label>
                  <textarea
                    id="message" name="message" value={form.message} onChange={change} required
                    placeholder="Tell me about your project..."
                    onFocus={() => setFocus('message')} onBlur={() => setFocus('')}
                    className="input-apple resize-none flex-1 min-h-[60px] text-sm py-1.5 px-3"
                    style={{ borderColor: focus === 'message' ? '#6366F1' : undefined, boxShadow: focus === 'message' ? '0 0 0 3px rgba(99,102,241,0.15), 0 0 20px rgba(99,102,241,0.1)' : undefined }}
                  />
                </div>

                <div className="flex gap-2 mt-2 pt-1">
                  <button
                    type="button" onClick={sendViaWhatsApp}
                    className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-full font-display font-semibold text-xs transition-all duration-300 hover:scale-[1.02]"
                    style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', color: '#4ade80' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 30px rgba(34,197,94,0.2)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = ''; }}
                  >
                    <Send className="w-3.5 h-3.5" /> WhatsApp
                  </button>
                  <button
                    type="button" onClick={sendViaEmail}
                    className="btn-pill flex-1 justify-center !py-2 !px-4 !text-xs"
                  >
                    <Mail className="w-3.5 h-3.5" /> Email
                  </button>
                </div>
              </form>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-3">
            <div className="glass-premium rounded-2xl p-3 md:p-4 h-full flex flex-col">
              <h3 className="font-display font-semibold text-apple mb-3 text-sm">Direct Contact</h3>
              <div className="space-y-2">
                {[
                  { icon: Mail, href: 'mailto:pankajpal01022002@gmail.com', label: 'Email', value: 'pankajpal01022002@gmail.com', color: '#6366F1' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/pankajpal12/', label: 'LinkedIn', value: 'linkedin.com/in/pankajpal12', color: '#06B6D4' },
                  { icon: Github, href: 'https://github.com/Pankaj122002', label: 'GitHub', value: 'github.com/Pankaj122002', color: '#F5F5F7' },
                  { icon: Phone, href: 'https://wa.me/918954040631', label: 'WhatsApp', value: '+91-8954040631', color: '#22C55E' },
                ].map(({ icon: Icon, href, label, value, color }) => (
                  <a key={label} href={href}
                    onClick={(e) => {
                      if (href.startsWith('mailto:') && !window.matchMedia('(max-width: 768px)').matches) {
                        e.preventDefault();
                        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${href.replace('mailto:', '')}`, '_blank');
                      }
                    }}
                    {...(!href.startsWith('mailto:') && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="flex items-center gap-2 p-2 rounded-xl transition-all duration-300 hover:bg-white/5 group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:shadow-lg"
                      style={{ background: `${color}12` }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${color}25`; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = ''; }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color }} />
                    </div>
                    <div>
                      <p className="text-muted text-[10px]">{label}</p>
                      <p className="text-apple text-xs">{value}</p>
                    </div>
                  </a>
                ))}
                <div className="flex items-center gap-2 p-2 rounded-xl">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#F59E0B12' }}>
                    <MapPin className="w-3.5 h-3.5" style={{ color: '#F59E0B' }} />
                  </div>
                  <div>
                    <p className="text-muted text-[10px]">Location</p>
                    <p className="text-apple text-xs">Delhi NCR — Open to Remote</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-premium rounded-2xl p-3 md:p-4 flex items-center gap-3">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" style={{ boxShadow: '0 0 10px rgba(34,197,94,0.5)' }} />
              <div>
                <p className="text-apple text-xs font-medium">Available for freelance</p>
                <p className="text-muted text-[10px] mt-0.5">Responds within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
