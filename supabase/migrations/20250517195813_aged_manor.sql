/*
  # Friendships Schema

  1. New Tables
    - `friendships`
      - `id` (uuid, primary key)
      - `sender_id` (uuid, references profiles)
      - `receiver_id` (uuid, references profiles)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policies for friend request management
*/

CREATE TABLE IF NOT EXISTS friendships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  status text DEFAULT 'pending'::text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(sender_id, receiver_id),
  CHECK (status IN ('pending', 'accepted', 'rejected'))
);

ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create friend requests"
  ON friendships
  FOR INSERT
  TO public
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update own friendship status"
  ON friendships
  FOR UPDATE
  TO public
  USING (auth.uid() IN (sender_id, receiver_id));

CREATE POLICY "Users can view own friendships"
  ON friendships
  FOR SELECT
  TO public
  USING (auth.uid() IN (sender_id, receiver_id));