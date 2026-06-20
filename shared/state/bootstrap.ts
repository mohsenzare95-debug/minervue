// shared/state/bootstrap.ts

import { clientState } from "@/shared/state/client/clientState";
import { syncEngine } from "@/shared/storage/sync/syncEngine";
import { reviewLogStorage } from "@/shared/storage/local/reviewLogStorage";
import { supabase } from "@/shared/supabase/client";
import { buildProgressFromEvents } from "@/shared/storage/local/buildProgressFromEvents";

async function fetchReviewEvents(userId: string) {
  const { data, error } = await supabase
    .from("review_events")
    .select("*")
    .eq("user_id", userId)
    .order("timestamp", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function bootstrap(userId: string) {
  console.log("[BOOTSTRAP] start");

  try {
    // 1. UI loading state
    clientState.setState({
      syncStatus: "syncing",
      lastSyncAt: undefined,
    });

    // 2. flush local writes first
    await syncEngine.sync(userId);

    // 3. READ from server
    const serverEvents = await fetchReviewEvents(userId);

    // 4. replace local event store
    reviewLogStorage.setAll(serverEvents);

    // 5. normalize to flat event array (IMPORTANT FIX)
    const localEventsMap = reviewLogStorage.getAll();
    const localEvents = Object.values(localEventsMap).flat();

    // 6. build progress
    const progress = buildProgressFromEvents(localEvents);

    // 7. hydrate UI
    clientState.setState({
      ...progress,
      syncStatus: "idle",
      lastSyncAt: Date.now(),
    });

    console.log("[BOOTSTRAP] done");
  } catch (e) {
    console.error("[BOOTSTRAP] error", e);

    clientState.setState({
      syncStatus: "error",
    });
  }
}