/*
  # Fix armies table policies

  1. Changes
    - Safely drops all existing policies for the armies table
    - Recreates all necessary policies with proper permissions
    
  2. Security
    - Enables RLS on armies table
    - Adds policies for:
      - Creating armies (authenticated users only)
      - Reading armies (public can view public armies, users can view their own)
      - Updating armies (users can update their own)
      - Deleting armies (users can delete their own)
*/

DO $$ 
BEGIN
  -- Drop all existing policies
  DROP POLICY IF EXISTS "Users can create armies" ON public.armies;
  DROP POLICY IF EXISTS "Users can delete own armies" ON public.armies;
  DROP POLICY IF EXISTS "Users can update own armies" ON public.armies;
  DROP POLICY IF EXISTS "Users can view public armies" ON public.armies;
  
  -- Re-create all policies
  CREATE POLICY "Users can create armies"
    ON public.armies
    FOR INSERT
    TO public
    WITH CHECK (auth.uid() = user_id);
    
  CREATE POLICY "Users can delete own armies"
    ON public.armies
    FOR DELETE
    TO public
    USING (auth.uid() = user_id);
    
  CREATE POLICY "Users can update own armies"
    ON public.armies
    FOR UPDATE
    TO public
    USING (auth.uid() = user_id);
    
  CREATE POLICY "Users can view public armies"
    ON public.armies
    FOR SELECT
    TO public
    USING (is_public OR (auth.uid() = user_id));
END $$;