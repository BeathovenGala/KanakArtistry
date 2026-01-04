import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import artwork1 from 'figma:asset/29b3d1a687d8aa67fd4fceb65df6ca00f8b650ca.png';
import artwork2 from 'figma:asset/745310027211ed9d399381cde224974558251b8b.png';
import artwork3 from 'figma:asset/c16d1a5500838cea86ac7584938ff71889ffb00f.png';
import artwork4 from 'figma:asset/b09ec96ea3306adf9c1898df5a535cf4a8e00fbd.png';
import artwork5 from 'figma:asset/6388cd32bbb603009d74ce48ffe257e7a59595c4.png';
import artwork6 from 'figma:asset/50e456d53c5a5096e98c7d05750c57cb66426350.png';

const artworks = [
  {
    id: 1,
    image: artwork1,
    title: 'Cherry Blossom Dreams',
    medium: 'Mixed Media & Relief Art',
    description: 'A textured celebration of nature with three-dimensional cherry blossoms on a turquoise canvas.',
  },
  {
    id: 2,
    image: artwork2,
    title: 'Tree of Life',
    medium: 'Madhubani Folk Art',
    description: 'Traditional Indian folk art featuring intricate patterns and symbolic tree motifs.',
  },
  {
    id: 3,
    image: artwork3,
    title: 'Starlit Lotus',
    medium: 'Acrylic Painting',
    description: 'Contemporary interpretation of lotus flowers against a celestial backdrop.',
  },
  {
    id: 4,
    image: artwork4,
    title: 'Sacred Circle',
    medium: 'Madhubani Folk Art',
    description: 'Intricate mandala design featuring the tree of life surrounded by traditional motifs and vibrant birds.',
  },
  {
    id: 5,
    image: artwork5,
    title: 'Divine Journey',
    medium: 'Warli & Folk Fusion',
    description: 'A majestic depiction of divine figures on a chariot against a golden sunset, blending traditional storytelling.',
  },
  {
    id: 6,
    image: artwork6,
    title: 'Garden of Serenity',
    medium: 'Contemporary Mixed Media',
    description: 'A peaceful triptych showcasing nature\'s beauty with intricate details of flora, fauna, and wildlife.',
  },
];

interface GalleryProps {
  onInquireClick: () => void;
  onInquireWithArtwork?: (artworkTitle: string, artworkMedium: string) => void;
}

export function Gallery({ onInquireClick, onInquireWithArtwork }: GalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="gallery" ref={containerRef} className="py-24 bg-[var(--color-neutral-white)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="w-16 h-[1px] bg-[var(--color-gold)] mx-auto mb-6" />
          <h6 className="text-[var(--color-primary-teal)] tracking-[0.3em] uppercase mb-6">
            Portfolio
          </h6>
          <h2 className="mb-6">Featured Works</h2>
          <p className="max-w-2xl mx-auto text-lg text-[var(--color-neutral-gray)]">
            Each piece tells a unique story through symbolism, texture, and emotion.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {artworks.map((art, index) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden bg-[var(--color-neutral-white)] mb-6 luxury-shadow transition-all duration-500 hover:luxury-shadow-hover">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3">
                <h6 className="text-[var(--color-gold)] uppercase tracking-wider text-sm">
                  {art.medium}
                </h6>
                <h4>{art.title}</h4>
                <p className="text-[var(--color-neutral-gray)] leading-relaxed">
                  {art.description}
                </p>
                <motion.button
                  onClick={() => onInquireWithArtwork?.(art.title, art.medium)}
                  className="inline-flex items-center gap-2 text-[var(--color-primary-teal)] hover:text-[var(--color-gold)] transition-colors mt-4 group/btn"
                  whileHover={{ x: 4 }}
                >
                  <span>Commission Similar</span>
                  <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center bg-[var(--color-neutral-white)] py-20 px-12 luxury-shadow"
        >
          <div className="w-16 h-[1px] bg-[var(--color-gold)] mx-auto mb-8" />
          <h3 className="mb-6">Ready to Commission Your <span className="luxury-accent italic">Unique Piece</span>?</h3>
          <p className="max-w-2xl mx-auto mb-10 text-lg text-[var(--color-neutral-gray)]">
            Each artwork is custom-made exclusively for you. No two pieces are ever the same.
          </p>
          <motion.button
            onClick={onInquireClick}
            className="px-12 py-4 bg-[var(--color-primary-teal)] text-white rounded-none transition-all duration-300 luxury-shadow hover:luxury-shadow-hover hover:bg-[var(--color-primary-deep-teal)]"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <h5 className="text-white">Begin Your Commission</h5>
          </motion.button>
          <div className="w-16 h-[1px] bg-[var(--color-gold)] mx-auto mt-8" />
        </motion.div>
      </div>
    </section>
  );
}