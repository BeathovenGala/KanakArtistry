// Design System Configuration for KanakArtistry
// This file documents the color palette and typography system

export const colors = {
  // Primary palette - inspired by the turquoise artwork
  primary: {
    teal: '#1A9B9B',
    deepTeal: '#0D7373',
    lightTeal: '#E0F2F2',
  },
  // Neutral palette
  neutral: {
    black: '#0A0A0A',
    charcoal: '#2D2D2D',
    gray: '#666666',
    lightGray: '#E5E5E5',
    cream: '#F8F5F0',
    white: '#FFFFFF',
  },
  // Accent colors
  accent: {
    coral: '#FF6B7A',
    pink: '#FFB5C2',
    gold: '#D4AF37',
    peach: '#FFD4B8',
  },
};

export const typography = {
  fonts: {
    heading: "'Playfair Display', serif", // Elegant serif for headings
    body: "'Inter', sans-serif", // Clean sans-serif for body text
    accent: "'Cormorant Garamond', serif", // Artistic serif for accents
  },
  scale: {
    h1: '3.5rem',     // 56px
    h2: '2.5rem',     // 40px
    h3: '2rem',       // 32px
    h4: '1.5rem',     // 24px
    h5: '1.25rem',    // 20px
    h6: '1.125rem',   // 18px
    body: '1rem',     // 16px
    small: '0.875rem', // 14px
  },
};

export const spacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
  xxl: '5rem',
};