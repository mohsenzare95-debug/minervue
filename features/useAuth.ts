//features\useAuth.ts
import { useEffect, useState } from "react";
import { supabase } from "@/shared/supabase/client";
import { bootstrap } from "@/shared/state/bootstrap";

export function useAuth() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();

      if (!mounted) return;

      setSession(data.session);
      setLoading(false);

      if (data.session?.user) {
        await bootstrap(data.session.user.id);
      }
    };

    init();

    const { data: listener } =
      supabase.auth.onAuthStateChange(async (_event, session) => {
        setSession(session);
        setLoading(false);

        if (session?.user) {
          await bootstrap(session.user.id);
        }
      });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return {
    session,
    user: session?.user || null,
    loading,
    isLoggedIn: !!session?.user,
  };
}