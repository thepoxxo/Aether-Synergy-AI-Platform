import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeMode, ThemeOption } from '../types/theme';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  themes: ThemeOption[];
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'dark',
    name: 'Cyber Dark (Noche)',
    iconName: 'Moon',
    description: 'Fondo negro azabache con acentos en oro neón y ámbar'
  },
  {
    id: 'light',
    name: 'Luxury Studio (Día)',
    iconName: 'Sun',
    description: 'Estilo estudio limpio, fondos claros minimalistas y sombras suaves'
  },
  {
    id: 'neon',
    name: 'Tokyo Synthwave (Neón)',
    iconName: 'Zap',
    description: 'Alto contraste futurista con resplandor cian eléctrico y magenta'
  }
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('aether_theme_mode');
    return (saved as ThemeMode) || 'dark';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('aether_theme_mode', newTheme);
  };

  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('neon');
    else setTheme('dark');
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light', 'theme-neon');

    if (theme === 'light') {
      root.classList.add('light');
    } else if (theme === 'neon') {
      root.classList.add('dark', 'theme-neon');
    } else {
      root.classList.add('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, themes: THEME_OPTIONS }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
