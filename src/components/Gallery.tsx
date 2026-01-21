import { motion } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { LazyImage } from './ui/LazyImage';
import { setSEOTags, createProductSchema } from '../utils/seo';
import artwork1 from '../assets/living_tree_of_grace.png';
import artwork2 from '../assets/Garden_of_living_light.png';
import artwork3 from '../assets/Light of the Lord.png';
import artwork4 from '../assets/Tree of Abundance.jpeg';
import artwork5 from '../assets/The sacred rise of the lotus.jpeg';
import artwork6 from '../assets/Above the garden dream.png';
import artwork7 from '../assets/Divya Gyaan.png';
import artwork8 from '../assets/Circle of Harmony.png';
import artwork9 from '../assets/Night Bloom.jpeg';
import artwork10 from '../assets/Tree of Timeless Balance.jpeg';
import artwork11 from '../assets/A Journey of Eternal Love & Divine Blessings.jpeg';

const artworks = [
  {
    id: 1,
    image: artwork1,
    title: 'The Living Tree of Grace',
    medium: 'Canvas Painting',
    description: 'A vibrant, detailed Tree of Life on a sky-blue and white textured background. This auspicious tree reflects the flow of life, growth, and harmony, bringing prosperity, positivity, and the fulfillment of wishes.',
    alt: 'The Living Tree of Grace - Vibrant tree of life painting on sky-blue and white textured background representing prosperity and harmony',
  },
  {
    id: 2,
    image: artwork2,
    title: 'Garden of Living Light',
    medium: 'Canvas Painting',
    description: 'A vibrant garden of flowers against a peach and sky-blue background, with golden dots shimmering like energy—reflecting growth, vitality, and the blossoming of life\'s potential.',
    alt: 'Garden of Living Light - Vibrant garden flowers with golden shimmer on peach and sky-blue background symbolizing growth and vitality',
  },
  {
    id: 3,
    image: artwork3,
    title: 'Light of the Lord',
    medium: 'Canvas Painting',
    description: 'A textured canvas painting with Shrinathji\'s face at the center, radiating amidst the glory of the sun. This artwork captures divine light, devotion, and spiritual brilliance.',
    alt: 'Light of the Lord - Shrinathji textured canvas painting with divine sun radiation and spiritual brilliance',
  },
  {
    id: 4,
    image: artwork4,
    title: 'Tree of Abundance',
    medium: 'Canvas Painting',
    description: 'A radiant Tree of Life glowing with a golden aura, adorned with vibrant, blooming flowers and graceful golden birds. This artwork reflects divine balance, growth, and the eternal movement of energy through nature.',
    alt: 'Tree of Abundance - Radiant golden tree of life with blooming flowers and graceful birds representing divine balance and growth',
  },
  {
    id: 5,
    image: artwork5,
    title: 'The Sacred Rise of the Lotus',
    medium: 'Canvas Painting',
    description: 'A canvas painting of lotuses and their leaves rising toward the light, created with intricate dot work, reflecting purity, growth, and quiet strength.',
    alt: 'The Sacred Rise of the Lotus - Spiritual lotus flower canvas painting with divine energy and intricate dot work',
  },
  {
    id: 6,
    image: artwork6,
    title: 'Above the Garden Dream',
    medium: 'Canvas Painting',
    description: 'A canvas painting with a purple background, featuring butterflies and leaves as if seen from above, capturing the mesmerizing beauty and quiet wonder of nature.',
    alt: 'Above the Garden Dream - Ethereal landscape with floating flowers and celestial elements capturing natural beauty',
  },
  {
    id: 7,
    image: artwork7,
    title: 'Divya Gyaan',
    medium: 'Painting on MDF',
    description: 'A painting depicting Arjuna and Krishna from the Mahabharata, with Krishna imparting wisdom to Arjuna. Embossed chariot details, surrounding greenery, golden backgrounds, and soft clouds create a pure, serene aura, symbolizing a fresh, receptive mind ready to embrace divine knowledge.',
    alt: 'Divya Gyaan - Divine knowledge spiritual artwork with Krishna and Arjuna from Mahabharata with embossed details and cosmic elements',
  },
  {
    id: 8,
    image: artwork8,
    title: 'Circle of Harmony',
    medium: 'Gond-style Mandala',
    description: 'A Gond-style Tree of Life mandala painting on handmade paper, featuring birds and branches that symbolize protection and harmony, with vibrant patterns reflecting the interconnected energy of life.',
    alt: 'Circle of Harmony - Mandala-inspired art with symmetrical geometric and organic patterns representing cosmic order and unity',
  },
  {
    id: 9,
    image: artwork9,
    title: 'Night Bloom',
    medium: 'Canvas Painting',
    description: 'A detailed canvas painting of lotuses and leaves on a deep navy background with white dots like stars, showing calmness, purity, and quiet beauty.',
    alt: 'Night Bloom - Nocturnal flowers and luminous plants against dark mystical background with star-like elements',
  },
  {
    id: 10,
    image: artwork10,
    title: 'Tree of Timeless Balance',
    medium: 'Pattachitra-style',
    description: 'A Pattachitra-style Tree of Life on handmade paper, with upward-reaching branches and intricate detailing on a soft peach background, reflecting balance and growth.',
    alt: 'Tree of Timeless Balance - Symmetrical tree artwork representing eternal equilibrium and stability in Pattachitra style',
  },
  {
    id: 11,
    image: artwork11,
    title: 'A Journey of Eternal Love & Divine Blessings',
    medium: 'Triptych Canvas Paintings',
    description: 'Three canvas paintings that are more than colors on canvas—they capture a soulful journey of love, faith, and divine protection.',
    alt: 'A Journey of Eternal Love & Divine Blessings - Spiritual journey artwork triptych with flowing energy and divine blessings',
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
                <LazyImage
                  src={art.image}
                  alt={art.alt}
                  title={art.description}
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