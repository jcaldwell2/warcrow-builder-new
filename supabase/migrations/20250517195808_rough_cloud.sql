-- Create table if not exists
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

-- Enable RLS
ALTER TABLE armies ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY: Users can create armies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Users can create armies' AND tablename = 'armies'
  ) THEN
    CREATE POLICY "Users can create armies"
      ON armies
      FOR INSERT
      TO public
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- CREATE POLICY: Users can update own armies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Users can update own armies' AND tablename = 'armies'
  ) THEN
    CREATE POLICY "Users can update own armies"
      ON armies
      FOR UPDATE
      TO public
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- CREATE POLICY: Users can delete own armies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Users can delete own armies' AND tablename = 'armies'
  ) THEN
    CREATE POLICY "Users can delete own armies"
      ON armies
      FOR DELETE
      TO public
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- CREATE POLICY: Users can view public armies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Users can view public armies' AND tablename = 'armies'
  ) THEN
    CREATE POLICY "Users can view public armies"
      ON armies
      FOR SELECT
      TO public
      USING (is_public OR auth.uid() = user_id);
  END IF;
END $$;
