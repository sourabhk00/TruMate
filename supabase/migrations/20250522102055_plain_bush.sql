/*
  # Initial schema setup for TruMate

  1. New Tables
    - profiles
      - user_id (uuid, primary key)
      - first_name (text)
      - last_name (text)
      - date_of_birth (date)
      - gender (text)
      - location (text)
      - occupation (text)
      - bio (text)
      - interests (text[])
      - phone_number (text)
      - loyalty_score (integer)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - verifications
      - id (uuid, primary key)
      - user_id (uuid)
      - type (text)
      - status (text)
      - verified_at (timestamptz)
      - created_at (timestamptz)
    
    - loyalty_tests
      - id (uuid, primary key)
      - user_id (uuid)
      - score (integer)
      - answers (jsonb)
      - completed_at (timestamptz)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id),
  first_name text NOT NULL,
  last_name text NOT NULL,
  date_of_birth date NOT NULL,
  gender text NOT NULL,
  location text NOT NULL,
  occupation text,
  bio text,
  interests text[],
  phone_number text,
  loyalty_score integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create verifications table
CREATE TABLE verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  type text NOT NULL,
  status text NOT NULL,
  verified_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create loyalty_tests table
CREATE TABLE loyalty_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  score integer NOT NULL,
  answers jsonb NOT NULL,
  completed_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_tests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read own verifications"
  ON verifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read own loyalty tests"
  ON loyalty_tests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own loyalty tests"
  ON loyalty_tests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create function to update profile timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating timestamps
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();