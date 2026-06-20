// shared/state/bootstrap.ts

import { clientState } from "@/shared/state/client/clientState";
import { syncEngine } from "@/shared/storage/sync/syncEngine";
import { reviewLogStorage } from "@/shared/storage/local/reviewLogStorage";
import { supabase } from "@/shared/supabase/client";
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

    // 3. READ from server (externalized fetch)
    const serverRows = await fetchReviewEvents(userId);

    // 4. normalize server → AppEvent (CRITICAL MAPPING LAYER)
    const serverEvents: AppEvent[] = serverRows.map((e: any) => {
      if (e.event_type === "RESET") {
        return {
          id: e.client_event_id,
          type: "RESET",
          userId: e.user_id,
          deckKey: e.deck_key,
          cardId: e.card_id,
          timestamp: e.timestamp,
          payload: {
            reason: "user_action",
          },
        };
      }

      return {
        id: e.client_event_id,
        type: "REVIEW",
        userId: e.user_id,
        deckKey: e.deck_key,
        cardId: e.card_id,
        timestamp: e.timestamp,
        payload: {
          result: e.result as "Correct" | "Wrong" | "Almost",
        },
      };
    });

    // 5. merge into local event store
    reviewLogStorage.replaceFromServer(serverEvents);

    // 6. single source of truth
    const localEvents = reviewLogStorage.getStream();

    // 7. build projection
    const progress = buildProgressFromEvents(localEvents);

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