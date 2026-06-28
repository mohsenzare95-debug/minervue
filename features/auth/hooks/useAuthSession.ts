//features\auth\hooks\useAuthSession.ts
"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/shared/supabase/client";
import { analytics } from "@/features/analytics/events";

export function useAuthSession() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const authTracked = useRef(false);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      setUser(data.session?.user ?? null);
      setLoading(false);
      setReady(true);

      if (data.session?.user && !authTracked.current) {
        analytics.authVerified();
        authTracked.current = true;
      }
    };

    init();

    const { data } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!mounted) return;

      setUser(session?.user ?? null);
      setLoading(false);
      setReady(true);

      if (session?.user && !authTracked.current) {
        analytics.authVerified();
        authTracked.current = true;
      }
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  return { user, loading, ready };
}