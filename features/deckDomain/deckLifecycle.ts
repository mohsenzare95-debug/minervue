// features/deckDomain/deckLifecycle.ts

import { reviewRepository } from "@/shared/repository/reviewRepository";

export function resetDeckLifecycle(
  deckKey: string,
  userId: string | null
) {
  console.log("🔥 resetDeckLifecycle CALLED", {
    deckKey,
    userId,
  });

  console.log("🚨 reviewRepository.reset ENTERED");

  reviewRepository.reset(
    userId,
    deckKey,
    "__deck__"
  );

  window.dispatchEvent(
    new CustomEvent("deck-reset", {
      detail: {
        deckKey,
      },
    })
  );
}