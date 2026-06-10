//features\auth\hooks\useAuthSession.ts
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/shared/supabase/client";

export function useAuthSession() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    init();

    const { data } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}