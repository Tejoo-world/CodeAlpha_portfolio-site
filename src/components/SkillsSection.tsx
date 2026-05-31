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
    { id: 'all', label: 'All Skills' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'design', label: 'Design & UX' },
    { id: 'personal', label: 'Personal' },
  ];

  // Filter skills based on search query and selected category
  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Separate design/tech from personal soft skills for side-by-side presentation
  const techSkills = filteredSkills.filter(s => s.category !== 'personal');
  const personalSkills = filteredSkills.filter(s => s.category === 'personal');

  return (
    <section id="skills" className="py-24 bg-[#FDFCFB] border-b border-[#1A1A1A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1A1A1A] pb-6 mb-16">
          <div className="space-y-2">
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-[#666]">
              02 // EXPERTISE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif italic text-[#1A1A1A]">
              My Skill Inventory
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-[#1A1A1A]/60 italic">
            "Form follows function, refinement follows dedication"
          </div>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 bg-[#F5F2EF] p-4 rounded-none border border-[#1A1A1A]/20">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-none text-[10px] font-bold tracking-[0.1em] uppercase whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#1A1A1A] text-white'
                    : 'text-[#666] hover:text-[#1A1A1A] hover:bg-[#EAEAEA]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-[#666]" />
            <input
              type="text"
              placeholder="Filter by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FDFCFB] border border-[#1A1A1A]/40 text-xs rounded-none pl-9 pr-4 py-2.5 focus:border-[#1A1A1A] outline-none text-[#1A1A1A] font-mono tracking-wider placeholder-[#888]"
            />
          </div>
        </div>

        {/* Master Skills Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Technological / Hard Skills Grid */}
          <div className={`col-span-1 lg:col-span-7 ${techSkills.length === 0 ? 'hidden' : ''}`}>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#666] mb-8 font-mono flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-2">
              <Shield size={13} className="text-[#1A1A1A]" />
              Technological & Architecture Stack
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {techSkills.map((skill, index) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-xs font-bold text-[#1A1A1A] tracking-wider uppercase">
                      {skill.name}
                    </span>
                    <span className="font-mono text-[10px] text-[#666]">
                      {skill.level}%
                    </span>
                  </div>
                  {/* Gauge bar container */}
                  <div className="h-[2px] bg-[#EAEAEA] rounded-none overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-[#1A1A1A]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personal / Soft Skills Grid */}
          <div className={`col-span-1 lg:col-span-5 ${personalSkills.length === 0 ? 'hidden' : 'lg:col-span-12'} ${techSkills.length === 0 ? 'lg:col-span-12' : ''}`}>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#666] mb-8 font-mono flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-2">
              <Sparkles size={13} className="text-[#1A1A1A]" />
              Personal & Collaborative Capabilities
            </h3>
            <div className="flex flex-col gap-3">
              {personalSkills.map((skill, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  key={skill.name}
                  className="bg-[#FDFCFB] p-4 rounded-none border border-[#1A1A1A]/10 hover:border-[#1A1A1A] hover:bg-[#F5F2EF] transition-all duration-300 relative"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#1A1A1A]"></span>
                      {skill.name}
                    </span>
                    <span className="font-mono text-[9px] font-bold text-[#1A1A1A] uppercase border border-[#1A1A1A] px-1.5 py-0.5">
                      Core Metric
                    </span>
                  </div>
                  {/* Subtle decorative feedback descriptor */}
                  <p className="text-[11px] text-[#555] font-serif italic leading-relaxed">
                    Demonstrated excellence in delivering complex outcomes with this mental framework and collaborative profile.
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-[#666] font-mono text-xs">
            <p>No matches matching your specific ledger parameters.</p>
          </div>
        )}
      </div>
    </section>
  );
}
