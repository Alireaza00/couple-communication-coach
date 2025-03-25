
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          status: string
          current_period_end: string
          cancel_at_period_end: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          status: string
          current_period_end: string
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          status?: string
          current_period_end?: string
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      check_ins: {
        Row: {
          id: string
          user_id: string
          date: string
          mood: number
          highlight: string
          challenge: string
          gratitude: string
          needs_support: boolean
          support_details: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          mood: number
          highlight: string
          challenge: string
          gratitude: string
          needs_support: boolean
          support_details?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          mood?: number
          highlight?: string
          challenge?: string
          gratitude?: string
          needs_support?: boolean
          support_details?: string | null
          created_at?: string
        }
      }
      recordings: {
        Row: {
          id: string
          user_id: string
          title: string
          duration: number
          created_at: string
          transcript_id: string | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          duration: number
          created_at?: string
          transcript_id?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          duration?: number
          created_at?: string
          transcript_id?: string | null
        }
      }
      transcripts: {
        Row: {
          id: string
          recording_id: string
          text: string
          analysis: string | null
          created_at: string
        }
        Insert: {
          id?: string
          recording_id: string
          text: string
          analysis?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          recording_id?: string
          text?: string
          analysis?: string | null
          created_at?: string
        }
      }
      conversation_starters: {
        Row: {
          id: string
          question: string
          category: string
          difficulty: string
        }
        Insert: {
          id?: string
          question: string
          category: string
          difficulty: string
        }
        Update: {
          id?: string
          question?: string
          category?: string
          difficulty?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
