/*
  # Battle Records Schema

  1. New Tables
    - `battle_records`
      - `id` (uuid, primary key)
      - `player1_id` (uuid, references profiles)
      - `player2_id` (uuid, references profiles)
      - `player1_army_id` (uuid, references armies)
      - `player2_army_id` (uuid, references armies)
      - `player1_score` (integer)
      - `player2_score` (integer)
      - `winner_id` (uuid, references profiles)
      - `played_at` (timestamp)
      - `scenario` (text)
      - `notes` (text)

  2. Security
    - Enable RLS
    - Add policies for battle record management
*/

CREATE TABLE IF NOT EXISTS battle_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player1_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  player2_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  player1_army_id uuid REFERENCES armies(id),
  player2_army_id uuid REFERENCES armies(id),
  player1_score integer NOT NULL,
  player2_score integer NOT NULL,
  winner_id uuid REFERENCES profiles(id),
  played_at timestamptz DEFAULT now(),
  scenario text,
  notes text
);

ALTER TABLE battle_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create battle records"
  ON battle_records
  FOR INSERT
  TO public
  WITH CHECK (auth.uid() IN (player1_id, player2_id));

CREATE POLICY "Users can update battles they participated in"
  ON battle_records
  FOR UPDATE
  TO public
  USING (auth.uid() IN (player1_id, player2_id));

CREATE POLICY "Users can view battles they participated in"
  ON battle_records
  FOR SELECT
  TO public
  USING (auth.uid() IN (player1_id, player2_id));