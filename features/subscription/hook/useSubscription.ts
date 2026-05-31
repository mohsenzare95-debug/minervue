//features\subscription\hook\useSubscription.ts
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/shared/supabase/client";

type Subscription = {
  isActive: boolean;
  expiresAt: string | null;
};

export function useSubscription(userId: string | null) {
  const [state, setState] = useState<Subscription>({
    isActive: false,
    expiresAt: null,
  });

  useEffect(() => {
    if (!userId) return;

    const fetchSub = async () => {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error || !data) {
        setState({ isActive: false, expiresAt: null });
        return;
      }

      const now = new Date();
      const expires = new Date(data.expires_at);

      setState({
        isActive: expires > now,
        expiresAt: data.expires_at,
      });
    };

    fetchSub();
  }, [userId]);

  return state;
}