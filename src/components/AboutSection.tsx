import * as Icons from 'lucide-react';
import { motion } from 'motion/react';
import { PersonalDetails } from '../types';
import React from 'react';

interface AboutSectionProps {
  bio: string;
  avatarUrl: string;
  avatarRotation?: number;
  onUpdateAvatarRotation?: (rotation: number) => void;
  personalDetails: PersonalDetails[];
  email: string;
}

const RenderIcon = ({ name, size = 18, className = "" }: { name: string; size?: number; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) {
    return <Icons.HelpCircle size={size} className={className} />;
  }
  return <IconComponent size={size} className={className} />;
};

export default function AboutSection({ 
  bio, 
  avatarUrl, 
  avatarRotation = 0, 
  onUpdateAvatarRotation, 
  personalDetails, 
  email 
}: AboutSectionProps) {
  const [copiedText, setCopiedText] = React.useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <section id="about" className="py-24 bg-[#050C1E] border-b border-[#1E293B] relative overflow-hidden cyber-grid">
      {/* Glow shapes */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-cyan-700/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1E293B] pb-6 mb-16">
          <div className="space-y-2">
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-cyan-400">
              01 // BIOGRAPHY
            </span>
            <h2 className="text-4xl sm:text-5xl font-mono uppercase tracking-tight text-white font-bold select-text">
              ABOUT ME
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400">
            "Bridging biotechnology & digital systems"
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Column 1: Persona Card (Passport Size aspect-[3/4]) */}
          <div className="col-span-1 lg:col-span-4 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-2 bg-[#091124] border border-[#1e293b] w-48 h-64 md:w-56 md:h-72 flex-shrink-0 group overflow-hidden nano-glow-cyan rounded-none"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none z-10" />
              <div className="w-full h-full overflow-hidden relative border border-slate-800 flex items-center justify-center">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Radhika Omar Passport Portrait"
                    referrerPolicy="no-referrer"
                    style={{ transform: `rotate(${avatarRotation}deg)` }}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-[#050C1E] flex items-center justify-center text-slate-400 border border-slate-800">
                    <Icons.User size={60} strokeWidth={1} className="text-cyan-400" />
                  </div>
                )}
              </div>
            </motion.div>
            <div className="flex flex-col items-center gap-1.5 mt-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block font-bold">
                BIOTECHNOLOGY SPECIMEN VISUAL
              </span>
            </div>
          </div>

          {/* Column 2: Details & Bio */}
          <div className="col-span-1 lg:col-span-8 space-y-10">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl sm:text-2xl font-mono text-cyan-400 leading-snug select-text font-semibold uppercase tracking-wide">
                Bridging Biotechnology & Web Development
              </h3>
              <p className="text-slate-300 font-sans leading-relaxed text-sm md:text-base whitespace-pre-wrap select-text">
                {bio || "Enter some details about yourself by clicking 'Modify Info' header button."}
              </p>
            </motion.div>

            {/* Personal Details Grid */}
            <div className="pt-6 border-t border-[#1e293b]">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-purple-400 mb-6 font-mono">
                PERSONAL INFORMATION
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {personalDetails.map((detail, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    key={detail.label}
                    onClick={() => handleCopy(detail.value, detail.label)}
                    className="flex items-center gap-4 bg-[#091124] p-4 rounded-none border border-[#1e293b]/60 hover:border-cyan-500/50 hover:bg-[#0c1630] cursor-copy transition-all group relative nano-glow-blue"
                  >
                    <div className="w-9 h-9 bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 flex items-center justify-center transition-all group-hover:scale-95">
                      <RenderIcon name={detail.icon} size={15} />
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] font-mono">
                        {detail.label}
                      </span>
                      <span className="block text-xs font-bold text-slate-200 tracking-wider mt-0.5 font-sans">
                        {detail.value}
                      </span>
                    </div>

                    <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {copiedText === detail.label ? (
                        <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-cyan-400">
                          <Icons.Check size={10} /> Copied!
                        </span>
                      ) : (
                        <Icons.Copy size={10} className="text-slate-500 hover:text-cyan-400" />
                      )}
                    </div>
                  </motion.div>
                ))}

                {email && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onClick={() => handleCopy(email, 'email')}
                    className="flex items-center gap-4 bg-[#091124] p-4 rounded-none border border-[#1e293b]/60 hover:border-purple-500/50 hover:bg-[#0c1630] cursor-copy transition-all group sm:col-span-2 relative nano-glow-magenta"
                  >
                    <div className="w-9 h-9 bg-purple-950/40 border border-purple-800/40 text-purple-400 flex items-center justify-center transition-all group-hover:scale-95">
                      <Icons.Mail size={15} />
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] font-mono">
                        Email Address
                      </span>
                      <span className="block text-xs font-mono font-bold text-purple-300 tracking-wide mt-0.5">
                        {email}
                      </span>
                    </div>

                    <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {copiedText === 'email' ? (
                        <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-purple-400">
                          <Icons.Check size={10} /> Copied!
                        </span>
                      ) : (
                        <Icons.Copy size={10} className="text-slate-500 hover:text-purple-400" />
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
