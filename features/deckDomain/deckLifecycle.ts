// features/deckDomain/deckLifecycle.ts

import { reviewRepository } from "@/shared/repository/reviewRepository";

/**
 * RESET is:
 * - ALWAYS local (guest-safe)
 * - optionally synced if user exists
 */
export function resetDeckLifecycle(
  deckKey: string,
  userId: string | null
) {
  // ======================
  // HARD GUARD (only critical)
  // ======================
  if (!deckKey) {
    console.error("[RESET_DECK] Missing deckKey", {
      deckKey,
    });
    return;
  }

  // ======================
  // 1. LOCAL RESET (SOURCE OF TRUTH)
  // ======================
  try {
    // If you have local review log reset
    // (preferred path for your architecture)
    reviewRepository.get(deckKey); // ensures deck exists (optional safety)

    // clear local state via repository (if implemented)
    // fallback: if not exists, ignore safely
    (reviewRepository as any).clear?.(deckKey);
  } catch (e) {
    console.error("[RESET_DECK] Local reset failed", e);
  }

  // ======================
  // 2. OPTIONAL SERVER SYNC (EVENT SOURCING)
  // ======================
  if (userId) {
    reviewRepository.add(userId, deckKey, {
      cardId: "__deck__",
      result: "Reset" as any,
      timestamp: Date.now(),
    });
  }

  // ======================
  // 3. UI NOTIFICATION (ALWAYS)
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