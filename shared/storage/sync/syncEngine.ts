import { outbox } from "@/shared/storage/local/outbox";
import { supabase } from "@/shared/supabase/client";
import { clientState } from "@/shared/state/client/clientState";

let isSyncing = false;
let pendingSync: string | null = null;

export const syncEngine = {
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
      await this.syncReviewCheckpoint(userId);

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
  // OUTBOX FLUSH
  // ======================

  async flushOutbox() {
    const pending = outbox.getPending().sort((a, b) => a.seq - b.seq);

    for (const event of pending) {
      try {
        switch (event.type) {
          case "REVIEW_EVENT":
            await supabase.from("review_events").upsert(
              {
                user_id: event.user_id,
                client_event_id: event.client_event_id,
                deck_key: event.payload.deckKey,
                card_id: event.payload.cardId,
                result: event.payload.result,
                timestamp: event.payload.timestamp,
                seq: event.seq,
              },
              { onConflict: "user_id,client_event_id" }
            );
            break;

          case "RESET_DECK_EVENT":
            await supabase.from("deck_events").insert({
              user_id: event.user_id,
              client_event_id: event.client_event_id,
              deck_key: event.payload.deckKey,
              timestamp: event.payload.timestamp,
              type: "RESET",
            });
            break;

          default:
            console.warn("[SYNC] Unknown event type:", event);
            continue;
        }

        outbox.markSent(event.id);
      } catch (e) {
        outbox.markRetry(event.id);
      }
    }
  },

  // ======================
  // CHECKPOINT
  // ======================

  async syncReviewCheckpoint(userId: string) {
    const { data: last } = await supabase
      .from("review_events")
      .select("timestamp")
      .eq("user_id", userId)
      .order("timestamp", { ascending: false })
      .limit(1)
      .single();

    if (!last?.timestamp) return;

    await supabase.from("user_sync_checkpoint").upsert({
      user_id: userId,
      last_event_timestamp: last.timestamp,
      updated_at: new Date().toISOString(),
    });
  },

  logPending() {
    const pending = outbox.getPending();

    console.log(
      "[OUTBOX SNAPSHOT]",
      pending.map((p) => ({
        type: p.type,
        seq: p.seq,
        retry: p.retryCount,
      }))
    );

    return pending;
  },
};