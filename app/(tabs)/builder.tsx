import { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Animated,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronDown, Save, Trash2, Plus } from 'lucide-react-native';
import FactionSelector from '@/components/builder/FactionSelector';
import UnitSection from '@/components/builder/UnitSection';
import { useFactions } from '@/hooks/useFactions';
import { useSavedArmies } from '@/hooks/useSavedArmies';
import { getUnitsByFaction } from '@/data/units';
import AddUnitModal from '@/components/builder/AddUnitModal';

export default function BuilderScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { factions } = useFactions();
  const { armies, saveArmy, getArmy } = useSavedArmies();
  
  const [armyName, setArmyName] = useState('New Army');
  const [selectedFaction, setSelectedFaction] = useState(null);
  const [showFactionSelector, setShowFactionSelector] = useState(false);
  const [pointsLimit, setPointsLimit] = useState(300);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [showAddUnit, setShowAddUnit] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  
  const totalPoints = selectedUnits.reduce((sum, unit) => sum + unit.points, 0);
  const availableUnits = selectedFaction ? getUnitsByFaction(selectedFaction.id) : [];
  
  // Load army if editing
  useEffect(() => {
    if (params.armyId) {
      const army = getArmy(params.armyId);
      if (army) {
        setArmyName(army.name);
        setSelectedFaction(factions.find(f => f.id === army.faction.id));
        setSelectedUnits(army.units);
        setPointsLimit(army.pointsLimit);
      }
    } else if (factions.length > 0 && !selectedFaction) {
      // Default to first faction for new armies
      setSelectedFaction(factions[0]);
    }
  }, [params.armyId, factions]);
  
  // Animation on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();
  }, []);
  
  const handleFactionSelect = (faction) => {
    setSelectedFaction(faction);
    setShowFactionSelector(false);
    // Clear units when changing faction
    if (selectedUnits.length > 0) {
      Alert.alert(
        "Change Faction",
        "Changing faction will remove all currently selected units. Continue?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { 
            text: "Continue", 
            onPress: () => setSelectedUnits([])
          }
        ]
      );
    }
  };
  
  const handleAddUnit = (unit) => {
    setSelectedUnits([...selectedUnits, {...unit, instanceId: Date.now().toString()}]);
    setShowAddUnit(false);
  };
  
  const handleRemoveUnit = (instanceId) => {
    setSelectedUnits(selectedUnits.filter(unit => unit.instanceId !== instanceId));
  };
  
  const handleSaveArmy = () => {
    if (!selectedFaction) {
      Alert.alert("Error", "Please select a faction");
      return;
    }
    
    if (selectedUnits.length === 0) {
      Alert.alert("Error", "Army must contain at least one unit");
      return;
    }
    
    const army = {
      id: params.armyId || Date.now().toString(),
      name: armyName,
      faction: {
        id: selectedFaction.id,
        name: selectedFaction.name,
        iconUrl: selectedFaction.iconUrl
      },
      units: selectedUnits,
      totalPoints,
      pointsLimit,
      createdAt: new Date().toISOString(),
    };
    
    saveArmy(army);
    Alert.alert("Success", "Army saved successfully");
    router.push('/');
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Animated.View 
        style={[
          styles.container, 
          { 
            backgroundColor: colors.background,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={[styles.header, { backgroundColor: colors.backgroundSecondary }]}>
          <TextInput
            style={[styles.armyNameInput, { color: colors.text, borderColor: colors.border }]}
            value={armyName}
            onChangeText={setArmyName}
            placeholder="Army Name"
            placeholderTextColor={colors.textSecondary}
          />
          
          <View style={styles.headerButtons}>
            <TouchableOpacity 
              style={[styles.saveButton, { backgroundColor: colors.primary }]}
              onPress={handleSaveArmy}
            >
              <Save size={20} color="#000000" />
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <ScrollView style={styles.content}>
          <View style={[styles.infoSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <TouchableOpacity 
              style={[styles.factionSelector, { borderColor: colors.border }]} 
              onPress={() => setShowFactionSelector(true)}
            >
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Faction</Text>
              <View style={styles.factionDisplay}>
                {selectedFaction ? (
                  <Text style={[styles.factionName, { color: colors.primary }]}>
                    {selectedFaction.name}
                  </Text>
                ) : (
                  <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
                    Select Faction
                  </Text>
                )}
                <ChevronDown size={20} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>
            
            <View style={[styles.pointsContainer, { borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Points</Text>
              <View style={styles.pointsDisplay}>
                <Text style={[
                  styles.points, 
                  { 
                    color: totalPoints > pointsLimit ? colors.error : colors.primary 
                  }
                ]}>
                  {totalPoints}
                </Text>
                <Text style={[styles.pointsLimit, { color: colors.textSecondary }]}>
                  / {pointsLimit}
                </Text>
              </View>
            </View>
          </View>
          
          <View style={[styles.unitsSection, { borderColor: colors.border }]}>
            <View style={styles.unitsSectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Units ({selectedUnits.length})
              </Text>
              <TouchableOpacity
                style={[styles.addUnitButton, { backgroundColor: colors.primary }]}
                onPress={() => setShowAddUnit(true)}
                disabled={!selectedFaction}
              >
                <Plus size={16} color="#000000" />
                <Text style={styles.addUnitText}>Add Unit</Text>
              </TouchableOpacity>
            </View>
            
            {selectedUnits.length === 0 ? (
              <View style={[styles.emptyUnits, { backgroundColor: colors.backgroundSecondary }]}>
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                  {selectedFaction ? 
                    "No units added. Tap 'Add Unit' to build your army." : 
                    "Select a faction to start adding units"
                  }
                </Text>
              </View>
            ) : (
              <UnitSection 
                units={selectedUnits} 
                onRemoveUnit={handleRemoveUnit}
                factionColor={selectedFaction?.color}
              />
            )}
          </View>
        </ScrollView>
        
        <FactionSelector
          visible={showFactionSelector}
          onClose={() => setShowFactionSelector(false)}
          factions={factions}
          selectedFaction={selectedFaction}
          onSelectFaction={handleFactionSelect}
        />
        
        <AddUnitModal
          visible={showAddUnit}
          onClose={() => setShowAddUnit(false)}
          units={availableUnits}
          onAddUnit={handleAddUnit}
          factionColor={selectedFaction?.color}
        />
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  armyNameInput: {
    fontFamily: 'Cinzel-Regular',
    fontSize: 24,
    paddingVertical: 8,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  saveButtonText: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 16,
    color: '#000000',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  infoSection: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  factionSelector: {
    padding: 16,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontFamily: 'Raleway-Bold',
    fontSize: 16,
    marginBottom: 8,
  },
  factionDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  factionName: {
    fontFamily: 'Cinzel-Regular',
    fontSize: 18,
  },
  placeholderText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
  },
  pointsContainer: {
    padding: 16,
  },
  pointsDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  points: {
    fontFamily: 'Raleway-Bold',
    fontSize: 24,
  },
  pointsLimit: {
    fontFamily: 'Raleway-Regular',
    fontSize: 18,
    marginLeft: 8,
  },
  unitsSection: {
    borderTopWidth: 1,
    paddingTop: 16,
  },
  unitsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addUnitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  addUnitText: {
    fontFamily: 'Raleway-Medium',
    fontSize: 14,
    color: '#000000',
    marginLeft: 4,
  },
  emptyUnits: {
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
});