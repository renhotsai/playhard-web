import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { scriptsApi, bookingApi } from "@/lib/api-config";

// Query keys for consistent cache management
export const QUERY_KEYS = {
  scripts: ["scripts"] as const,
  script: (id: number) => ["scripts", id] as const,
  monthlyRecommended: ["scripts", "monthly-recommended"] as const,
  category: (category: string) => ["scripts", "category", category] as const,
  difficulty: (difficulty: string) => ["scripts", "difficulty", difficulty] as const,
  search: (filters: Record<string, unknown>) => ["scripts", "search", filters] as const,
  // Booking related keys
  timeSlots: ["booking", "time-slots"] as const,
  availableTimeSlots: ["booking", "available-time-slots"] as const,
  scriptTimeSlots: (scriptSelection: string) => ["booking", "script-time-slots", scriptSelection] as const,
  bookingInfo: ["booking", "info"] as const,
};

// Hook for getting all scripts
export function useScripts() {
  return useQuery({
    queryKey: QUERY_KEYS.scripts,
    queryFn: scriptsApi.getAll,
  });
}

// Hook for getting a single script by ID
export function useScript(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.script(id),
    queryFn: () => scriptsApi.getById(id),
    enabled: !!id, // Only run query if ID exists
  });
}

// Hook for getting monthly recommended scripts
export function useMonthlyRecommended() {
  return useQuery({
    queryKey: QUERY_KEYS.monthlyRecommended,
    queryFn: scriptsApi.getMonthlyRecommended,
  });
}

// Hook for getting scripts by category
export function useScriptsByCategory(category: string) {
  return useQuery({
    queryKey: QUERY_KEYS.category(category),
    queryFn: () => scriptsApi.getByCategory(category),
    enabled: !!category,
  });
}

// Hook for getting scripts by difficulty
export function useScriptsByDifficulty(difficulty: string) {
  return useQuery({
    queryKey: QUERY_KEYS.difficulty(difficulty),
    queryFn: () => scriptsApi.getByDifficulty(difficulty),
    enabled: !!difficulty,
  });
}

// Hook for searching scripts with filters
export function useScriptsSearch(filters: {
  category?: string;
  difficulty?: string;
  playerCount?: string;
}) {
  return useQuery({
    queryKey: QUERY_KEYS.search(filters),
    queryFn: () => scriptsApi.search(filters),
    // Only run query if at least one filter is provided
    enabled: !!(filters.category || filters.difficulty || filters.playerCount),
  });
}

// ==================== Booking Hooks ====================

// Hook for getting available time slots
export function useAvailableTimeSlots() {
  return useQuery({
    queryKey: QUERY_KEYS.availableTimeSlots,
    queryFn: bookingApi.getAvailableTimeSlots,
  });
}

// Hook for getting all time slots (including unavailable)
export function useAllTimeSlots() {
  return useQuery({
    queryKey: QUERY_KEYS.timeSlots,
    queryFn: bookingApi.getAllTimeSlots,
  });
}

// Hook for getting booking info (policies, etc.)
export function useBookingInfo() {
  return useQuery({
    queryKey: QUERY_KEYS.bookingInfo,
    queryFn: bookingApi.getBookingInfo,
  });
}

// Hook for getting time slots for specific script
export function useScriptTimeSlots(scriptSelection: string) {
  return useQuery({
    queryKey: QUERY_KEYS.scriptTimeSlots(scriptSelection),
    queryFn: () => bookingApi.getTimeSlotsForScript(scriptSelection),
    enabled: !!scriptSelection, // Only run when script is selected
  });
}

// Hook for submitting booking
export function useSubmitBooking() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: bookingApi.submitBooking,
    onSuccess: () => {
      // Invalidate and refetch time slots in case availability changed
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.availableTimeSlots });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.timeSlots });
    },
  });
}

// ==================== Scripts CRUD Hooks ====================

// Hook for creating a new script
export function useCreateScript() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: scriptsApi.create || ((script: any) => {
      // Fallback for mock API - this will be replaced with real API
      console.log('Creating script:', script);
      return Promise.resolve(script);
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.scripts });
    },
  });
}

// Hook for updating a script
export function useUpdateScript() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: scriptsApi.update || ((script: any) => {
      // Fallback for mock API - this will be replaced with real API
      console.log('Updating script:', script);
      return Promise.resolve(script);
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.scripts });
    },
  });
}

// Hook for deleting a script
export function useDeleteScript() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: scriptsApi.delete || ((id: number) => {
      // Fallback for mock API - this will be replaced with real API
      console.log('Deleting script:', id);
      return Promise.resolve(id);
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.scripts });
    },
  });
}