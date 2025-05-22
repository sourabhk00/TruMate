import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for database operations
export async function createProfile(profileData: any) {
  const { data, error } = await supabase
    .from('profiles')
    .insert([profileData]);
  
  return { data, error };
}

export async function updateProfile(userId: string, profileData: any) {
  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('user_id', userId);
  
  return { data, error };
}

export async function createVerification(verificationData: any) {
  const { data, error } = await supabase
    .from('verifications')
    .insert([verificationData]);
  
  return { data, error };
}

export async function saveLoyaltyTest(testData: any) {
  const { data, error } = await supabase
    .from('loyalty_tests')
    .insert([testData]);
  
  return { data, error };
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  return { data, error };
}

export async function getLoyaltyTests(userId: string) {
  const { data, error } = await supabase
    .from('loyalty_tests')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  return { data, error };
}

export async function getVerifications(userId: string) {
  const { data, error } = await supabase
    .from('verifications')
    .select('*')
    .eq('user_id', userId);
  
  return { data, error };
}