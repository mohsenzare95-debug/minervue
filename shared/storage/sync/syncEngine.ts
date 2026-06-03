// shared/storage/sync/syncEngine.ts
import { outbox } from "@/shared/storage/local/outbox";
import { supabase } from "@/shared/supabase/client";
import { storageClient } from "@/shared/storage/core/storageClient";
import { Progress } from "@/shared/supabase/progress";

let timer: any;

export const syncEngine = {
  start(userId: string) {
    timer = setInterval(() => this.sync(userId), 15000);
  },

  async sync(userId: string) {
    // ===== 1. push review events =====
    const pending = outbox.getPending().sort((a, b) => a.seq - b.seq).slice(0, 5);
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
      } catch {}
    }

    // ===== 2. push user progress =====
    const deckKeys = Object.keys(storageClient.progress.getAll());
    for (const deckKey of deckKeys) {
      const deckProgress = storageClient.progress.getDeckProgress(deckKey);
      for (const cardId in deckProgress) {
        const progress = deckProgress[cardId];
        try {
          await Progress.save(deckKey, cardId, progress); // async, non-blocking
        } catch (e) {
          console.error("Progress sync failed:", e);
        }
      }
    }

    // ===== 3. pull server progress & merge =====
    try {
      const serverProgressRaw = await Progress.getAll();
      for (const key in serverProgressRaw) {
        const [deckKey, cardId] = key.split("_");
        const serverCard = serverProgressRaw[key];

        const localProgress = storageClient.progress.getDeckProgress(deckKey)[cardId];

        // merge logic
        const merged = {
          streak: Math.max(localProgress?.streak ?? 0, serverCard.streak ?? 0),
          seen: localProgress?.seen || serverCard.seen,
          mastered: localProgress?.mastered || serverCard.mastered,
        };

        storageClient.progress.saveCardProgress(deckKey, cardId, merged);
      }
    } catch (e) {
      console.error("Failed to pull server progress:", e);
    }
  },

  stop() {
    clearInterval(timer);
  },
};