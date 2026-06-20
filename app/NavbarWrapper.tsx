"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/shared/ui/Navbar";
import { useAuthSession } from "@/features/auth/hooks/useAuthSession";

import { syncEngine } from "@/shared/storage/sync/syncEngine";

// WRITE side
import { initSyncTriggers } from "@/shared/storage/sync/syncTriggers";
import { initSyncScheduler } from "@/shared/storage/sync/syncScheduler";

// READ side (NEW SINGLE ENTRY)
import { hydrateRead } from "@/shared/storage/sync/hydrateRead";

// UI hydration
import { hydrateClientState } from "@/shared/state/hydrateClientState";

export default function NavbarWrapper() {
  const { user, loading } = useAuthSession();

  const initializedRef = useRef(false);
  const lastUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (loading || !user?.id) return;

    const userId = user.id;

    // prevent duplicate init per user
    if (initializedRef.current && lastUserIdRef.current === userId) return;

    initializedRef.current = true;
    lastUserIdRef.current = userId;

    // ======================
    // 1. UI HYDRATION
    // ======================
    hydrateClientState();

    // ======================
    // 2. WRITE SYNC SYSTEM
    // ======================
    initSyncScheduler(userId);
    initSyncTriggers(userId);
    syncEngine.sync(userId);

    // ======================
    // 3. READ SYNC (SINGLE ENTRY ONLY)
    // ======================
    hydrateRead(userId);

  }, [loading, user?.id]);

  return <Navbar />;
}