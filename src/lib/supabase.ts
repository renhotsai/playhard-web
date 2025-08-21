import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (will be expanded as we create tables)
export type Database = {
  public: {
    Tables: {
      scripts: {
        Row: {
          id: number
          title: string
          category: string
          players: string
          duration: string
          difficulty: string | null
          description: string
          features: string[]
          image: string
          monthly_recommended: boolean
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          category: string
          players: string
          duration: string
          difficulty?: string | null
          description: string
          features: string[]
          image: string
          monthly_recommended?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          category?: string
          players?: string
          duration?: string
          difficulty?: string | null
          description?: string
          features?: string[]
          image?: string
          monthly_recommended?: boolean
          created_at?: string
        }
      }
      time_slots: {
        Row: {
          id: string
          time: string
          description: string
          available: boolean
          price: string | null
          suitable_for_scripts: number[]
          created_at: string
        }
        Insert: {
          id: string
          time: string
          description: string
          available?: boolean
          price?: string | null
          suitable_for_scripts?: number[]
          created_at?: string
        }
        Update: {
          id?: string
          time?: string
          description?: string
          available?: boolean
          price?: string | null
          suitable_for_scripts?: number[]
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          name: string
          phone: string
          email: string | null
          date: string
          time: string
          script: string
          players: string
          notes: string | null
          status: 'pending' | 'confirmed' | 'cancelled'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          phone: string
          email?: string | null
          date: string
          time: string
          script: string
          players: string
          notes?: string | null
          status?: 'pending' | 'confirmed' | 'cancelled'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string
          email?: string | null
          date?: string
          time?: string
          script?: string
          players?: string
          notes?: string | null
          status?: 'pending' | 'confirmed' | 'cancelled'
          created_at?: string
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

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']