"use client";

import { useCallback } from "react";
import { storageClient } from "@/shared/storage/core/storageClient";
import { resetDeckLifecycle } from "@/features/deckDomain/deckLifecycle";

export function useDeckProgress() {

  // ======================
  // ONLY DECK PROGRESS
  // ======================
  const getDeckProgress = useCallback((deck: any) => {

    const memory =
      storageClient.progress.getDeckProgress(deck.key);

    const total = deck.cards.length;

    // ======================
    // SUM OF STREAKS
    // ======================
    const sumStreak = deck.cards.reduce(
      (acc: number, c: any) => {
        return acc + (memory[c.id]?.streak ?? 0);
      },
      0
    );

    // ======================
    // MAX POSSIBLE STREAK
    // ======================
    const max = total * 3;

    // ======================
    // FINAL PERCENT
    // ======================
    const percent = max > 0
      ? Math.round((sumStreak / max) * 100)
      : 0;

    return {
      total,
      percent,
      sumStreak,
    };

  }, []);

  // ======================
  // RESET DECK
  // ======================
  const resetDeck = useCallback((deckKey: string) => {
    resetDeckLifecycle(deckKey);
  }, []);

  return {
    getDeckProgress,
    resetDeck,
  };
}