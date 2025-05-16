import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
}

export default function StatBar({ label, value, maxValue, color }: StatBarProps) {
  const { colors } = useTheme();
  
  // Calculate width percentage
  const percentage = (value / maxValue) * 100;
  
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          {label}
        </Text>
        <Text style={[styles.value, { color: colors.text }]}>
          {value}
        </Text>
      </View>
      <View style={[styles.barBackground, { backgroundColor: colors.backgroundSecondary }]}>
        <View 
          style={[
            styles.barFill, 
            { 
              backgroundColor: color,
              width: `${percentage}%`
            }
          ]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontFamily: 'Raleway-Medium',
    fontSize: 12,
  },
  value: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 12,
  },
  barBackground: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
});