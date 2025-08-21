import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: 'Missing Supabase credentials' }, { status: 500 });
    }

    // Use service role key for admin operations
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    console.log('🚀 Creating database tables...');

    // Create scripts table
    const { error: scriptsError } = await supabaseAdmin.from('scripts').select('id').limit(1);
    
    if (scriptsError && scriptsError.code === '42P01') { // Table does not exist
      console.log('Creating scripts table...');
      const { error: createScriptsError } = await supabaseAdmin.rpc('create_scripts_table');
      if (createScriptsError) {
        console.error('Error creating scripts table:', createScriptsError);
        return NextResponse.json({ error: 'Failed to create scripts table' }, { status: 500 });
      }
    }

    // Create time_slots table
    const { error: timeSlotsError } = await supabaseAdmin.from('time_slots').select('id').limit(1);
    
    if (timeSlotsError && timeSlotsError.code === '42P01') { // Table does not exist
      console.log('Creating time_slots table...');
      const { error: createTimeSlotsError } = await supabaseAdmin.rpc('create_time_slots_table');
      if (createTimeSlotsError) {
        console.error('Error creating time_slots table:', createTimeSlotsError);
        return NextResponse.json({ error: 'Failed to create time_slots table' }, { status: 500 });
      }
    }

    // Create bookings table
    const { error: bookingsError } = await supabaseAdmin.from('bookings').select('id').limit(1);
    
    if (bookingsError && bookingsError.code === '42P01') { // Table does not exist
      console.log('Creating bookings table...');
      const { error: createBookingsError } = await supabaseAdmin.rpc('create_bookings_table');
      if (createBookingsError) {
        console.error('Error creating bookings table:', createBookingsError);
        return NextResponse.json({ error: 'Failed to create bookings table' }, { status: 500 });
      }
    }

    console.log('✅ Tables verified/created successfully!');
    return NextResponse.json({ message: 'Tables created successfully!' });

  } catch (error) {
    console.error('Table creation error:', error);
    return NextResponse.json({ error: 'Table creation failed' }, { status: 500 });
  }
}