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

-- Create index for common queries
CREATE INDEX idx_scripts_category ON scripts(category);
CREATE INDEX idx_scripts_difficulty ON scripts(difficulty);
CREATE INDEX idx_scripts_monthly_recommended ON scripts(monthly_recommended);
CREATE INDEX idx_scripts_features ON scripts USING GIN(features);