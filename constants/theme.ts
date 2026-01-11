import { TextStyle } from 'react-native';

// Material Design 3 Color System
export interface MaterialColors {
  // Primary colors
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;

  // Secondary colors
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;

  // Tertiary colors
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;

  // Error colors
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;

  // Success colors (custom extension for walking tracker)
  success: string;
  onSuccess: string;
  successContainer: string;
  onSuccessContainer: string;

  // Surface colors
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;

  // Outline
  outline: string;
  outlineVariant: string;

  // Other
  background: string;
  onBackground: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  shadow: string;
  scrim: string;
}

// Walking tracker theme - Green-based for health/fitness
export const lightColors: MaterialColors = {
  // Primary - Teal/Green for health theme
  primary: '#006B5A',
  onPrimary: '#FFFFFF',
  primaryContainer: '#7AF8D8',
  onPrimaryContainer: '#00201A',

  // Secondary
  secondary: '#4B635B',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#CDE9DD',
  onSecondaryContainer: '#072019',

  // Tertiary
  tertiary: '#416277',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#C4E7FF',
  onTertiaryContainer: '#001E2D',

  // Error
  error: '#BA1A1A',
  onError: '#FFFFFF',
  errorContainer: '#FFDAD6',
  onErrorContainer: '#410002',

  // Success (for start button)
  success: '#006E2C',
  onSuccess: '#FFFFFF',
  successContainer: '#95F9A4',
  onSuccessContainer: '#002108',

  // Surface
  surface: '#F5FBF7',
  onSurface: '#171D1B',
  surfaceVariant: '#DBE5DF',
  onSurfaceVariant: '#3F4945',
  surfaceContainer: '#E9EFEB',
  surfaceContainerHigh: '#E3EAE5',
  surfaceContainerHighest: '#DEE4E0',

  // Outline
  outline: '#6F7975',
  outlineVariant: '#BFC9C3',

  // Other
  background: '#F5FBF7',
  onBackground: '#171D1B',
  inverseSurface: '#2B322E',
  inverseOnSurface: '#ECF2EE',
  inversePrimary: '#5DDBBD',
  shadow: '#000000',
  scrim: '#000000',
};

export const darkColors: MaterialColors = {
  // Primary
  primary: '#5DDBBD',
  onPrimary: '#00382D',
  primaryContainer: '#005143',
  onPrimaryContainer: '#7AF8D8',

  // Secondary
  secondary: '#B1CCC2',
  onSecondary: '#1D352D',
  secondaryContainer: '#334B43',
  onSecondaryContainer: '#CDE9DD',

  // Tertiary
  tertiary: '#A8CBE2',
  onTertiary: '#0E3446',
  tertiaryContainer: '#294A5E',
  onTertiaryContainer: '#C4E7FF',

  // Error
  error: '#FFB4AB',
  onError: '#690005',
  errorContainer: '#93000A',
  onErrorContainer: '#FFDAD6',

  // Success
  success: '#79DC8A',
  onSuccess: '#003912',
  successContainer: '#00531F',
  onSuccessContainer: '#95F9A4',

  // Surface
  surface: '#0F1512',
  onSurface: '#DEE4E0',
  surfaceVariant: '#3F4945',
  onSurfaceVariant: '#BFC9C3',
  surfaceContainer: '#1B211E',
  surfaceContainerHigh: '#252B28',
  surfaceContainerHighest: '#303633',

  // Outline
  outline: '#89938E',
  outlineVariant: '#3F4945',

  // Other
  background: '#0F1512',
  onBackground: '#DEE4E0',
  inverseSurface: '#DEE4E0',
  inverseOnSurface: '#2B322E',
  inversePrimary: '#006B5A',
  shadow: '#000000',
  scrim: '#000000',
};

// Typography Scale
export interface MaterialTypography {
  displayLarge: TextStyle;
  displayMedium: TextStyle;
  displaySmall: TextStyle;
  headlineLarge: TextStyle;
  headlineMedium: TextStyle;
  headlineSmall: TextStyle;
  titleLarge: TextStyle;
  titleMedium: TextStyle;
  titleSmall: TextStyle;
  bodyLarge: TextStyle;
  bodyMedium: TextStyle;
  bodySmall: TextStyle;
  labelLarge: TextStyle;
  labelMedium: TextStyle;
  labelSmall: TextStyle;
}

export const typography: MaterialTypography = {
  displayLarge: {
    fontSize: 57,
    lineHeight: 64,
    fontWeight: '400',
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontSize: 45,
    lineHeight: 52,
    fontWeight: '400',
    letterSpacing: 0,
  },
  displaySmall: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '400',
    letterSpacing: 0,
  },
  headlineLarge: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '400',
    letterSpacing: 0,
  },
  headlineMedium: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '400',
    letterSpacing: 0,
  },
  headlineSmall: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '400',
    letterSpacing: 0,
  },
  titleLarge: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '400',
    letterSpacing: 0,
  },
  titleMedium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0.4,
  },
  labelLarge: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
};

// 8dp Grid Spacing System
export const spacing = {
  xs: 4,    // 0.5 units
  sm: 8,    // 1 unit
  md: 16,   // 2 units
  lg: 24,   // 3 units
  xl: 32,   // 4 units
  xxl: 48,  // 6 units
  xxxl: 64, // 8 units
} as const;

// Elevation System
export const elevation = {
  0: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  1: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  3: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  4: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  5: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
} as const;

// Shape System (Border Radius)
export const shape = {
  none: 0,
  extraSmall: 4,
  small: 8,
  medium: 12,
  large: 16,
  extraLarge: 28,
  full: 9999,
} as const;

// State Layer Opacity
export const stateLayerOpacity = {
  hover: 0.08,
  focus: 0.12,
  pressed: 0.12,
  dragged: 0.16,
} as const;

// Animation Durations
export const duration = {
  short1: 50,
  short2: 100,
  short3: 150,
  short4: 200,
  medium1: 250,
  medium2: 300,
  medium3: 350,
  medium4: 400,
  long1: 450,
  long2: 500,
  long3: 550,
  long4: 600,
} as const;
