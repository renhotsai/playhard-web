import { supabase } from '@/lib/supabase';
import { Script, TimeSlot, BookingInfo } from '@/data/scripts';

// Simulate API delay for consistent UX
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Transform database row to Script interface
const transformScript = (row: any): Script => ({
  id: row.id,
  title: row.title,
  category: row.category,
  players: row.players,
  duration: row.duration,
  difficulty: row.difficulty || undefined,
  description: row.description,
  features: row.features || [],
  image: row.image,
  monthlyRecommended: row.monthly_recommended || false
});

// Transform database row to TimeSlot interface
const transformTimeSlot = (row: any): TimeSlot => ({
  id: row.id,
  time: row.time,
  description: row.description,
  available: row.available,
  price: row.price || undefined,
  suitableForScripts: row.suitable_for_scripts || []
});

// Scripts API functions using Supabase
export const supabaseScriptsApi = {
  // Get all scripts
  getAll: async (): Promise<Script[]> => {
    await delay(200);
    
    const { data, error } = await supabase
      .from('scripts')
      .select('*')
      .order('id');
    
    if (error) {
      console.error('Error fetching scripts:', error);
      return [];
    }
    
    return data?.map(transformScript) || [];
  },

  // Get script by ID
  getById: async (id: number): Promise<Script | null> => {
    await delay(150);
    
    const { data, error } = await supabase
      .from('scripts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching script by ID:', error);
      return null;
    }
    
    return data ? transformScript(data) : null;
  },

  // Get monthly recommended scripts
  getMonthlyRecommended: async (): Promise<Script[]> => {
    await delay(250);
    
    const { data, error } = await supabase
      .from('scripts')
      .select('*')
      .eq('monthly_recommended', true)
      .order('id');
    
    if (error) {
      console.error('Error fetching monthly recommended scripts:', error);
      return [];
    }
    
    return data?.map(transformScript) || [];
  },

  // Get scripts by category
  getByCategory: async (category: string): Promise<Script[]> => {
    await delay(200);
    
    if (category === "全部") {
      return supabaseScriptsApi.getAll();
    }
    
    const { data, error } = await supabase
      .from('scripts')
      .select('*')
      .eq('category', category)
      .order('id');
    
    if (error) {
      console.error('Error fetching scripts by category:', error);
      return [];
    }
    
    return data?.map(transformScript) || [];
  },

  // Get scripts by difficulty
  getByDifficulty: async (difficulty: string): Promise<Script[]> => {
    await delay(200);
    
    if (difficulty === "全部") {
      return supabaseScriptsApi.getAll();
    }
    
    const { data, error } = await supabase
      .from('scripts')
      .select('*')
      .eq('difficulty', difficulty)
      .order('id');
    
    if (error) {
      console.error('Error fetching scripts by difficulty:', error);
      return [];
    }
    
    return data?.map(transformScript) || [];
  },

  // Search scripts with filters
  search: async (filters: {
    category?: string;
    difficulty?: string;
    playerCount?: string;
  }): Promise<Script[]> => {
    await delay(300);
    
    let query = supabase.from('scripts').select('*');
    
    // Apply category filter
    if (filters.category && filters.category !== "全部") {
      query = query.eq('category', filters.category);
    }
    
    // Apply difficulty filter
    if (filters.difficulty && filters.difficulty !== "全部") {
      query = query.eq('difficulty', filters.difficulty);
    }
    
    const { data, error } = await query.order('id');
    
    if (error) {
      console.error('Error searching scripts:', error);
      return [];
    }
    
    let scripts = data?.map(transformScript) || [];
    
    // Apply player count filter (client-side for now, could be improved with better DB design)
    if (filters.playerCount && filters.playerCount !== "全部") {
      scripts = scripts.filter((script) => {
        if (filters.playerCount === "4-6人") {
          return script.players.includes("4") || script.players.includes("5") || script.players.includes("6");
        } else if (filters.playerCount === "6-8人") {
          return script.players.includes("6") || script.players.includes("7") || script.players.includes("8");
        } else if (filters.playerCount === "8人以上") {
          return script.players.includes("8") || script.players.includes("9");
        }
        return true;
      });
    }
    
    return scripts;
  },

  // Create new script
  create: async (scriptData: Omit<Script, 'id'>): Promise<Script> => {
    await delay(300);
    
    const { data, error } = await supabase
      .from('scripts')
      .insert([{
        title: scriptData.title,
        category: scriptData.category,
        players: scriptData.players,
        duration: scriptData.duration,
        difficulty: scriptData.difficulty || null,
        description: scriptData.description,
        features: scriptData.features,
        image: scriptData.image,
        monthly_recommended: scriptData.monthlyRecommended
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating script:', error);
      throw error;
    }
    
    return transformScript(data);
  },

  // Update existing script
  update: async (script: Script): Promise<Script> => {
    await delay(300);
    
    const { data, error } = await supabase
      .from('scripts')
      .update({
        title: script.title,
        category: script.category,
        players: script.players,
        duration: script.duration,
        difficulty: script.difficulty || null,
        description: script.description,
        features: script.features,
        image: script.image,
        monthly_recommended: script.monthlyRecommended
      })
      .eq('id', script.id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating script:', error);
      throw error;
    }
    
    return transformScript(data);
  },

  // Delete script
  delete: async (id: number): Promise<void> => {
    await delay(200);
    
    const { error } = await supabase
      .from('scripts')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting script:', error);
      throw error;
    }
  },
};

