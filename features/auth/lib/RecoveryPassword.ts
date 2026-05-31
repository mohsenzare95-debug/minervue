import { supabase } from "@/shared/supabase/client";

export async function recoveryPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) throw error;
}