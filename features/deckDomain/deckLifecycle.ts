//features\deckDomain\deckLifecycle.ts
import { storageClient } from "@/shared/storage/core/storageClient";

/// ======================
/// RESET LIFECYCLE (SINGLE SOURCE OF TRUTH)
/// ======================

export function resetDeckLifecycle(deckKey: string) {
  // ======================
  // 1. RESET PROGRESS STATE (MUTABLE)
  // ======================
  storageClient.progress.resetDeck(deckKey);

  // ======================
  // 2. OPTIONAL: FUTURE HOOKS (DO NOT TOUCH REVIEW LOG)
  // ======================
  // review log preserved intentionally

  // ======================
  // 3. SYNC EVENT
  // ======================
  window.dispatchEvent(new Event("deck-reset"));
}