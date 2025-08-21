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

-- Create index for common queries
CREATE INDEX idx_time_slots_available ON time_slots(available);
CREATE INDEX idx_time_slots_suitable_for_scripts ON time_slots USING GIN(suitable_for_scripts);