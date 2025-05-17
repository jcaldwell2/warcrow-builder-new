/*
  # Fix armies table policies

  1. Changes
    - Safely drops all existing policies
    - Recreates all necessary policies with proper permissions
    - Uses DO block for atomic execution
    - Maintains security model for user operations

  2. Security
    - Users can create their own armies
    - Users can view public armies and their own armies
    - Users can update their own armies
    - Users can delete their own armies
*/

DO $$ 
BEGIN
  -- First ensure the table exists
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

  -- Enable RLS if not already enabled
  ALTER TABLE armies ENABLE ROW LEVEL SECURITY;

  -- Drop all existing policies to ensure clean slate
  DROP POLICY IF EXISTS "Users can create armies" ON armies;
  DROP POLICY IF EXISTS "Users can delete own armies" ON armies;
  DROP POLICY IF EXISTS "Users can update own armies" ON armies;
  DROP POLICY IF EXISTS "Users can view public armies" ON armies;
  
  -- Create all policies
  CREATE POLICY "Users can create armies"
    ON armies
    FOR INSERT
    TO public
    WITH CHECK (auth.uid() = user_id);
    
  CREATE POLICY "Users can delete own armies"
    ON armies
    FOR DELETE
    TO public
    USING (auth.uid() = user_id);
    
  CREATE POLICY "Users can update own armies"
    ON armies
    FOR UPDATE
    TO public
    USING (auth.uid() = user_id);
    
  CREATE POLICY "Users can view public armies"
    ON armies
    FOR SELECT
    TO public
    USING (is_public OR (auth.uid() = user_id));

EXCEPTION
  WHEN others THEN
    RAISE NOTICE 'Error occurred: %', SQLERRM;
    RAISE;
END $$;