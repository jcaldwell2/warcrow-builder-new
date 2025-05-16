import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { X, Check } from 'lucide-react-native';
import Slider from '@react-native-community/slider';

export default function FilterModal({ 
  visible, 
  onClose, 
  filters, 
  setFilters,
  resetFilters,
  factions 
}) {
  const { colors } = useTheme();
  
  const unitTypes = [
    { id: 'hero', name: 'Hero' },
    { id: 'troops', name: 'Troops' },
    { id: 'elite', name: 'Elite' },
    { id: 'monster', name: 'Monster' },
    { id: 'warmachine', name: 'War Machine' },
  ];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Filters
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            <View style={styles.filterSection}>
              <Text style={[styles.filterTitle, { color: colors.text }]}>
                Faction
              </Text>
              
              <View style={styles.optionsGrid}>
                {factions.map((faction) => (
                  <TouchableOpacity
                    key={faction.id}
                    style={[
                      styles.optionButton,
                      { 
                        backgroundColor: filters.faction === faction.id 
                          ? colors[faction.key] 
                          : colors.backgroundSecondary,
                        borderColor: colors.border
                      }
                    ]}
                    onPress={() => setFilters({
                      ...filters,
                      faction: filters.faction === faction.id ? null : faction.id
                    })}
                  >
                    <Text 
                      style={[
                        styles.optionText, 
                        { 
                          color: filters.faction === faction.id 
                            ? '#000000' 
                            : colors.text 
                        }
                      ]}
                    >
                      {faction.name}
                    </Text>
                    {filters.faction === faction.id && (
                      <Check size={16} color="#000000" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={[styles.filterSection, { borderTopColor: colors.border }]}>
              <Text style={[styles.filterTitle, { color: colors.text }]}>
                Unit Type
              </Text>
              
              <View style={styles.optionsGrid}>
                {unitTypes.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.optionButton,
                      { 
                        backgroundColor: filters.type === type.id 
                          ? colors.primary 
                          : colors.backgroundSecondary,
                        borderColor: colors.border
                      }
                    ]}
                    onPress={() => setFilters({
                      ...filters,
                      type: filters.type === type.id ? null : type.id
                    })}
                  >
                    <Text 
                      style={[
                        styles.optionText, 
                        { 
                          color: filters.type === type.id 
                            ? '#000000' 
                            : colors.text 
                        }
                      ]}
                    >
                      {type.name}
                    </Text>
                    {filters.type === type.id && (
                      <Check size={16} color="#000000" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={[styles.filterSection, { borderTopColor: colors.border }]}>
              <Text style={[styles.filterTitle, { color: colors.text }]}>
                Points Range: {filters.minPoints} - {filters.maxPoints}
              </Text>
              
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={500}
                step={10}
                value={filters.minPoints}
                onValueChange={(value) => setFilters({
                  ...filters,
                  minPoints: value,
                  maxPoints: Math.max(value, filters.maxPoints)
                })}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.backgroundSecondary}
                thumbTintColor={colors.primary}
              />
              
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={500}
                step={10}
                value={filters.maxPoints}
                onValueChange={(value) => setFilters({
                  ...filters,
                  maxPoints: value,
                  minPoints: Math.min(value, filters.minPoints)
                })}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.backgroundSecondary}
                thumbTintColor={colors.primary}
              />
            </View>
          </ScrollView>
          
          <View style={[styles.modalFooter, { borderTopColor: colors.border }]}>
            <TouchableOpacity 
              style={[styles.resetButton, { backgroundColor: colors.backgroundSecondary }]}
              onPress={resetFilters}
            >
              <Text style={[styles.resetText, { color: colors.text }]}>
                Reset
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.applyButton, { backgroundColor: colors.primary }]}
              onPress={onClose}
            >
              <Text style={styles.applyText}>
                Apply Filters
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontFamily: 'Cinzel-Regular',
    fontSize: 20,
  },
  modalBody: {
    padding: 16,
  },
  filterSection: {
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  filterTitle: {
    fontFamily: 'Raleway-Bold',
    fontSize: 16,
    marginBottom: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  optionText: {
    fontFamily: 'Raleway-Medium',
    fontSize: 14,
    marginRight: 4,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  resetText: {
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
  },
  applyButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  applyText: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 16,
    color: '#000000',
  },
});