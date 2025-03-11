"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'system' | 'dark' | 'light';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('system');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    let effectiveMode: 'light' | 'dark';
    if (mode === 'system') {
      effectiveMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      effectiveMode = mode;
    }
    
    root.classList.add(effectiveMode);
    setIsDark(effectiveMode === 'dark');
    
    // Update CSS variables for theme colors
    if (effectiveMode === 'dark') {
      root.style.setProperty('--bg-primary', '#1a202c');
      root.style.setProperty('--text-primary', '#f7fafc');
    } else {
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--text-primary', '#1a202c');
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};