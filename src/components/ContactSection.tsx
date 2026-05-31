import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Mail, Phone, MapPin, Github, Linkedin, Twitter, MessageSquare, Sparkles } from 'lucide-react';
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
    <section id="contact" className="py-24 bg-[#050C1E] border-b border-[#1E293B] relative overflow-hidden cyber-grid">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1E293B] pb-6 mb-16">
          <div className="space-y-2">
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-cyan-400">
              06 // DIALOGUE PORTS
            </span>
            <h2 className="text-4xl sm:text-5xl font-mono uppercase tracking-tight text-white font-bold select-text">
              Connect & Inquire
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400">
            "Initiating connection streams instantly"
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          {/* Left Column: Contact info details - italicized per explicit user requirement */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-between space-y-8 bg-[#091124] p-6 md:p-8 rounded-none border border-[#1e293b]/60 nano-glow-magenta">
            <div className="space-y-6">
              <h3 className="text-lg font-bold font-mono uppercase tracking-wider text-purple-400">
                Contact Info
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans italic">
                Thank you for reviewing my details. Feel free to connect directly using any of my official channels listed below.
              </p>

              {/* Coordinates List: ITALICIZED as requested */}
              <div className="space-y-4 pt-2 font-mono italic">
                <div className="flex items-center gap-4 group">
                  <div className="w-9 h-9 bg-purple-950/40 border border-purple-800/40 text-purple-400 flex items-center justify-center transition-all group-hover:scale-95">
                    <Mail size={14} />
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] font-mono not-italic text-purple-400">
                      Email address
                    </span>
                    <a href={`mailto:${email || "omarradhika94@gmail.com"}`} className="text-xs font-bold text-slate-200 hover:text-cyan-400 transition-colors hover:underline">
                      {email || "omarradhika94@gmail.com"}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-9 h-9 bg-purple-950/40 border border-purple-800/40 text-purple-400 flex items-center justify-center transition-all group-hover:scale-95">
                    <Phone size={14} />
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] font-mono not-italic text-purple-400">
                      Voice connection
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      9956494942
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-9 h-9 bg-purple-950/40 border border-purple-800/40 text-purple-400 flex items-center justify-center transition-all group-hover:scale-95">
                    <MapPin size={14} />
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] font-mono not-italic text-purple-400">
                      Coordinates
                    </span>
                    <span className="text-xs font-bold text-slate-200 tracking-tight">
                      Kanpur / Bareilly, India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Accounts Links */}
            <div className="pt-6 border-t border-slate-800/60 font-mono">
              <span className="block text-[9px] font-bold text-purple-400 uppercase tracking-[0.2em] mb-4">
                Digital nodes
              </span>
              <div className="flex gap-2 flex-wrap">
                <a
                  href="https://github.com/Tejoo-world"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-none bg-transparent border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all font-mono italic"
                  title="GitHub Profile"
                >
                  <Github size={14} />
                </a>
                <a
                  href="https://www.linkedin.com/in/radhika-omar-9ab195380?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-none bg-transparent border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all font-mono italic"
                  title="LinkedIn Profile"
                >
                  <Linkedin size={14} />
                </a>
                <a
                  href="https://next-step-five-dusky.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-none bg-transparent border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all font-mono italic"
                  title="Next Step Hub Website"
                >
                  <Sparkles size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Thank You Banner as explicitly requested */}
          <div className="col-span-1 lg:col-span-7 bg-[#091124] p-8 rounded-none border border-[#1e293b]/60 nano-glow-cyan flex flex-col items-center justify-center text-center overflow-hidden relative min-h-[350px]">
            {/* Animated biological/cyber floats in the background */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-60 h-60 border border-cyan-500/10 rounded-full flex items-center justify-center pointer-events-none"
            >
              <div className="w-48 h-48 border border-dashed border-purple-500/10 rounded-full" />
            </motion.div>

            {/* Floating content */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="space-y-6 relative z-10"
            >
              <div className="inline-block px-3 py-1 bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 font-mono text-[9px] uppercase tracking-[0.25em] mb-2 rounded-none">
                ✨ SIGNAL OF GRATITUDE
              </div>
              
              <h3 className="text-5xl sm:text-6xl font-mono uppercase tracking-widest text-[#FFF] font-extrabold select-text">
                THANK <span className="text-cyan-400 font-serif italic font-normal tracking-wide lowercase">you</span>
              </h3>

              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto my-4" />

              <p className="text-slate-300 font-sans text-sm max-w-sm mx-auto leading-relaxed italic">
                "I appreciate your time spent reviewing my academic, leadership, and digital credentials. Let's create impactful solutions together."
              </p>

              <div className="flex gap-2 justify-center pt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse [animation-delay:0.4s]" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
