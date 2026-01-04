import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onInquireClick: () => void;
}

export function Hero({ onInquireClick }: HeroProps) {
  const scrollToGallery = () => {
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Beautiful Gradient Background with Soft Shapes */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, 
                #FAF8F5 0%, 
                #F5E6D3 20%, 
                #E8DCC4 35%, 
                #D4EFEC 50%, 
                #E8DCC4 65%, 
                #F5E6D3 80%, 
                #FAF8F5 100%
              )
            `,
          }}
        />
        
        {/* Elegant Overlapping Shapes */}
        <div className="absolute inset-0 opacity-40">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--color-primary-light-teal)', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: 'var(--color-primary-teal)', stopOpacity: 0.2 }} />
              </linearGradient>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--color-gold-light)', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: 'var(--color-gold)', stopOpacity: 0.2 }} />
              </linearGradient>
              <linearGradient id="lavenderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--color-lavender)', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: 'var(--color-sage)', stopOpacity: 0.2 }} />
              </linearGradient>
            </defs>
            
            {/* Large Organic Shapes */}
            <ellipse cx="80%" cy="20%" rx="300" ry="350" fill="url(#tealGradient)" />
            <ellipse cx="15%" cy="60%" rx="280" ry="320" fill="url(#goldGradient)" />
            <ellipse cx="70%" cy="75%" rx="250" ry="280" fill="url(#lavenderGradient)" />
            <circle cx="25%" cy="25%" r="180" fill="url(#goldGradient)" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-32">
        {/* Simple Gold Accent Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-24 h-[1px] bg-[var(--color-gold)] mx-auto mb-8"
        />

        <motion.h6
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[var(--color-primary-teal)] tracking-[0.3em] uppercase mb-8"
        >
          Unique Art for Your Space
        </motion.h6>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6 max-w-4xl mx-auto"
        >
          Conceptual Paintings That <span className="italic text-[var(--color-primary-teal)]">Whisper Stories</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl text-[var(--color-neutral-charcoal)] max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Every piece is meticulously handcrafted and one-of-a-kind, created exclusively for you through thoughtful customization and artistic excellence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.button
            onClick={onInquireClick}
            className="px-12 py-4 bg-[var(--color-primary-teal)] text-white rounded-none transition-all duration-300 luxury-shadow hover:luxury-shadow-hover hover:bg-[var(--color-primary-deep-teal)]"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <h5 className="text-white">Compose a Bespoke Work</h5>
          </motion.button>

          <motion.button
            onClick={scrollToGallery}
            className="px-12 py-4 bg-white/90 backdrop-blur-sm border border-[var(--color-neutral-charcoal)] text-[var(--color-neutral-charcoal)] rounded-none transition-all duration-300 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] hover:bg-white"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <h5>View Portfolio</h5>
          </motion.button>
        </motion.div>

        {/* Simple Gold Accent Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="w-24 h-[1px] bg-[var(--color-gold)] mx-auto mt-16"
        />
      </div>

      {/* Minimal Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToGallery}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-[var(--color-primary-teal)] hover:text-[var(--color-gold)] transition-colors"
        >
          <ArrowDown size={24} strokeWidth={1.5} />
        </motion.button>
      </motion.div>
    </section>
  );
}