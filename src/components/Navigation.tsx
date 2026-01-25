import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

interface NavigationProps {
  onInquireClick: () => void;
}

export function Navigation({ onInquireClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    console.log('Scrolling to:', id);
    
    // Close mobile menu first to unlock body scroll
    setIsMobileMenuOpen(false);
    
    // Small delay to ensure body is unlocked and layout is restored before scrolling
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        });
      } else {
        console.warn('Section not found:', id);
      }
    }, 100);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
    if (href) {
      scrollToSection(href.slice(1));
    }
  };

  // Simplified: Remove the separate event handler, just call scrollToSection directly
  const handleMenuItemClick = (id: string) => {
    scrollToSection(id);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 backdrop-blur-sm shadow-lg'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo - Anchor for click-to-home + accessibility */}
          <a
            href="#home"
            onClick={handleNavClick}
            aria-label="Go to Home"
            className="cursor-pointer transition-opacity duration-300 hover:opacity-80"
          >
            <Logo />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {['home', 'about', 'gallery', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => handleMenuItemClick(item)}
                className="capitalize text-[var(--color-neutral-charcoal)] hover:text-[var(--color-gold)] transition-colors tracking-wider text-sm uppercase"
              >
                {item}
              </button>
            ))}
            <button
              onClick={onInquireClick}
              className="px-8 py-3 bg-[var(--color-primary-teal)] text-white rounded-none hover:bg-[var(--color-primary-deep-teal)] transition-colors text-sm uppercase tracking-wider"
            >
              Inquire
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors duration-300 z-50 ${
              isScrolled ? 'text-[var(--color-neutral-black)]' : 'text-[var(--color-neutral-black)]'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white border-b border-[var(--color-neutral-light-gray)] overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {['home', 'about', 'gallery', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleMenuItemClick(item)}
                  className="capitalize text-left text-[var(--color-neutral-charcoal)] hover:text-[var(--color-gold)] transition-colors tracking-wider text-sm uppercase w-full py-2"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => {
                  onInquireClick();
                  setIsMobileMenuOpen(false);
                }}
                className="px-8 py-3 bg-[var(--color-primary-teal)] text-white rounded-none hover:bg-[var(--color-primary-deep-teal)] transition-colors text-center text-sm uppercase tracking-wider w-full"
              >
                Inquire
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}