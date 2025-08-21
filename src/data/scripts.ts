export interface Script {
  id: number;
  title: string;
  category: string;
  players: string;
  duration: string;
  difficulty?: string;
  description: string;
  features: string[];
  color: string;
  image?: string;
  monthlyRecommended: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  description: string;
  available: boolean;
  price?: string;
}

export interface BookingInfo {
  timeSlots: TimeSlot[];
  playerCountOptions: { min: number; max: number; label: string }[];
  policies: {
    cancellation: string[];
    procedures: string[];
    notes: string[];
  };
}

export const scripts: Script[] = [
  {
    id: 1,
    title: "謎霧莊園",
    category: "推理",
    players: "6-8人",
    duration: "3-4小時",
    difficulty: "中等",
    description: "維多利亞時代的神秘莊園，一場突如其來的謀殺案，每個人都有不可告人的秘密。在這個充滿陰謀與詭計的夜晚，誰是真正的兇手？",
    features: ["經典推理", "角色豐富", "劇情緊湊"],
    color: "chart-1",
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c50a?w=800&h=450&fit=crop",
    monthlyRecommended: true
  },
  {
    id: 2,
    title: "末日求生",
    category: "生存",
    players: "4-6人", 
    duration: "2-3小時",
    difficulty: "困難",
    description: "末日降臨，資源稀缺，在這個殘酷的世界中，誰能成為最後的倖存者？面對道德與生存的抉擇，你會如何選擇？",
    features: ["緊張刺激", "道德考驗", "資源管理"],
    color: "chart-2",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=450&fit=crop",
    monthlyRecommended: true
  },
  {
    id: 3,
    title: "江湖恩仇",
    category: "武俠",
    players: "5-7人",
    duration: "4-5小時",
    difficulty: "困難",
    description: "快意恩仇的江湖世界，武林盟主之位虛懸，各大門派暗潮洶湧。在這個風雲變幻的武林中，誰能笑到最後？",
    features: ["武俠風格", "門派爭鬥", "情仇交織"],
    color: "chart-3",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop",
    monthlyRecommended: true
  },
  {
    id: 4,
    title: "星際迷航",
    category: "科幻",
    players: "4-6人",
    duration: "3-4小時", 
    difficulty: "中等",
    description: "遙遠的未來，人類已經踏足星辰大海。但是在這次探索任務中，太空船上發生了離奇事件，威脅著所有人的生命。",
    features: ["科幻設定", "太空冒險", "高科技道具"],
    color: "chart-4",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=450&fit=crop",
    monthlyRecommended: true
  },
  {
    id: 5,
    title: "校園懸疑",
    category: "懸疑",
    players: "5-8人",
    duration: "2-3小時",
    difficulty: "簡單",
    description: "看似平靜的校園裡隱藏著不為人知的秘密。當真相逐漸浮出水面時，每個人都必須面對自己的過去。",
    features: ["校園題材", "青春回憶", "情感豐富"],
    color: "chart-5",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=450&fit=crop",
    monthlyRecommended: true
  },
  {
    id: 6,
    title: "恐怖旅館",
    category: "恐怖",
    players: "4-6人",
    duration: "2-3小時",
    difficulty: "中等",
    description: "一座偏僻的山區旅館，夜深人靜時總是傳來詭異的聲響。入住的客人們發現，這裡的每一個房間都有著令人毛骨悚然的故事。",
    features: ["恐怖氛圍", "心理驚悚", "沉浸體驗"],
    color: "chart-1",
    image: "https://images.unsplash.com/photo-1496096265110-f83ad7f96608?w=800&h=450&fit=crop",
    monthlyRecommended: false
  },
  {
    id: 7,
    title: "都市傳說",
    category: "懸疑",
    players: "6-8人",
    duration: "3-4小時",
    difficulty: "中等",
    description: "現代都市中流傳的各種詭異傳說，看似虛無飄渺，卻逐漸在現實中顯現。究竟是巧合，還是有人在背後操控？",
    features: ["現代背景", "心理懸疑", "多線劇情"],
    color: "chart-2",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=450&fit=crop",
    monthlyRecommended: false
  },
  {
    id: 8,
    title: "古宅魅影",
    category: "恐怖",
    players: "5-7人",
    duration: "4-5小時",
    difficulty: "困難",
    description: "百年古宅中暗藏著家族的秘密，每當夜幕降臨，詭異的現象就會發生。繼承者們聚集在此，卻不知道危險正在悄然逼近。",
    features: ["古宅氛圍", "家族秘密", "靈異元素"],
    color: "chart-3",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&h=450&fit=crop",
    monthlyRecommended: false
  },
  {
    id: 9,
    title: "海盜寶藏",
    category: "冒險",
    players: "4-6人",
    duration: "2-3小時",
    difficulty: "簡單",
    description: "傳說中的海盜船長留下了寶藏的線索，一群冒險者踏上了尋寶之旅。但是在這片神秘的海域中，危險與機遇並存。",
    features: ["冒險尋寶", "海盜主題", "團隊合作"],
    color: "chart-4",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=450&fit=crop",
    monthlyRecommended: false
  },
  {
    id: 10,
    title: "時空穿越",
    category: "科幻",
    players: "5-8人",
    duration: "3-4小時",
    difficulty: "困難",
    description: "科學實驗意外導致時空混亂，玩家們被困在不同的時代。為了回到原本的時空，必須解開時間的謎題。",
    features: ["時空穿越", "多時代背景", "科幻謎題"],
    color: "chart-5",
    image: "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=800&h=450&fit=crop",
    monthlyRecommended: false
  },
  {
    id: 11,
    title: "皇宮密謀",
    category: "古裝",
    players: "6-9人",
    duration: "4-5小時",
    difficulty: "困難",
    description: "皇朝末年，宮廷內外暗流洶湧。皇位繼承、權力鬥爭、愛恨情仇交織在一起，每個人都有自己的野心與秘密。",
    features: ["古裝宮廷", "權謀鬥爭", "角色豐富"],
    color: "chart-1",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop",
    monthlyRecommended: false
  },
  {
    id: 12,
    title: "偵探事務所",
    category: "推理",
    players: "4-7人",
    duration: "2-3小時",
    difficulty: "中等",
    description: "知名偵探神秘失蹤，助手們在整理事務所時發現了一系列未解的案件。這些案件之間似乎有著微妙的聯繫。",
    features: ["經典推理", "連環案件", "邏輯解謎"],
    color: "chart-2",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=450&fit=crop",
    monthlyRecommended: false
  },
  {
    id: 13,
    title: "末世重生",
    category: "生存",
    players: "5-7人",
    duration: "3-4小時",
    difficulty: "困難",
    description: "喪屍病毒爆發，文明崩塌。倖存者們必須在資源匱乏的環境中做出艱難的選擇，信任與背叛只在一線之間。",
    features: ["末世題材", "生存挑戰", "道德抉擇"],
    color: "chart-3",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop",
    monthlyRecommended: false
  },
  {
    id: 14,
    title: "魔法學院",
    category: "奇幻",
    players: "6-8人",
    duration: "3-4小時",
    difficulty: "中等",
    description: "魔法學院中發生了神秘事件，學生們的魔法能力開始失控。在調查真相的過程中，發現了學院深藏的黑暗秘密。",
    features: ["魔法奇幻", "學院背景", "超自然現象"],
    color: "chart-4",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=450&fit=crop",
    monthlyRecommended: false
  },
  {
    id: 15,
    title: "豪門恩怨",
    category: "現代",
    players: "5-8人",
    duration: "4-5小時",
    difficulty: "中等",
    description: "豪門家族的老家主突然過世，遺產分配引發了家族內部的激烈爭鬥。金錢、愛情、仇恨交織成一張複雜的網。",
    features: ["豪門背景", "家族糾紛", "情感糾葛"],
    color: "chart-5",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=450&fit=crop",
    monthlyRecommended: false
  },
  {
    id: 16,
    title: "間諜風雲",
    category: "諜戰",
    players: "4-6人",
    duration: "3-4小時",
    difficulty: "困難",
    description: "冷戰時期，間諜們在暗中活動。每個人都有多重身份，真實與偽裝難以分辨。一場關乎國家機密的較量即將展開。",
    features: ["諜戰題材", "身份隱藏", "策略博弈"],
    color: "chart-1",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop",
    monthlyRecommended: false
  },
  {
    id: 17,
    title: "異域傳說",
    category: "奇幻",
    players: "5-7人",
    duration: "2-3小時",
    difficulty: "簡單",
    description: "遠古傳說中的神秘文明重現人間，冒險者們踏入了充滿魔法與危險的異域世界。古老的預言即將實現。",
    features: ["異域風情", "魔法元素", "預言解謎"],
    color: "chart-2",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop",
    monthlyRecommended: false
  },
  {
    id: 18,
    title: "醫院驚魂",
    category: "恐怖",
    players: "4-6人",
    duration: "2-3小時",
    difficulty: "中等",
    description: "廢棄的精神病院中傳出異常聲響，調查者們深入其中，卻發現這裡曾經發生過駭人聽聞的實驗。",
    features: ["醫院場景", "心理恐怖", "黑暗實驗"],
    color: "chart-3",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=450&fit=crop",
    monthlyRecommended: false
  },
  {
    id: 19,
    title: "商戰風雲",
    category: "現代",
    players: "6-9人",
    duration: "4-5小時",
    difficulty: "困難",
    description: "商場如戰場，大企業之間的競爭白熱化。商業機密、內幕交易、企業間諜，每一步都充滿危機與機會。",
    features: ["商戰題材", "現代背景", "複雜博弈"],
    color: "chart-4",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop",
    monthlyRecommended: false
  },
  {
    id: 20,
    title: "時光咖啡館",
    category: "治癒",
    players: "4-6人",
    duration: "2-3小時",
    difficulty: "簡單",
    description: "一間神奇的咖啡館，能讓人重溫過去的回憶。每個客人都帶著遺憾而來，希望在這裡找到內心的平靜與解脫。",
    features: ["溫馨治癒", "回憶主題", "情感共鳴"],
    color: "chart-5",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=450&fit=crop",
    monthlyRecommended: false
  }
];

