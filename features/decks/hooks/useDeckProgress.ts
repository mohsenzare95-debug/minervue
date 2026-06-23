"use client";

import { useCallback, useEffect, useRef } from "react";
import { clientState } from "@/shared/state/client/clientState";

export function useDeckProgress() {
  // 🔥 reactive global state
  const state = clientState.useStore();

  const prevRef = useRef<any>(null);

  useEffect(() => {
    console.log("📊 [STATE CHANGE DETECTED]", {
      prev: prevRef.current,
      next: state,
    });

    prevRef.current = state;
  }, [state]);

  useEffect(() => {
    console.log("🔁 [UI RE-RENDER]");
  }, [state]);

  /**
   * SINGLE SOURCE OF TRUTH:
   * derived directly from clientState.progress
   */
  const getDeckProgress = useCallback(
    (deck: { key: string; cards: { id: string }[] }) => {
      const deckProgress = state.progress?.[deck.key] || {};

      const total = deck.cards.length;

      if (total === 0) {
        return {
          total: 0,
          percent: 0,
          sumStreak: 0,
        };
      }

      let sumStreak = 0;

      for (const card of deck.cards) {
        sumStreak += deckProgress[card.id]?.streak ?? 0;
      }

      const max = total * 3;

      const percent = max > 0 ? Math.round((sumStreak / max) * 100) : 0;

      return {
        total,
        percent,
        sumStreak,
      };
    },
    [state.progress]
  );

  /**
   * Reset deck lifecycle (server + local sync)
   */
  const resetDeck = useCallback(
    (deckKey: string) => {
      const userId = (state as any)?.user?.id ?? null;

      if (!deckKey) return;

      import("@/features/deckDomain/deckLifecycle").then(
        ({ resetDeckLifecycle }) => {
          resetDeckLifecycle(deckKey, userId);
        }
      );
    },
    [state]
  );

  return {
    getDeckProgress,
    resetDeck,
  };
}