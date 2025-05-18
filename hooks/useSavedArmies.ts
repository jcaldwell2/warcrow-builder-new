import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export interface ArmyUnit {
  id: string;
  instanceId: string;
  name: string;
  type: string;
  points: number;
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
  isPublic?: boolean;
  description?: string;
}

export const useSavedArmies = () => {
  const [armies, setArmies] = useState<Army[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Load armies from Supabase
  useEffect(() => {
    const loadArmies = async () => {
      try {
        if (!user) {
          setArmies([]);
          return;
        }

        const { data, error } = await supabase
          .from('armies')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setArmies(data.map(army => ({
          id: army.id,
          name: army.name,
          faction: JSON.parse(army.faction),
          units: army.units,
          totalPoints: army.points,
          pointsLimit: army.points_limit || 300,
          createdAt: army.created_at,
          isPublic: army.is_public,
          description: army.description
        })));
      } catch (err: any) {
        setError(err.message);
        console.error('Error loading armies:', err);
      } finally {
        setLoading(false);
      }
    };

    loadArmies();
  }, [user]);

  const saveArmy = async (army: Army) => {
    try {
      if (!user) {
        throw new Error('Must be logged in to save armies');
      }

      const armyData = {
        id: army.id,
        user_id: user.id,
        name: army.name,
        faction: JSON.stringify(army.faction),
        points: army.totalPoints,
        points_limit: army.pointsLimit,
        units: army.units,
        is_public: army.isPublic || false,
        description: army.description
      };

      const { error } = await supabase
        .from('armies')
        .upsert(armyData);

      if (error) throw error;

      setArmies(current => {
        const index = current.findIndex(a => a.id === army.id);
        if (index >= 0) {
          const updated = [...current];
          updated[index] = army;
          return updated;
        }
        return [...current, army];
      });
    } catch (err: any) {
      setError(err.message);
      console.error('Error saving army:', err);
      throw err;
    }
  };

  const deleteArmy = async (armyId: string) => {
    try {
      if (!user) {
        throw new Error('Must be logged in to delete armies');
      }

      const { error } = await supabase
        .from('armies')
        .delete()
        .eq('id', armyId)
        .eq('user_id', user.id);

      if (error) throw error;

      setArmies(current => current.filter(a => a.id !== armyId));
    } catch (err: any) {
      setError(err.message);
      console.error('Error deleting army:', err);
      throw err;
    }
  };

  const duplicateArmy = async (armyId: string) => {
    try {
      if (!user) {
        throw new Error('Must be logged in to duplicate armies');
      }

      const armyToDuplicate = armies.find(a => a.id === armyId);
      if (!armyToDuplicate) {
        throw new Error('Army not found');
      }

      const newArmy: Army = {
        ...armyToDuplicate,
        id: Date.now().toString(),
        name: `${armyToDuplicate.name} (Copy)`,
        createdAt: new Date().toISOString(),
        isPublic: false
      };

      await saveArmy(newArmy);
    } catch (err: any) {
      setError(err.message);
      console.error('Error duplicating army:', err);
      throw err;
    }
  };

  const getArmy = (armyId: string): Army | undefined => {
    return armies.find(a => a.id === armyId);
  };

  const clearAllArmies = async () => {
    try {
      if (!user) {
        throw new Error('Must be logged in to clear armies');
      }

      const { error } = await supabase
        .from('armies')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setArmies([]);
    } catch (err: any) {
      setError(err.message);
      console.error('Error clearing armies:', err);
      throw err;
    }
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