import React, { createContext, useContext, useState, ReactNode } from 'react';

const darkColors = {
  background: '#0A0A0A',
  surface: '#131313',
  surfaceElevated: '#1C1C1C',
  border: '#2F2F2F',
  borderLight: '#3A3A3A',
  text: '#F0F0F0',
  textSecondary: '#8B8B8B',
  textMuted: '#505050',
  accent: '#1DA1F2',
  accentDim: 'rgba(29,161,242,0.1)',
  danger: '#F4212E',
  dangerDim: 'rgba(244,33,46,0.1)',
  success: '#00BA7C',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0,0,0,0.85)',
  cardShadow: '#000000',
  inputBg: '#1C1C1C',
  headerBg: 'rgba(10,10,10,0.95)',
};

const lightColors = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceElevated: '#F7F9F9',
  border: '#EFF3F4',
  borderLight: '#E7E7E7',
  text: '#0F1419',
  textSecondary: '#536471',
  textMuted: '#AAB8C2',
  accent: '#1DA1F2',
  accentDim: 'rgba(29,161,242,0.1)',
  danger: '#F4212E',
  dangerDim: 'rgba(244,33,46,0.1)',
  success: '#00BA7C',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0,0,0,0.4)',
  cardShadow: '#E7E7E7',
  inputBg: '#F7F9F9',
  headerBg: 'rgba(255,255,255,0.95)',
};

export type ThemeColors = typeof darkColors;

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  toggleTheme: () => {},
  colors: darkColors,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark((prev) => !prev);
  return (
    <ThemeContext.Provider
      value={{ isDark, toggleTheme, colors: isDark ? darkColors : lightColors }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
