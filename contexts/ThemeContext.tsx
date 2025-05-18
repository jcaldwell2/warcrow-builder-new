import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeContextType = {
  isDark: boolean;
  colors: typeof lightColors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  colors: lightColors,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');
  const [isLoaded, setIsLoaded] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (mounted.current) {
          if (storedTheme !== null) {
            setIsDark(storedTheme === 'dark');
          } else {
            setIsDark(systemColorScheme === 'dark');
          }
          setIsLoaded(true);
        }
      } catch (error) {
        console.log('Error loading theme preference', error);
        if (mounted.current) {
          setIsLoaded(true);
        }
      }
    };

    loadThemePreference();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    
    const updateSystemTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (mounted.current && storedTheme === null) {
          setIsDark(systemColorScheme === 'dark');
        }
      } catch (error) {
        console.log('Error checking theme preference', error);
      }
    };

    updateSystemTheme();
  }, [systemColorScheme, isLoaded]);

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.log('Error saving theme preference', error);
    }
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};