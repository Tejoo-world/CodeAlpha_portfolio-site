import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, BookOpen, Calendar, Building } from 'lucide-react';
import { Qualification } from '../types';

interface QualificationsSectionProps {
  qualifications: Qualification[];
}

export default function QualificationsSection({ qualifications }: QualificationsSectionProps) {
  return (
    <section id="qualification" className="py-24 bg-[#050C1E] border-b border-[#1E293B] relative overflow-hidden cyber-grid">
      {/* Visual lighting accents */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1E293B] pb-6 mb-16">
          <div className="space-y-2">
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-cyan-400">
              03 // STUDIES & RESEARCH Foundations
            </span>
            <h2 className="text-4xl sm:text-5xl font-mono uppercase tracking-tight text-white font-bold select-text">
              Academic Qualifications
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400">
            "Establishing the structural blueprint of computing logic"
          </div>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Timeline Center Line with Neon Cyan Accent */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-cyan-500 via-blue-500 to-transparent transform -translate-x-1/2 opacity-60"></div>

          {/* Education items */}
          <div className="space-y-12">
            {qualifications.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={item.id || index} className="relative flex flex-col md:flex-row items-start md:justify-between group">
                  {/* Square Timeline Bullet with neon cyan shadow */}
                  <div className="absolute left-4 md:left-1/2 w-6 h-6 bg-cyan-950 border border-cyan-400 text-cyan-400 flex items-center justify-center transform -translate-x-1/2 z-10 transition-all group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.8)] rounded-none">
                    <GraduationCap size={12} className="neon-pulse animate-pulse" />
                  </div>

                  {/* Left Side (Desktop Only) - empty or content */}
                  {isEven ? (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="w-full md:w-[45%] pl-12 md:pl-0 md:text-right"
                    >
                      <TimelineCard item={item} isRight={false} />
                    </motion.div>
                  ) : (
                    <div className="hidden md:block w-[45%]"></div>
                  )}

                  {/* Right Side - content on mobile or Odd item on desktop */}
                  {!isEven ? (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="w-full md:w-[45%] pl-12"
                    >
                      <TimelineCard item={item} isRight={true} />
                    </motion.div>
                  ) : (
                    /* Mobile View Card for Even index */
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="w-full md:hidden pl-12"
                    >
                      <TimelineCard item={item} isRight={true} />
                    </motion.div>
                  )}

                  {/* Spacer for Desktop Even items on Right */}
                  {isEven ? (
                    <div className="hidden md:block w-[45%]"></div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {qualifications.length === 0 && (
          <div className="text-center py-12 bg-[#091124] border border-[#1e293b]">
            <p className="text-slate-400 font-mono text-xs">No educational chronicles found currently recorded.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// Sub Component: Timeline Card
function TimelineCard({ item, isRight }: { item: Qualification; isRight: boolean }) {
  return (
    <div className="bg-[#091124] p-5 rounded-none border border-[#1e293b]/60 hover:border-cyan-500/50 hover:bg-[#0c1630] transition-all relative group/card nano-glow-cyan">
      {/* Glowing anchor corner brackets */}
      <div className={`absolute top-0 w-2 h-2 border-t border-cyan-400/80 ${
        isRight ? 'left-0 border-l' : 'md:right-0 md:left-auto left-0 md:border-r md:border-l-0 border-l'
      }`} />

      <div className="space-y-3 font-sans">
        {/* Year Label */}
        <div className={`flex items-center gap-1.5 text-xs font-mono font-medium text-cyan-400 ${
          isRight ? '' : 'md:justify-end'
        }`}>
          <Calendar size={12} className="text-cyan-500 animate-pulse" />
          <span>{item.year}</span>
        </div>

        {/* Degree Title */}
        <h4 className="text-base font-bold text-slate-100 uppercase tracking-wide leading-tight font-sans">
          {item.degree}
        </h4>

        {/* School/Institution */}
        <div className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold ${
          isRight ? '' : 'md:justify-end'
        }`}>
          <Building size={11} className="text-blue-400" />
          <span>{item.institution}</span>
        </div>

        {/* Description details */}
        <p className={`text-xs text-slate-350 leading-relaxed pt-2.5 border-t border-slate-800/80 select-text ${
          isRight ? 'text-left' : 'md:text-right text-left'
        }`}>
          {item.description}
        </p>
      </div>
    </div>
  );
}
