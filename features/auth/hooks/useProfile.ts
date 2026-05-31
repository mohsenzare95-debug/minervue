"use client";

import { useEffect, useState } from "react";
import { Profile } from "@/shared/supabase/profile";

export function useProfile(user: any) {
  const [profile, setProfile] = useState<{
    username: string;
    avatar: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile({
        username: "Guest",
        avatar: "🧑‍⚕️",
        email: "",
      });
      return;
    }

    Profile.get(user.id).then((p) => {
      setProfile({
        username: p?.username || "User",
        avatar: p?.avatar || "🧑‍⚕️",
        email: user.email || "",
      });
    });
  }, [user]);

  return profile;
}