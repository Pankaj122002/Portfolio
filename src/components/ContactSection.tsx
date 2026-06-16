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
    window.open(`mailto:pankajpal01022002@gmail.com?subject=Portfolio Inquiry from ${form.name}&body=${body}`, '_blank');
  };

  return (
    <section id="contact" className="relative py-10 px-4 md:px-8" style={{ zIndex: 10 }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

      {/* Pulsing ring hint from Three.js */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[600px] h-[600px] rounded-full" style={{ border: '1px solid rgba(79,70,229,0.06)', animation: 'breath 4s ease-in-out infinite' }} />
        <div className="absolute w-[800px] h-[800px] rounded-full" style={{ border: '1px solid rgba(6,182,212,0.04)', animation: 'breath 4s ease-in-out infinite', animationDelay: '1s' }} />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <span className="text-xs tracking-[0.25em] uppercase text-muted font-body">Get in touch</span>
          <h2
            className="font-display font-bold text-apple mt-3"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.0, letterSpacing: '-0.03em' }}
          >
            Let&apos;s Build
            <br />
            <span className="gradient-text">Something</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="glass rounded-2xl p-3 h-full flex flex-col">

              <form className="space-y-2 flex flex-col flex-1">
                {[
                  { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                  { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                  { id: 'phone', label: 'Phone', type: 'tel', placeholder: 'Your phone number' },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-xs text-muted mb-1 tracking-wide">{label}</label>
                    <input
                      id={id} name={id} type={type} value={form[id as keyof typeof form]}
                      onChange={change} required placeholder={placeholder}
                      onFocus={() => setFocus(id)} onBlur={() => setFocus('')}
                      className="input-apple"
                      style={{ borderColor: focus === id ? '#4F46E5' : undefined, boxShadow: focus === id ? '0 0 0 3px rgba(79,70,229,0.15)' : undefined }}
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="budget" className="block text-xs text-muted mb-1 tracking-wide">Budget</label>
                  <select
                    id="budget" name="budget" value={form.budget} onChange={change}
                    onFocus={() => setFocus('budget')} onBlur={() => setFocus('')}
                    className="input-apple appearance-none"
                    style={{ borderColor: focus === 'budget' ? '#4F46E5' : undefined, boxShadow: focus === 'budget' ? '0 0 0 3px rgba(79,70,229,0.15)' : undefined }}
                  >
                    {budgets.map((b) => <option key={b} value={b} className="bg-[#0a0a0a]">{b}</option>)}
                  </select>
                </div>

                <div className="flex-1 flex flex-col">
                  <label htmlFor="message" className="block text-xs text-muted mb-1 tracking-wide">Message</label>
                  <textarea
                    id="message" name="message" value={form.message} onChange={change} required
                    placeholder="Tell me about your project..."
                    onFocus={() => setFocus('message')} onBlur={() => setFocus('')}
                    className="input-apple resize-none flex-1"
                    style={{ borderColor: focus === 'message' ? '#4F46E5' : undefined, boxShadow: focus === 'message' ? '0 0 0 3px rgba(79,70,229,0.15)' : undefined }}
                  />
                </div>

                <div className="flex gap-3 mt-auto pt-2">
                  <button
                    type="button" onClick={sendViaWhatsApp}
                    className="btn-pill flex-1 justify-center"
                    style={{ background: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' }}
                  >
                    <Send className="w-4 h-4" /> WhatsApp
                  </button>
                  <button
                    type="button" onClick={sendViaEmail}
                    className="btn-pill flex-1 justify-center"
                  >
                    <Mail className="w-4 h-4" /> Email
                  </button>
                </div>
              </form>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-3">
            <div className="glass rounded-2xl p-3 h-full flex flex-col">
              <h3 className="font-display font-semibold text-apple mb-3">Direct Contact</h3>
              <div className="space-y-2">
                {[
                  { icon: Mail, href: 'mailto:pankajpal01022002@gmail.com', label: 'Email', value: 'pankajpal01022002@gmail.com', color: '#4F46E5' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/pankajpal12/', label: 'LinkedIn', value: 'linkedin.com/in/pankajpal12', color: '#06B6D4' },
                  { icon: Github, href: 'https://github.com/Pankaj122002', label: 'GitHub', value: 'github.com/Pankaj122002', color: '#F5F5F7' },
                  { icon: Phone, href: 'https://wa.me/918954040631', label: 'WhatsApp', value: '+91-8954040631', color: '#22C55E' },
                ].map(({ icon: Icon, href, label, value, color }) => (
                  <a key={label} href={href}
                    {...(!href.startsWith('mailto:') && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-white/5"
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <div>
                      <p className="text-muted text-xs">{label}</p>
                      <p className="text-apple text-sm">{value}</p>
                    </div>
                  </a>
                ))}
                <div className="flex items-center gap-3 p-2 rounded-xl">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#F59E0B15' }}>
                    <MapPin className="w-4 h-4" style={{ color: '#F59E0B' }} />
                  </div>
                  <div>
                    <p className="text-muted text-xs">Location</p>
                    <p className="text-apple text-sm">Delhi NCR — Open to Remote</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-3 flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
              <div>
                <p className="text-apple text-sm font-medium">Available for freelance</p>
                <p className="text-muted text-xs mt-0.5">Responds within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
