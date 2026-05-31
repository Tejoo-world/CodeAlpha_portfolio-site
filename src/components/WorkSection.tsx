import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, FolderGit2, ArrowUpRight, Play, Pause, RotateCcw, Volume2, Video } from 'lucide-react';

// @ts-ignore
import w1Video from '../assets/images/w1_demo.mp4';
// @ts-ignore
import w2Video from '../assets/images/w2_demo.mp4';

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
    <section id="work" className="py-24 bg-[#050C1E] border-b border-[#1E293B] relative overflow-hidden cyber-grid">
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1E293B] pb-6 mb-16">
          <div className="space-y-2">
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-cyan-400">
              04 // WORK & INNOVATIVE DESIGN WORK
            </span>
            <h2 className="text-4xl sm:text-5xl font-mono uppercase tracking-tight text-white font-bold select-text">
              Selected Showcases
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400">
            "Experience chronicles & 10s video demonstration previews"
          </div>
        </div>

        {/* Filter Switcher */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-[#091124] border border-[#1e293b] p-1.5 gap-1.5 rounded-none nano-glow-cyan">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-none text-[10px] font-bold tracking-[0.15em] uppercase transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Artifacts
            </button>
            <button
              onClick={() => setFilter('experience')}
              className={`px-4 py-1.5 rounded-none text-[10px] font-bold tracking-[0.15em] uppercase transition-all cursor-pointer ${
                filter === 'experience'
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => setFilter('project')}
              className={`px-4 py-1.5 rounded-none text-[10px] font-bold tracking-[0.15em] uppercase transition-all cursor-pointer ${
                filter === 'project'
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Creative Labs Vdo
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
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={item.id || index}
                className="bg-[#091124] p-6 border border-[#1e293b]/60 flex flex-col justify-between hover:border-cyan-500/50 hover:bg-[#0c1630] transition-all duration-300 group relative overflow-hidden nano-glow-cyan"
              >
                <div>
                  {/* Top metadata tags */}
                  <div className="flex items-center justify-between mb-4 text-xs font-mono">
                    <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-widest border border-cyan-800 bg-cyan-950/20 px-2 py-0.5 text-cyan-400">
                      {item.type === 'experience' ? 'Employment Record' : 'Active Innovation Code'}
                    </span>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                      {item.period}
                    </span>
                  </div>

                  {/* Title and Organization name */}
                  <div className="space-y-1 mb-4">
                    <h3 className="text-xl font-bold font-mono text-slate-200 tracking-wide uppercase">
                      {item.title}
                    </h3>
                    <span className="block text-[10.5px] font-bold text-cyan-400 uppercase tracking-[0.2em] font-mono">
                      {item.company}
                    </span>
                  </div>

                  {/* Body details text info */}
                  <p className="text-slate-350 text-xs md:text-sm leading-relaxed mb-6 whitespace-pre-wrap select-text font-sans">
                    {item.description}
                  </p>
                </div>

                <div>
                  {/* 10-Second Interactive Demonstration Video Player (Mandatory Requirement) */}
                  {item.type === 'project' && (
                    <div className="mb-6">
                      <CompactVideoPlayer title={item.title} projectId={item.id} />
                    </div>
                  )}

                  {/* Technologies utilized badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5 border-t border-slate-800/80 pt-4">
                    {item.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-slate-300 bg-transparent px-2 py-0.5 rounded-none border border-slate-800 hover:border-cyan-400 hover:text-cyan-400 transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links layout links */}
                  {item.type === 'project' && item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono tracking-wider font-bold text-cyan-400 hover:text-cyan-300 cursor-pointer group/link uppercase"
                    >
                      <span>Explore Production Build</span>
                      <ArrowUpRight size={13} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredWork.length === 0 && (
          <div className="text-center py-16 bg-[#091124] border border-[#1e293b] mt-12 rounded-none">
            <p className="text-slate-400 font-mono text-xs">No active matching archives in current database classification log.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// Sub Component: Highly Custom 10-Second Video Demo Hardware-Emulator Player
function CompactVideoPlayer({ title, projectId }: { title: string; projectId: string }) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  // Sync state loop progress timer
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (videoRef.current) {
            const duration = videoRef.current.duration || 10;
            const current = videoRef.current.currentTime;
            if (current >= duration || prev >= duration) {
              videoRef.current.currentTime = 0;
              return 0;
            }
            return Number(current.toFixed(1));
          }
          if (prev >= 10) {
            return 0;
          }
          return Number((prev + 0.1).toFixed(1));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((e) => console.log("Auto-start video stream active callback:", e));
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
    setCurrentTime(0);
  };

  // Assign the permanent imported video assets
  const videoUrlToUse = projectId === 'w1' ? w1Video : projectId === 'w2' ? w2Video : null;

  // Calculate percentage of current timeline
  const durationGoal = videoRef.current?.duration || 10;
  const percentage = (currentTime / durationGoal) * 100;

  return (
    <div className="relative border border-[#1e293b] bg-[#030712] overflow-hidden rounded-none p-1 font-mono transition-all hover:border-cyan-500/30 group/player shadow-inner">
      {/* Playback Container Frame */}
      <div className="relative aspect-video w-full bg-slate-950 overflow-hidden border border-slate-900 flex items-center justify-center">
        {/* Core Video Player */}
        <video
          ref={videoRef}
          src={videoUrlToUse || ""}
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover opacity-80 group-hover/player:scale-103 transition-transform duration-700 ${
            isPlaying ? 'brightness-110 saturate-120' : 'brightness-50 grayscale contrast-125'
          }`}
        />

        {/* Scanning grid shader glass */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-scanlines mix-blend-overlay opacity-30 bg-gradient-to-t from-[#020617]/40 to-transparent" />

        {/* Ambient Overlay metadata tags */}
        <div className="absolute top-2 left-2 z-25 flex items-center gap-2 bg-black/75 px-2 py-1 text-[8px] font-bold text-cyan-400 tracking-wider uppercase border border-cyan-500/20">
          <span className={`w-1.5 h-1.5 rounded-full bg-red-400 ${isPlaying ? 'animate-ping' : ''}`}></span>
          <span>
            {projectId === 'w1' ? "Next Step Learning Hub Walkthrough" : "Portfolio Interactive Demo"}
          </span>
        </div>

        <div className="absolute top-2 right-2 z-25 bg-black/75 px-2 py-0.5 text-[8px] font-bold text-slate-400 tracking-widest border border-slate-800">
          LOCKED ASSET // 00:{Math.floor(videoRef.current?.duration || 10)}s
        </div>

        {/* Animated Sound Waveforms Simulator (only operates while playing!) */}
        {isPlaying && (
          <div className="absolute bottom-2 left-3 z-25 flex items-end gap-[2px] h-6">
            {[1, 2, 3, 4, 5, 4, 3, 2, 1, 3, 5, 2, 4, 2, 5].map((val, idx) => (
              <motion.div
                key={idx}
                animate={{ height: [`${val * 3}px`, `${Math.random() * 20 + 4}px`, `${val * 3}px`] }}
                transition={{ repeat: Infinity, duration: 0.8 + idx * 0.05, ease: 'easeInOut' }}
                className="w-[2px] bg-cyan-400 shadow-[0_0_5px_rgba(6,182,212,0.6)]"
              />
            ))}
          </div>
        )}

        {/* Centered Large Play Overlay Trigger */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={togglePlayback}
              className="absolute z-19 w-12 h-12 bg-cyan-500 hover:bg-cyan-400 text-black flex items-center justify-center rounded-none shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all transform hover:scale-110 active:scale-95 cursor-pointer"
            >
              <Play size={16} fill="black" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Playback Controls Footer Drawer panel */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-3 py-2 bg-[#091124] text-[9px] border-t border-slate-900 gap-2">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlayback}
            className="text-cyan-400 hover:text-white transition-colors cursor-pointer text-[10px]"
            title={isPlaying ? "Pause Stream" : "Play Stream"}
          >
            {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
          </button>
          <button
            onClick={handleReset}
            className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
            title="Reset Loop Playback"
          >
            <RotateCcw size={11} />
          </button>
          {/* Timeline counter indicator */}
          <span className="text-slate-400 font-mono">
            00:{(currentTime < 10 ? "0" : "") + Math.floor(currentTime)} / 00:{Math.floor(videoRef.current?.duration || 10)}
          </span>
        </div>

        {/* Interactive Linear Progress Slider */}
        <div className="flex-1 h-1.5 bg-slate-950 sm:mx-2 relative overflow-hidden border border-slate-900 rounded-none">
          <div
            className="h-full bg-cyan-500 shadow-[0_0_5px_rgba(6,182,212,0.8)] transition-all duration-100 ease-linear"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Dynamic Video Action Buttons */}
        <div className="flex items-center gap-2 justify-end">
          <div className="flex items-center gap-1.5 text-slate-500 mr-1">
            <Volume2 size={10} className="text-cyan-500/60 animate-pulse" />
            <span className="text-[8px] uppercase tracking-wider text-[#b2f1fc] font-bold">1080P // ARCHIVED DEMO</span>
          </div>
        </div>
      </div>
    </div>
  );
}
