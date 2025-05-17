/*
  # Create authentication tables

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key)
      - `email` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `is_super_admin` (boolean)
      - `raw_app_meta_data` (jsonb)
      - `raw_user_meta_data` (jsonb)
      - `phone` (text)
      - `is_anonymous` (boolean)

  2. Security
    - Enable RLS on `user_profiles` table
    - Add policies for authenticated users to read and update their own data
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY,
  email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_super_admin boolean DEFAULT false,
  raw_app_meta_data jsonb DEFAULT '{}'::jsonb,
  raw_user_meta_data jsonb DEFAULT '{}'::jsonb,
  phone text,
  is_anonymous boolean DEFAULT false
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);