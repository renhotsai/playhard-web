// API configuration - switch between Supabase and mock data
import { supabaseScriptsApi, supabaseBookingApi } from '@/lib/supabase-api';
import { scriptsApi as mockScriptsApi, bookingApi as mockBookingApi } from '@/lib/api';

// Environment variable to control which API to use
const USE_SUPABASE = process.env.NEXT_PUBLIC_USE_SUPABASE === 'true';

// Export the appropriate API based on configuration
export const scriptsApi = USE_SUPABASE ? supabaseScriptsApi : mockScriptsApi;
export const bookingApi = USE_SUPABASE ? supabaseBookingApi : mockBookingApi;