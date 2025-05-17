-- Create the table if it does not exist
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

-- Enable Row-Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Safely recreate policies
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

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
END $$;
