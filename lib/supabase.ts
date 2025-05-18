import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const isBrowser = typeof window !== 'undefined';

let supabaseInstance: ReturnType<typeof createClient> | null = null;

if (isBrowser) {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
}

export const supabase = supabaseInstance;

export async function getSafeSession() {
  if (!isBrowser || !supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}