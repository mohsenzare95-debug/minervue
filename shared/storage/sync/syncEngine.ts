// shared/storage/sync/syncEngine.ts

import { outbox } from "@/shared/storage/local/outbox";
import { supabase } from "@/shared/supabase/client";
import { clientState } from "@/shared/state/client/clientState";
import type { AppEvent } from "@/shared/types/events";

let isSyncing = false;
let pendingSync: string | null = null;

export const syncEngine = {
  // ======================
  // WRITE SYNC ONLY
  // ======================

  async sync(userId: string) {
    if (!navigator.onLine) return;

    if (isSyncing) {
      pendingSync = userId;
      return;
    }

    isSyncing = true;

    try {
      clientState.setState({ syncStatus: "syncing" });

      await this.flushOutbox();

      clientState.setState({
        syncStatus: "idle",
        lastSyncAt: Date.now(),
      });
    } catch (e) {
      console.error("[SYNC ERROR]", e);
      clientState.setState({ syncStatus: "error" });
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
    const pending = outbox
      .getPending()
      .sort((a, b) => a.seq - b.seq);

    for (const item of pending) {
      const event: AppEvent = item.event;

      try {
        if (!event.userId) {
          throw new Error("Missing userId in event");
        }

        if (event.type === "REVIEW") {
          const { error } = await supabase.from("review_events").upsert(
            {
              user_id: event.userId,
              client_event_id: item.id,
              event_type: "REVIEW_EVENT",
              deck_key: event.deckKey,
              card_id: event.cardId,
              result: event.payload.result,
              timestamp: event.timestamp,
              seq: item.seq,
            },
            {
              onConflict: "user_id,client_event_id",
            }
          );

          if (error) throw error;
        }

        else if (event.type === "RESET") {
          const { error } = await supabase.from("review_events").upsert(
            {
              user_id: event.userId,
              client_event_id: item.id,
              event_type: "RESET_EVENT",
              deck_key: event.deckKey,
              card_id: event.cardId,
              result: "Reset",
              timestamp: event.timestamp,
              seq: item.seq,
            },
            {
              onConflict: "user_id,client_event_id",
            }
          );

          if (error) throw error;
        }

        outbox.markSent(item.id);
      } catch (e) {
        console.error("[OUTBOX SYNC ERROR]", e);
        outbox.markRetry(item.id);
      }
    }
  },

  // ======================
  // CHECKPOINT (WRITE META ONLY)
  // ======================

  async syncReviewCheckpoint(userId: string) {
    const { data: last } = await supabase
      .from("review_events")
      .select("timestamp")
      .eq("user_id", userId)
      .order("timestamp", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!last?.timestamp) return;

    await supabase.from("user_sync_checkpoint").upsert({
      user_id: userId,
      last_event_timestamp: last.timestamp,
      updated_at: new Date().toISOString(),
    });
  },

  // ======================
  // DEBUG
  // ======================

  logPending() {
    const pending = outbox.getPending();

    console.log(
      "[OUTBOX SNAPSHOT]",
      pending.map((p) => ({
        type: p.event.type,
        seq: p.seq,
        retry: p.retryCount,
      }))
    );

    return pending;
  },
};