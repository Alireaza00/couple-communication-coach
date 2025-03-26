
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

// Subscription functions
export const getUserSubscription = async (userId: string) => {
  if (isSupabaseMockMode()) {
    // Return mock data for development
    return {
      id: 'mock-subscription',
      user_id: userId,
      plan_id: 'free',
      status: 'active',
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      cancel_at_period_end: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }
  
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      // No subscription found - not an error, return null
      return null;
    }
    console.error('Error fetching subscription:', error);
    throw error;
  }
  
  return data;
};

export const updateSubscription = async (
  userId: string,
  planId: string,
  status: string,
  currentPeriodEnd: string,
  cancelAtPeriodEnd: boolean
) => {
  if (isSupabaseMockMode()) {
    // Mock subscription update
    return {
      id: 'mock-subscription',
      user_id: userId,
      plan_id: planId,
      status: status,
      current_period_end: currentPeriodEnd,
      cancel_at_period_end: cancelAtPeriodEnd,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }
  
  // Check if subscription exists
  const { data: existingSubscription, error: checkError } = await supabase
    .from('subscriptions')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle();
  
  if (checkError) {
    console.error('Error checking subscription:', checkError);
    throw checkError;
  }
  
  let result;
  
  if (existingSubscription) {
    // Update existing subscription
    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        plan_id: planId,
        status: status,
        current_period_end: currentPeriodEnd,
        cancel_at_period_end: cancelAtPeriodEnd,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating subscription:', error);
      throw error;
    }
    
    result = data;
  } else {
    // Create new subscription
    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        id: uuidv4(),
        user_id: userId,
        plan_id: planId,
        status: status,
        current_period_end: currentPeriodEnd,
        cancel_at_period_end: cancelAtPeriodEnd,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
    
    result = data;
  }
  
  return result;
};

// Check-in functions
export const getCheckIns = async (userId: string) => {
  if (isSupabaseMockMode()) {
    // Return mock data when in development
    return [
      {
        id: 'mock-1',
        userId: userId,
        user_id: userId,
        date: new Date().toISOString(),
        mood: 8,
        highlight: "We had a great conversation about our future plans.",
        challenge: "Finding time for date nights with our busy schedules.",
        gratitude: "I'm grateful for how supportive my partner has been lately.",
        needsSupport: false,
        needs_support: false,
        supportDetails: null,
        support_details: null,
        created_at: new Date().toISOString()
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
  
  // Ensure both camelCase and snake_case properties are present
  const normalizedCheckIn = {
    ...checkIn,
    userId: checkIn.userId || checkIn.user_id,
    user_id: checkIn.user_id || checkIn.userId,
    needsSupport: checkIn.needsSupport || checkIn.needs_support,
    needs_support: checkIn.needs_support || checkIn.needsSupport,
    supportDetails: checkIn.supportDetails || checkIn.support_details,
    support_details: checkIn.support_details || checkIn.supportDetails,
  };
  
  // Transform from our app's CheckIn type to the database schema type
  const dbRecord = {
    id: uuidv4(),
    user_id: normalizedCheckIn.userId || normalizedCheckIn.user_id, // Support both formats
    date: normalizedCheckIn.date,
    mood: normalizedCheckIn.mood,
    highlight: normalizedCheckIn.highlight,
    challenge: normalizedCheckIn.challenge,
    gratitude: normalizedCheckIn.gratitude,
    needs_support: normalizedCheckIn.needsSupport || normalizedCheckIn.needs_support, // Support both formats
    support_details: normalizedCheckIn.supportDetails || normalizedCheckIn.support_details, // Support both formats
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
