import { supabase } from "@/shared/supabase/client";

export const Auth = {
  // ======================
  // GET USER + PROFILE
  // ======================
  getUser: async () => {
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

    return { user, profile };
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

  // 1) واقعی‌ترین error
  if (error) {
    return {
      user: null,
      error,
    };
  }

  // 2) مهم‌ترین حالت: Supabase silent fail
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
    return supabase.auth.signOut();
  },
};