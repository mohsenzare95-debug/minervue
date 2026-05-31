import { resetDeckLifecycle } from "@/features/deckDomain/deckLifecycle";
import { selectCardsForSession } from "@/features/flashcards/lib/cardSelection";
import type { Card } from "@/shared/types/card";
import { storageClient } from "@/shared/storage/core/storageClient";

export function resetAndStartSession(deckKey: string, cards: Card[]) {
  resetDeckLifecycle(deckKey);

  const progress = storageClient.progress.getDeckProgress(deckKey);

  return selectCardsForSession(cards, progress);
}