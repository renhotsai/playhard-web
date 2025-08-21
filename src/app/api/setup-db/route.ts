import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST() {
  try {
    console.log('🚀 Setting up database...');

    // Create scripts table
    const { error: scriptsTableError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS scripts (
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
        
        CREATE INDEX IF NOT EXISTS idx_scripts_category ON scripts(category);
        CREATE INDEX IF NOT EXISTS idx_scripts_difficulty ON scripts(difficulty);
        CREATE INDEX IF NOT EXISTS idx_scripts_monthly_recommended ON scripts(monthly_recommended);
        CREATE INDEX IF NOT EXISTS idx_scripts_features ON scripts USING GIN(features);
      `
    });

    if (scriptsTableError) {
      console.error('Error creating scripts table:', scriptsTableError);
      return NextResponse.json({ error: scriptsTableError.message }, { status: 500 });
    }

    // Create time_slots table
    const { error: timeSlotsTableError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS time_slots (
          id VARCHAR(50) PRIMARY KEY,
          time VARCHAR(50) NOT NULL,
          description TEXT NOT NULL,
          available BOOLEAN DEFAULT TRUE,
          price VARCHAR(50),
          suitable_for_scripts INTEGER[] NOT NULL DEFAULT '{}',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        CREATE INDEX IF NOT EXISTS idx_time_slots_available ON time_slots(available);
        CREATE INDEX IF NOT EXISTS idx_time_slots_suitable_for_scripts ON time_slots USING GIN(suitable_for_scripts);
      `
    });

    if (timeSlotsTableError) {
      console.error('Error creating time_slots table:', timeSlotsTableError);
      return NextResponse.json({ error: timeSlotsTableError.message }, { status: 500 });
    }

    // Create bookings table
    const { error: bookingsTableError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS bookings (
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
        
        CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
        CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
        CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);
      `
    });

    if (bookingsTableError) {
      console.error('Error creating bookings table:', bookingsTableError);
      return NextResponse.json({ error: bookingsTableError.message }, { status: 500 });
    }

    console.log('✅ Database tables created successfully!');
    return NextResponse.json({ message: 'Database setup completed successfully!' });

  } catch (error) {
    console.error('Database setup error:', error);
    return NextResponse.json({ error: 'Database setup failed' }, { status: 500 });
  }
}