import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Users, File, Book, Plus, Settings } from 'lucide-react-native';

interface EmptyStateProps {
  icon: 'users' | 'file' | 'book' | 'plus' | 'settings';
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ 
  icon, 
  title, 
  description, 
  actionLabel, 
  onAction 
}: EmptyStateProps) {
  const { colors } = useTheme();
  
  const renderIcon = () => {
    const size = 48;
    const color = colors.textSecondary;
    
    switch (icon) {
      case 'users':
        return <Users size={size} color={color} />;
      case 'file':
        return <File size={size} color={color} />;
      case 'book':
        return <Book size={size} color={color} />;
      case 'plus':
        return <Plus size={size} color={color} />;
      case 'settings':
        return <Settings size={size} color={color} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: colors.backgroundSecondary }]}>
        {renderIcon()}
      </View>
      
      <Text style={[styles.title, { color: colors.text }]}>
        {title}
      </Text>
      
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        {description}
      </Text>
      
      {actionLabel && onAction && (
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={onAction}
        >
          <Text style={styles.actionText}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Raleway-Bold',
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  actionText: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 16,
    color: '#000000',
  },
});