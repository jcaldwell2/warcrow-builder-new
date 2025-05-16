import { Modal, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { X } from 'lucide-react-native';

export default function FactionSelector({ 
  visible, 
  onClose, 
  factions, 
  selectedFaction,
  onSelectFaction 
}) {
  const { colors } = useTheme();

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
              Select Faction
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            {factions.map((faction) => (
              <TouchableOpacity
                key={faction.id}
                style={[
                  styles.factionItem,
                  { 
                    backgroundColor: selectedFaction?.id === faction.id 
                      ? `${colors[faction.key]}20` 
                      : 'transparent',
                    borderBottomColor: colors.border
                  }
                ]}
                onPress={() => onSelectFaction(faction)}
              >
                <Image 
                  source={{ uri: faction.iconUrl }} 
                  style={styles.factionIcon} 
                />
                <View style={styles.factionInfo}>
                  <Text style={[styles.factionName, { color: colors.text }]}>
                    {faction.name}
                  </Text>
                  <Text style={[styles.factionDescription, { color: colors.textSecondary }]}>
                    {faction.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    paddingVertical: 8,
  },
  factionItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  factionIcon: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  factionInfo: {
    flex: 1,
  },
  factionName: {
    fontFamily: 'Cinzel-Regular',
    fontSize: 18,
    marginBottom: 4,
  },
  factionDescription: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
});