import { outbox } from "@/shared/storage/local/outbox";
import { supabase } from "@/shared/supabase/client";
import { storageClient } from "@/shared/storage/core/storageClient";
import { clientState } from "@/shared/state/client/clientState";
import { rebuildProgress } from "./rebuildProgress";
// ======================
// SYNC LOCK
// ======================

let isSyncing = false;
let pendingSync: string | null = null;

// ======================
// ENGINE
// ======================

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

      await this._runSync(userId);

      clientState.setState({
        syncStatus: "idle",
        lastSyncAt: Date.now(),
      });
    } catch (e) {
      clientState.setState({ syncStatus: "error" });
      console.error("[SYNC]", e);
    } finally {
      isSyncing = false;

      if (pendingSync) {
        const nextUser = pendingSync;
        pendingSync = null;
        this.sync(nextUser);
      }
    }
  },

  async flushOutbox() {
    const pending = outbox
      .getPending()
      .sort((a, b) => a.seq - b.seq)
      .slice(0, 10);

    for (const event of pending) {
      try {
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

        outbox.markSent(event.id);
      } catch (e) {
        console.error("[OUTBOX FAIL]", e);
        outbox.markRetry(event.id);
      }
    }
  },

  async _runSync(userId: string) {
    await this.flushOutbox();

    const { data: logs } = await supabase
      .from("review_events")
      .select("*")
      .eq("user_id", userId)
      .order("timestamp", { ascending: true });

    const events = logs ?? [];

    // 🔥 NEW: full rebuild
    const progress = rebuildProgress(events);

    // cache local (optional but safe)
    storageClient.progress.setAll(progress);

    const last = events.at(-1);

    if (last) {
      await supabase.from("user_sync_checkpoint").upsert({
        user_id: userId,
        last_event_timestamp: last.timestamp,
        updated_at: new Date().toISOString(),
      });
    }

    clientState.setState({
      progress,
      syncStatus: "idle",
      lastSyncAt: Date.now(),
    });
  },
};