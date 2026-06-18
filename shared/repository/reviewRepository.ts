import { reviewLogStorage } from "@/shared/storage/local/reviewLogStorage";
import { outbox } from "@/shared/storage/local/outbox";

export const reviewRepository = {
  getAll() {
    return reviewLogStorage.getAll();
  },

  get(deckKey: string) {
    return reviewLogStorage.get(deckKey);
  },

  add(
    userId: string,
    deckKey: string,
    payload: {
      cardId: string;
      result: "Correct" | "Wrong" | "Almost";
      timestamp: number;
    }
  ) {
    reviewLogStorage.add(deckKey, payload);

    outbox.add({
      user_id: userId,
      client_event_id: crypto.randomUUID(),
      type: "REVIEW_EVENT",
      payload: {
        deckKey,
        ...payload,
      },
    });
  },
};