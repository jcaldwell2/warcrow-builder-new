/*
  # Army Lists Schema

  1. New Tables
    - `armies`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `name` (text)
      - `faction` (text)
      - `points` (integer)
      - `units` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `is_public` (boolean)
      - `description` (text)

  2. Security
    - Enable RLS
    - Add policies for CRUD operations
*/

CREATE TABLE IF NOT EXISTS armies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
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

CREATE POLICY "Users can create armies"
  ON armies
  FOR INSERT
  TO public
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own armies"
  ON armies
  FOR UPDATE
  TO public
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own armies"
  ON armies
  FOR DELETE
  TO public
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view public armies"
  ON armies
  FOR SELECT
  TO public
  USING (is_public OR auth.uid() = user_id);