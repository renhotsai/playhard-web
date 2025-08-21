import { useQuery } from "@tanstack/react-query";
import { scriptsApi } from "@/lib/api";

// Query keys for consistent cache management
export const QUERY_KEYS = {
  scripts: ["scripts"] as const,
  script: (id: number) => ["scripts", id] as const,
  monthlyRecommended: ["scripts", "monthly-recommended"] as const,
  category: (category: string) => ["scripts", "category", category] as const,
  difficulty: (difficulty: string) => ["scripts", "difficulty", difficulty] as const,
  search: (filters: any) => ["scripts", "search", filters] as const,
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