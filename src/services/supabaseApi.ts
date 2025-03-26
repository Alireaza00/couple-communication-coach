import { supabase, isSupabaseMockMode } from '@/lib/supabase';
import { DateNightIdea, OpenRouterMessage, AIResponse, ConversationStarter } from "@/types";
import { CheckIn } from "@/types";
import { v4 as uuidv4 } from 'uuid';

// User functions
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error getting user:', error);
    throw error;
  }
  return user;
};

// Check-in functions
export const getCheckIns = async (userId: string) => {
  if (isSupabaseMockMode()) {
    // Return mock data when in development
    return [
      {
        id: 'mock-1',
        userId: userId,
        date: new Date().toISOString(),
        mood: 8,
        highlight: "We had a great conversation about our future plans.",
        challenge: "Finding time for date nights with our busy schedules.",
        gratitude: "I'm grateful for how supportive my partner has been lately.",
        needsSupport: false,
        supportDetails: null,
        created_at: new Date().toISOString(),
        user_id: userId
      }
    ] as CheckIn[];
  }
  
  const { data, error } = await supabase
    .from('check_ins')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });
  
  if (error) {
    console.error('Error fetching check-ins:', error);
    throw error;
  }
  
  // Transform database records to match our CheckIn type
  return (data || []).map(record => ({
    id: record.id,
    userId: record.user_id,
    user_id: record.user_id, // Keep for compatibility
    date: record.date,
    mood: record.mood,
    highlight: record.highlight,
    challenge: record.challenge,
    gratitude: record.gratitude,
    needsSupport: record.needs_support,
    needs_support: record.needs_support, // Keep for compatibility
    supportDetails: record.support_details,
    support_details: record.support_details, // Keep for compatibility
    created_at: record.created_at
  })) as CheckIn[];
};

export const saveCheckIn = async (checkIn: Omit<CheckIn, 'id'>) => {
  if (isSupabaseMockMode()) {
    // Return mock data when in development
    return {
      id: 'mock-' + Date.now(),
      ...checkIn,
      created_at: new Date().toISOString()
    } as CheckIn;
  }
  
  // Transform from our app's CheckIn type to the database schema type
  const dbRecord = {
    id: uuidv4(),
    user_id: checkIn.userId || checkIn.user_id, // Support both formats
    date: checkIn.date,
    mood: checkIn.mood,
    highlight: checkIn.highlight,
    challenge: checkIn.challenge,
    gratitude: checkIn.gratitude,
    needs_support: checkIn.needsSupport || checkIn.needs_support, // Support both formats
    support_details: checkIn.supportDetails || checkIn.support_details, // Support both formats
    created_at: new Date().toISOString()
  };
  
  const { data, error } = await supabase
    .from('check_ins')
    .insert(dbRecord)
    .select()
    .single();
  
  if (error) {
    console.error('Error saving check-in:', error);
    throw error;
  }
  
  // Transform the response back to our CheckIn type
  return {
    id: data.id,
    userId: data.user_id,
    user_id: data.user_id, // Keep for compatibility
    date: data.date,
    mood: data.mood,
    highlight: data.highlight,
    challenge: data.challenge,
    gratitude: data.gratitude,
    needsSupport: data.needs_support,
    needs_support: data.needs_support, // Keep for compatibility
    supportDetails: data.support_details,
    support_details: data.support_details, // Keep for compatibility
    created_at: data.created_at
  } as CheckIn;
};

// ... keep existing code for the remaining functions
