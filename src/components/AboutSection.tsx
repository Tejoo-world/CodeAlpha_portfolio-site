import * as Icons from 'lucide-react';
import { motion } from 'motion/react';
import { PersonalDetails } from '../types';
import React from 'react';

interface AboutSectionProps {
  bio: string;
  avatarUrl: string;
  personalDetails: PersonalDetails[];
  email: string;
}

// Helper to map string to Lucide icon component
const RenderIcon = ({ name, size = 18, className = "" }: { name: string; size?: number; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) {
    return <Icons.HelpCircle size={size} className={className} />;
  }
  return <IconComponent size={size} className={className} />;
};

export default function AboutSection({ bio, avatarUrl, personalDetails, email }: AboutSectionProps) {
  const [copiedText, setCopiedText] = React.useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <section id="about" className="py-24 bg-[#FDFCFB] border-b border-[#1A1A1A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Editorial Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1A1A1A] pb-6 mb-16">
          <div className="space-y-2">
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-[#666]">
              01 // BIOGRAPHY
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif italic text-[#1A1A1A]">
              Personal Information & Philosophy
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-[#1A1A1A]/60 italic">
            "Design is empty without a human-centric worldview"
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Column 1: Persona Card (Editorial Framed Image) */}
          <div className="col-span-1 lg:col-span-4 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-2 bg-[#FDFCFB] border border-[#1A1A1A] rounded-none shadow-sm w-72 h-72 md:w-80 md:h-80 flex-shrink-0 group overflow-hidden"
            >
              <div className="w-full h-full rounded-none overflow-hidden relative border border-[#1A1A1A]/10">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile Avatar"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-[#F5F2EF] flex items-center justify-center text-[#1A1A1A]">
                    <Icons.User size={80} strokeWidth={1} />
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Column 2: Details & Bio */}
          <div className="col-span-1 lg:col-span-8 space-y-10">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] leading-tight select-text">
                Crafting interfaces with structural balance & <span className="italic font-medium">meticulous clarity</span>.
              </h3>
              <p className="text-[#333] font-sans leading-relaxed text-sm md:text-base whitespace-pre-wrap select-text">
                {bio || "Enter some details about yourself by clicking 'Customize Info'."}
              </p>
            </motion.div>

            {/* Personal Details Grid */}
            <div className="pt-4 border-t border-[#1A1A1A]/20">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#666] mb-6 font-mono">
                CORE INFORMATION LEDGER / METRIC MATRIX
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
                    className="flex items-center gap-4 bg-[#FDFCFB] p-4 rounded-none border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:bg-[#F5F2EF] cursor-copy transition-all group relative"
                  >
                    <div className="w-9 h-9 bg-[#1A1A1A] text-white flex items-center justify-center transition-all group-hover:scale-95">
                      <RenderIcon name={detail.icon} size={15} />
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold text-[#666] uppercase tracking-[0.15em] font-mono">
                        {detail.label}
                      </span>
                      <span className="block text-xs font-bold text-[#1A1A1A] tracking-wider mt-0.5">
                        {detail.value}
                      </span>
                    </div>

                    {/* Copy feedback */}
                    <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {copiedText === detail.label ? (
                        <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-[#1a1a1a]">
                          <Icons.Check size={10} /> Copied
                        </span>
                      ) : (
                        <Icons.Copy size={10} className="text-[#666]" />
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Email Direct Copy Button */}
                {email && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onClick={() => handleCopy(email, 'email')}
                    className="flex items-center gap-4 bg-[#FDFCFB] p-4 rounded-none border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:bg-[#F5F2EF] cursor-copy transition-all group sm:col-span-2 relative"
                  >
                    <div className="w-9 h-9 bg-[#1A1A1A] text-white flex items-center justify-center transition-all group-hover:scale-95">
                      <Icons.Mail size={15} />
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold text-[#666] uppercase tracking-[0.15em] font-mono">
                        Direct Email Address
                      </span>
                      <span className="block text-xs font-mono font-bold text-[#1A1A1A] tracking-wide mt-0.5">
                        {email}
                      </span>
                    </div>

                    <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {copiedText === 'email' ? (
                        <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-[#1a1a1a]">
                          <Icons.Check size={10} /> Copied
                        </span>
                      ) : (
                        <Icons.Copy size={10} className="text-[#666]" />
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
