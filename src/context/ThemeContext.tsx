import React, { createContext, useContext, useState, ReactNode } from 'react';

const darkColors = {
  background: '#0D0D0D',
  surface: '#161616',
  surfaceElevated: '#1F1F1F',
  border: '#2A2A2A',
  borderLight: '#333333',
  text: '#F1F1F1',
  textSecondary: '#8A8A8A',
  textMuted: '#4A4A4A',
  accent: '#1D9BF0',
  accentDim: 'rgba(29,155,240,0.12)',
  accentHover: '#1A8CD8',
  danger: '#F4212E',
  dangerDim: 'rgba(244,33,46,0.1)',
  success: '#00BA7C',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0,0,0,0.88)',
  cardShadow: '#000000',
  inputBg: '#1A1A1A',
  headerBg: 'rgba(13,13,13,0.97)',
  modalBg: '#161616',
  separator: '#222222',
};

const lightColors = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceElevated: '#F7F9FA',
  border: '#EFF3F4',
  borderLight: '#E7E7E7',
  text: '#0F1419',
  textSecondary: '#536471',
  textMuted: '#AAB8C2',
  accent: '#1D9BF0',
  accentDim: 'rgba(29,155,240,0.1)',
  accentHover: '#1A8CD8',
  danger: '#F4212E',
  dangerDim: 'rgba(244,33,46,0.08)',
  success: '#00BA7C',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0,0,0,0.5)',
  cardShadow: '#E1E8ED',
  inputBg: '#F7F9FA',
  headerBg: 'rgba(255,255,255,0.97)',
  modalBg: '#FFFFFF',
  separator: '#EFF3F4',
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