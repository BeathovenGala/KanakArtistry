import { motion } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { setSEOTags, createProductSchema } from '../utils/seo';

// WebP images (primary - smaller size, better quality)
import artwork1Webp from '../assets/webp/living_tree_of_grace.webp';
import artwork2Webp from '../assets/webp/Garden_of_living_light.webp';
import artwork3Webp from '../assets/webp/Light of the Lord.webp';
import artwork4Webp from '../assets/webp/Tree of Abundance.webp';
import artwork5Webp from '../assets/webp/The sacred rise of the lotus.webp';
import artwork6Webp from '../assets/webp/Above the garden dream.webp';
import artwork7Webp from '../assets/webp/Divya Gyaan.webp';
import artwork8Webp from '../assets/webp/Circle of Harmony.webp';
import artwork9Webp from '../assets/webp/Night Bloom.webp';
import artwork10Webp from '../assets/webp/Tree of Timeless Balance.webp';
import artwork11Webp from '../assets/webp/A Journey of Eternal Love & Divine Blessings.webp';

// JPEG fallback images (backup - wider compatibility)
import artwork1Jpeg from '../assets/jpeg/living_tree_of_grace.png';
import artwork2Jpeg from '../assets/jpeg/Garden_of_living_light.png';
import artwork3Jpeg from '../assets/jpeg/Light of the Lord.png';
import artwork4Jpeg from '../assets/jpeg/Tree of Abundance.jpeg';
import artwork5Jpeg from '../assets/jpeg/The sacred rise of the lotus.jpeg';
import artwork6Jpeg from '../assets/jpeg/Above the garden dream.png';
import artwork7Jpeg from '../assets/jpeg/Divya Gyaan.png';
import artwork8Jpeg from '../assets/jpeg/Circle of Harmony.png';
import artwork9Jpeg from '../assets/jpeg/Night Bloom.jpeg';
import artwork10Jpeg from '../assets/jpeg/Tree of Timeless Balance.jpeg';
import artwork11Jpeg from '../assets/jpeg/A Journey of Eternal Love & Divine Blessings.jpeg';

