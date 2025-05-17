/*
  # Create army list tables

  1. New Tables
    - `armies`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `name` (text)
      - `faction` (text)
      - `points` (integer)
      - `units` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `is_public` (boolean)
      - `description` (text)

  2. Security
    - Enable RLS on `armies` table
    - Add policies for:
      - Users can create armies
      - Users can read public armies
      - Users can read their own armies
      - Users can update their own armies
      - Users can delete their own armies
*/

CREATE TABLE IF NOT EXISTS armies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  faction text NOT NULL,
  points integer NOT NULL,
  units jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_public boolean DEFAULT false,
  description text
);

ALTER TABLE armies ENABLE ROW LEVEL SECURITY;

-- Allow users to create armies
CREATE POLICY "Users can create armies"
  ON armies
  FOR INSERT
  TO public
  WITH CHECK (auth.uid() = user_id);

-- Allow users to view public armies
CREATE POLICY "Users can view public armies"
  ON armies
  FOR SELECT
  TO public
  USING (is_public OR auth.uid() = user_id);

-- Allow users to update their own armies
CREATE POLICY "Users can update own armies"
  ON armies
  FOR UPDATE
  TO public
  USING (auth.uid() = user_id);

-- Allow users to delete their own armies
CREATE POLICY "Users can delete own armies"
  ON armies
  FOR DELETE
  TO public
  USING (auth.uid() = user_id);