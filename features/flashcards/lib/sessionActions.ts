//features\flashcards\lib\sessionActions.ts
import { selectCardsForSession } from "@/features/flashcards/lib/cardSelection";

import { storageClient } from "@/shared/storage/core/storageClient";
import { buildProgressFromEvents } from "@/shared/storage/local/buildProgressFromEvents";

import type { Card } from "@/shared/types/card";

export function resetAndStartSession(deckKey: string, cards: Card[]) {
  // ======================
  // EVENT SOURCE (NOT LOCAL STORAGE)
  // ======================
  const events = storageClient.reviewLog.get(deckKey);

  const progressMap = buildProgressFromEvents(events);

  const deckProgress = progressMap[deckKey] || {};

  return selectCardsForSession(cards, deckProgress);
}