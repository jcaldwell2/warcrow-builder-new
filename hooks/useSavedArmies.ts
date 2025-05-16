import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'warcrow_saved_armies';

export interface ArmyUnit {
  id: string;
  instanceId: string;
  name: string;
  type: string;
  points: number;
  // Add other unit properties needed for army lists
}

export interface Army {
  id: string;
  name: string;
  faction: {
    id: string;
    name: string;
    iconUrl: string;
  };
  units: ArmyUnit[];
  totalPoints: number;
  pointsLimit: number;
  createdAt: string;
}

export const useSavedArmies = () => {
  const [armies, setArmies] = useState<Army[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load armies from storage
  useEffect(() => {
    const loadArmies = async () => {
      try {
        const storedArmies = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedArmies) {
          setArmies(JSON.parse(storedArmies));
        }
      } catch (err) {
        setError('Failed to load saved armies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadArmies();
  }, []);
  
  // Save armies to storage whenever they change
  useEffect(() => {
    const saveArmies = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(armies));
      } catch (err) {
        setError('Failed to save armies');
        console.error(err);
      }
    };
    
    if (!loading) {
      saveArmies();
    }
  }, [armies, loading]);
  
  const saveArmy = (army: Army) => {
    setArmies(currentArmies => {
      const existingIndex = currentArmies.findIndex(a => a.id === army.id);
      
      if (existingIndex >= 0) {
        // Update existing army
        const updatedArmies = [...currentArmies];
        updatedArmies[existingIndex] = army;
        return updatedArmies;
      } else {
        // Add new army
        return [...currentArmies, army];
      }
    });
  };
  
  const deleteArmy = (armyId: string) => {
    setArmies(currentArmies => currentArmies.filter(a => a.id !== armyId));
  };
  
  const duplicateArmy = (armyId: string) => {
    const armyToDuplicate = armies.find(a => a.id === armyId);
    
    if (armyToDuplicate) {
      const newArmy: Army = {
        ...armyToDuplicate,
        id: Date.now().toString(),
        name: `${armyToDuplicate.name} (Copy)`,
        createdAt: new Date().toISOString(),
      };
      
      setArmies(currentArmies => [...currentArmies, newArmy]);
    }
  };
  
  const getArmy = (armyId: string): Army | undefined => {
    return armies.find(a => a.id === armyId);
  };
  
  const clearAllArmies = () => {
    setArmies([]);
  };
  
  return {
    armies,
    loading,
    error,
    saveArmy,
    deleteArmy,
    duplicateArmy,
    getArmy,
    clearAllArmies
  };
};