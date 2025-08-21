import type { Script } from '../types/script.ts'

export const mockScripts: Script[] = [
  {
    id: '1',
    title: '血色婚禮',
    description: '一場盛大的婚禮變成了血腥的謀殺現場，賓客們都是嫌疑人。在這個充滿愛恨情仇的故事中，每個人都有不可告人的秘密。',
    coverImage: '/images/scripts/bloody-wedding.jpg',
    author: '神秘作家',
    playerCount: { min: 6, max: 8 },
    duration: 240,
    difficulty: 'hard',
    category: 'mystery',
    tags: ['謀殺', '婚禮', '復仇', '愛情'],
    rating: 4.8,
    totalRatings: 156,
    favoriteCount: 89,
    playCount: 342,
    releaseDate: '2024-06-15',
    updatedAt: '2024-06-20',
    isNew: true,
    isHot: true,
    fullDescription: '在一個風景如畫的莊園裡，一場豪華婚禮正在舉行。新郎新娘站在祭壇前，親朋好友齊聚一堂，一切看起來都那麼完美。然而，當婚禮進行到交換戒指的環節時，突然燈光熄滅，一聲慘叫劃破夜空。當燈光重新亮起時，新郎倒在血泊中，生死不明。所有的賓客都成了嫌疑人，每個人都有自己的動機和秘密。愛情、金錢、權力、復仇交織在一起，真相隱藏在層層謊言之下。',
    storyBackground: '故事發生在20世紀30年代的英國鄉村莊園。這是一個充滿階級矛盾的時代，貴族與平民、富人與窮人之間的鴻溝巨大。新郎來自沒落貴族家庭，新娘則是新興資本家的女兒。這場婚禮表面上是愛情的結合，實際上卻是兩個家族利益的交換。',
    gameRules: [
      '每位玩家扮演一個角色，擁有獨特的身份、背景和秘密',
      '通過與其他角色互動，收集線索和信息',
      '可以進行自由討論，但不能直接公開自己的秘密',
      '最終進行投票，指出真正的兇手',
      '兇手如果成功隱瞞身份至最後，則獲勝'
    ],
    characters: [
      {
        name: '新娘艾琳娜',
        description: '美麗優雅的新娘，來自富商家庭',
        background: '資本家的獨生女，從小被寵愛，但內心孤獨',
        relationship: ['與新郎是政治婚姻', '與管家有特殊關係'],
        secrets: ['並不愛新郎', '懷有他人的孩子'],
        goals: ['保護自己的秘密', '找出真兇']
      },
      {
        name: '新郎的兄弟威廉',
        description: '英俊但沉默寡言的年輕男子',
        background: '家族的二兒子，一直活在哥哥的陰影下',
        relationship: ['嫉妒哥哥的成功', '暗戀新娘'],
        secrets: ['債台高築', '與地下組織有聯繫'],
        goals: ['得到家族遺產', '贏得艾琳娜的心']
      },
      {
        name: '老管家詹姆斯',
        description: '忠心耿耿的老僕人，在家族服務了30年',
        background: '見證了家族的興衰，知道許多秘密',
        relationship: ['對家族忠誠', '與艾琳娜關係密切'],
        secrets: ['知道新郎的醜聞', '私藏了重要文件'],
        goals: ['保護家族名譽', '確保艾琳娜的安全']
      }
    ],
    requirements: [
      '需要6-8名玩家參與',
      '遊戲時間約4小時',
      '需要有經驗的主持人引導',
      '建議在安靜的室內環境進行'
    ],
    tips: [
      '仔細閱讀角色卡片，理解角色的動機',
      '主動與其他角色交流，但要小心透露信息',
      '觀察其他玩家的言行，尋找破綻',
      '記住你的目標，但也要靈活應變'
    ],
    images: [
      '/images/scripts/bloody-wedding-1.jpg',
      '/images/scripts/bloody-wedding-2.jpg',
      '/images/scripts/bloody-wedding-3.jpg'
    ],
    features: [
      '複雜的人物關係網',
      '多重反轉的劇情',
      '濃厚的推理氛圍',
      '精美的道具和場景設計'
    ]
  },
  {
    id: '2',
    title: '古宅驚魂',
    description: '一群朋友被困在一座古老的宅邸中，詭異的事件接連發生。誰是真正的兇手？誰能活到最後？',
    coverImage: '/images/scripts/haunted-mansion.jpg',
    author: '恐怖大師',
    playerCount: { min: 4, max: 6 },
    duration: 180,
    difficulty: 'medium',
    category: 'horror',
    tags: ['鬼屋', '靈異', '恐怖', '古宅'],
    rating: 4.5,
    totalRatings: 203,
    favoriteCount: 145,
    playCount: 567,
    releaseDate: '2024-05-20',
    updatedAt: '2024-05-25',
    isNew: false,
    isHot: true,
    fullDescription: '一座被詛咒的古宅，隱藏著百年前的血腥秘密。六個年輕人因為暴風雨被困在這裡，卻發現這不是巧合。隨著夜晚的到來，詭異的事件開始發生：門會自己開關，走廊裡傳來腳步聲，鏡子裡出現陌生的身影。更可怕的是，他們發現有人開始神秘失蹤。這是超自然現象，還是有人在暗中操控一切？',
    storyBackground: '這座維多利亞時代的古宅曾經是一個富有家族的居所，但在百年前發生了一場慘劇。整個家族在一夜之間離奇死亡，從此這裡就被認為是被詛咒的地方。多年來，有許多人聲稱在這裡看到了鬼魂，聽到了哭泣聲。現在，這群年輕人將親身體驗這個恐怖傳說。',
    gameRules: [
      '玩家需要探索古宅的各個房間，尋找線索',
      '某些房間可能觸發特殊事件',
      '玩家之間可以組隊或單獨行動',
      '每輪結束後可能有角色會遭遇危險',
      '存活到最後並揭開真相的玩家獲勝'
    ],
    characters: [
      {
        name: '心理學家艾米',
        description: '理性冷靜的心理學博士生',
        background: '專攻異常心理學，不相信超自然現象',
        relationship: ['與大衛是情侶', '與莎拉是室友'],
        secrets: ['正在進行秘密實驗', '有精神病史'],
        goals: ['用科學解釋所有現象', '保護自己和大衛']
      },
      {
        name: '攝影師大衛',
        description: '喜歡冒險的自由攝影師',
        background: '專門拍攝靈異題材，膽子很大',
        relationship: ['艾米的男友', '曾經來過這座宅子'],
        secrets: ['隱瞞了上次來訪的真實目的', '欠了一筆債'],
        goals: ['拍到真正的靈異照片', '找到寶藏線索']
      }
    ],
    requirements: [
      '需要4-6名玩家參與',
      '遊戲時間約3小時',
      '建議在燈光昏暗的環境中進行',
      '準備一些音效道具會更有氣氛'
    ],
    tips: [
      '保持冷靜，不要被恐怖氣氛影響判斷',
      '仔細觀察環境描述中的細節',
      '與其他角色合作，但要提防背叛',
      '記住，真相往往比表面看起來更複雜'
    ],
    images: [
      '/images/scripts/haunted-mansion-1.jpg',
      '/images/scripts/haunted-mansion-2.jpg'
    ],
    features: [
      '沉浸式恐怖體驗',
      '多重結局設計',
      '心理懸疑與超自然元素結合',
      '精心設計的恐怖氛圍'
    ]
  },
  {
    id: '3',
    title: '時光倒流',
    description: '在一個神秘的小鎮上，時間似乎停止了。玩家們必須解開時空的謎題，才能回到現實世界。',
    coverImage: '/images/scripts/time-loop.jpg',
    author: '科幻作者',
    playerCount: { min: 5, max: 7 },
    duration: 200,
    difficulty: 'expert',
    category: 'fantasy',
    tags: ['時空', '科幻', '謎題', '小鎮'],
    rating: 4.9,
    totalRatings: 98,
    favoriteCount: 76,
    playCount: 189,
    releaseDate: '2024-07-01',
    updatedAt: '2024-07-01',
    isNew: true,
    isHot: false,
    fullDescription: '一個充滿科幻色彩的時空冒險故事，玩家需要在循環的時間中找到脫離的方法。',
    storyBackground: '在一個偏遠的小鎮上，時間出現了異常，所有人都被困在時間循環中。',
    gameRules: ['探索小鎮尋找線索', '與NPC互動獲取信息', '解開時空謎題', '團隊合作找到出路'],
    characters: [
      {
        name: '物理學家博士',
        description: '研究時空理論的科學家',
        background: '對時間有深入研究',
        relationship: ['與實驗室有關'],
        secrets: ['知道時間異常的原因'],
        goals: ['修復時空裂縫']
      }
    ],
    requirements: ['5-7名玩家', '需要邏輯思維', '約3.5小時'],
    tips: ['注意時間線索', '團隊討論很重要'],
    images: ['/images/scripts/time-loop-1.jpg'],
    features: ['燒腦解謎', '科幻元素', '團隊合作']
  },
  {
    id: '4',
    title: '校園霸凌',
    description: '一個關於校園霸凌的沉重故事，每個角色都有自己的困境和選擇。探討人性的光明與黑暗。',
    coverImage: '/images/scripts/school-bullying.jpg',
    author: '社會觀察者',
    playerCount: { min: 6, max: 8 },
    duration: 150,
    difficulty: 'medium',
    category: 'emotion',
    tags: ['校園', '霸凌', '青春', '成長'],
    rating: 4.3,
    totalRatings: 127,
    favoriteCount: 62,
    playCount: 234,
    releaseDate: '2024-04-10',
    updatedAt: '2024-04-15',
    isNew: false,
    isHot: true,
    fullDescription: '一個深入探討校園霸凌問題的沉重劇本，每個角色都面臨道德選擇。',
    storyBackground: '現代高中校園，社會階層和同儕壓力交織的複雜環境。',
    gameRules: ['扮演不同身份的學生', '面對道德選擇', '探討霸凌成因', '尋求解決方案'],
    characters: [
      {
        name: '受害者小明',
        description: '內向敏感的學生',
        background: '成績優秀但不善社交',
        relationship: ['被霸凌者'],
        secrets: ['家庭問題'],
        goals: ['獲得認同']
      }
    ],
    requirements: ['6-8名玩家', '需要同理心', '約2.5小時'],
    tips: ['保持同理心', '理性討論'],
    images: ['/images/scripts/school-1.jpg'],
    features: ['社會議題', '心理探討', '教育意義']
  },
  {
    id: '5',
    title: '江湖恩仇',
    description: '武俠世界中的恩怨情仇，刀光劍影間隱藏著不為人知的秘密。誰是真正的武林盟主？',
    coverImage: '/images/scripts/jianghu-revenge.jpg',
    author: '武俠迷',
    playerCount: { min: 4, max: 6 },
    duration: 220,
    difficulty: 'hard',
    category: 'ancient',
    tags: ['武俠', '江湖', '恩仇', '武功'],
    rating: 4.6,
    totalRatings: 89,
    favoriteCount: 54,
    playCount: 167,
    releaseDate: '2024-03-22',
    updatedAt: '2024-03-25',
    isNew: false,
    isHot: false,
    fullDescription: '江湖風雲，恩怨情仇。在刀光劍影中尋找真相，在利益糾葛中保持本心。',
    storyBackground: '明朝末年，江湖動蕩，各大門派爭奪武林盟主之位。',
    gameRules: ['武功比拼', '結盟背叛', '尋找寶物', '爭奪盟主'],
    characters: [
      {
        name: '劍客李逍遙',
        description: '瀟灑不羈的劍客',
        background: '名門正派弟子',
        relationship: ['與魔教有淵源'],
        secrets: ['身世之謎'],
        goals: ['為師報仇']
      }
    ],
    requirements: ['4-6名玩家', '了解武俠文化', '約3.5小時'],
    tips: ['注意江湖規矩', '善用武功'],
    images: ['/images/scripts/jianghu-1.jpg'],
    features: ['武俠風格', '恩怨情仇', '門派爭鬥']
  },
  {
    id: '6',
    title: '都市迷案',
    description: '現代都市中的連環殺手案，警察、記者、心理醫生等角色共同追尋真相。',
    coverImage: '/images/scripts/urban-mystery.jpg',
    author: '推理愛好者',
    playerCount: { min: 5, max: 7 },
    duration: 180,
    difficulty: 'medium',
    category: 'modern',
    tags: ['都市', '推理', '連環殺手', '現代'],
    rating: 4.4,
    totalRatings: 178,
    favoriteCount: 123,
    playCount: 445,
    releaseDate: '2024-06-08',
    updatedAt: '2024-06-10',
    isNew: true,
    isHot: true,
    fullDescription: '繁華都市中的連環謎案，多個專業角色攜手追查真相。',
    storyBackground: '現代大都市，連環案件震驚社會，各方勢力介入調查。',
    gameRules: ['收集證據', '分析案情', '角色專業技能', '團隊協作'],
    characters: [
      {
        name: '刑警隊長',
        description: '經驗豐富的資深警官',
        background: '多年辦案經驗',
        relationship: ['與記者合作'],
        secrets: ['過往失誤'],
        goals: ['破獲案件']
      }
    ],
    requirements: ['5-7名玩家', '需要推理能力', '約3小時'],
    tips: ['邏輯推理', '證據分析'],
    images: ['/images/scripts/urban-1.jpg'],
    features: ['現代推理', '多職業視角', '邏輯燒腦']
  },
  {
    id: '7',
    title: '魔法學院',
    description: '在一所神秘的魔法學院中，學生們必須解決一系列魔法謎題，同時面對內心的恐懼。',
    coverImage: '/images/scripts/magic-academy.jpg',
    author: '奇幻作家',
    playerCount: { min: 6, max: 8 },
    duration: 240,
    difficulty: 'easy',
    category: 'fantasy',
    tags: ['魔法', '學院', '奇幻', '冒險'],
    rating: 4.2,
    totalRatings: 145,
    favoriteCount: 98,
    playCount: 312,
    releaseDate: '2024-05-15',
    updatedAt: '2024-05-18',
    isNew: false,
    isHot: false,
    fullDescription: '魔法學院中的奇幻冒險，學生們需要運用魔法知識解決謎題。',
    storyBackground: '古老的魔法學院，隱藏著許多秘密和魔法謎題。',
    gameRules: ['學習魔法技能', '解決學院謎題', '團隊合作', '面對挑戰'],
    characters: [
      {
        name: '新生艾莉絲',
        description: '初入學院的魔法新生',
        background: '來自普通家庭',
        relationship: ['與導師關係密切'],
        secrets: ['特殊血統'],
        goals: ['掌握魔法']
      }
    ],
    requirements: ['6-8名玩家', '想像力豐富', '約4小時'],
    tips: ['發揮想像力', '團隊配合'],
    images: ['/images/scripts/magic-1.jpg'],
    features: ['奇幻魔法', '學院生活', '冒險解謎']
  },
  {
    id: '8',
    title: '末日求生',
    description: '世界末日來臨，一群倖存者必須在資源匱乏的環境中生存，同時面對人性的考驗。',
    coverImage: '/images/scripts/apocalypse-survival.jpg',
    author: '末日預言家',
    playerCount: { min: 4, max: 6 },
    duration: 200,
    difficulty: 'hard',
    category: 'modern',
    tags: ['末日', '求生', '人性', '資源'],
    rating: 4.7,
    totalRatings: 112,
    favoriteCount: 87,
    playCount: 198,
    releaseDate: '2024-06-25',
    updatedAt: '2024-06-28',
    isNew: true,
    isHot: true,
    fullDescription: '末日降臨，資源稀缺，人性在極端環境下的真實考驗。',
    storyBackground: '全球災難後的廢土世界，倖存者面臨生存挑戰。',
    gameRules: ['資源分配', '生存決策', '道德選擇', '團隊合作'],
    characters: [
      {
        name: '前軍人約翰',
        description: '有軍事經驗的倖存者',
        background: '退役軍人',
        relationship: ['團隊領導者'],
        secrets: ['隱瞞過去'],
        goals: ['保護團隊']
      }
    ],
    requirements: ['4-6名玩家', '承受心理壓力', '約3.5小時'],
    tips: ['冷靜決策', '團隊至上'],
    images: ['/images/scripts/apocalypse-1.jpg'],
    features: ['末日題材', '生存挑戰', '人性考驗']
  }
]

