// 角色信息類型
export interface Character {
  name: string
  description: string
  background: string
  relationship: string[]
  secrets: string[]
  goals: string[]
}

// 劇本類型定義
export interface Script {
  id: string
  title: string
  description: string
  coverImage: string
  author: string
  playerCount: {
    min: number
    max: number
  }
  duration: number // 遊戲時長（分鐘）
  difficulty: 'easy' | 'medium' | 'hard' | 'expert'
  category: 'mystery' | 'horror' | 'modern' | 'ancient' | 'fantasy' | 'emotion'
  tags: string[]
  rating: number // 平均評分 (1-5)
  totalRatings: number // 總評分人數
  favoriteCount: number // 收藏數
  playCount: number // 遊戲次數
  releaseDate: string // 發布日期
  updatedAt: string // 更新時間
  isNew: boolean // 是否為新劇本
  isHot: boolean // 是否為熱門劇本
  
  // 詳細信息字段
  fullDescription: string // 完整故事描述
  storyBackground: string // 故事背景
  gameRules: string[] // 遊戲規則
  characters: Character[] // 角色列表
  requirements: string[] // 遊戲要求
  tips: string[] // 遊戲提示
  images: string[] // 額外圖片
  features: string[] // 劇本特色
}

// 劇本卡片顯示用的簡化類型
export interface ScriptCard {
  id: string
  title: string
  description: string
  coverImage: string
  playerCount: {
    min: number
    max: number
  }
  duration: number
  difficulty: Script['difficulty']
  category: Script['category']
  tags: string[]
  rating: number
  favoriteCount: number
  playCount: number
  isNew: boolean
  isHot: boolean
}

// 劇本篩選和排序選項
export interface ScriptFilters {
  category?: Script['category']
  difficulty?: Script['difficulty']
  playerCount?: number
  duration?: {
    min: number
    max: number
  }
  sortBy?: 'newest' | 'rating' | 'popular' | 'playCount'
}

// 劇本統計信息
export interface ScriptStats {
  totalScripts: number
  newThisMonth: number
  avgRating: number
  mostPopularCategory: Script['category']
}