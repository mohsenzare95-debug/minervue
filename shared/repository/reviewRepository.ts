// shared/repository/reviewRepository.ts

import { outbox } from "@/shared/storage/local/outbox";
import { reviewLogStorage } from "@/shared/storage/local/reviewLogStorage";

import type { AnswerType } from "@/shared/types/review";

export const reviewRepository = {
  get(deckKey: string) {
    return reviewLogStorage.get(deckKey);
  },

  getAll() {
    return reviewLogStorage.getAll();
  },

  add(
    userId: string | null,
    deckKey: string,
    payload: {
      cardId: string;
      result: AnswerType;
      timestamp: number;
    }
  ) {
    // 1. ALWAYS local write (UI source of truth)
    reviewLogStorage.add(deckKey, payload);

    // 2. server sync only if logged in
    if (!userId) return;

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

  reset(userId: string | null, deckKey: string) {
    reviewLogStorage.reset?.(deckKey);

    if (!userId) return;

    outbox.add({
      user_id: userId,
      client_event_id: crypto.randomUUID(),
      type: "RESET_DECK_EVENT",
      payload: {
        deckKey,
        timestamp: Date.now(),
      },
    });
  },
};