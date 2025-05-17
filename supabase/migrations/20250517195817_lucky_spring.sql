-- Create the battle_records table if it doesn't exist
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

-- Enable row-level security
ALTER TABLE battle_records ENABLE ROW LEVEL SECURITY;

-- Policy: Users can create battle records
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Users can create battle records' AND tablename = 'battle_records'
  ) THEN
    CREATE POLICY "Users can create battle records"
      ON battle_records
      FOR INSERT
      TO public
      WITH CHECK (auth.uid() IN (player1_id, player2_id));
  END IF;
END $$;

-- Policy: Users can update battles they participated in
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Users can update battles they participated in' AND tablename = 'battle_records'
  ) THEN
    CREATE POLICY "Users can update battles they participated in"
      ON battle_records
      FOR UPDATE
      TO public
      USING (auth.uid() IN (player1_id, player2_id));
  END IF;
END $$;

-- Policy: Users can view battles they participated in
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Users can view battles they participated in' AND tablename = 'battle_records'
  ) THEN
    CREATE POLICY "Users can view battles they participated in"
      ON battle_records
      FOR SELECT
      TO public
      USING (auth.uid() IN (player1_id, player2_id));
  END IF;
END $$;
