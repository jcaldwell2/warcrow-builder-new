import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import StatBar from '@/components/units/StatBar';

export default function UnitCard({ unit }) {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(false);
  
  // Get faction color
  const factionColor = colors[unit.factionKey] || colors.primary;
  
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => setExpanded(!expanded)}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <View style={styles.nameContainer}>
          <View 
            style={[styles.typeBadge, { backgroundColor: factionColor }]}
          >
            <Text style={styles.typeText}>{unit.type}</Text>
          </View>
          <Text style={[styles.unitName, { color: colors.text }]}>
            {unit.name}
          </Text>
        </View>
        
        <View style={styles.pointsContainer}>
          <Text style={[styles.pointsText, { color: colors.textSecondary }]}>
            {unit.points} pts
          </Text>
          {expanded ? (
            <ChevronUp size={20} color={colors.textSecondary} />
          ) : (
            <ChevronDown size={20} color={colors.textSecondary} />
          )}
        </View>
      </View>
      
      {expanded && (
        <View style={styles.expandedContent}>
          <View style={styles.imageAndStats}>
            {unit.imageUrl && (
              <Image 
                source={{ uri: unit.imageUrl }} 
                style={styles.unitImage}
                resizeMode="cover"
              />
            )}
            
            <View style={styles.statsContainer}>
              <StatBar label="Movement" value={unit.movement} maxValue={8} color={factionColor} />
              <StatBar label="Combat" value={unit.combat} maxValue={6} color={factionColor} />
              <StatBar label="Shooting" value={unit.shooting} maxValue={6} color={factionColor} />
              <StatBar label="Bravery" value={unit.bravery} maxValue={6} color={factionColor} />
              <StatBar label="Wounds" value={unit.wounds} maxValue={6} color={factionColor} />
            </View>
          </View>
          
          {unit.abilities && unit.abilities.length > 0 && (
            <View style={[styles.abilitiesContainer, { borderColor: colors.border }]}>
              <Text style={[styles.abilitiesTitle, { color: colors.text }]}>
                Abilities
              </Text>
              {unit.abilities.map((ability, index) => (
                <View key={index} style={styles.ability}>
                  <Text style={[styles.abilityName, { color: factionColor }]}>
                    {ability.name}
                  </Text>
                  <Text style={[styles.abilityDescription, { color: colors.text }]}>
                    {ability.description}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  nameContainer: {
    flexDirection: 'column',
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
    fontFamily: 'Cinzel-Regular',
    fontSize: 18,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontFamily: 'Raleway-Bold',
    fontSize: 16,
    marginRight: 8,
  },
  expandedContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  imageAndStats: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  unitImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 16,
  },
  statsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  abilitiesContainer: {
    borderTopWidth: 1,
    paddingTop: 16,
  },
  abilitiesTitle: {
    fontFamily: 'Raleway-Bold',
    fontSize: 16,
    marginBottom: 8,
  },
  ability: {
    marginBottom: 12,
  },
  abilityName: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 14,
    marginBottom: 4,
  },
  abilityDescription: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
});