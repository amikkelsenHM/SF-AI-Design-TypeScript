// Spaceflux Design Tokens - TypeScript mapping of CSS variables
// This file is the Single Source of Truth for the MCP server and type-safe usage

export const colors = {
  // Brand Colors - Primary
  primary: {
    100: '#e9e0fb',
    200: '#c9b1f4',
    300: '#ac80ed',
    400: '#924ae4',
    500: '#6b29ae',
    600: '#41166d',
    700: '#1a0531',
  },
  // Brand Colors - Secondary
  secondary: {
    100: '#ffecf2',
    200: '#ffbed6',
    300: '#ff7eb6',
    400: '#fb0098',
    500: '#ba0070',
    600: '#7d0049',
    700: '#450026',
  },
  // Neutral Colors - Grey
  grey: {
    100: '#e5e4e6',
    200: '#bdbcc0',
    300: '#97959c',
    400: '#737079',
    500: '#504e55',
    600: '#2f2e33',
    700: '#111113',
    900: '#120B0D',
  },
  // Tertiary
  tertiary: {
    100: '#fdcfd0',
    200: '#fb9699',
    300: '#fa4d56',
    400: '#ce1628',
    500: '#8f0c18',
    600: '#54040a',
    700: '#2b0103',
  },
  // Quaternary
  quaternary: {
    100: '#ffd9d9',
    200: '#ffa0a0',
    300: '#ff5b5b',
    400: '#e10000',
    500: '#9f0000',
    600: '#620000',
    700: '#2d0000',
  },
  // Quinary
  quinary: {
    100: '#76ff9a',
    200: '#00d961',
    300: '#00ad4c',
    400: '#008338',
    500: '#005c25',
    600: '#003713',
    700: '#001504',
  },
  // Senary
  senary: {
    100: '#ccff6a',
    200: '#a2d700',
    300: '#82ad00',
    400: '#638500',
    500: '#465f00',
    600: '#2b3c00',
    700: '#121b00',
  },
  // Septenary
  septenary: {
    100: '#ceff0c',
    200: '#abd400',
    300: '#89ab00',
    400: '#688300',
    500: '#4a5d00',
    600: '#2d3a00',
    700: '#131a00',
  },
  // Octonary
  octonary: {
    100: '#b1fffb',
    200: '#1eeae4',
    300: '#16bfba',
    400: '#0f9692',
    500: '#086e6b',
    600: '#034947',
    700: '#012725',
  },
  // Brand Named Colors
  brand: {
    mediumOrchid: '#CF8BFF',
    deepPurple: '#6B29AE',
    chinaPink: '#D8749D',
    greyPurple: '#674A86',
    hanBlue: '#5865C6',
    brightBlue: '#1686E8',
  },
  // UI Colors - Surfaces
  surface: {
    dark: '#100919',
    darkContrast: '#292134',
    darkProgress: '#312A39',
    light: '#FFFFFF',
  },
  // UI Colors - On Neutral
  ui: {
    onNeutral40: '#222222',
    appliedOnPrimary: '#F8F8F8',
  },
  // UI Colors - Text/On-Surface
  onSurface: {
    dark: '#EEEEEE',
    light: '#222222',
    darkContrast: '#36274A',
    darkSubtle: '#1D1825',
    darkDisabled: '#525252',
  },
  // UI Colors - Borders
  border: {
    dark: '#1A1520',
    onDark: '#EEEEEE',
    onDarkContrast: '#36274A',
    onDarkSubtle: '#1D1825',
    onDarkDisabled: '#525252',
    focus: '#1686E8',
    disabled: '#e6e6e6',
  },
  // Semantic Colors - Borders
  borderSemantic: {
    errorDark: '#7F000F',
    warningDark: '#654E00',
    successDark: '#057023',
  },
  // Semantic Colors - Surfaces
  surfaceSemantic: {
    errorDark: '#CF0019',
    warningDark: '#DCAA00',
    successDark: '#00B55F',
    successBold: '#048273',
  },
  // Semantic Colors - On-Surface
  onSurfaceSemantic: {
    errorDark: '#FF8594',
    warningDark: '#FFDB62',
    successDark: '#B0FFB8',
  },
  // Data Visualization
  dataviz: {
    1: '#8a3ffc',
    2: '#5a3cd3',
    3: '#4589ff',
    4: '#ff7eb6',
    5: '#fa4d56',
    6: '#d12771',
    7: '#76ff9a',
    8: '#82ad00',
    9: '#009d9a',
    10: '#086e6b',
    11: '#19fcf8',
    12: '#0072c3',
    13: '#b98c00',
    14: '#ffe100',
    15: '#fddc69',
  },
} as const;

