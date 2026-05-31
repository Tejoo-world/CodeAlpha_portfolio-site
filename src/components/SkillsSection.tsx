import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Filter, Search } from 'lucide-react';
import { Skill } from '../types';

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const categories = [
    { id: 'all', label: 'All Fields' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'design', label: 'Design & UX' },
    { id: 'personal', label: 'Personal Soft' },
  ];

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const techSkills = filteredSkills.filter(s => s.category !== 'personal');
  const personalSkills = filteredSkills.filter(s => s.category === 'personal');

  return (
    <section id="skills" className="py-24 bg-[#050C1E] border-b border-[#1E293B] relative overflow-hidden cyber-grid">
      {/* Decorative glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1E293B] pb-6 mb-16">
          <div className="space-y-2">
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-cyan-400">
              02 // EXPERTISE INDEX
            </span>
            <h2 className="text-4xl sm:text-5xl font-mono uppercase tracking-tight text-white font-bold select-text">
              My Technology & Capability Matrix
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400">
            "Fine-tuning systems from concept to sensory rendering"
          </div>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 bg-[#091124] p-4 rounded-none border border-[#1e293b] nano-glow-blue">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-none text-[10px] font-bold tracking-[0.1em] uppercase whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050C1E] border border-[#1e293b]/85 text-xs rounded-none pl-9 pr-4 py-2.5 focus:border-cyan-400 outline-none text-slate-100 font-mono tracking-wider placeholder-slate-500"
            />
          </div>
        </div>

        {/* Master Skills Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Technological / Hard Skills Grid */}
          <div className={`col-span-1 lg:col-span-7 ${techSkills.length === 0 ? 'hidden' : ''}`}>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400 mb-8 font-mono flex items-center gap-2 border-b border-[#1E293B] pb-2">
              <Shield size={13} className="text-cyan-400 animate-pulse" />
              Technological & Architecture Stack
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {techSkills.map((skill) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-xs font-bold font-mono text-slate-200 tracking-wider uppercase group-hover:text-cyan-400 transition-colors">
                      {skill.name}
                    </span>
                    <span className="font-mono text-[10px] text-cyan-400 font-bold">
                      {skill.level}%
                    </span>
                  </div>
                  {/* Gauge bar container with glowing background track */}
                  <div className="h-2 bg-[#091124] rounded-none overflow-hidden relative border border-slate-850">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personal / Soft Skills Grid */}
          <div className={`col-span-1 lg:col-span-5 ${personalSkills.length === 0 ? 'hidden' : 'lg:col-span-12'} ${techSkills.length === 0 ? 'lg:col-span-12' : ''}`}>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-purple-400 mb-8 font-mono flex items-center gap-2 border-b border-[#1E293B] pb-2">
              <Sparkles size={13} className="text-purple-400" />
              Organizational & Collaborative Power
            </h3>
            <div className="flex flex-col gap-3">
              {personalSkills.map((skill, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  key={skill.name}
                  className="bg-[#091124] p-4 rounded-none border border-[#1e293b]/60 hover:border-purple-500/50 hover:bg-[#0c1630] transition-all duration-300 relative nano-glow-magenta"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 font-mono">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-none shadow-[0_0_5px_#d946ef]"></span>
                      {skill.name}
                    </span>
                    <span className="font-mono text-[9px] font-bold text-purple-400 uppercase border border-purple-800/40 px-1.5 py-0.5 bg-purple-950/20">
                      Core Merit
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                    Demonstrated excellence in delivering complex engineering objectives with this robust interpersonal mental model.
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-20 bg-[#091124] border border-[#1e293b] mt-12">
            <p className="text-slate-400 font-mono text-xs">No active matching coordinates located in the active registry.</p>
          </div>
        )}
      </div>
    </section>
  );
}
