import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import {
  MaterialColors,
  MaterialTypography,
  lightColors,
  darkColors,
  typography,
  spacing,
  elevation,
  shape,
  stateLayerOpacity,
} from '@/constants/theme';

interface ThemeContextType {
  colors: MaterialColors;
  typography: MaterialTypography;
  spacing: typeof spacing;
  elevation: typeof elevation;
  shape: typeof shape;
  stateLayerOpacity: typeof stateLayerOpacity;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  const value: ThemeContextType = {
    colors,
    typography,
    spacing,
    elevation,
    shape,
    stateLayerOpacity,
    isDark,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
