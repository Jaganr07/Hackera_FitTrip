import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
  Theme as NavigationThemeType,
} from '@react-navigation/native';
import { Appearance } from 'react-native';

// Define the type of your theme
type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  navigationTheme: NavigationThemeType;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  navigationTheme: NavigationLightTheme,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState<ThemeType>(systemColorScheme === 'dark' ? 'dark' : 'light');

  // Optional: listen for system changes (if user hasn't toggled manually)
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(prev => {
        // Only update theme if it's not manually toggled
        return prev === 'light' && colorScheme === 'dark' ? 'dark'
             : prev === 'dark' && colorScheme === 'light' ? 'light'
             : prev;
      });
    });

    return () => listener.remove();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const navigationTheme = theme === 'dark' ? NavigationDarkTheme : NavigationLightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, navigationTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
