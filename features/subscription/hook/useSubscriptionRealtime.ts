"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/shared/supabase/client";

export function useSubscription(userId: string | null) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const check = async () => {
      const { data } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "active")
        .maybeSingle();

      if (!data) {
        setIsActive(false);
        return;
      }

      const expiresAt = new Date(data.expires_at);
      setIsActive(expiresAt > new Date());
    };

    // initial fetch
    check();

    // REALTIME
    const channel = supabase
      .channel("subscriptions-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "subscriptions",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          check(); // هر تغییر → re-evaluate
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return { isActive };
}