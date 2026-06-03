//shared\supabase\profile.ts
import { supabase } from "@/shared/supabase/client";

export const Profile = {
  get: async (userId: string) => {
    if (!userId) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle(); // مهم: single نیست

    if (error) return null;
    return data;
  },

  update: async (userId: string, updates: { username?: string; avatar?: string }) => {
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .maybeSingle(); // مهم

    return { data, error };
  },
};