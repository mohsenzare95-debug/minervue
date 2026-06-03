import { outbox } from "@/shared/storage/local/outbox";
import { supabase } from "@/shared/supabase/client";
import { storageClient } from "@/shared/storage/core/storageClient";
import { Progress } from "@/shared/supabase/progress";

let timer: any;

export const syncEngine = {
  start(userId: string) {
    // اجرای فوری هنگام لاگین
    this.sync(userId);
    timer = setInterval(() => this.sync(userId), 60000);
  },

  async sync(userId: string) {
    console.log("[SYNC] started");

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
      } catch (e) {
        console.error("[SYNC] review event push failed", e);
      }
    }

    // ===== 2. push user progress =====
    const allLocalProgress = storageClient.progress.getAll();
    for (const deckKey in allLocalProgress) {
      const deckProgress = allLocalProgress[deckKey];
      for (const cardId in deckProgress) {
        const progress = deckProgress[cardId];
        try {
          await Progress.save(deckKey, cardId, progress);
        } catch (e) {
          console.error("[SYNC] progress push failed", e);
        }
      }
    }

    // ===== 3. pull server progress & merge =====
    try {
      const serverProgress = await Progress.getAll();
      console.log("[SYNC] SERVER PROGRESS", serverProgress);

      for (const deckKey in serverProgress) {
        const serverDeck = serverProgress[deckKey];
        for (const cardId in serverDeck) {
          const serverCard = serverDeck[cardId];

          const localCard = storageClient.progress.getDeckProgress(deckKey)?.[cardId];

          const merged = {
            streak: Math.max(localCard?.streak ?? 0, serverCard.streak ?? 0),
            seen: localCard?.seen || serverCard.seen,
            mastered: localCard?.mastered || serverCard.mastered,
          };

          storageClient.progress.saveCardProgress(deckKey, cardId, merged);
        }
      }

      console.log("[SYNC] LOCAL PROGRESS AFTER MERGE", storageClient.progress.getAll());
    } catch (e) {
      console.error("[SYNC] pull failed", e);
    }
  },

  stop() {
    clearInterval(timer);
  },
};