export const typography = {
  fontFamily: {
    ibmPlexSans: '"IBM Plex Sans", sans-serif',
    nbArchitekt: '"NB Architekt Std", sans-serif',
    helvetica: '"Helvetica", sans-serif',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
  fontSize: {
    8: '8px',
    10: '10px',
    12: '12px',
    14: '14px',
    16: '16px',
    18: '18px',
    28: '28px',
    35: '35px',
    36: '36px',
    55: '55px',
  },
  lineHeight: {
    10: '10px',
    12: '12px',
    13: '13px',
    14: '14px',
    17: '17px',
    18: '18px',
    22: '22px',
    25: '25px',
    34: '34px',
    40: '40px',
    42: '42px',
    55: '55px',
  },
  letterSpacing: {
    neg5: '-0.2px',
    0: '0px',
  },
} as const;

// Type exports for consumers
export type ColorToken = typeof colors;
export type TypographyToken = typeof typography;

// CSS Variable reference map (for runtime CSS variable access)
export const cssVars = {
  color: {
    primary100: 'var(--color-primary-100)',
    primary200: 'var(--color-primary-200)',
    primary300: 'var(--color-primary-300)',
    primary400: 'var(--color-primary-400)',
    primary500: 'var(--color-primary-500)',
    primary600: 'var(--color-primary-600)',
    primary700: 'var(--color-primary-700)',
    secondary100: 'var(--color-secondary-100)',
    secondary200: 'var(--color-secondary-200)',
    secondary300: 'var(--color-secondary-300)',
    secondary400: 'var(--color-secondary-400)',
    secondary500: 'var(--color-secondary-500)',
    secondary600: 'var(--color-secondary-600)',
    secondary700: 'var(--color-secondary-700)',
    grey100: 'var(--color-grey-100)',
    grey200: 'var(--color-grey-200)',
    grey300: 'var(--color-grey-300)',
    grey400: 'var(--color-grey-400)',
    grey500: 'var(--color-grey-500)',
    grey600: 'var(--color-grey-600)',
    grey700: 'var(--color-grey-700)',
    grey900: 'var(--color-grey-900)',
    surfaceDark: 'var(--color-surface-dark)',
    surfaceDarkContrast: 'var(--color-surface-dark-contrast)',
    surfaceLight: 'var(--color-surface-light)',
    onSurfaceDark: 'var(--color-on-surface-dark)',
    onSurfaceLight: 'var(--color-on-surface-light)',
    borderDark: 'var(--color-border-dark)',
    borderFocus: 'var(--color-border-focus)',
  },
  font: {
    familyIbmPlex: 'var(--font-family-ibm-plex-sans)',
    familyNbArchitekt: 'var(--font-family-nb-architekt)',
    familyHelvetica: 'var(--font-family-helvetica)',
    weightRegular: 'var(--font-weight-regular)',
    weightMedium: 'var(--font-weight-medium)',
    weightBold: 'var(--font-weight-bold)',
  },
} as const;

// Full token export for MCP server consumption
export const tokens = {
  colors,
  typography,
  cssVars,
} as const;

export default tokens;
