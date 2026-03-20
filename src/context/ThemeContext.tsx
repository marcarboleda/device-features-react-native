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
  inputBg: '#1E1E1E',
  inputBorder: '#444444',
  headerBg: 'rgba(13,13,13,0.97)',
  modalBg: '#161616',
  separator: '#222222',
};

const lightColors = {
  background: '#F0F4F8',
  surface: '#FFFFFF',
  surfaceElevated: '#E4ECF4',
  border: '#CBD8E8',
  borderLight: '#A8BDD0',
  text: '#0F1923',
  textSecondary: '#4A5568',
  textMuted: '#94A3B8',
  accent: '#1D9BF0',
  accentDim: 'rgba(29,155,240,0.12)',
  accentHover: '#1A8CD8',
  danger: '#E53E3E',
  dangerDim: 'rgba(229,62,62,0.1)',
  success: '#38A169',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(15,25,35,0.6)',
  cardShadow: '#A8BDD0',
  inputBg: '#FFFFFF',
  inputBorder: '#7A9AB8',
  headerBg: 'rgba(240,244,248,0.97)',
  modalBg: '#FFFFFF',
  separator: '#CBD8E8',
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