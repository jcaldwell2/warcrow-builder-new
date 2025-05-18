/*
  # Fix duplicate policy issue

  1. Changes
    - Drop existing policy if it exists before creating new one
    - Re-create policy with correct permissions

  2. Security
    - Maintains existing RLS security model
    - Ensures public read access to profiles
*/

DO $$ 
BEGIN
  -- Drop the existing policy if it exists
  DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
  
  -- Re-create the policy
  CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles
    FOR SELECT
    TO public
    USING (true);
END $$;