// 輔助函數：獲取本月新劇本
export const getMonthlyScripts = (scripts: Script[]): Script[] => {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  return scripts.filter(script => {
    const releaseDate = new Date(script.releaseDate)
    return releaseDate.getMonth() === currentMonth && 
           releaseDate.getFullYear() === currentYear
  })
}

// 輔助函數：獲取熱門劇本
export const getHotScripts = (scripts: Script[]): Script[] => {
  return scripts
    .filter(script => script.isHot)
    .sort((a, b) => {
      // 按評分、收藏數、遊戲次數綜合排序
      const scoreA = (a.rating * 0.4) + (a.favoriteCount * 0.3) + (a.playCount * 0.3)
      const scoreB = (b.rating * 0.4) + (b.favoriteCount * 0.3) + (b.playCount * 0.3)
      return scoreB - scoreA
    })
}

// 輔助函數：獲取推薦劇本
export const getRecommendedScripts = (scripts: Script[], limit: number = 4): Script[] => {
  return scripts
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}

// 輔助函數：根據ID獲取單個劇本
export const getScriptById = (scripts: Script[], id: string): Script | undefined => {
  return scripts.find(script => script.id === id)
}

// 輔助函數：獲取所有唯一標籤
export const getAllUniqueTags = (scripts: Script[]): string[] => {
  const allTags = scripts.flatMap(script => script.tags)
  return Array.from(new Set(allTags))
}

// 輔助函數：根據標籤篩選劇本
export const getScriptsByTag = (scripts: Script[], tag: string): Script[] => {
  return scripts.filter(script => script.tags.includes(tag))
}

