import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from 'expo-font';
import { 
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import { 
  Cinzel_400Regular,
  Cinzel_700Bold
} from '@expo-google-fonts/cinzel';
import { SplashScreen } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { isBrowser } from '@/lib/supabase';

// Add this to suppress errors during the initial load
SplashScreen.preventAutoHideAsync()
  .catch(() => {/* Ignore error */});

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Raleway-Regular': Raleway_400Regular,
    'Raleway-Medium': Raleway_500Medium,
    'Raleway-SemiBold': Raleway_600SemiBold,
    'Raleway-Bold': Raleway_700Bold,
    'Cinzel-Regular': Cinzel_400Regular,
    'Cinzel-Bold': Cinzel_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide splash screen once fonts are loaded or there's an error
      SplashScreen.hideAsync().catch(() => {/* Ignore error */});
    }
  }, [fontsLoaded, fontError]);

  // If the fonts are not loaded and there is no error, show a loading indicator
  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
        <ActivityIndicator size="large" color="#E8C48E" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} redirect={true} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}