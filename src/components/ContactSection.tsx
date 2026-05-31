import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Mail, Phone, MapPin, Github, Linkedin, Twitter, MessageSquare } from 'lucide-react';
import { ContactMessage } from '../types';

interface ContactSectionProps {
  email: string;
  onSendMessage: (message: Omit<ContactMessage, 'id' | 'timestamp'>) => void;
}

export default function ContactSection({ email, onSendMessage }: ContactSectionProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate sending time
    setTimeout(() => {
      onSendMessage(formData);
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      // Clear successful alert after 5s
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-[#FDFCFB] border-b border-[#1A1A1A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1A1A1A] pb-6 mb-16">
          <div className="space-y-2">
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-[#666]">
              05 // DISPATCH COORDINATES
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif italic text-[#1A1A1A]">
              Connect & Inquire
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-[#1A1A1A]/60 italic">
            "Dialogue is the bridge between hypothesis and architecture"
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          {/* Left Column: Handshake Channels list */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-between space-y-8 bg-[#FDFCFB] p-6 md:p-8 rounded-none border border-[#1A1A1A]/30">
            <div className="space-y-6">
              <h3 className="text-lg font-bold font-serif text-[#1A1A1A]">
                Primary Channels
              </h3>
              <p className="text-xs text-[#555] leading-relaxed font-sans">
                Ready to review potential synergies or discuss a role? Feel free to initiate contact via the dispatch engine or coordinates.
              </p>

              {/* Coordinates List */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4 group">
                  <div className="w-9 h-9 bg-[#1A1A1A] text-white flex items-center justify-center transition-all group-hover:scale-95">
                    <Mail size={14} />
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-[#666] uppercase tracking-[0.15em] font-mono">
                      Email Coordinates
                    </span>
                    <a href={`mailto:${email}`} className="text-xs font-mono font-bold text-[#1A1A1A] hover:underline">
                      {email || "info@example.com"}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-9 h-9 bg-[#1A1A1A] text-white flex items-center justify-center transition-all group-hover:scale-95">
                    <Phone size={14} />
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-[#666] uppercase tracking-[0.15em] font-mono">
                      Voice Connection
                    </span>
                    <span className="text-xs font-mono font-bold text-[#1A1A1A]">
                      +1 (415) 555-8931
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-9 h-9 bg-[#1A1A1A] text-white flex items-center justify-center transition-all group-hover:scale-95">
                    <MapPin size={14} />
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-[#666] uppercase tracking-[0.15em] font-mono">
                      Studio Coordinates
                    </span>
                    <span className="text-xs font-mono font-bold text-[#1A1A1A] tracking-tight">
                      San Francisco, California, USA
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Structured Social Networks */}
            <div className="pt-6 border-t border-[#1A1A1A]/10">
              <span className="block text-[9px] font-bold text-[#666] uppercase tracking-[0.2em] font-mono mb-4">
                Digital Directories
              </span>
              <div className="flex gap-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-none bg-transparent border border-[#1A1A1A]/30 flex items-center justify-center text-[#1A1A1A] hover:text-white hover:bg-[#1A1A1A] hover:border-[#1A1A1A] transition-all"
                >
                  <Github size={13} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-none bg-transparent border border-[#1A1A1A]/30 flex items-center justify-center text-[#1A1A1A] hover:text-white hover:bg-[#1A1A1A] hover:border-[#1A1A1A] transition-all"
                >
                  <Linkedin size={13} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-none bg-transparent border border-[#1A1A1A]/30 flex items-center justify-center text-[#1A1A1A] hover:text-white hover:bg-[#1A1A1A] hover:border-[#1A1A1A] transition-all"
                >
                  <Twitter size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="col-span-1 lg:col-span-7 bg-[#FDFCFB] p-6 md:p-8 rounded-none border border-[#1A1A1A]/30">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#666] mb-6 font-mono">
              DISPATCH SIGNAL INQUIRY
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold text-[#666] uppercase tracking-[0.15em] mb-1.5 font-mono">
                  Full Identification / Affiliation
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Katherine Johnson"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border border-[#1A1A1A]/30 rounded-none px-3.5 py-2.5 text-xs outline-none focus:border-[#1A1A1A] text-[#1A1A1A] font-mono tracking-wider placeholder-[#888]"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-[#666] uppercase tracking-[0.15em] mb-1.5 font-mono">
                  Return Communication Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g., katherine@nasa.gov"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border border-[#1A1A1A]/30 rounded-none px-3.5 py-2.5 text-xs outline-none focus:border-[#1A1A1A] text-[#1A1A1A] font-mono tracking-wider placeholder-[#888]"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-[#666] uppercase tracking-[0.15em] mb-1.5 font-mono">
                  Dialogue Inquiries & Proposals
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Type your message proposals, coordination schedules, or feedback details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border border-[#1A1A1A]/30 rounded-none px-3.5 py-2.5 text-xs outline-none focus:border-[#1A1A1A] text-[#1A1A1A] font-mono tracking-wider placeholder-[#888] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#1A1A1A] border border-[#1A1A1A] text-white font-bold rounded-none py-3 text-xs tracking-[0.15em] uppercase hover:bg-transparent hover:text-[#1A1A1A] transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Broadcasting Signal...</span>
                  </>
                ) : (
                  <>
                    <Send size={13} />
                    <span>Broadcast Message Log</span>
                  </>
                )}
              </button>

              <AnimatePresence>
                {formSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-2 bg-[#F5F2EF] border border-[#1A1A1A] p-4 rounded-none text-[#1A1A1A] text-[11px] font-mono"
                  >
                    <CheckCircle2 size={14} className="text-[#1A1A1A] flex-shrink-0" />
                    <span>Signal logged successfully. Message is deposited onto local repository ledgers.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
