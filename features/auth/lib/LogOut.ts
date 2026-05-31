import { supabase } from "@/shared/supabase/client";

export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}