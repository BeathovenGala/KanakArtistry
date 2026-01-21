/**
 * Image Optimization Utilities
 * Handles alt text, descriptions, and lazy loading
 */

export const IMAGE_DESCRIPTIONS = {
  'living_tree_of_grace': {
    alt: 'The Living Tree of Grace - Vibrant tree of life painting on sky-blue and white textured background',
    description: 'A vibrant, detailed Tree of Life on a sky-blue and white textured background. This auspicious tree reflects the flow of life, growth, and harmony, bringing prosperity, positivity, and the fulfillment of wishes.'
  },
  'garden_of_living_light': {
    alt: 'Garden of Living Light - Vibrant garden flowers with golden shimmer on peach and sky-blue background',
    description: 'A vibrant garden of flowers against a peach and sky-blue background, with golden dots shimmering like energy—reflecting growth, vitality, and the blossoming of life\'s potential.'
  },
  'light_of_the_lord': {
    alt: 'Light of the Lord - Shrinathji textured canvas painting with divine sun radiation',
    description: 'A textured canvas painting with Shrinathji\'s face at the center, radiating amidst the glory of the sun. This artwork captures divine light, devotion, and spiritual brilliance.'
  },
  'tree_of_abundance': {
    alt: 'Tree of Abundance - Radiant golden tree of life with blooming flowers and graceful birds',
    description: 'A radiant Tree of Life glowing with a golden aura, adorned with vibrant, blooming flowers and graceful golden birds. This artwork reflects divine balance, growth, and the eternal movement of energy through nature.'
  },
  'sacred_rise_of_lotus': {
    alt: 'The Sacred Rise of the Lotus - Spiritual lotus flower canvas painting with divine energy',
    description: 'A spiritually charged lotus flower artwork symbolizing spiritual awakening, purity, and enlightenment. The layered petals and radiant colors represent the journey of the soul towards divine consciousness.'
  },
  'above_the_garden_dream': {
    alt: 'Above the Garden Dream - Ethereal landscape with floating flowers and celestial elements',
    description: 'An ethereal dreamscape featuring graceful flying birds and floating flowers against a mystical backdrop. This artwork captures the magic of imagination and the beauty of transcendence beyond the material world.'
  },
  'divya_gyaan': {
    alt: 'Divya Gyaan - Divine knowledge spiritual artwork with cosmic elements',
    description: 'Divya Gyaan (Divine Knowledge) - A profound spiritual artwork radiating cosmic energy and wisdom. The composition blends sacred symbols with celestial colors, representing the eternal flow of divine knowledge and spiritual enlightenment.'
  },
  'circle_of_harmony': {
    alt: 'Circle of Harmony - Mandala-inspired art with symmetrical geometric and organic patterns',
    description: 'A harmonious mandala-inspired artwork featuring perfectly balanced geometric and organic patterns. This piece embodies the cosmic order, unity, and the sacred geometry present in all creation.'
  },
  'night_bloom': {
    alt: 'Night Bloom - Nocturnal flowers and luminous plants against a dark mystical background',
    description: 'A beautiful nocturnal floral composition where flowers bloom in the darkness with an ethereal luminescence. Representing resilience, inner light, and the beauty that flourishes even in challenging circumstances.'
  },
  'tree_of_timeless_balance': {
    alt: 'Tree of Timeless Balance - Symmetrical tree artwork representing eternal equilibrium and stability',
    description: 'A perfectly balanced tree artwork symbolizing timeless equilibrium. The symmetrical composition represents the eternal balance between opposing forces—light and dark, growth and stability, matter and spirit.'
  },
  'journey_of_eternal_love': {
    alt: 'A Journey of Eternal Love & Divine Blessings - Spiritual journey artwork with flowing energy',
    description: 'This artwork represents a spiritual journey through life, characterized by eternal love and divine blessings. The flowing, dynamic composition captures the essence of transformation, spiritual growth, and the continuous movement of blessed energy.'
  }
};

export interface OptimizedImageProps {
  src: string;
  alt: string;
  title: string;
  loading?: 'lazy' | 'eager';
  className?: string;
}

/**
 * Generate optimized image props with proper alt text and attributes
 */
export const getOptimizedImageProps = (
  src: string,
  imageKey: string,
  loading: 'lazy' | 'eager' = 'lazy'
): OptimizedImageProps => {
  const imageData = IMAGE_DESCRIPTIONS[imageKey as keyof typeof IMAGE_DESCRIPTIONS];
  
  return {
    src,
    alt: imageData?.alt || 'KanakArtistry handmade artwork',
    title: imageData?.description || 'Handmade spiritual artwork by KanakArtistry',
    loading,
    className: 'w-full h-full object-cover'
  };
};

/**
 * Preload images for critical sections (Hero, first gallery items)
 */
export const preloadImages = (imageSrcs: string[]) => {
  imageSrcs.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

/**
 * Generate WebP with JPEG fallback
 */
export const generateImageSrcSet = (imageId: string, basePath: string = '/images') => {
  return {
    webp: `${basePath}/${imageId}.webp`,
    jpeg: `${basePath}/${imageId}.jpg`
  };
};
