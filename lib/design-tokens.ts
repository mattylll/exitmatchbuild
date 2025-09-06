/**
 * Design Tokens for ExitMatch Design System
 * Central source of truth for all design values
 */

// Spacing Scale (based on 4px grid)
export const spacing = {
  0: '0px',
  0.5: '0.125rem', // 2px
  1: '0.25rem', // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem', // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem', // 12px
  3.5: '0.875rem', // 14px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  7: '1.75rem', // 28px
  8: '2rem', // 32px
  9: '2.25rem', // 36px
  10: '2.5rem', // 40px
  11: '2.75rem', // 44px
  12: '3rem', // 48px
  14: '3.5rem', // 56px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  28: '7rem', // 112px
  32: '8rem', // 128px
  36: '9rem', // 144px
  40: '10rem', // 160px
  44: '11rem', // 176px
  48: '12rem', // 192px
  52: '13rem', // 208px
  56: '14rem', // 224px
  60: '15rem', // 240px
  64: '16rem', // 256px
  72: '18rem', // 288px
  80: '20rem', // 320px
  96: '24rem', // 384px
} as const

// Border Radius Values
export const borderRadius = {
  none: '0',
  sm: '0.125rem', // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',
  circle: '50%',
} as const

// Shadow Definitions
export const shadows = {
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  md: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  lg: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.35)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
  // Custom shadows for cards
  card: '0 4px 12px 0 rgba(11, 25, 41, 0.08)',
  'card-hover': '0 8px 24px 0 rgba(11, 25, 41, 0.12)',
  'card-active': '0 2px 8px 0 rgba(11, 25, 41, 0.06)',
  // Elevation shadows (Material Design inspired)
  elevation: {
    1: '0 2px 4px rgba(11, 25, 41, 0.08)',
    2: '0 4px 8px rgba(11, 25, 41, 0.12)',
    3: '0 8px 16px rgba(11, 25, 41, 0.16)',
    4: '0 16px 32px rgba(11, 25, 41, 0.20)',
    5: '0 24px 48px rgba(11, 25, 41, 0.24)',
  },
} as const

// Z-index Scale
export const zIndex = {
  base: 0,
  behind: -1,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  notification: 1080,
  max: 9999,
} as const

// Transition Durations
export const transitions = {
  duration: {
    instant: '0ms',
    fast: '150ms',
    base: '300ms',
    slow: '500ms',
    slower: '700ms',
    slowest: '1000ms',
  },
  timing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    linear: 'linear',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
} as const

// Typography Scale
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'].join(', '),
    display: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'].join(', '),
    mono: ['JetBrains Mono', 'monospace'].join(', '),
  },
  fontSize: {
    xs: { size: '0.75rem', lineHeight: '1rem', letterSpacing: '0.025em' },
    sm: { size: '0.875rem', lineHeight: '1.25rem', letterSpacing: '0.025em' },
    base: { size: '1rem', lineHeight: '1.5rem', letterSpacing: '0' },
    lg: { size: '1.125rem', lineHeight: '1.75rem', letterSpacing: '-0.025em' },
    xl: { size: '1.25rem', lineHeight: '1.875rem', letterSpacing: '-0.025em' },
    '2xl': { size: '1.5rem', lineHeight: '2rem', letterSpacing: '-0.025em' },
    '3xl': { size: '1.875rem', lineHeight: '2.25rem', letterSpacing: '-0.025em' },
    '4xl': { size: '2.25rem', lineHeight: '2.5rem', letterSpacing: '-0.05em' },
    '5xl': { size: '3rem', lineHeight: '3rem', letterSpacing: '-0.05em' },
    '6xl': { size: '3.75rem', lineHeight: '3.75rem', letterSpacing: '-0.05em' },
    '7xl': { size: '4.5rem', lineHeight: '4.5rem', letterSpacing: '-0.05em' },
    '8xl': { size: '6rem', lineHeight: '6rem', letterSpacing: '-0.05em' },
    '9xl': { size: '8rem', lineHeight: '8rem', letterSpacing: '-0.05em' },
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
} as const