const artworks = [
  {
    id: 1,
    imageWebp: artwork1Webp,
    imageJpeg: artwork1Jpeg,
    title: 'The Living Tree of Grace',
    medium: 'Canvas Painting',
    description: 'A vibrant, detailed Tree of Life on a sky-blue and white textured background. This auspicious tree reflects the flow of life, growth, and harmony, bringing prosperity, positivity, and the fulfillment of wishes.',
    alt: 'The Living Tree of Grace - Vibrant tree of life painting on sky-blue and white textured background representing prosperity and harmony',
  },
  {
    id: 2,
    imageWebp: artwork2Webp,
    imageJpeg: artwork2Jpeg,
    title: 'Garden of Living Light',
    medium: 'Canvas Painting',
    description: 'A vibrant garden of flowers against a peach and sky-blue background, with golden dots shimmering like energy—reflecting growth, vitality, and the blossoming of life\'s potential.',
    alt: 'Garden of Living Light - Vibrant garden flowers with golden shimmer on peach and sky-blue background symbolizing growth and vitality',
  },
  {
    id: 3,
    imageWebp: artwork3Webp,
    imageJpeg: artwork3Jpeg,
    title: 'Light of the Lord',
    medium: 'Canvas Painting',
    description: 'A textured canvas painting with Shrinathji\'s face at the center, radiating amidst the glory of the sun. This artwork captures divine light, devotion, and spiritual brilliance.',
    alt: 'Light of the Lord - Shrinathji textured canvas painting with divine sun radiation and spiritual brilliance',
  },
  {
    id: 4,
    imageWebp: artwork4Webp,
    imageJpeg: artwork4Jpeg,
    title: 'Tree of Abundance',
    medium: 'Canvas Painting',
    description: 'A radiant Tree of Life glowing with a golden aura, adorned with vibrant, blooming flowers and graceful golden birds. This artwork reflects divine balance, growth, and the eternal movement of energy through nature.',
    alt: 'Tree of Abundance - Radiant golden tree of life with blooming flowers and graceful birds representing divine balance and growth',
  },
  {
    id: 5,
    imageWebp: artwork5Webp,
    imageJpeg: artwork5Jpeg,
    title: 'The Sacred Rise of the Lotus',
    medium: 'Canvas Painting',
    description: 'A canvas painting of lotuses and their leaves rising toward the light, created with intricate dot work, reflecting purity, growth, and quiet strength.',
    alt: 'The Sacred Rise of the Lotus - Spiritual lotus flower canvas painting with divine energy and intricate dot work',
  },
  {
    id: 6,
    imageWebp: artwork6Webp,
    imageJpeg: artwork6Jpeg,
    title: 'Above the Garden Dream',
    medium: 'Canvas Painting',
    description: 'A canvas painting with a purple background, featuring butterflies and leaves as if seen from above, capturing the mesmerizing beauty and quiet wonder of nature.',
    alt: 'Above the Garden Dream - Ethereal landscape with floating flowers and celestial elements capturing natural beauty',
  },
  {
    id: 7,
    imageWebp: artwork7Webp,
    imageJpeg: artwork7Jpeg,
    title: 'Divya Gyaan',
    medium: 'Painting on MDF',
    description: 'A painting depicting Arjuna and Krishna from the Mahabharata, with Krishna imparting wisdom to Arjuna. Embossed chariot details, surrounding greenery, golden backgrounds, and soft clouds create a pure, serene aura, symbolizing a fresh, receptive mind ready to embrace divine knowledge.',
    alt: 'Divya Gyaan - Divine knowledge spiritual artwork with Krishna and Arjuna from Mahabharata with embossed details and cosmic elements',
  },
  {
    id: 8,
    imageWebp: artwork8Webp,
    imageJpeg: artwork8Jpeg,
    title: 'Circle of Harmony',
    medium: 'Gond-style Mandala',
    description: 'A Gond-style Tree of Life mandala painting on handmade paper, featuring birds and branches that symbolize protection and harmony, with vibrant patterns reflecting the interconnected energy of life.',
    alt: 'Circle of Harmony - Mandala-inspired art with symmetrical geometric and organic patterns representing cosmic order and unity',
  },
  {
    id: 9,
    imageWebp: artwork9Webp,
    imageJpeg: artwork9Jpeg,
    title: 'Night Bloom',
    medium: 'Canvas Painting',
    description: 'A detailed canvas painting of lotuses and leaves on a deep navy background with white dots like stars, showing calmness, purity, and quiet beauty.',
    alt: 'Night Bloom - Nocturnal flowers and luminous plants against dark mystical background with star-like elements',
  },
  {
    id: 10,
    imageWebp: artwork10Webp,
    imageJpeg: artwork10Jpeg,
    title: 'Tree of Timeless Balance',
    medium: 'Pattachitra-style',
    description: 'A Pattachitra-style Tree of Life on handmade paper, with upward-reaching branches and intricate detailing on a soft peach background, reflecting balance and growth.',
    alt: 'Tree of Timeless Balance - Symmetrical tree artwork representing eternal equilibrium and stability in Pattachitra style',
  },
  {
    id: 11,
    imageWebp: artwork11Webp,
    imageJpeg: artwork11Jpeg,
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
  const [visibleImages, setVisibleImages] = useState<{ [key: number]: boolean }>({});

  // Preload all images as background-images on component mount
  useEffect(() => {
    // Images are cached via background-image CSS, no additional loading needed
    // This happens automatically when component renders
  }, []);

  // Toggle image visibility
  const toggleImageVisibility = (artworkId: number) => {
    setVisibleImages(prev => ({
      ...prev,
      [artworkId]: !prev[artworkId]
    }));
  };

  return (
    <section id="gallery" ref={containerRef} className="py-24 bg-[var(--color-neutral-white)]">
      {/* Hidden preloader containers - images cached via background-image */}
      <div style={{ display: 'none' }} className="image-preloader">
        {artworks.map((art) => (
          <div
            key={`preload-${art.id}`}
            id={`preload-img-${art.id}`}
            className="preload-container"
            style={{
              backgroundImage: `url(${art.imageWebp}), url(${art.imageJpeg})`,
              width: '100%',
              height: '100%',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            aria-hidden="true"
          />
        ))}
      </div>

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
            Each piece tells a unique story through symbolism, texture, and emotion. Click to reveal images.
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
              {/* Click-to-reveal image container */}
              <div className="relative aspect-square overflow-hidden bg-[var(--color-neutral-white)] mb-6 luxury-shadow transition-all duration-500 hover:luxury-shadow-hover">
                {/* Toggle button overlay */}
                <button
                  onClick={() => toggleImageVisibility(art.id)}
                  className={`img-toggle-btn img-${art.id} absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-br from-[var(--color-primary-light-teal)] to-[var(--color-gold-light)] transition-opacity duration-300 ${visibleImages[art.id] ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                  aria-label={`${visibleImages[art.id] ? 'Hide' : 'Show'} ${art.title}`}
                >
                  <div className="text-center p-6">
                    {visibleImages[art.id] ? (
                      <EyeOff size={48} className="mx-auto mb-3 text-[var(--color-primary-teal)]" />
                    ) : (
                      <Eye size={48} className="mx-auto mb-3 text-[var(--color-primary-teal)]" />
                    )}
                    <p className="text-[var(--color-neutral-charcoal)] font-medium">
                      {visibleImages[art.id] ? 'Hide Image' : 'Click to View'}
                    </p>
                    <p className="text-sm text-[var(--color-neutral-gray)] mt-2">
                      {art.title}
                    </p>
                  </div>
                </button>

                {/* Cached image container - displayed/hidden via background-image */}
                <div
                  id={`img-${art.id}`}
                  className="cached-image-container"
                  style={{
                    display: visibleImages[art.id] ? 'block' : 'none',
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${art.imageWebp}), url(${art.imageJpeg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    transition: 'transform 0.7s ease'
                  }}
                  role="img"
                  aria-label={art.alt}
                  className="group-hover:scale-105"
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
                <div className="flex gap-3 flex-wrap">
                  <motion.button
                    onClick={() => toggleImageVisibility(art.id)}
                    className="inline-flex items-center gap-2 text-[var(--color-primary-teal)] hover:text-[var(--color-gold)] transition-colors mt-4"
                    whileHover={{ x: 4 }}
                  >
                    {visibleImages[art.id] ? (
                      <>
                        <EyeOff size={16} />
                        <span>Hide Image</span>
                      </>
                    ) : (
                      <>
                        <Eye size={16} />
                        <span>Show Image</span>
                      </>
                    )}
                  </motion.button>
                  <motion.button
                    onClick={() => onInquireWithArtwork?.(art.title, art.medium)}
                    className="inline-flex items-center gap-2 text-[var(--color-primary-teal)] hover:text-[var(--color-gold)] transition-colors mt-4 group/btn"
                    whileHover={{ x: 4 }}
                  >
                    <span>Commission Similar</span>
                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                  </motion.button>
                </div>
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