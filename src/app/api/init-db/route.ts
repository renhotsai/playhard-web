import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST() {
  try {
    console.log('🚀 Initializing database with sample data...');

    // First, let's check if tables exist by trying to insert data
    // If tables don't exist, Supabase will create them automatically based on our inserts

    // Insert scripts data
    const scriptsData = [
      {
        id: 1,
        title: '夢境迷途',
        category: '奇幻冒險',
        players: '4-6人',
        duration: '3-4小時',
        difficulty: '中等',
        description: '在神祕的夢境世界中，玩家需要尋找回到現實的方法，過程中會遇到各種奇異的角色和挑戰。',
        features: ['心理推理', '角色扮演', '團隊合作'],
        image: '/images/scripts/dream-maze.jpg',
        monthly_recommended: true
      },
      {
        id: 2,
        title: '血色莊園',
        category: '恐怖懸疑',
        players: '5-7人',
        duration: '4-5小時',
        difficulty: '困難',
        description: '古老莊園中隱藏著黑暗的秘密，每個角色都有不可告人的過去，真相往往比表面更加驚人。',
        features: ['恐怖氛圍', '心理博弈', '多重反轉'],
        image: '/images/scripts/blood-manor.jpg',
        monthly_recommended: true
      },
      {
        id: 3,
        title: '時空偵探',
        category: '科幻推理',
        players: '4-5人',
        duration: '3-4小時',
        difficulty: '困難',
        description: '當時間旅行成為可能，犯罪也變得更加複雜。偵探們需要在不同時空中尋找線索，解開跨越時空的謎案。',
        features: ['時空穿越', '邏輯推理', '科幻元素'],
        image: '/images/scripts/time-detective.jpg',
        monthly_recommended: false
      },
      {
        id: 4,
        title: '校園怪談',
        category: '懸疑恐怖',
        players: '6-8人',
        duration: '3-4小時',
        difficulty: '中等',
        description: '廢棄的學校中傳說著各種詭異的故事，學生們必須在午夜時分揭開學校的真正秘密。',
        features: ['校園背景', '青春回憶', '懸疑氛圍'],
        image: '/images/scripts/school-ghost.jpg',
        monthly_recommended: true
      },
      {
        id: 5,
        title: '商戰風雲',
        category: '現代商業',
        players: '5-8人',
        duration: '2-3小時',
        difficulty: '簡單',
        description: '在商業世界的爾虞我詐中，每個商人都在為了利益而算計，誰能在這場商戰中笑到最後？',
        features: ['商業策略', '談判博弈', '現實題材'],
        image: '/images/scripts/business-war.jpg',
        monthly_recommended: false
      }
    ];

    const { error: scriptsError } = await supabase
      .from('scripts')
      .upsert(scriptsData, { onConflict: 'id' });

    if (scriptsError) {
      console.error('Error inserting scripts:', scriptsError);
      return NextResponse.json({ error: scriptsError.message }, { status: 500 });
    }

    // Insert time slots data
    const timeSlotsData = [
      {
        id: 'afternoon1',
        time: '14:00-17:00',
        description: '下午場次 - 輕鬆愉快的午後時光',
        available: true,
        price: 'NT$ 680/人',
        suitable_for_scripts: [1, 2, 5]
      },
      {
        id: 'afternoon2',
        time: '15:00-18:00',
        description: '下午場次 - 適合新手體驗',
        available: true,
        price: 'NT$ 680/人',
        suitable_for_scripts: [1, 2, 4, 5]
      },
      {
        id: 'evening1',
        time: '18:00-21:00',
        description: '晚間場次 - 最受歡迎時段',
        available: true,
        price: 'NT$ 780/人',
        suitable_for_scripts: [1, 2, 3, 4, 5]
      },
      {
        id: 'evening2',
        time: '19:00-22:00',
        description: '晚間場次 - 沉浸式夜晚體驗',
        available: true,
        price: 'NT$ 780/人',
        suitable_for_scripts: [1, 3, 4]
      }
    ];

    const { error: timeSlotsError } = await supabase
      .from('time_slots')
      .upsert(timeSlotsData, { onConflict: 'id' });

    if (timeSlotsError) {
      console.error('Error inserting time slots:', timeSlotsError);
      return NextResponse.json({ error: timeSlotsError.message }, { status: 500 });
    }

    console.log('✅ Database initialized successfully!');
    return NextResponse.json({ 
      message: 'Database initialized successfully!',
      scriptsInserted: scriptsData.length,
      timeSlotsInserted: timeSlotsData.length
    });

  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json({ error: 'Database initialization failed' }, { status: 500 });
  }
}