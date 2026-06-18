import { storageClient } from "@/shared/storage/core/storageClient";
import { outbox } from "@/shared/storage/local/outbox";

export const progressRepository = {
  getAll() {
    return storageClient.progress.getAll();
  },

  getDeck(deckKey: string) {
    return storageClient.progress.getDeckProgress(deckKey);
  },

  getCard(deckKey: string, cardId: string) {
    return storageClient.progress.getCardProgress(deckKey, cardId);
  },

  updateCard(
    userId: string,
    deckKey: string,
    cardId: string,
    progress: {
      streak: number;
      seen: boolean;
      mastered: boolean;
    }
  ) {
    // 1. local write
    storageClient.progress.saveCardProgress(deckKey, cardId, progress);

    // 2. enqueue sync event (offline-first)
    outbox.add({
      user_id: userId,
      client_event_id: crypto.randomUUID(),
      type: "PROGRESS_UPDATE",
      payload: {
        deckKey,
        cardId,
        ...progress,
        timestamp: Date.now(),
      },
    });
  },
};