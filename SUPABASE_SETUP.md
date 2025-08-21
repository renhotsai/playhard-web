# Supabase Database Setup Guide

This guide explains how to set up the Supabase database for the PlayHard Script Hall website.

## Prerequisites

1. Supabase project created and configured
2. Environment variables set in `.env.local`
3. Supabase client installed (`@supabase/supabase-js`)

## Environment Variables

Ensure these variables are set in your `.env.local` file:

```bash
# Supabase Configuration
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Feature Toggle
NEXT_PUBLIC_USE_SUPABASE=true  # Set to false to use mock data
```

## Database Schema

### 1. Scripts Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Create scripts table
CREATE TABLE scripts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  players VARCHAR(50) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  difficulty VARCHAR(50),
  description TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  image VARCHAR(255) NOT NULL,
  monthly_recommended BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_scripts_category ON scripts(category);
CREATE INDEX idx_scripts_difficulty ON scripts(difficulty);
CREATE INDEX idx_scripts_monthly_recommended ON scripts(monthly_recommended);
CREATE INDEX idx_scripts_features ON scripts USING GIN(features);
```

### 2. Time Slots Table

```sql
-- Create time_slots table
CREATE TABLE time_slots (
  id VARCHAR(50) PRIMARY KEY,
  time VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  price VARCHAR(50),
  suitable_for_scripts INTEGER[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_time_slots_available ON time_slots(available);
CREATE INDEX idx_time_slots_suitable_for_scripts ON time_slots USING GIN(suitable_for_scripts);
```

### 3. Bookings Table

```sql
-- Create bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  date DATE NOT NULL,
  time VARCHAR(50) NOT NULL,
  script VARCHAR(255) NOT NULL,
  players VARCHAR(20) NOT NULL,
  notes TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at);
```

## Sample Data

### Insert Scripts

```sql
INSERT INTO scripts (title, category, players, duration, difficulty, description, features, image, monthly_recommended) VALUES
('夢境迷途', '奇幻冒險', '4-6人', '3-4小時', '中等', '在神祕的夢境世界中，玩家需要尋找回到現實的方法，過程中會遇到各種奇異的角色和挑戰。', '{"心理推理", "角色扮演", "團隊合作"}', '/images/scripts/dream-maze.jpg', TRUE),
('血色莊園', '恐怖懸疑', '5-7人', '4-5小時', '困難', '古老莊園中隱藏著黑暗的秘密，每個角色都有不可告人的過去，真相往往比表面更加驚人。', '{"恐怖氛圍", "心理博弈", "多重反轉"}', '/images/scripts/blood-manor.jpg', TRUE),
('時空偵探', '科幻推理', '4-5人', '3-4小時', '困難', '當時間旅行成為可能，犯罪也變得更加複雜。偵探們需要在不同時空中尋找線索，解開跨越時空的謎案。', '{"時空穿越", "邏輯推理", "科幻元素"}', '/images/scripts/time-detective.jpg', FALSE),
('校園怪談', '懸疑恐怖', '6-8人', '3-4小時', '中等', '廢棄的學校中傳說著各種詭異的故事，學生們必須在午夜時分揭開學校的真正秘密。', '{"校園背景", "青春回憶", "懸疑氛圍"}', '/images/scripts/school-ghost.jpg', TRUE),
('商戰風雲', '現代商業', '5-8人', '2-3小時', '簡單', '在商業世界的爾虞我詐中，每個商人都在為了利益而算計，誰能在這場商戰中笑到最後？', '{"商業策略", "談判博弈", "現實題材"}', '/images/scripts/business-war.jpg', FALSE);

-- Add more scripts as needed...
```

### Insert Time Slots

```sql
INSERT INTO time_slots (id, time, description, available, price, suitable_for_scripts) VALUES
('afternoon1', '14:00-17:00', '下午場次 - 輕鬆愉快的午後時光', TRUE, 'NT$ 680/人', '{1,2,5}'),
('afternoon2', '15:00-18:00', '下午場次 - 適合新手體驗', TRUE, 'NT$ 680/人', '{1,2,4,5}'),
('evening1', '18:00-21:00', '晚間場次 - 最受歡迎時段', TRUE, 'NT$ 780/人', '{1,2,3,4,5}'),
('evening2', '19:00-22:00', '晚間場次 - 沉浸式夜晚體驗', TRUE, 'NT$ 780/人', '{1,3,4}');
```

## API Usage

The application automatically switches between Supabase and mock data based on the `NEXT_PUBLIC_USE_SUPABASE` environment variable.

### Supabase Mode (`NEXT_PUBLIC_USE_SUPABASE=true`)
- Uses real database data
- Supports booking submissions
- Real-time data updates

### Mock Data Mode (`NEXT_PUBLIC_USE_SUPABASE=false`)
- Uses local mock data
- Simulates API delays
- Safe for development/testing

## Architecture

```
src/
├── lib/
│   ├── supabase.ts          # Supabase client configuration
│   ├── supabase-api.ts      # Supabase API functions
│   ├── api.ts               # Mock API functions  
│   └── api-config.ts        # API switching logic
├── hooks/
│   └── use-scripts.ts       # React Query hooks
└── app/
    └── api/
        └── init-db/         # Database initialization endpoint
```

## Troubleshooting

1. **"supabaseUrl is required" error**: Check that environment variables are correctly set
2. **"Could not find table" error**: Run the SQL schema creation scripts in Supabase
3. **Connection issues**: Verify your Supabase project URL and keys
4. **RLS issues**: Ensure Row Level Security policies are configured if needed

## Next Steps

1. Run the SQL scripts in your Supabase dashboard
2. Set `NEXT_PUBLIC_USE_SUPABASE=true` in your `.env.local`
3. Test the application to ensure Supabase integration works
4. Configure Row Level Security policies for production use