import { useState, useEffect } from 'react';
import { factions } from '@/data/factions';

export const useFactions = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // In a real app, we might fetch this data from an API
  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return {
    factions,
    loading,
    error
  };
};