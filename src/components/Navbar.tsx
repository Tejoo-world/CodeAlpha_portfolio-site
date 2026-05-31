import React from 'react';
import { Sliders, MessageSquare, Menu, X } from 'lucide-react';
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
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'qualification', label: 'Qualifications' },
    { id: 'work', label: 'Work & Projects' },
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
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#FDFCFB]/85 backdrop-blur-md border-b border-[#1A1A1A] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          {/* Logo / Personal Name */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 cursor-pointer font-serif font-bold italic text-lg tracking-tight text-[#1A1A1A] hover:opacity-85 transition-opacity"
          >
            <span className="w-2.5 h-2.5 bg-[#1A1A1A]"></span>
            {name || "Portfolio"}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative py-1 text-[10px] font-bold tracking-[0.25em] uppercase transition-all cursor-pointer ${
                  activeSection === item.id 
                    ? 'text-[#1A1A1A]' 
                    : 'text-[#666] hover:text-[#1A1A1A]'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#1A1A1A]"
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
              className="flex items-center gap-1.5 bg-[#1A1A1A] border border-[#1A1A1A] text-white rounded-none px-3.5 py-1.5 text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-transparent hover:text-[#1A1A1A] transition-all cursor-pointer active:scale-95"
            >
              <Sliders size={12} />
              <span className="hidden sm:inline">Customize Info</span>
            </button>

            {messageCount > 0 && (
              <button
                onClick={onOpenMessages}
                className="relative bg-[#F5F2EF] border border-[#D1CEC9] text-[#1A1A1A] rounded-none p-1.5 hover:bg-[#EAEAEA] transition-all cursor-pointer active:scale-95"
                title="View Local Messages"
              >
                <MessageSquare size={14} />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center bg-[#1A1A1A] text-[9px] font-mono font-bold text-white leading-none">
                  {messageCount}
                </span>
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#1A1A1A] hover:bg-[#F5F2EF] p-1.5"
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
            className="md:hidden fixed top-14 left-0 right-0 z-35 bg-[#FDFCFB] border-b border-[#1A1A1A] shadow-lg px-4 py-4"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-3 py-2.5 text-xs font-bold tracking-[0.2em] uppercase transition-colors ${
                    activeSection === item.id 
                      ? 'bg-[#1A1A1A] text-white' 
                      : 'text-[#666] hover:bg-[#F5F2EF] hover:text-[#1A1A1A]'
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
