DROP POLICY "Users can view their own users_access" ON public.users_access;

CREATE POLICY "Authenticated users can view all users_access"
  ON public.users_access
  FOR SELECT
  TO authenticated
  USING (true);