// shared/storage/sync/syncEngine.ts

import { outbox } from "@/shared/storage/local/outbox";
import { supabase } from "@/shared/supabase/client";
import { storageClient } from "@/shared/storage/core/storageClient";
import { Progress } from "@/shared/supabase/progress";

let timer: any;

export const syncEngine = {
  start(userId: string) {
    // اجرای فوری هنگام لاگین
    this.sync(userId);

    timer = setInterval(() => this.sync(userId), 15000);
  },

  async sync(userId: string) {
    console.log("[SYNC] started");

    // ===== 1. push review events =====

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

    // ===== 2. push user progress =====

    const deckKeys = Object.keys(storageClient.progress.getAll());

    for (const deckKey of deckKeys) {
      const deckProgress =
        storageClient.progress.getDeckProgress(deckKey);

      for (const cardId in deckProgress) {
        const progress = deckProgress[cardId];

        try {
          await Progress.save(
            deckKey,
            cardId,
            progress
          );
        } catch (e) {
          console.error(
            "[SYNC] progress push failed",
            e
          );
        }
      }
    }

    // ===== 3. pull server progress & merge =====

    try {
      const serverProgressRaw =
        await Progress.getAll();

      console.log(
        "[SYNC] SERVER PROGRESS",
        serverProgressRaw
      );

      for (const key in serverProgressRaw) {
        const [deckKey, cardId] =
          key.split("_");

        const serverCard =
          serverProgressRaw[key];

        const localProgress =
          storageClient.progress.getDeckProgress(
            deckKey
          )[cardId];

        const merged = {
          streak: Math.max(
            localProgress?.streak ?? 0,
            serverCard.streak ?? 0
          ),

          seen:
            localProgress?.seen ||
            serverCard.seen,

          mastered:
            localProgress?.mastered ||
            serverCard.mastered,
        };

        storageClient.progress.saveCardProgress(
          deckKey,
          cardId,
          merged
        );
      }

      console.log(
        "[SYNC] LOCAL PROGRESS AFTER MERGE",
        storageClient.progress.getAll()
      );
    } catch (e) {
      console.error(
        "[SYNC] pull failed",
        e
      );
    }
  },

  stop() {
    clearInterval(timer);
  },
};