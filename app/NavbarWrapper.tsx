// app\NavbarWrapper.tsx
"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/shared/ui/Navbar";
import { useAuthSession } from "@/features/auth/hooks/useAuthSession";

import { syncEngine } from "@/shared/storage/sync/syncEngine";
import { initSyncTriggers } from "@/shared/storage/sync/syncTriggers";
import { initSyncScheduler } from "@/shared/storage/sync/syncScheduler";

import { hydrateRead } from "@/shared/storage/sync/hydrateRead";

export default function NavbarWrapper() {
  const { user, loading } = useAuthSession();

  const ranRef = useRef(false);
  const lastUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    console.log("🔥 [NAVBAR EFFECT]", { loading, user });

    // ❗ فقط وقتی user واقعی داریم اجرا کن
    if (!user?.id) {
      console.log("⛔ No user yet → waiting");
      return;
    }

    const userId = user.id;

    // جلوگیری از اجرا دوباره برای همان user
    if (ranRef.current && lastUserIdRef.current === userId) {
      console.log("⏭ Already initialized for user:", userId);
      return;
    }

    console.log("🚀 INIT SYSTEM FOR USER:", userId);

    ranRef.current = true;
    lastUserIdRef.current = userId;

    // WRITE system
    initSyncScheduler(userId);
    initSyncTriggers(userId);
    syncEngine.sync(userId);

    // READ system
    console.log("🔥 CALLING HYDRATE READ");
    hydrateRead(userId);

  }, [user?.id, loading]);

  return <Navbar />;
}