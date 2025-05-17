/*
  # Fix duplicate armies policy

  1. Changes
    - Safely drop and recreate the "Users can create armies" policy
    - Ensures policy exists without causing duplicate errors
*/

DO $$ 
BEGIN
  -- Drop the existing policy if it exists
  DROP POLICY IF EXISTS "Users can create armies" ON public.armies;
  
  -- Re-create the policy
  CREATE POLICY "Users can create armies"
    ON public.armies
    FOR INSERT
    TO public
    WITH CHECK (auth.uid() = user_id);
END $$;