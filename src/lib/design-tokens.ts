// CarveEast Design System
// Premium editorial aesthetic for art discovery platform

export const colors = {
  // Primary palette - warm, sophisticated neutrals
  background: {
    DEFAULT: '#FAFAF8',      // Warm white
    secondary: '#F5F4F2',    // Soft cream
    tertiary: '#EFEDEA',     // Light stone
    dark: '#1A1A1A',         // Rich black
  },
  
  // Text colors
  text: {
    primary: '#1A1A1A',      // Near black
    secondary: '#4A4A48',    // Charcoal
    tertiary: '#7A7A78',     // Medium gray
    muted: '#9A9A98',        // Light gray
    inverse: '#FAFAF8',      // For dark backgrounds
  },
  
  // Accent - subtle cinnabar red (cultural reference without cliché)
  accent: {
    DEFAULT: '#B83A2F',      // Cinnabar red
    hover: '#9A2F26',        // Darker red
    light: '#F5E8E6',        // Light red tint
  },
  
  // Ink colors - for artistic references
  ink: {
    black: '#0D0D0D',        // Deep ink black
    charcoal: '#2D2D2D',     // Charcoal
    wash: '#6B6B6B',         // Ink wash gray
    light: '#C4C4C4',        // Light ink
  },
  
  // Border and dividers
  border: {
    DEFAULT: '#E5E4E2',      // Subtle border
    light: '#F0EFED',        // Very light
    dark: '#D5D4D2',         // Darker border
  },
} as const;

export const typography = {
  // Font families
  fonts: {
    serif: '"Playfair Display", "Noto Serif SC", Georgia, serif',
    sans: '"Inter", "Noto Sans SC", -apple-system, sans-serif',
    display: '"Playfair Display", Georgia, serif',
  },
  
  // Type scale - editorial hierarchy
  sizes: {
    'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
    'display-lg': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
    'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
    'display-sm': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
    'title-xl': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
    'title-lg': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0' }],
    'title-md': ['1.125rem', { lineHeight: '1.4', letterSpacing: '0' }],
    'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0' }],
    'body': ['1rem', { lineHeight: '1.7', letterSpacing: '0' }],
    'body-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0' }],
    'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
    'label': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.1em' }],
  },
  
  // Font weights
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const spacing = {
  // Editorial spacing scale - generous whitespace
  section: {
    sm: '4rem',
    md: '6rem',
    lg: '8rem',
    xl: '10rem',
  },
  
  // Content spacing
  content: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '6rem',
  },
  
  // Grid gaps
  gap: {
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
  },
} as const;

export const layout = {
  // Max widths
  maxWidth: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1440px',
    full: '100%',
  },
  
  // Content width for readability
  content: '720px',
  
  // Grid columns
  grid: {
    mobile: 4,
    tablet: 8,
    desktop: 12,
  },
} as const;

export const animation = {
  // Subtle, elegant transitions
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
  
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
} as const;
