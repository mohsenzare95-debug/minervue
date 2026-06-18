"use client";

import { useEffect } from "react";
import Navbar from "@/shared/ui/Navbar";
import { useAuthSession } from "@/features/auth/hooks/useAuthSession";
import { syncEngine } from "@/shared/storage/sync/syncEngine";
import { initSyncTriggers } from "@/shared/storage/sync/syncTriggers";
import { initSyncScheduler } from "@/shared/storage/sync/syncScheduler";
import { clientState } from "@/shared/state/client/clientState";

export default function NavbarWrapper() {
  const { user, loading } = useAuthSession();

  useEffect(() => {
    if (loading || !user?.id) return;

    // 1. FIRST: hydrate local state
    clientState.hydrate();

    // 2. THEN: sync engine
    syncEngine.sync(user.id);

    // optional: background systems
    initSyncScheduler(user.id);
    initSyncTriggers(user.id);
  }, [loading, user?.id]);

  return <Navbar />;
}