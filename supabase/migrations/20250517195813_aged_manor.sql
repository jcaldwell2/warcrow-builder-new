-- Create the friendships table if it doesn't exist
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

-- Enable row-level security
ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;

-- Policy: Users can create friend requests
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Users can create friend requests' AND tablename = 'friendships'
  ) THEN
    CREATE POLICY "Users can create friend requests"
      ON friendships
      FOR INSERT
      TO public
      WITH CHECK (auth.uid() = sender_id);
  END IF;
END $$;

-- Policy: Users can update own friendship status
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Users can update own friendship status' AND tablename = 'friendships'
  ) THEN
    CREATE POLICY "Users can update own friendship status"
      ON friendships
      FOR UPDATE
      TO public
      USING (auth.uid() IN (sender_id, receiver_id));
  END IF;
END $$;

-- Policy: Users can view own friendships
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Users can view own friendships' AND tablename = 'friendships'
  ) THEN
    CREATE POLICY "Users can view own friendships"
      ON friendships
      FOR SELECT
      TO public
      USING (auth.uid() IN (sender_id, receiver_id));
  END IF;
END $$;
