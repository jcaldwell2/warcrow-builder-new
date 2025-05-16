import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Trash2 } from 'lucide-react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

export default function UnitSection({ units, onRemoveUnit, factionColor }) {
  const { colors } = useTheme();
  
  return (
    <View style={styles.container}>
      {units.map((unit) => (
        <Animated.View
          key={unit.instanceId}
          entering={FadeInRight.duration(300)}
          exiting={FadeOutLeft.duration(300)}
          style={[
            styles.unitItem, 
            { 
              backgroundColor: colors.card,
              borderColor: colors.border
            }
          ]}
        >
          <View style={styles.unitInfo}>
            <View 
              style={[
                styles.typeBadge, 
                { backgroundColor: factionColor || colors.primary }
              ]}
            >
              <Text style={styles.typeText}>{unit.type}</Text>
            </View>
            <Text style={[styles.unitName, { color: colors.text }]}>
              {unit.name}
            </Text>
            <Text style={[styles.pointsText, { color: colors.textSecondary }]}>
              {unit.points} pts
            </Text>
          </View>
          
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => onRemoveUnit(unit.instanceId)}
          >
            <Trash2 size={20} color={colors.error} />
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  unitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  unitInfo: {
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  typeText: {
    fontFamily: 'Raleway-Medium',
    fontSize: 12,
    color: '#000000',
  },
  unitName: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  pointsText: {
    fontFamily: 'Raleway-Medium',
    fontSize: 14,
  },
  removeButton: {
    padding: 8,
  },
});