import { createContext, useContext, useState, useEffect } from 'react';
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

  useEffect(() => {
    // Load theme preference from storage
    const loadThemePreference = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme !== null) {
          setIsDark(storedTheme === 'dark');
        } else {
          // Default to system preference if nothing is stored
          setIsDark(systemColorScheme === 'dark');
        }
      } catch (error) {
        console.log('Error loading theme preference', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadThemePreference();
  }, []);

  // Update theme when system theme changes, but only if user hasn't explicitly set a preference
  useEffect(() => {
    if (!isLoaded) return;
    
    const updateSystemTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        // Only update from system if user hasn't set a preference
        if (storedTheme === null) {
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