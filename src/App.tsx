import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, Github, Linkedin, Twitter, Sliders, MessageSquare, Sparkles, Code, CheckCircle, Smartphone } from 'lucide-react';
import { PortfolioData, ContactMessage } from './types';
import { defaultPortfolioData } from './defaultData';

// Modular Sections
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import QualificationsSection from './components/QualificationsSection';
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
        return JSON.parse(saved);
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
    if (window.confirm("Restore default professional template ('Aria Chen')? This will discard custom modifications.")) {
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
    <div className="min-h-screen bg-[#FDFCFB] select-none text-[#1A1A1A] antialiased selection:bg-[#1A1A1A] selection:text-white">
      {/* Dynamic Sticky Header Navigation */}
      <Navbar 
        name={portfolio.name} 
        onOpenBuilder={() => setBuilderOpen(true)}
        messageCount={messages.length}
        onOpenMessages={() => setMessagesOpen(true)}
      />

      {/* Floating System-Wide Connection Notification Alerts */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-55 bg-[#1A1A1A] text-white text-[10px] tracking-[0.2em] font-mono uppercase px-5 py-3 rounded-none border border-[#1A1A1A] flex items-center gap-2 shadow-lg whitespace-nowrap"
          >
            <Sparkles className="text-white animate-pulse" size={13} />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: Introduction Landing (Hero Section) */}
      <section id="home" className="relative min-h-[96vh] flex flex-col justify-center items-center overflow-hidden bg-[#FDFCFB] px-4 pt-16 border-b border-[#1A1A1A]">
        
        {/* Subtle Horizontal & Vertical Line Guides to mimic high-end layout grids */}
        <div className="absolute top-0 bottom-0 left-10 w-[1px] bg-[#1A1A1A]/5 pointer-events-none hidden lg:block" />
        <div className="absolute top-0 bottom-0 right-10 w-[1px] bg-[#1A1A1A]/5 pointer-events-none hidden lg:block" />
        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-[#1A1A1A]/5 pointer-events-none hidden lg:block" />

        {/* Content Container */}
        <div className="max-w-4xl mx-auto text-center space-y-8 z-10 relative py-12">
          
          {/* Creative Top Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-transparent border border-[#1A1A1A] rounded-none text-[9px] tracking-[0.3em] uppercase font-mono font-bold text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white cursor-pointer transition-all shadow-none"
            onClick={() => setBuilderOpen(true)}
          >
            <Sparkles size={11} className="text-current animate-spin" style={{ animationDuration: '6s' }} />
            <span>INTERACTIVE CREDENTIAL LEDGER</span>
          </motion.div>

          {/* Dynamic Developer Name Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="space-y-3"
          >
            <span className="block text-xs font-bold text-[#666] uppercase tracking-[0.25em] font-mono">
              Welcome // Introduction
            </span>
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-serif italic text-[#1A1A1A] font-light leading-none tracking-tight select-text pb-2">
              {portfolio.name || "Aria Chen"}
            </h1>
          </motion.div>

          {/* Core Professional Role Subheader */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-sm sm:text-base lg:text-xl font-bold font-mono tracking-[0.25em] text-[#1A1A1A] uppercase border-y border-[#1A1A1A] inline-block py-2 px-8"
          >
            {portfolio.role}
          </motion.h2>

          {/* Narrative description Tagline copy */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#333] leading-relaxed font-serif italic font-light select-text"
          >
            "{portfolio.tagline}"
          </motion.p>

          {/* Action Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-4"
          >
            <button
               onClick={() => {
                 const el = document.getElementById('work');
                 if (el) el.scrollIntoView({ behavior: 'smooth' });
               }}
              className="bg-[#1A1A1A] border border-[#1A1A1A] text-white py-3 px-6 rounded-none text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-transparent hover:text-[#1A1A1A] transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <Code size={12} />
              <span>Explore Programs & Skills</span>
            </button>

            <button
              onClick={() => setBuilderOpen(true)}
              className="bg-transparent border border-[#1A1A1A] text-[#1A1A1A] py-3 px-6 rounded-none text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#1A1A1A] hover:text-white transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <Sliders size={12} />
              <span>Customize Template Info</span>
            </button>
          </motion.div>

          {/* Creative Social Links on Bottom of Hero */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex items-center justify-center gap-2.5 pt-6"
          >
            <span className="text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-[#666] mr-2">Digital Nodes:</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-[#666] hover:text-[#1A1A1A] transition-colors"
              title="GitHub Node"
            >
              <Github size={15} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-[#666] hover:text-[#1A1A1A] transition-colors"
              title="LinkedIn Node"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-[#666] hover:text-[#1A1A1A] transition-colors"
              title="Twitter Node"
            >
              <Twitter size={15} />
            </a>
          </motion.div>
        </div>

        {/* Scroll down mouse wheel mouse container */}
        <div className="absolute bottom-6 flex justify-center w-full">
          <button
            onClick={handleScrollToAbout}
            className="flex flex-col items-center gap-1.5 group text-[#555] hover:text-[#1A1A1A] cursor-pointer focus:outline-none"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] font-mono font-bold group-hover:translate-y-0.5 transition-transform duration-300">
              Scroll Ledger
            </span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <ArrowDown size={12} />
            </motion.div>
          </button>
        </div>
      </section>

      {/* SECTION 2: Biography About Me Section */}
      <AboutSection 
        bio={portfolio.bio} 
        avatarUrl={portfolio.avatarUrl} 
        personalDetails={portfolio.personalDetails}
        email={portfolio.email}
      />

      {/* SECTION 3: Technical and Soft Skills Matrix */}
      <SkillsSection skills={portfolio.skills} />

      {/* SECTION 4: Education Qualification Section */}
      <QualificationsSection qualifications={portfolio.qualifications} />

      {/* SECTION 5: Work experiences and creative showcase projects */}
      <WorkSection work={portfolio.work} />

      {/* SECTION 6: Contact Connection Form Section */}
      <ContactSection email={portfolio.email} onSendMessage={handleSendMessage} />

      {/* SECTION 7: System Footer Panel */}
      <footer className="py-16 bg-[#FDFCFB] border-t border-[#1A1A1A] text-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex justify-center items-center gap-2">
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#666] uppercase">
              CATALOGED // {new Date().getFullYear()} COLLECTION
            </span>
          </div>
          <p className="text-[10px] font-bold text-[#666] uppercase tracking-[0.1em] font-mono">
            &copy; {portfolio.name || "Aria Chen"}. Manufactured with React & Tailwind.
          </p>
          <div className="flex justify-center items-center flex-wrap gap-4 text-[9px] uppercase tracking-[0.15em] font-mono font-bold pt-4 text-[#1A1A1A]">
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="hover:underline cursor-pointer"
            >
              Back To Landing
            </button>
            <span className="text-[#1A1A1A]/30">/</span>
            <button onClick={() => setBuilderOpen(true)} className="hover:underline cursor-pointer">
              Customizer
            </button>
            <span className="text-[#1A1A1A]/30">/</span>
            <button onClick={handleResetData} className="hover:underline cursor-pointer text-[#1A1A1A]/60 font-bold">
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
