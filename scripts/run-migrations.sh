#!/bin/bash

# Supabase Migration Runner
# This script will run the consolidated SQL setup file

echo "🚀 Starting Supabase database setup..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Please install it with:"
    echo "brew install supabase/tap/supabase"
    exit 1
fi

# Set your Supabase project details
SUPABASE_URL="https://hcrqgrfearbeplonxnvm.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjcnFncmZlYXJiZXBsb254bnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3OTcwMzAsImV4cCI6MjA3MTM3MzAzMH0.lRprudKgH4mAkSy3pB8yPenb34UWCJCIqQOKk_E7-FU"
DB_URL="postgres://postgres.hcrqgrfearbeplonxnvm:E6kXLLKE33JoXljZ@aws-1-us-east-1.pooler.supabase.com:5432/postgres"

echo "📋 Running complete database setup..."

# Check if the setup file exists
if [ ! -f "supabase-setup.sql" ]; then
    echo "❌ Setup file not found: supabase-setup.sql"
    echo "Please make sure the file exists in the project root"
    exit 1
fi

echo "🔧 Executing SQL setup file..."

# Execute the setup file using psql (assuming psql is available)
if command -v psql &> /dev/null; then
    echo "Using psql to execute setup..."
    psql "$DB_URL" -f supabase-setup.sql
    
    if [ $? -eq 0 ]; then
        echo "✅ Database setup completed successfully!"
        echo ""
        echo "🎉 Next steps:"
        echo "1. Set NEXT_PUBLIC_USE_SUPABASE=true in your .env.local file"
        echo "2. Restart your Next.js development server"
        echo "3. Visit http://localhost:3000/admin/scripts to test CRUD operations"
        echo "4. Visit http://localhost:3000/admin/database to verify setup"
    else
        echo "❌ Database setup failed"
        exit 1
    fi
else
    echo "⚠️  psql not found. Please install PostgreSQL client tools or:"
    echo "1. Copy the content of supabase-setup.sql"
    echo "2. Go to your Supabase Dashboard > SQL Editor"
    echo "3. Paste and execute the SQL commands"
    echo "4. Visit: $SUPABASE_URL"
fi