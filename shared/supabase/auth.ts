//shared\supabase\auth.ts
import { supabase } from "@/shared/supabase/client";

let cachedUser: any = null;
let cachedAt = 0;

export const Auth = {
  // ======================
  // GET USER + PROFILE (CACHED)
  // ======================
  getUser: async () => {
    const now = Date.now();

    // cache 5 دقیقه‌ای
    if (cachedUser && now - cachedAt < 5 * 60 * 1000) {
      return cachedUser;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Profile fetch error:", error.message);
      return { user, profile: null };
    }

    cachedUser = { user, profile };
    cachedAt = now;

    return cachedUser;
  },

  // ======================
  // SESSION
  // ======================
  getSession: async () => {
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  // ======================
  // SIGNUP
  // ======================
  signUp: async (email: string, password: string, meta?: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: meta },
    });

    if (error) {
      return {
        user: null,
        error,
      };
    }

    if (!data?.user) {
      return {
        user: null,
        error: new Error("SIGNUP_FAILED"),
      };
    }

    return {
      user: data.user,
      error: null,
    };
  },

  // ======================
  // LOGIN
  // ======================
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { user: null, error };

    const user = data.user;

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error(profileError.message);
    }

    return {
      user,
      profile,
      error: null,
    };
  },

  // ======================
  // LOGOUT
  // ======================
  signOut: async () => {
    cachedUser = null;
    cachedAt = 0;

    return supabase.auth.signOut();
  },
};