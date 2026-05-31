//shared/storage/sync/syncEngine.ts

import { outbox } from "@/shared/storage/local/outbox";
import { supabase } from "@/shared/supabase/client";

let timer: any;

export const syncEngine = {
  // ======================
  // START SYNC LOOP
  // ======================
  start(userId: string) {
    timer = setInterval(() => {
      this.sync(userId);
    }, 15000); // 15 sec
  },

  // ======================
  // SYNC BATCH
  // ======================
  async sync(userId: string) {
    // 1. get pending events (ordered + limited)
    const pending = outbox
      .getPending()
      .sort((a, b) => a.seq - b.seq)
      .slice(0, 5);

    // ======================
    // 2. SEQUENTIAL PUSH (IMPORTANT FOR ORDERING)
    // ======================
    for (const event of pending) {
      try {
        await supabase
          .from("review_events")
          .upsert(
            {
              user_id: event.user_id,
              client_event_id: event.client_event_id,

              deck_key: event.payload.deckKey,
              card_id: event.payload.cardId,
              result: event.payload.result,
              timestamp: event.payload.timestamp,

              seq: event.seq,
            },
            {
              onConflict: "user_id,client_event_id",
            }
          );

        // 3. mark as sent only after success
        outbox.markSent(event.id);
      } catch (e) {
        // leave event in pending state for retry
        // no deletion = retry guarantee
      }
    }
  },

  // ======================
  // STOP SYNC LOOP
  // ======================
  stop() {
    clearInterval(timer);
  },
};