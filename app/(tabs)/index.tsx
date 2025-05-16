import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Plus, Trash2, Copy, CreditCard as Edit3, Share } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/ui/Header';
import { useSavedArmies } from '@/hooks/useSavedArmies';
import EmptyState from '@/components/ui/EmptyState';

export default function ArmiesScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { armies, deleteArmy, duplicateArmy } = useSavedArmies();
  const [selectedArmy, setSelectedArmy] = useState(null);

  const handleEditArmy = (armyId) => {
    router.push({
      pathname: '/builder',
      params: { armyId },
    });
  };

  const handleNewArmy = () => {
    router.push('/builder');
  };

  const renderArmyItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.armyCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => setSelectedArmy(selectedArmy === item.id ? null : item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.armyHeader}>
        <View style={styles.factionBadge}>
          <Image 
            source={{ uri: item.faction.iconUrl }} 
            style={styles.factionIcon} 
            resizeMode="contain"
          />
          <Text style={[styles.factionText, { color: colors.primary }]}>
            {item.faction.name}
          </Text>
        </View>
        <Text style={[styles.pointsText, { color: colors.textSecondary }]}>
          {item.totalPoints} pts
        </Text>
      </View>
      
      <Text style={[styles.armyName, { color: colors.text }]}>
        {item.name}
      </Text>
      
      {selectedArmy === item.id && (
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.backgroundSecondary }]}
            onPress={() => handleEditArmy(item.id)}
          >
            <Edit3 size={20} color={colors.text} />
            <Text style={[styles.actionText, { color: colors.text }]}>Edit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.backgroundSecondary }]}
            onPress={() => duplicateArmy(item.id)}
          >
            <Copy size={20} color={colors.text} />
            <Text style={[styles.actionText, { color: colors.text }]}>Copy</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.backgroundSecondary }]}
          >
            <Share size={20} color={colors.text} />
            <Text style={[styles.actionText, { color: colors.text }]}>Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.error, opacity: 0.8 }]}
            onPress={() => deleteArmy(item.id)}
          >
            <Trash2 size={20} color="#FFFFFF" />
            <Text style={[styles.actionText, { color: "#FFFFFF" }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="My Armies" />
      
      {armies.length === 0 ? (
        <EmptyState 
          title="No Armies Found"
          description="Create your first army roster to get started"
          icon="users"
          actionLabel="Create Army"
          onAction={handleNewArmy}
        />
      ) : (
        <FlatList
          data={armies}
          renderItem={renderArmyItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
      
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={handleNewArmy}
      >
        <Plus size={24} color="#000000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  armyCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  armyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  factionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  factionIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  factionText: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 14,
  },
  pointsText: {
    fontFamily: 'Raleway-Medium',
    fontSize: 14,
  },
  armyName: {
    fontFamily: 'Cinzel-Regular',
    fontSize: 18,
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
    width: '48%',
  },
  actionText: {
    fontFamily: 'Raleway-Medium',
    fontSize: 14,
    marginLeft: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});