-- Create the armies table if it doesn't exist
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

-- Enable RLS
ALTER TABLE armies ENABLE ROW LEVEL SECURITY;

-- Wrap policy creation in a block to make it safe
DO $$
BEGIN
  -- Drop policies if they already exist
  DROP POLICY IF EXISTS "Users can create armies" ON armies;
  DROP POLICY IF EXISTS "Users can view public armies" ON armies;
  DROP POLICY IF EXISTS "Users can update own armies" ON armies;
  DROP POLICY IF EXISTS "Users can delete own armies" ON armies;

  -- Recreate policies
  CREATE POLICY "Users can create armies"
    ON armies
    FOR INSERT
    TO public
    WITH CHECK (auth.uid() = user_id);

  CREATE POLICY "Users can view public armies"
    ON armies
    FOR SELECT
    TO public
    USING (is_public OR auth.uid() = user_id);

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
END $$;
