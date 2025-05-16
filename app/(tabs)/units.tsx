import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/ui/Header';
import UnitCard from '@/components/units/UnitCard';
import { Search, Filter } from 'lucide-react-native';
import { getAllUnits } from '@/data/units';
import FilterModal from '@/components/units/FilterModal';
import { useFactions } from '@/hooks/useFactions';

export default function UnitsScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    faction: null,
    type: null,
    minPoints: 0,
    maxPoints: 500,
  });
  
  const units = getAllUnits();
  const { factions } = useFactions();

  const filteredUnits = units.filter(unit => {
    // Apply search
    if (searchQuery && !unit.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply faction filter
    if (filters.faction && unit.faction !== filters.faction) {
      return false;
    }
    
    // Apply type filter
    if (filters.type && unit.type !== filters.type) {
      return false;
    }
    
    // Apply points filter
    if (unit.points < filters.minPoints || unit.points > filters.maxPoints) {
      return false;
    }
    
    return true;
  });

  const resetFilters = () => {
    setFilters({
      faction: null,
      type: null,
      minPoints: 0,
      maxPoints: 500,
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Unit Browser" />
      
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
        
        <TouchableOpacity 
          style={[styles.filterButton, { backgroundColor: colors.primary }]}
          onPress={() => setShowFilters(true)}
        >
          <Filter size={20} color="#000000" />
        </TouchableOpacity>
      </View>
      
      {filteredUnits.length > 0 ? (
        <FlatList
          data={filteredUnits}
          renderItem={({ item }) => <UnitCard unit={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No units match your search or filters
          </Text>
          {(searchQuery || filters.faction || filters.type) && (
            <TouchableOpacity 
              style={[styles.resetButton, { backgroundColor: colors.primary }]}
              onPress={() => {
                setSearchQuery('');
                resetFilters();
              }}
            >
              <Text style={styles.resetText}>Reset All Filters</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      
      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
        factions={factions}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
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
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  resetText: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 16,
    color: '#000000',
  }
});