// Booking API functions using Supabase
export const supabaseBookingApi = {
  // Get available time slots
  getAvailableTimeSlots: async (): Promise<TimeSlot[]> => {
    await delay(150);
    
    const { data, error } = await supabase
      .from('time_slots')
      .select('*')
      .eq('available', true)
      .order('id');
    
    if (error) {
      console.error('Error fetching available time slots:', error);
      return [];
    }
    
    return data?.map(transformTimeSlot) || [];
  },

  // Get all time slots (including unavailable)
  getAllTimeSlots: async (): Promise<TimeSlot[]> => {
    await delay(150);
    
    const { data, error } = await supabase
      .from('time_slots')
      .select('*')
      .order('id');
    
    if (error) {
      console.error('Error fetching all time slots:', error);
      return [];
    }
    
    return data?.map(transformTimeSlot) || [];
  },

  // Get booking info (policies, player options, etc.) - static for now
  getBookingInfo: async (): Promise<BookingInfo> => {
    await delay(200);
    
    // For now, return static booking info since policies don't change often
    // This could be moved to database later if needed
    return {
      timeSlots: await supabaseBookingApi.getAllTimeSlots(),
      scriptTimeSlots: [], // Not used with current suitableForScripts approach
      playerCountOptions: [
        { min: 3, max: 4, label: "3-4人小隊" },
        { min: 4, max: 6, label: "4-6人中隊" },
        { min: 6, max: 8, label: "6-8人大隊" },
        { min: 8, max: 10, label: "8-10人團戰" }
      ],
      policies: {
        cancellation: [
          "預約確認後，若需取消請提前24小時告知",
          "臨時取消或爽約將收取訂金50%作為違約金",
          "因故改期請提前12小時聯繫，可免費改期一次"
        ],
        procedures: [
          "填寫預約表單並送出申請",
          "客服人員將於2小時內電話確認",
          "確認後支付訂金即完成預約",
          "遊戲當日提前15分鐘到場"
        ],
        notes: [
          "遊戲過程中請保持手機靜音",
          "禁止錄音錄影，維護其他玩家遊戲體驗",
          "建議穿著舒適服裝，部分劇本需要站立互動",
          "未滿18歲需家長同意書，部分劇本有年齡限制"
        ]
      }
    };
  },

  // Get time slots for specific script
  getTimeSlotsForScript: async (scriptSelection: string): Promise<TimeSlot[]> => {
    await delay(150);
    
    const scriptId = parseScriptSelection(scriptSelection);
    if (!scriptId) return [];
    
    const { data, error } = await supabase
      .from('time_slots')
      .select('*')
      .eq('available', true)
      .contains('suitable_for_scripts', [scriptId])
      .order('id');
    
    if (error) {
      console.error('Error fetching time slots for script:', error);
      return [];
    }
    
    return data?.map(transformTimeSlot) || [];
  },

  // Submit booking (create new booking record)
  submitBooking: async (bookingData: {
    name: string;
    phone: string;
    email: string;
    date: string;
    time: string;
    script: string;
    players: string;
    notes?: string;
  }): Promise<{ success: boolean; bookingId?: string; message: string }> => {
    await delay(1000);
    
    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        name: bookingData.name,
        phone: bookingData.phone,
        email: bookingData.email || null,
        date: bookingData.date,
        time: bookingData.time,
        script: bookingData.script,
        players: bookingData.players,
        notes: bookingData.notes || null,
        status: 'pending'
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error submitting booking:', error);
      return {
        success: false,
        message: "預約送出失敗，請檢查網路連線後重試，或直接撥打客服專線。"
      };
    }
    
    return {
      success: true,
      bookingId: data.id,
      message: "預約申請已成功送出！我們將於2小時內與您聯繫確認詳細資訊。"
    };
  }
};

// Helper function to parse script selection string and get script ID
const parseScriptSelection = (scriptSelection: string): number | null => {
  if (!scriptSelection) return null;
  
  // This is a temporary solution - in a real app, you'd want to store script ID directly
  // For now, we'll extract from the format "Script Title (players, duration)"
  
  // Map script titles to IDs (this should ideally come from the database)
  const scriptTitleToId: { [key: string]: number } = {
    '夢境迷途': 1,
    '血色莊園': 2,
    '時空偵探': 3,
    '校園怪談': 4,
    '商戰風雲': 5,
    '古墓迷影': 6,
    '末日求生': 7,
    '江湖恩仇': 8,
    '星際迷航': 9,
    '民國往事': 10,
    '魔法學院': 11,
    '諜影重重': 12,
    '童話扭曲': 13,
    '賽博朋克': 14,
    '鄉村秘密': 15,
    '海盜傳說': 16,
    '都市傳說': 17,
    '宮廷秘史': 18,
    '外星入侵': 19,
    '音樂之謎': 20
  };
  
  // Extract title from "Title (players, duration)" format
  const titleMatch = scriptSelection.match(/^(.+?)\s*\(/);
  if (titleMatch) {
    const title = titleMatch[1].trim();
    return scriptTitleToId[title] || null;
  }
  
  return null;
};