/*
  # Add verification code column

  1. Changes
    - Add 'code' column to verifications table for storing verification codes
    
  2. Security
    - Maintain existing RLS policies
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'verifications' AND column_name = 'code'
  ) THEN
    ALTER TABLE verifications ADD COLUMN code text NOT NULL;
  END IF;
END $$;