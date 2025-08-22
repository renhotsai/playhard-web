import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { scripts } from '@/data/scripts';

export async function POST() {
  try {
    console.log('🚀 Starting data migration to Supabase...');

    // First, clear existing data
    console.log('Clearing existing data...');
    await supabase.from('scripts').delete().gt('id', 0);
    
    // Migrate scripts data with embedded time slots
    console.log('Migrating scripts with time slots...');
    const scriptsToInsert = scripts.map(script => ({
      id: script.id,
      title: script.title,
      category: script.category,
      players: script.players,
      duration: script.duration,
      difficulty: script.difficulty || null,
      description: script.description,
      features: script.features,
      image: script.image,
      monthly_recommended: script.monthlyRecommended || false,
      time_slots: script.timeSlots || []
    }));

    const { error: scriptsError } = await supabase
      .from('scripts')
      .insert(scriptsToInsert);

    if (scriptsError) {
      console.error('Error inserting scripts:', scriptsError);
      return NextResponse.json({ error: `Scripts migration failed: ${scriptsError.message}` }, { status: 500 });
    }

    console.log(`✅ Successfully migrated ${scriptsToInsert.length} scripts with embedded time slots`);

    const result = {
      message: 'Data migration completed successfully!',
      scriptsMigrated: scriptsToInsert.length,
      totalTimeSlots: scriptsToInsert.reduce((sum, script) => sum + (script.time_slots?.length || 0), 0),
      timestamp: new Date().toISOString()
    };

    console.log('✅ Migration completed:', result);
    return NextResponse.json(result);

  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ 
      error: 'Data migration failed', 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}