import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, FolderGit2, Link, ArrowUpRight, Code, Tag } from 'lucide-react';

interface WorkSectionProps {
  work: any[];
}

export default function WorkSection({ work }: WorkSectionProps) {
  const [filter, setFilter] = React.useState<'all' | 'experience' | 'project'>('all');

  const filteredWork = work.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <section id="work" className="py-24 bg-[#FDFCFB] border-b border-[#1A1A1A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1A1A1A] pb-6 mb-16">
          <div className="space-y-2">
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-[#666]">
              04 // WORK & RETROSPECTIVES
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif italic text-[#1A1A1A]">
              Selected Showcases
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-[#1A1A1A]/60 italic">
            "Every artifact is a testament to persistent inquiry"
          </div>
        </div>

        {/* Filter Switcher */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-[#F5F2EF] border border-[#1A1A1A]/25 rounded-none p-1 gap-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-none text-[10px] font-bold tracking-[0.15em] uppercase transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#1A1A1A] text-white'
                  : 'text-[#666] hover:text-[#1A1A1A]'
              }`}
            >
              All Artifacts
            </button>
            <button
              onClick={() => setFilter('experience')}
              className={`px-4 py-1.5 rounded-none text-[10px] font-bold tracking-[0.15em] uppercase transition-all cursor-pointer ${
                filter === 'experience'
                  ? 'bg-[#1A1A1A] text-white'
                  : 'text-[#666] hover:text-[#1A1A1A]'
              }`}
            >
              Industry Experience
            </button>
            <button
              onClick={() => setFilter('project')}
              className={`px-4 py-1.5 rounded-none text-[10px] font-bold tracking-[0.15em] uppercase transition-all cursor-pointer ${
                filter === 'project'
                  ? 'bg-[#1A1A1A] text-white'
                  : 'text-[#666] hover:text-[#1A1A1A]'
              }`}
            >
              Creative Labs
            </button>
          </div>
        </div>

        {/* Showcase Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredWork.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 15 }}
                transition={{ duration: 0.3 }}
                key={item.id || index}
                className="bg-[#FDFCFB] p-6 rounded-none border border-[#1A1A1A]/30 flex flex-col justify-between hover:border-[#1A1A1A] hover:bg-[#F5F2EF] transition-all duration-300 group relative overflow-hidden"
              >
                <div>
                  {/* Top line metadata description */}
                  <div className="flex items-center justify-between mb-4 text-xs">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider border border-[#1A1A1A]/60 px-2 py-0.5 text-[#1A1A1A] bg-transparent">
                      {item.type === 'experience' ? 'Employment Record' : 'Lab Prototype'}
                    </span>
                    <span className="font-serif font-bold italic text-[11px] text-[#666]">
                      {item.period}
                    </span>
                  </div>

                  {/* Title and Company Name */}
                  <div className="space-y-1 mb-4">
                    <h3 className="text-xl font-bold font-serif text-[#1A1A1A] leading-snug select-text group-hover:italic">
                      {item.title}
                    </h3>
                    <span className="block text-[10px] font-bold text-[#666] uppercase tracking-[0.15em] font-mono">
                      {item.company}
                    </span>
                  </div>

                  {/* Body description text */}
                  <p className="text-[#333] text-xs md:text-sm leading-relaxed mb-6 whitespace-pre-wrap select-text font-sans">
                    {item.description}
                  </p>
                </div>

                <div>
                  {/* Technology Tags footer */}
                  <div className="flex flex-wrap gap-1.5 mb-5 border-t border-[#1A1A1A]/10 pt-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-[9px] font-mono font-semibold text-[#1A1A1A] bg-transparent px-2.5 py-0.5 rounded-none border border-[#1A1A1A]/20 hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* External Project Link Button */}
                  {item.type === 'project' && item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-serif italic font-bold text-[#1A1A1A] hover:underline cursor-pointer group/link"
                    >
                      <span>Explore Live Build</span>
                      <ArrowUpRight size={13} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredWork.length === 0 && (
          <div className="text-center py-12 text-[#666] font-mono text-xs">
            <p>No active ledger records corresponding to this classification tab.</p>
          </div>
        )}
      </div>
    </section>
  );
}
