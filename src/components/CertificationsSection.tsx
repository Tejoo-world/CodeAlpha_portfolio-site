import React from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Heart, Users, MessageSquareCode, Layers } from 'lucide-react';

interface CertificationsSectionProps {
  name: string;
}

export default function CertificationsSection({ name }: CertificationsSectionProps) {
  const certifications = [
    {
      id: "cert1",
      title: "PM Modi's Mann Ki Baat National Competition Awardee",
      organization: "Government of India Initiative",
      date: "2022",
      code: "REG: GO_I-MKB-2022",
      color: "rgba(6, 182, 212, 0.4)"
    },
    {
      id: "cert2",
      title: "Inter-House Singing Competition - Best Performer Award",
      organization: "Student Awards by PW (Physics Wallah)",
      date: "2023",
      code: "REG: PW-SNG-2023",
      color: "rgba(59, 130, 246, 0.4)"
    },
    {
      id: "cert3",
      title: "Full-Stack Web Engineering & C/C++ Dev Residency",
      organization: "Next Step Dev Labs",
      date: "2026",
      code: "REG: NSL-FULLSTK-2026",
      color: "rgba(217, 70, 239, 0.4)"
    }
  ];

  const softSkills = [
    {
      name: "Strong Public Speaking & Oratory",
      desc: "Delivering articulated presentations, participating in debates, and explaining complex bio-technical concepts with high clarity and structure.",
      icon: Heart,
      glow: "rgba(217, 70, 239, 0.1)"
    },
    {
      name: "Leadership Mindset & Ownership",
      desc: "Orchestrating projects like the Next Step Learning platform, setting academic direction, and directing multi-disciplinary goals.",
      icon: Users,
      glow: "rgba(6, 182, 212, 0.1)"
    },
    {
      name: "Team Coordination & Synergy",
      desc: "Synchronizing with web developers, academic peers, and lab partners to coordinate research efforts and build tools smoothly.",
      icon: Layers,
      glow: "rgba(59, 130, 246, 0.1)"
    }
  ];

  return (
    <section id="certifications" className="py-24 bg-[#050C1E] border-b border-[#1E293B] relative overflow-hidden cyber-grid">
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1E293B] pb-6 mb-16">
          <div className="space-y-2">
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-cyan-400">
              05 // CREDENTIAL MATRIX
            </span>
            <h2 className="text-4xl sm:text-5xl font-mono uppercase tracking-tight text-white font-bold select-text">
              Certifications & Soft Skills
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400 capitalize">
            "Validating system rigor and creative collaboration"
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Certifications Sub-Section */}
          <div className="col-span-1 lg:col-span-6 space-y-6">
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1">
                Verified Credentials
              </span>
            </div>

            <div className="space-y-4">
              {certifications.map((cert) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-[#091124] p-5 border border-[#1e293b]/60 transition-all hover:border-cyan-500/40 hover:bg-[#0c1630] flex gap-4 rounded-none group nano-glow-cyan"
                >
                  <div className="w-12 h-12 bg-cyan-950/50 text-cyan-400 flex items-center justify-center flex-shrink-0 border border-cyan-850/40 group-hover:scale-95 transition-transform">
                    <Award size={20} />
                  </div>
                  <div className="space-y-1">
                    <span className="block font-mono text-[9px] text-cyan-400/80 uppercase tracking-widest">{cert.organization}</span>
                    <h3 className="text-sm font-bold text-slate-200 tracking-wide font-sans">{cert.title}</h3>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 mt-2">
                      <span className="font-mono text-[9px] text-slate-500">{cert.code}</span>
                      <span className="font-mono text-[9px] text-cyan-400 border border-cyan-800/30 px-1.5 font-bold uppercase">{cert.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Soft Skills Section */}
          <div className="col-span-1 lg:col-span-6 space-y-6">
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1">
                Colleague Synergy Profile
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {softSkills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-5 bg-[#091124] border border-[#1e293b]/60 hover:border-purple-500/40 hover:bg-[#0c1630] transition-all rounded-none group nano-glow-magenta"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-950/50 text-purple-400 flex items-center justify-center flex-shrink-0 border border-purple-850/40 group-hover:rotate-6 transition-transform">
                        <Icon size={20} />
                      </div>
                      <div className="space-y-1 flex-1">
                        <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">{skill.name}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">{skill.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
