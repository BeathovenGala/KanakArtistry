import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ImageLightboxProps {
  src: string;
  alt: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageLightbox({ src, alt, title, isOpen, onClose }: ImageLightboxProps) {
  // Close lightbox on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                onClose();
              }
            }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="relative max-w-4xl max-h-[90vh] w-full flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClose();
                }}
                className="absolute -top-12 right-0 text-white hover:text-[var(--color-gold)] transition-colors z-10"
                aria-label="Close lightbox"
              >
                <X size={32} />
              </button>

              {/* Image */}
              <div className="flex items-center justify-center flex-1 bg-black/50 rounded-lg overflow-hidden">
                <img
                  src={src}
                  alt={alt}
                  title={title}
                  className="max-w-full max-h-[80vh] object-contain"
                />
              </div>

              {/* Title Below Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center bg-black/80 backdrop-blur-sm rounded-lg p-4"
              >
                <h3 className="text-white mb-2">{title}</h3>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
