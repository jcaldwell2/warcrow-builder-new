import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter, usePathname } from 'expo-router';

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export default function Header({ title, showBack }: HeaderProps) {
  const { colors } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  
  // Only show back button if not on a tab route or if explicitly set
  const isTabRoute = 
    pathname === '/' || 
    pathname === '/units' || 
    pathname === '/builder' || 
    pathname === '/rules' || 
    pathname === '/settings';
    
  const shouldShowBack = showBack !== undefined ? showBack : !isTabRoute;

  return (
    <View style={[styles.header, { backgroundColor: colors.backgroundSecondary }]}>
      {shouldShowBack && (
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={28} color={colors.text} />
        </TouchableOpacity>
      )}
      <Text style={[styles.title, { color: colors.text }]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontFamily: 'Cinzel-Bold',
    fontSize: 24,
  },
});