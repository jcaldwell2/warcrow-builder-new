import { Modal, View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { X, Search } from 'lucide-react-native';

export default function AddUnitModal({ 
  visible, 
  onClose, 
  units, 
  onAddUnit,
  factionColor
}) {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredUnits = units.filter(unit => 
    unit.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              Add Unit
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <View style={[styles.searchContainer, { backgroundColor: colors.backgroundSecondary }]}>
            <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Search size={20} color={colors.textSecondary} />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Search units..."
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>
          
          <FlatList
            data={filteredUnits}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.unitItem,
                  { backgroundColor: colors.card, borderColor: colors.border }
                ]}
                onPress={() => onAddUnit(item)}
              >
                <View style={styles.unitInfo}>
                  <View style={[
                    styles.typeBadge,
                    { backgroundColor: factionColor || colors.primary }
                  ]}>
                    <Text style={styles.typeText}>{item.type}</Text>
                  </View>
                  <Text style={[styles.unitName, { color: colors.text }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.unitDescription, { color: colors.textSecondary }]}>
                    {item.description || 'No description available'}
                  </Text>
                </View>
                
                <Text style={[styles.pointsText, { color: colors.primary }]}>
                  {item.points} pts
                </Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                  No units found
                </Text>
              </View>
            )}
          />
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
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    marginLeft: 8,
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
  },
  list: {
    padding: 16,
  },
  unitItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  unitInfo: {
    flex: 1,
    marginRight: 8,
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
  unitDescription: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  pointsText: {
    fontFamily: 'Raleway-Bold',
    fontSize: 16,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
  },
});