"use client";

import { useCallback } from "react";
import { buildProgressFromEvents } from "@/shared/storage/local/buildProgressFromEvents";
import { reviewRepository } from "@/shared/repository/reviewRepository";
import { resetDeckLifecycle } from "@/features/deckDomain/deckLifecycle";

export function useDeckProgress() {
  // ======================
  // DERIVED DECK PROGRESS (FROM EVENTS)
  // ======================

  const getDeckProgress = useCallback((deck: any) => {
    const events = reviewRepository.get(deck.key);

    const progressMap = buildProgressFromEvents(events);

    const deckProgress = progressMap[deck.key] || {};

    const total = deck.cards.length;

    const sumStreak = deck.cards.reduce((acc: number, c: any) => {
      return acc + (deckProgress[c.id]?.streak ?? 0);
    }, 0);

    const max = total * 3;

    const percent = max > 0 ? Math.round((sumStreak / max) * 100) : 0;

    return {
      total,
      percent,
      sumStreak,
    };
  }, []);

  // ======================
  // RESET DECK
  // ======================

  const resetDeck = useCallback((deckKey: string, userId: string) => {
    resetDeckLifecycle(deckKey, userId);
  }, []);

  return {
    getDeckProgress,
    resetDeck,
  };
}