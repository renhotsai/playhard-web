import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { scripts } from '@/data/scripts';
import { bookingInfo } from '@/data/scripts';

export async function POST() {
  try {
    console.log('🚀 Starting data migration to Supabase...');

    // First, clear existing data (optional - remove if you want to keep existing data)
    console.log('Clearing existing data...');
    await supabase.from('scripts').delete().gt('id', 0);
    await supabase.from('time_slots').delete().neq('id', '');
    
    // Migrate scripts data
    console.log('Migrating scripts...');
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
      monthly_recommended: script.monthlyRecommended || false
    }));

    const { error: scriptsError } = await supabase
      .from('scripts')
      .insert(scriptsToInsert);

    if (scriptsError) {
      console.error('Error inserting scripts:', scriptsError);
      return NextResponse.json({ error: `Scripts migration failed: ${scriptsError.message}` }, { status: 500 });
    }

    console.log(`✅ Successfully migrated ${scriptsToInsert.length} scripts`);

    // Migrate time slots data
    console.log('Migrating time slots...');
    const timeSlotsToInsert = bookingInfo.timeSlots.map(slot => ({
      id: slot.id,
      time: slot.time,
      description: slot.description,
      available: slot.available,
      price: slot.price || null,
      suitable_for_scripts: (slot as any).suitableForScripts || []
    }));

    const { error: timeSlotsError } = await supabase
      .from('time_slots')
      .insert(timeSlotsToInsert);

    if (timeSlotsError) {
      console.error('Error inserting time slots:', timeSlotsError);
      return NextResponse.json({ error: `Time slots migration failed: ${timeSlotsError.message}` }, { status: 500 });
    }

    console.log(`✅ Successfully migrated ${timeSlotsToInsert.length} time slots`);

    const result = {
      message: 'Data migration completed successfully!',
      scriptsMigrated: scriptsToInsert.length,
      timeSlotsMigrated: timeSlotsToInsert.length,
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