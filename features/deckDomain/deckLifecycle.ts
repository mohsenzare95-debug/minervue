// features/deckDomain/deckLifecycle.ts

import { reviewRepository } from "@/shared/repository/reviewRepository";

export function resetDeckLifecycle(deckKey: string, userId: string) {
  if (!userId || !deckKey) {
    console.error("[RESET_DECK] Missing userId or deckKey", {
      userId,
      deckKey,
    });
    return;
  }

  // ======================
  // EVENT-SOURCED RESET
  // ======================
  reviewRepository.add(userId, deckKey, {
    cardId: "__deck__",
    result: "Reset" as any,
    timestamp: Date.now(),
  });

  // ======================
  // UI NOTIFICATION ONLY
  // ======================
  window.dispatchEvent(
    new CustomEvent("deck-reset", {
      detail: {
        deckKey,
        timestamp: Date.now(),
      },
    })
  );
}