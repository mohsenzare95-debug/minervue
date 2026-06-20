"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/shared/ui/Navbar";
import { useAuthSession } from "@/features/auth/hooks/useAuthSession";
import { syncEngine } from "@/shared/storage/sync/syncEngine";
import { initSyncTriggers } from "@/shared/storage/sync/syncTriggers";
import { initSyncScheduler } from "@/shared/storage/sync/syncScheduler";
import { hydrateClientState } from "@/shared/state/hydrateClientState";

export default function NavbarWrapper() {
  const { user, loading } = useAuthSession();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (loading || !user?.id) return;

    if (initializedRef.current) return;
    initializedRef.current = true;

    // ======================
    // 1. UI STATE INIT
    // ======================
    hydrateClientState();

    // ======================
    // 2. BACKGROUND SYNC INIT
    // ======================
    initSyncScheduler(user.id);
    initSyncTriggers(user.id);

    // ======================
    // 3. INITIAL SYNC (READ+WRITE reconciliation)
    // ======================
    syncEngine.sync(user.id);
  }, [loading, user?.id]);

  return <Navbar />;
}