// 獲取本月推薦劇本
export const getMonthlyRecommendedScripts = (): Script[] => {
  return scripts.filter(script => script.monthlyRecommended);
};

// 根據 ID 獲取劇本
export const getScriptById = (id: number): Script | undefined => {
  return scripts.find(script => script.id === id);
};

// 預約相關資料
export const bookingInfo: BookingInfo = {
  timeSlots: [
    {
      id: "afternoon1",
      time: "14:00-17:00",
      description: "下午場次 - 輕鬆愉快的午後時光",
      available: true,
      price: "NT$ 680/人"
    },
    {
      id: "afternoon2", 
      time: "15:00-18:00",
      description: "下午場次 - 適合新手體驗",
      available: true,
      price: "NT$ 680/人"
    },
    {
      id: "evening1",
      time: "18:00-21:00", 
      description: "晚間場次 - 最受歡迎時段",
      available: true,
      price: "NT$ 780/人"
    },
    {
      id: "evening2",
      time: "19:00-22:00",
      description: "晚間場次 - 沉浸式夜晚體驗", 
      available: true,
      price: "NT$ 780/人"
    },
    {
      id: "weekend1",
      time: "10:00-13:00",
      description: "週末早場 - 精神飽滿開始冒險",
      available: false, // 示例：某些時段可能不可用
      price: "NT$ 880/人"
    },
    {
      id: "weekend2",
      time: "21:00-24:00",
      description: "深夜場次 - 神秘刺激體驗",
      available: true,
      price: "NT$ 980/人"
    }
  ],
  playerCountOptions: [
    { min: 3, max: 4, label: "3-4人小隊" },
    { min: 4, max: 6, label: "4-6人中隊" },
    { min: 6, max: 8, label: "6-8人大隊" },
    { min: 8, max: 10, label: "8-10人團隊" }
  ],
  policies: {
    cancellation: [
      "24小時前取消可全額退費",
      "12小時前取消退費50%", 
      "12小時內恕不退費",
      "如遇不可抗力因素，可協商改期"
    ],
    procedures: [
      "填寫預約表單並選擇劇本",
      "等待客服電話確認詳細資訊",
      "確認後可選擇線上付款或現場付款", 
      "預約成功後會收到確認簡訊"
    ],
    notes: [
      "請準時到達現場，建議提前10分鐘",
      "遊戲過程中請配合主持人指導",
      "如有身體不適或特殊需求請提前告知",
      "現場提供免費茶水和小點心"
    ]
  }
};

// 獲取可用的時段
export const getAvailableTimeSlots = (): TimeSlot[] => {
  return bookingInfo.timeSlots.filter(slot => slot.available);
};

// 獲取所有時段（包含不可用的）
export const getAllTimeSlots = (): TimeSlot[] => {
  return bookingInfo.timeSlots;
};

// 獲取人數選項
export const getPlayerCountOptions = () => {
  return bookingInfo.playerCountOptions;
};