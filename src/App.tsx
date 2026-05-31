import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, Github, Linkedin, Twitter, Sliders, MessageSquare, Sparkles, Code, CheckCircle, Flame, Mail } from 'lucide-react';
import { PortfolioData, ContactMessage } from './types';
import { defaultPortfolioData } from './defaultData';

// Modular Sections
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import QualificationsSection from './components/QualificationsSection';
import CertificationsSection from './components/CertificationsSection';
import WorkSection from './components/WorkSection';
import ContactSection from './components/ContactSection';
import CustomizerPanel from './components/CustomizerPanel';
import MessagesDrawer from './components/MessagesDrawer';

export default function App() {
  // Load state from localStorage to ensure persistence
  const [portfolio, setPortfolio] = React.useState<PortfolioData>(() => {
    const saved = localStorage.getItem('user_portfolio_cache');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Automatically migrate if name matches placeholder from previous builds or does not have new skills or contains old timeline dates
        if (
          parsed.name === "Aria Chen" || 
          !parsed.skills || 
          !parsed.skills.some((s: any) => s.name.includes("UI/UX")) ||
          !parsed.qualifications ||
          parsed.qualifications.some((q: any) => q.year === "2023 - 2025" || q.year === "Completed 2023")
        ) {
          localStorage.removeItem('user_portfolio_cache');
          return defaultPortfolioData;
        }
        if (parsed.avatarUrl && (parsed.avatarUrl.includes("radhika_profile_") || parsed.avatarUrl.includes("radhika_own_profile_"))) {
          parsed.avatarUrl = defaultPortfolioData.avatarUrl;
          parsed.avatarRotation = 0;
        }
        return parsed;
      } catch (e) {
        console.error("Failed to parse user portfolio cache:", e);
      }
    }
    return defaultPortfolioData;
  });

  const [messages, setMessages] = React.useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('user_messages_cache');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse user messages cache:", e);
      }
    }
    return [];
  });

  // Controls for floating editors & drawers
  const [builderOpen, setBuilderOpen] = React.useState(false);
  const [messagesOpen, setMessagesOpen] = React.useState(false);
  const [notification, setNotification] = React.useState<string | null>(null);

  // Sync to database triggers (localStorage)
  const savePortfolio = (updatedData: PortfolioData) => {
    setPortfolio(updatedData);
    localStorage.setItem('user_portfolio_cache', JSON.stringify(updatedData));
    setBuilderOpen(false);
    triggerNotification("Portfolio configuration updated and synchronized!");
  };

  const handleResetData = () => {
    if (window.confirm("Restore default professional template ('Radhika Omar')? This will discard custom modifications.")) {
      setPortfolio(defaultPortfolioData);
      localStorage.removeItem('user_portfolio_cache');
      setBuilderOpen(false);
      triggerNotification("Restored default credentials ledger successfully.");
    }
  };

  const handleSendMessage = (newMsg: Omit<ContactMessage, 'id' | 'timestamp'>) => {
    const formattedMsg: ContactMessage = {
      ...newMsg,
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toLocaleDateString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        month: 'short',
        day: '2-digit'
      })
    };
    const updatedMsgs = [formattedMsg, ...messages];
    setMessages(updatedMsgs);
    localStorage.setItem('user_messages_cache', JSON.stringify(updatedMsgs));
    triggerNotification(`Signal message received from ${newMsg.name}!`);
  };

  const handleDeleteMessage = (id: string) => {
    const remaining = messages.filter((m) => m.id !== id);
    setMessages(remaining);
    localStorage.setItem('user_messages_cache', JSON.stringify(remaining));
    triggerNotification("Message log erased from local ledger.");
  };

  const handleUpdateAvatarRotation = (newRotation: number) => {
    const updated = { ...portfolio, avatarRotation: newRotation };
    setPortfolio(updated);
    localStorage.setItem('user_portfolio_cache', JSON.stringify(updated));
    triggerNotification(`Profile photo rotated to ${newRotation}° successfully!`);
  };

  const triggerNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleScrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] select-none text-slate-100 antialiased selection:bg-cyan-500 selection:text-black font-sans">
      {/* Dynamic Sticky Header Navigation */}
      <Navbar 
        name={portfolio.name} 
        onOpenBuilder={() => setBuilderOpen(true)}
        messageCount={messages.length}
        onOpenMessages={() => setMessagesOpen(true)}
      />

      {/* Floating System Connection Notification Alerts */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-55 bg-[#091124] text-cyan-400 text-[10px] tracking-[0.2em] font-mono uppercase px-5 py-3 rounded-none border border-cyan-500/45 flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] whitespace-nowrap"
          >
            <Sparkles className="text-cyan-400 animate-pulse" size={13} />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: Introduction Landing (Hero Section) */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#030712] px-4 pt-16 border-b border-[#1E293B] cyber-grid">
        {/* Glow ambient meshes */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

        {/* Content Container (Centered layout without landing picture) */}
        <div className="max-w-4xl mx-auto w-full z-10 py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center space-y-8">
          
          {/* Credentials and Title (Bubbles Up on Entry!) */}
          <motion.div
            initial={{ scale: 0.85, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.05 }}
            className="space-y-6 flex flex-col items-center text-center"
          >
            {/* Top Badge */}
            <div
              onClick={() => setBuilderOpen(true)}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-cyan-950/20 border border-cyan-800/60 rounded-none text-[9px] tracking-[0.3em] uppercase font-mono font-bold text-cyan-400 hover:bg-cyan-500 hover:text-black hover:border-cyan-400 cursor-pointer transition-all shadow-[0_0_15px_rgba(6,182,212,0.1)]"
            >
              <Sparkles size={11} className="text-current animate-spin" style={{ animationDuration: '6s' }} />
              <span>INTERACTIVE NANO PORTFOLIO LEDGER</span>
            </div>

            {/* Title Header - Font sizes are bigger than normal as explicitly requested */}
            <div className="space-y-3">
              <span className="block text-[11px] font-bold text-purple-400 uppercase tracking-[0.3em] font-mono">
                INITIAL SYSTEM SIGNAL // READY
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-mono font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-400 leading-none tracking-tight py-2 select-text">
                {portfolio.name || "Aria Chen"}
              </h1>
            </div>

            {/* Professional Role Subheader */}
            <div className="inline-block py-2 px-6 bg-[#091124] border border-cyan-500/30 font-mono tracking-[0.25em] text-cyan-450 uppercase text-xs sm:text-sm font-bold shadow-[0_0_10px_rgba(6,182,212,0.1)]">
              {portfolio.role || "Creative Technologist"}
            </div>

            {/* Biography narrative Tagline */}
            <p className="max-w-xl text-sm sm:text-base text-slate-350 leading-relaxed font-sans italic">
              "{portfolio.tagline}"
            </p>

            {/* Action Navigation Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                onClick={() => {
                  const el = document.getElementById('work');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-cyan-500 border border-cyan-500 text-black py-3 px-6 rounded-none text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-transparent hover:text-cyan-400 hover:border-cyan-400 transition-all cursor-pointer flex items-center gap-2 active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              >
                <Code size={12} />
                <span>Explore Vdo Demos</span>
              </button>

              <button
                onClick={() => setBuilderOpen(true)}
                className="bg-transparent border border-slate-700 text-slate-300 py-3 px-6 rounded-none text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-slate-800/40 hover:text-white transition-all cursor-pointer flex items-center gap-2 active:scale-95"
              >
                <Sliders size={12} />
                <span>Modify Details</span>
              </button>
            </div>

            {/* Social accounts anchors */}
            <div className="flex items-center justify-center gap-2.5 pt-4">
              <span className="text-[9px] uppercase font-mono font-bold tracking-[0.25em] text-slate-500 mr-2">Digital Nodes:</span>
              <a
                href="https://github.com/Tejoo-world"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-400 hover:text-cyan-400 hover:scale-105 transition-all text-xs flex items-center gap-1 font-mono"
                title="GitHub Profile"
              >
                <Github size={15} />
                <span className="hidden sm:inline text-[9px] text-slate-500 hover:text-cyan-400">Tejoo-world</span>
              </a>
              <a
                href="https://www.linkedin.com/in/radhika-omar-9ab195380?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-400 hover:text-cyan-400 hover:scale-105 transition-all text-xs flex items-center gap-1 font-mono"
                title="LinkedIn Profile"
              >
                <Linkedin size={15} />
                <span className="hidden sm:inline text-[9px] text-slate-500 hover:text-cyan-400">LinkedIn Connect</span>
              </a>
            </div>
          </motion.div>

        </div>

        {/* Scroll Indicator mouse trigger */}
        <div className="absolute bottom-6 flex justify-center w-full z-10">
          <button
            onClick={handleScrollToAbout}
            className="flex flex-col items-center gap-1.5 group text-slate-400 hover:text-cyan-400 cursor-pointer focus:outline-none"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] font-mono font-bold group-hover:translate-y-0.5 transition-transform duration-300">
              Scroll Ledger
            </span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <ArrowDown size={12} className="text-cyan-400" />
            </motion.div>
          </button>
        </div>
      </section>

      {/* SECTION 2: Biography About Me Section */}
      <AboutSection 
        bio={portfolio.bio} 
        avatarUrl={portfolio.avatarUrl} 
        avatarRotation={portfolio.avatarRotation}
        onUpdateAvatarRotation={handleUpdateAvatarRotation}
        personalDetails={portfolio.personalDetails}
        email={portfolio.email}
      />

      {/* SECTION 3: Technical and Soft Skills Matrix */}
      <SkillsSection skills={portfolio.skills} />

      {/* SECTION 4: Education Qualification Section */}
      <QualificationsSection qualifications={portfolio.qualifications} />

      {/* SECTION 5: NEW Certifications & Soft Skills (Explicitly Asked) */}
      <CertificationsSection name={portfolio.name} />

      {/* SECTION 6: Work experiences and creative showcase projects (Projects with links & 10s looping work demo videos) */}
      <WorkSection work={portfolio.work} />

      {/* SECTION 7: Contact Connection Form Section  */}
      <ContactSection email={portfolio.email} onSendMessage={handleSendMessage} />

      {/* FLOATING THANK YOU BILLBOARD: Floating above footer, giving dynamic tech space feedback */}
      <div className="bg-[#030712] py-8 overflow-hidden relative border-t border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="inline-block p-6 max-w-lg bg-[#091124] border border-cyan-500/25 relative overflow-hidden nano-glow-cyan text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.02] to-transparent pointer-events-none" />
            <span className="block font-mono text-[9px] text-cyan-400 tracking-[0.3em] uppercase mb-1">LOOPING TERMINAL RESPONSE</span>
            <h3 className="text-2xl font-mono uppercase tracking-[0.1em] font-bold text-white px-6">
              Thank You For Your Time
            </h3>
            <p className="text-[9.5px] font-mono text-slate-400 mt-2 tracking-widest uppercase">
              // Connection Status: Stable & Engaged //
            </p>
          </motion.div>
        </div>
      </div>

      {/* SECTION 8: System Footer Panel */}
      <footer className="py-16 bg-[#030712] border-t border-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex justify-center items-center gap-2">
            <span className="text-[10px] font-mono tracking-[0.2em] text-slate-500 uppercase">
              SPACE DUST SYSTEMS // {new Date().getFullYear()} REVOLUTION
            </span>
          </div>
          <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-[0.1em]">
            &copy; {portfolio.name || "Aria Chen"}. Built with React & Tailwind & Neon.
          </p>
          <div className="flex justify-center items-center flex-wrap gap-4 text-[9px] uppercase tracking-[0.15em] font-mono font-bold pt-4 text-cyan-400">
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="hover:underline cursor-pointer"
            >
              Back To Landing
            </button>
            <span className="text-slate-700">/</span>
            <button onClick={() => setBuilderOpen(true)} className="hover:underline cursor-pointer">
              Control Center Customizer
            </button>
            <span className="text-slate-700">/</span>
            <button onClick={handleResetData} className="hover:underline cursor-pointer text-slate-500 font-bold">
              Hard Reset Default Template
            </button>
          </div>
        </div>
      </footer>

      {/* Sidebar Live Editor Customization Panel drawer */}
      <AnimatePresence>
        {builderOpen && (
          <CustomizerPanel
            portfolioData={portfolio}
            onClose={() => setBuilderOpen(false)}
            onSave={savePortfolio}
            onReset={handleResetData}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Live Messages Log Drawer drawer */}
      <AnimatePresence>
        {messagesOpen && (
          <MessagesDrawer
            messages={messages}
            onClose={() => setMessagesOpen(false)}
            onClearMessage={handleDeleteMessage}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
