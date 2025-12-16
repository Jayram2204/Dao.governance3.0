import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [accentColor, setAccentColor] = useState('#8B5CF6');

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('dao_theme');
    const savedAccent = localStorage.getItem('dao_accent_color');
    
    if (savedTheme) {
      setTheme(savedTheme);
    }
    if (savedAccent) {
      setAccentColor(savedAccent);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.setProperty('--color-primary', accentColor);
  }, [theme, accentColor]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('dao_theme', newTheme);
  };

  const updateAccentColor = (color) => {
    setAccentColor(color);
    localStorage.setItem('dao_accent_color', color);
  };

  const value = {
    theme,
    accentColor,
    toggleTheme,
    updateAccentColor,
    isDark: theme === 'dark',
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
