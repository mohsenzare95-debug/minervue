//shared\repository\reviewRepository.ts
import { outbox } from "@/shared/storage/local/outbox";
import { reviewLogStorage } from "@/shared/storage/local/reviewLogStorage";
import type { AnswerType, AppEvent } from "@/shared/types/events";

export const reviewRepository = {
  // ======================
  // READ
  // ======================

  get(deckKey: string) {
    return reviewLogStorage.get(deckKey);
  },

  getAll() {
    return reviewLogStorage.getAll();
  },

  // ======================
  // WRITE REVIEW
  // ======================

  add(
    userId: string,
    deckKey: string,
    payload: {
      cardId: string;
      result: AnswerType;
      timestamp: number;
    }
  ) {
    const id = crypto.randomUUID();

    const event: AppEvent = {
      id,
      type: "REVIEW",
      userId,
      deckKey,
      cardId: payload.cardId,
      timestamp: payload.timestamp,
      payload: {
        result: payload.result,
      },
    };

    // 1. local log (cache / rebuild source)
    reviewLogStorage.add(event);

    // 2. sync queue
    outbox.add(event);
  },

  // ======================
  // WRITE RESET (PER CARD MODEL)
  // ======================

  reset(
    userId: string,
    deckKey: string,
    cardId: string
  ) {
    const id = crypto.randomUUID();

    const event: AppEvent = {
      id,
      type: "RESET",
      userId,
      deckKey,
      cardId,
      timestamp: Date.now(),
      payload: {
        reason: "user_action",
      },
    };

    // 1. local log
    reviewLogStorage.add(event);

    // 2. sync queue
    outbox.add(event);
  },
};