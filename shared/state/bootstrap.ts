// shared/state/bootstrap.ts

import { clientState } from "@/shared/state/client/clientState";
import { syncEngine } from "@/shared/storage/sync/syncEngine";
import { reviewLogStorage } from "@/shared/storage/local/reviewLogStorage";
import { buildProgressFromEvents } from "@/shared/storage/local/buildProgressFromEvents";
import { fetchReviewEvents } from "@/shared/storage/sync/fetchReviewEvents";
import type { AppEvent } from "@/shared/types/events";

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
    const serverRows = await fetchReviewEvents(userId);

    console.log("[BOOTSTRAP] serverRows:", serverRows?.length);

    // ======================
    // 4. SAFE NORMALIZER (FIXED)
    // ======================
    const normalizeEvent = (e: any): AppEvent | null => {
      if (!e) return null;

      const id = e.client_event_id;
      if (!id) return null;

      return {
        id,
        type: e.event_type === "RESET_EVENT" ? "RESET" : "REVIEW",
        userId: e.user_id ?? null,
        deckKey: e.deck_key ?? "",
        cardId: e.card_id ?? "",
        timestamp: Number(e.timestamp ?? Date.now()),
        payload:
          e.event_type === "RESET_EVENT"
            ? { reason: "user_action" }
            : { result: e.result },
      };
    };

    const serverEvents: AppEvent[] = serverRows
      .map(normalizeEvent)
      .filter((e): e is AppEvent => e !== null);

    // 5. merge into local event store
    reviewLogStorage.replaceFromServer(serverEvents);

    console.log(
      "[STORE CHECK] sample events:",
      reviewLogStorage.getStream().slice(0, 5)
    );

    // 6. re-read merged snapshot
    const mergedEvents = reviewLogStorage.getStream();

    console.log("[BOOTSTRAP] mergedEvents:", mergedEvents?.length);

    // 7. build projection
    const progress = buildProgressFromEvents(mergedEvents);

    console.log(
      "[BOOTSTRAP] progress keys:",
      Object.keys(progress || {})
    );

    // 8. hydrate UI
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