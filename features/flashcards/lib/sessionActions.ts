import { selectCardsForSession } from "@/features/flashcards/lib/cardSelection";

import { reviewRepository } from "@/shared/repository/reviewRepository";
import { buildProgressFromEvents } from "@/shared/storage/projection/rebuildProgress";

import type { Card } from "@/shared/types/card";

export function resetAndStartSession(deckKey: string, cards: Card[]) {
  // ======================
  // EVENT SOURCE (NOT LOCAL STORAGE)
  // ======================
  const events = reviewRepository.get(deckKey);

  const progressMap = buildProgressFromEvents(events);

  const deckProgress = progressMap[deckKey] || {};

  return selectCardsForSession(cards, deckProgress);
}