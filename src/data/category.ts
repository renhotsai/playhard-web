
export interface Category {
  id: string
  key: string
  name: string
  description: string
  icon: string
  color: string
  textColor: string
}

export const categories: Category[] = [
  {
    id: 'mystery',
    key: 'mystery',
    name: '推理',
    description: '推理解謎，邏輯思維的較量',
    icon: 'Search',
    color: 'mystery-accent-primary',
    textColor: 'mystery-text-primary'
  },
  {
    id: 'horror',
    key: 'horror',
    name: '恐怖',
    description: '恐怖驚悚，心理極限的挑戰',
    icon: 'Ghost',
    color: 'red-500',
    textColor: 'red-100'
  },
  {
    id: 'fantasy',
    key: 'fantasy',
    name: '奇幻',
    description: '奇幻冒險，想像力的盛宴',
    icon: 'Sparkles',
    color: 'purple-500',
    textColor: 'purple-100'
  },
  {
    id: 'emotion',
    key: 'emotion',
    name: '情感',
    description: '情感劇情，人性深度的探索',
    icon: 'Heart',
    color: 'pink-500',
    textColor: 'pink-100'
  },
  {
    id: 'ancient',
    key: 'ancient',
    name: '古代',
    description: '古代背景，歷史文化的體驗',
    icon: 'Crown',
    color: 'amber-500',
    textColor: 'amber-100'
  },
  {
    id: 'modern',
    key: 'modern',
    name: '現代',
    description: '現代都市，當代議題的反思',
    icon: 'Building',
    color: 'blue-500',
    textColor: 'blue-100'
  }
]

export const categoryTranslations: Record<string, string> = {
  'mystery': '推理',
  'horror': '恐怖',
  'fantasy': '奇幻',
  'emotion': '情感',
  'ancient': '古代',
  'modern': '現代'
}

export const categoryDescriptions: Record<string, string> = {
  'mystery': '推理解謎，邏輯思維的較量',
  'horror': '恐怖驚悚，心理極限的挑戰',
  'fantasy': '奇幻冒險，想像力的盛宴',
  'emotion': '情感劇情，人性深度的探索',
  'ancient': '古代背景，歷史文化的體驗',
  'modern': '現代都市，當代議題的反思'
}