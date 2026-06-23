import { outbox } from "@/shared/storage/local/outbox";
import { supabase } from "@/shared/supabase/client";
import type { AppEvent } from "@/shared/types/events";

let isSyncing = false;
let pendingSync: string | null = null;

export const syncEngine = {
  // ======================
  // WRITE SYNC ONLY
  // ======================
  async sync(userId: string) {
    console.log("🚀 [SYNC ENGINE] ENTRY", { userId });

    if (!userId) return;
    if (!navigator.onLine) return;

    if (isSyncing) {
      pendingSync = userId;
      return;
    }

    isSyncing = true;

    try {
      await this.flushOutbox();

      console.log("🔥 [SYNC ENGINE] SYNC SUCCESS");
    } catch (e) {
      console.error("❌ [SYNC ENGINE] ERROR", e);
    } finally {
      isSyncing = false;

      if (pendingSync) {
        const next = pendingSync;
        pendingSync = null;
        this.sync(next);
      }
    }
  },

  // ======================
  // OUTBOX FLUSH (WRITE ONLY)
  // ======================
  async flushOutbox() {
    const pending = outbox.getPending().sort((a, b) => a.seq - b.seq);

    console.log("📦 [OUTBOX] pending:", pending.length);

    await Promise.all(
      pending.map(async (item) => {
        try {
          const event: AppEvent = item.event;

          if (!event.userId) throw new Error("Missing userId");

          // ======================
          // REVIEW EVENT
          // ======================
          if (event.type === "REVIEW") {
            const { error } = await supabase.from("review_events").upsert(
              {
                user_id: event.userId,
                client_event_id: event.client_event_id,
                event_type: "REVIEW_EVENT",
                deck_key: event.deckKey,
                card_id: event.cardId,
                result: event.payload.result,
                timestamp: event.timestamp,
                seq: item.seq,
              },
              { onConflict: "user_id,client_event_id" }
            );

            if (error) throw error;
          }

          // ======================
          // RESET EVENT
          // ======================
          if (event.type === "RESET") {
            const { error } = await supabase.from("review_events").upsert(
              {
                user_id: event.userId,
                client_event_id: event.client_event_id,
                event_type: "RESET_EVENT",
                deck_key: event.deckKey,
                card_id: event.cardId,
                result: "Reset",
                timestamp: event.timestamp,
                seq: item.seq,
              },
              { onConflict: "user_id,client_event_id" }
            );

            if (error) throw error;
          }

          outbox.markSent(item.id);
        } catch (e) {
          outbox.markRetry(item.id);
          console.error("❌ OUTBOX FAIL DETAIL:", e);
        }
      })
    );
  },

  // ======================
  // DEBUG HELPERS
  // ======================
  logPending() {
    const pending = outbox.getPending();

    console.log("📦 OUTBOX SNAPSHOT", {
      total: pending.length,
      items: pending.map((p) => ({
        type: p.event.type,
        seq: p.seq,
        id: p.id,
      })),
    });

    return pending;
  },
};