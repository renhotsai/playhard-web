import { Script } from "@/data/scripts";
import { scripts } from "@/data/scripts";

// Simulate API delay for more realistic behavior
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API functions that simulate server requests
export const scriptsApi = {
  // Get all scripts
  getAll: async (): Promise<Script[]> => {
    await delay(200); // Simulate network delay
    return scripts;
  },

  // Get script by ID
  getById: async (id: number): Promise<Script | null> => {
    await delay(150);
    return scripts.find(script => script.id === id) || null;
  },

  // Get monthly recommended scripts
  getMonthlyRecommended: async (): Promise<Script[]> => {
    await delay(250);
    return scripts.filter(script => script.monthlyRecommended);
  },

  // Get scripts by category
  getByCategory: async (category: string): Promise<Script[]> => {
    await delay(200);
    if (category === "全部") return scripts;
    return scripts.filter(script => script.category === category);
  },

  // Get scripts by difficulty
  getByDifficulty: async (difficulty: string): Promise<Script[]> => {
    await delay(200);
    if (difficulty === "全部") return scripts;
    return scripts.filter(script => script.difficulty === difficulty);
  },

  // Search scripts with filters
  search: async (filters: {
    category?: string;
    difficulty?: string;
    playerCount?: string;
  }): Promise<Script[]> => {
    await delay(300);
    
    return scripts.filter((script) => {
      const categoryMatch = !filters.category || filters.category === "全部" || script.category === filters.category;
      const difficultyMatch = !filters.difficulty || filters.difficulty === "全部" || script.difficulty === filters.difficulty;
      
      let playerCountMatch = true;
      if (filters.playerCount && filters.playerCount !== "全部") {
        if (filters.playerCount === "4-6人") {
          playerCountMatch = script.players.includes("4") || script.players.includes("5") || script.players.includes("6");
        } else if (filters.playerCount === "6-8人") {
          playerCountMatch = script.players.includes("6") || script.players.includes("7") || script.players.includes("8");
        } else if (filters.playerCount === "8人以上") {
          playerCountMatch = script.players.includes("8") || script.players.includes("9");
        }
      }
      
      return categoryMatch && difficultyMatch && playerCountMatch;
    });
  },
};