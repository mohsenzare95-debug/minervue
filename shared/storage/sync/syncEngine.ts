import { outbox } from "@/shared/storage/local/outbox";
import { supabase } from "@/shared/supabase/client";
import { storageClient } from "@/shared/storage/core/storageClient";
import { Progress } from "@/shared/supabase/progress";
import { clientState } from "@/shared/state/client/clientState";

let timer: any;
let isSyncing = false;

export const syncEngine = {
  start(userId: string) {
    this.sync(userId);

    timer = setInterval(() => {
      if (!document.hidden) {
        this.sync(userId);
      }
    }, 300000);
  },

  async sync(userId: string) {
    if (isSyncing) return;

    isSyncing = true;

    try {
      console.log("[SYNC] started");

      // ======================================================
      // 1. PUSH REVIEW EVENTS (outbox → server)
      // ======================================================
      const pending = outbox
        .getPending()
        .sort((a, b) => a.seq - b.seq)
        .slice(0, 5);

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

      // ======================================================
      // 2. PUSH LOCAL PROGRESS → server
      // ======================================================
      const localProgress = storageClient.progress.getAll();

      for (const deckKey in localProgress) {
        const deck = localProgress[deckKey];

        for (const cardId in deck) {
          try {
            await Progress.save(deckKey, cardId, deck[cardId]);
          } catch (e) {
            console.error("[SYNC] progress push failed", e);
          }
        }
      }

      // ======================================================
      // 3. PULL SERVER PROGRESS → MERGE → STORAGE
      // ======================================================
      const serverProgress = await Progress.getAll();

      const mergedProgress = { ...localProgress };

      for (const deckKey in serverProgress) {
        const serverDeck = serverProgress[deckKey];

        if (!mergedProgress[deckKey]) {
          mergedProgress[deckKey] = {};
        }

        for (const cardId in serverDeck) {
          const serverCard = serverDeck[cardId];
          const localCard = mergedProgress[deckKey]?.[cardId];

          mergedProgress[deckKey][cardId] = {
            streak: Math.max(
              localCard?.streak ?? 0,
              serverCard.streak ?? 0
            ),
            seen: localCard?.seen || serverCard.seen,
            mastered: localCard?.mastered || serverCard.mastered,
          };
        }
      }

      // write once (important optimization)
      for (const deckKey in mergedProgress) {
        for (const cardId in mergedProgress[deckKey]) {
          storageClient.progress.saveCardProgress(
            deckKey,
            cardId,
            mergedProgress[deckKey][cardId]
          );
        }
      }

      // ======================================================
      // 4. SYNC UI STATE (ONLY HERE)
      // ======================================================
      clientState.setProgress(mergedProgress);
      clientState.setReviewLogs(storageClient.reviewLog.getAll());

      console.log("[SYNC] DONE");
    } catch (e) {
      console.error("[SYNC] fatal error", e);
    } finally {
      isSyncing = false;
    }
  },

  stop() {
    clearInterval(timer);
  },
};