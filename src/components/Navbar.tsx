import React from 'react';
import { Sliders, MessageSquare, Menu, X, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  name: string;
  onOpenBuilder: () => void;
  messageCount: number;
  onOpenMessages: () => void;
}

export default function Navbar({ name, onOpenBuilder, messageCount, onOpenMessages }: NavbarProps) {
  const [activeSection, setActiveSection] = React.useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Intro' },
    { id: 'about', label: 'Biography' },
    { id: 'skills', label: 'Skills' },
    { id: 'qualification', label: 'Studies' },
    { id: 'certifications', label: 'Credentials' },
    { id: 'work', label: 'Projects Vdo' },
    { id: 'contact', label: 'Contact' },
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#030712]/80 backdrop-blur-md border-b border-[#1e293b]/60 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          {/* Logo / Personal Name */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 cursor-pointer font-serif font-bold italic text-lg tracking-tight text-white hover:opacity-85 transition-opacity"
          >
            <span className="w-2 h-2 bg-cyan-400 rounded-none shadow-[0_0_8px_#22d3ee]"></span>
            {name || "Portfolio"}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative py-1 text-[10px] font-bold tracking-[0.2em] uppercase transition-all cursor-pointer ${
                  activeSection === item.id 
                    ? 'text-cyan-400 font-bold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Control Utility Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenBuilder}
              className="flex items-center gap-1.5 bg-[#091124] border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-950/20 rounded-none px-3 py-1.5 text-[9px] font-bold tracking-[0.15em] uppercase transition-all cursor-pointer active:scale-95 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
            >
              <Sliders size={11} />
              <span className="hidden sm:inline">Modify Info</span>
            </button>

            {messageCount > 0 && (
              <button
                onClick={onOpenMessages}
                className="relative bg-[#091124] border border-purple-500/30 text-purple-400 hover:border-purple-400 hover:bg-purple-950/20 rounded-none p-1.5 transition-all cursor-pointer active:scale-95 shadow-[0_0_10px_rgba(168,85,247,0.1)]"
                title="View Local Messages"
              >
                <MessageSquare size={13} />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center bg-purple-500 text-[8px] font-mono font-bold text-white rounded-full leading-none shadow-[0_0_5px_rgba(168,85,247,0.8)]">
                  {messageCount}
                </span>
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-slate-300 hover:text-white hover:bg-slate-800/40 p-1.5"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed top-14 left-0 right-0 z-35 bg-[#030712] border-b border-cyan-500/20 shadow-2xl px-4 py-4"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-3 py-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${
                    activeSection === item.id 
                      ? 'bg-cyan-950/40 border-l-2 border-cyan-400 text-cyan-400' 
                      : 'text-slate-400 hover:bg-slate-850/40 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
