
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Use environment variables if available, otherwise use placeholder values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Log status of environment variables for debugging purposes
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase environment variables. Using fallback values for development. Some features may not work properly.');
}

// Initialize the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Create a mock client for development mode
const isMockMode = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

// Helper function to create a mocked response
const mockResponse = <T>(data: T) => {
  return { data, error: null };
};

// Export a helper to determine if we're in mock mode
export const isSupabaseMockMode = () => isMockMode;

// Create a typed wrapper around supabase for easier use
export const supabaseClient = {
  // Original supabase client
  raw: supabase,
  
  // Auth methods
  auth: {
    getUser: async () => {
      if (isMockMode) {
        return mockResponse({ user: { uid: 'mock-user-id', email: 'mock@example.com' } });
      }
      return supabase.auth.getUser();
    }
  },
  
  // Data methods with mock support
  from: <T extends keyof Database['public']['Tables']>(table: T) => {
    const query = supabase.from(table);
    
    // If in mock mode, override select to return mock data
    if (isMockMode) {
      return {
        ...query,
        select: () => ({
          ...query.select(),
          eq: () => ({
            order: () => ({
              then: (callback: any) => callback(mockResponse([])),
              single: () => ({
                then: (callback: any) => callback(mockResponse(null))
              })
            }),
            limit: () => ({
              single: () => ({
                then: (callback: any) => callback(mockResponse(null))
              })
            })
          })
        }),
        insert: () => ({
          select: () => ({
            single: () => ({
              then: (callback: any) => callback(mockResponse({ id: 'mock-id' }))
            })
          })
        }),
        update: () => ({
          eq: () => ({
            select: () => ({
              single: () => ({
                then: (callback: any) => callback(mockResponse({ id: 'mock-id' }))
              })
            })
          })
        })
      };
    }
    
    return query;
  }
};
