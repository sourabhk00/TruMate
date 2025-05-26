import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for database operations
export async function createProfile(profileData: any) {
  // Wait for the session to be established
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new Error('No authenticated session');
  }

  const { data, error } = await supabase
    .from('profiles')
    .insert([{
      ...profileData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }]);
  
  return { data, error };
}

export async function updateProfile(userId: string, profileData: any) {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...profileData,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId);
  
  return { data, error };
}

export async function createVerification(verificationData: any) {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new Error('No authenticated session');
  }

  const { data, error } = await supabase
    .from('verifications')
    .insert([{
      ...verificationData,
      user_id: session.user.id,
      created_at: new Date().toISOString()
    }])
    .select();
  
  return { data, error };
}

export async function saveLoyaltyTest(testData: any) {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new Error('No authenticated session');
  }

  const { data, error } = await supabase
    .from('loyalty_tests')
    .insert([{
      ...testData,
      user_id: session.user.id,
      created_at: new Date().toISOString()
    }]);
  
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

// Authentication helpers
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}