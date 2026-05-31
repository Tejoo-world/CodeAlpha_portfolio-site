import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, BookOpen, Calendar, Building } from 'lucide-react';
import { Qualification } from '../types';

interface QualificationsSectionProps {
  qualifications: Qualification[];
}

export default function QualificationsSection({ qualifications }: QualificationsSectionProps) {
  return (
    <section id="qualification" className="py-24 bg-[#FDFCFB] border-b border-[#1A1A1A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1A1A1A] pb-6 mb-16">
          <div className="space-y-2">
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-[#666]">
              03 // EDUCATION & CREDENTIALS
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif italic text-[#1A1A1A]">
              Academic Foundations
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-[#1A1A1A]/60 italic">
            "An enduring architecture demands a meticulous blueprint"
          </div>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Timeline Center Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[1px] bg-[#1A1A1A]/30 transform -translate-x-1/2"></div>

          {/* Education items */}
          <div className="space-y-12">
            {qualifications.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={item.id || index} className="relative flex flex-col md:flex-row items-start md:justify-between group">
                  {/* Square Timeline Bullet */}
                  <div className="absolute left-4 md:left-1/2 w-6 h-6 bg-[#1A1A1A] text-white flex items-center justify-center transform -translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                    <GraduationCap size={12} />
                  </div>

                  {/* Left Side (Desktop Only) - empty or content */}
                  {isEven ? (
                    /* Content goes on Left card, Right is empty */
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
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
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="w-full md:w-[45%] pl-12"
                    >
                      <TimelineCard item={item} isRight={true} />
                    </motion.div>
                  ) : (
                    /* Mobile View Card for Even index */
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
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
          <div className="text-center py-12 text-[#666] font-mono text-xs">
            <p>No educational credentials added to the current database records.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// Sub Component: Timeline Card
function TimelineCard({ item, isRight }: { item: Qualification; isRight: boolean }) {
  return (
    <div className="bg-[#FDFCFB] p-5 rounded-none border border-[#1A1A1A]/30 hover:border-[#1A1A1A] hover:bg-[#F5F2EF] transition-all relative group/card">
      {/* Editorial aesthetic corner bracket accent */}
      <div className={`absolute top-0 w-2 h-2 border-t border-[#1A1A1A] ${
        isRight ? 'left-0 border-l' : 'md:right-0 md:left-auto left-0 md:border-r md:border-l-0 border-l'
      }`} />

      <div className="space-y-3">
        {/* Year Label */}
        <div className={`flex items-center gap-1.5 text-xs font-serif italic text-[#1A1A1A] font-semibold ${
          isRight ? '' : 'md:justify-end'
        }`}>
          <Calendar size={12} className="text-[#666]" />
          <span>{item.year}</span>
        </div>

        {/* Degree Title */}
        <h4 className="text-base font-bold text-[#1A1A1A] leading-tight uppercase tracking-wider select-text">
          {item.degree}
        </h4>

        {/* School/Institution */}
        <div className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#666] font-semibold ${
          isRight ? '' : 'md:justify-end'
        }`}>
          <Building size={11} className="text-[#888]" />
          <span>{item.institution}</span>
        </div>

        {/* Description details */}
        <p className={`text-xs text-[#444] font-serif leading-relaxed pt-2 border-t border-[#1A1A1A]/10 select-text ${
          isRight ? 'text-left' : 'md:text-right text-left'
        }`}>
          {item.description}
        </p>
      </div>
    </div>
  );
}