// Breakpoints (responsive design)
export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
} as const

// Animation Presets
export const animations = {
  fadeIn: {
    keyframes: {
      from: { opacity: '0' },
      to: { opacity: '1' },
    },
    duration: transitions.duration.base,
    timing: transitions.timing.ease,
  },
  slideUp: {
    keyframes: {
      from: { transform: 'translateY(10px)', opacity: '0' },
      to: { transform: 'translateY(0)', opacity: '1' },
    },
    duration: transitions.duration.base,
    timing: transitions.timing.easeOut,
  },
  slideDown: {
    keyframes: {
      from: { transform: 'translateY(-10px)', opacity: '0' },
      to: { transform: 'translateY(0)', opacity: '1' },
    },
    duration: transitions.duration.base,
    timing: transitions.timing.easeOut,
  },
  scaleIn: {
    keyframes: {
      from: { transform: 'scale(0.95)', opacity: '0' },
      to: { transform: 'scale(1)', opacity: '1' },
    },
    duration: transitions.duration.fast,
    timing: transitions.timing.easeOut,
  },
} as const

// Color Palette
export const colors = {
  navy: {
    DEFAULT: '#0B1929',
    50: '#E8F0FE',
    100: '#C5D9FC',
    200: '#94B8F9',
    300: '#6397F6',
    400: '#3276F3',
    500: '#1E5FDB',
    600: '#1548B3',
    700: '#0F3585',
    800: '#0B1929',
    900: '#06101A',
  },
  gold: {
    DEFAULT: '#F59E0B',
    50: '#FEF3E2',
    100: '#FDE6C4',
    200: '#FCD089',
    300: '#FBBA4E',
    400: '#FA9F13',
    500: '#F59E0B',
    600: '#C47F09',
    700: '#936007',
    800: '#624005',
    900: '#312003',
  },
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  semantic: {
    success: {
      DEFAULT: '#10B981',
      light: '#D1FAE5',
      dark: '#065F46',
    },
    warning: {
      DEFAULT: '#F59E0B',
      light: '#FEF3C7',
      dark: '#78350F',
    },
    danger: {
      DEFAULT: '#EF4444',
      light: '#FEE2E2',
      dark: '#7F1D1D',
    },
    info: {
      DEFAULT: '#3B82F6',
      light: '#DBEAFE',
      dark: '#1E3A8A',
    },
  },
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  current: 'currentColor',
} as const

// Component Specific Tokens
export const components = {
  button: {
    height: {
      sm: '2rem', // 32px
      md: '2.5rem', // 40px
      lg: '3rem', // 48px
      xl: '3.5rem', // 56px
    },
    padding: {
      sm: '0.5rem 0.75rem',
      md: '0.625rem 1rem',
      lg: '0.75rem 1.5rem',
      xl: '1rem 2rem',
    },
  },
  input: {
    height: {
      sm: '2rem', // 32px
      md: '2.5rem', // 40px
      lg: '3rem', // 48px
    },
  },
  card: {
    padding: {
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
    },
  },
  modal: {
    width: {
      sm: '24rem', // 384px
      md: '32rem', // 512px
      lg: '48rem', // 768px
      xl: '64rem', // 1024px
      full: '95vw',
    },
  },
} as const

// Accessibility Tokens
export const accessibility = {
  focusRing: {
    color: colors.gold.DEFAULT,
    width: '2px',
    offset: '2px',
    style: 'solid',
  },
  contrast: {
    minimum: 4.5, // WCAG AA
    enhanced: 7, // WCAG AAA
  },
  motion: {
    prefersReduced: '@media (prefers-reduced-motion: reduce)',
  },
} as const

// Export all tokens as a single object for convenience
const designTokens = {
  spacing,
  borderRadius,
  shadows,
  zIndex,
  transitions,
  typography,
  breakpoints,
  animations,
  colors,
  components,
  accessibility,
} as const

export default designTokens