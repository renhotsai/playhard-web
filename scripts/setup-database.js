#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../src/.env.local') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration(filename) {
  console.log(`Running migration: ${filename}`);
  
  const migrationPath = path.join(__dirname, '../migrations', filename);
  const sql = fs.readFileSync(migrationPath, 'utf8');
  
  const { error } = await supabase.rpc('exec_sql', { sql });
  
  if (error) {
    console.error(`Error running ${filename}:`, error);
    return false;
  }
  
  console.log(`✅ ${filename} completed successfully`);
  return true;
}

async function setupDatabase() {
  console.log('🚀 Setting up database...');
  
  const migrations = [
    '001_create_scripts_table.sql',
    '002_create_time_slots_table.sql', 
    '003_create_bookings_table.sql',
    '004_seed_data.sql'
  ];
  
  for (const migration of migrations) {
    const success = await runMigration(migration);
    if (!success) {
      console.error('❌ Migration failed, aborting setup');
      process.exit(1);
    }
  }
  
  console.log('✅ Database setup completed successfully!');
}

setupDatabase().catch(console.error);