// features\flashcards\hooks\useSessionFlow.ts
"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthSession } from "@/features/auth/hooks/useAuthSession";
import { reviewRepository } from "@/shared/repository/reviewRepository";
import { clientState } from "@/shared/state/client/clientState";
import { selectCardsForSession } from "../lib/cardSelection";
import type { Card } from "@/shared/types/card";
import type { AnswerType } from "@/shared/types/events";
import { analytics } from "@/features/analytics/events";

let debugCounter = 0;

type SessionState = {
  index: number;
  cards: Card[];
  finished: boolean;
};

function buildSessionCards(
  cards: Card[],
  deckKey: string
) {
  const progress = clientState.selectors.getDeckProgress(deckKey);
  return selectCardsForSession(
    cards,
    progress
  );
}

export function useSessionFlow({
  deckKey,
  cards,
}: {
  deckKey: string;
  cards: Card[];
}) {
  const { user, loading } = useAuthSession();
  
  // ======================
  // 🔍 DEBUG: HOOK INIT
  // ======================
  console.log("🚀 useSessionFlow INIT", {
    deckKey,
    cardsCount: cards?.length,
  });

  const [state, setState] = useState<SessionState>(() => {
    console.log("🧠 useState INIT SESSION", {
      cardsCount: cards?.length,
    });
    return {
      index: 0,
      cards: buildSessionCards(cards, deckKey),
      finished: false,
    };
  });

  console.log("SESSION SIZE", state.cards.length);

  const [showAnswer, setShowAnswer] = useState(false);
  const [selected, setSelected] = useState<AnswerType | null>(null);
  
  const sessionStartedRef = useRef(false);
  const sessionCompletedRef = useRef(false);
  const sessionAbandonedRef = useRef(false);

  const card = state.cards[state.index] ?? null;
  const canNext = selected !== null;

  function resetCardUI() {
    setShowAnswer(false);
    setSelected(null);
  }

  // ======================
  // 🔍 SESSION START DEBUG
  // ======================
  useEffect(() => {
    console.log("📦 SESSION STATE UPDATE", {
      index: state.index,
      totalCards: state.cards.length,
      finished: state.finished,
      currentCardId: state.cards[state.index]?.id,
    });
    if (sessionStartedRef.current) return;
    if (!deckKey) return;
    if (!state.cards?.length) return;
    console.log("🟢 SESSION STARTED");
    sessionStartedRef.current = true;
  }, [deckKey, state.cards.length, state.index, state.finished]);

  // Card Viewed Analytics
  useEffect(() => {
    if (!card) return;

    analytics.cardViewed();
  }, [card]);

  // ======================
  // ANSWER (فقط UI)
  // ======================
  const chooseAnswer = useCallback(
    (answer: AnswerType) => {
      console.log("🎯 UI SELECT (NO EVENT)", {
        cardId: card?.id,
        answer,
      });

      setSelected(answer);
      setShowAnswer(true);
    },
    [card?.id]
  );

  // ======================
  // NEXT CARD (Commit Event)
  // ======================
  const handleNext = useCallback(() => {
    if (!selected || !card?.id || !user?.id || !deckKey) {
      console.warn("⚠️ handleNext blocked - missing data", {
        hasSelected: !!selected,
        hasCardId: !!card?.id,
        hasUserId: !!user?.id,
        hasDeckKey: !!deckKey,
      });
      return;
    }

    // ==================== DEBUG REVIEW ADD ====================
    debugCounter++;
    console.log(`🔵 REVIEW #${debugCounter}`, {
      cardId: card.id,
      result: selected,
    });
    console.trace(`🔵 REVIEW ADD ${card.id}`);

    console.log("🔥 COMMIT ANSWER ON NEXT", {
      cardId: card.id,
      answer: selected,
    });

    reviewRepository.add(user.id, deckKey, {
      cardId: card.id,
      result: selected,
      timestamp: Date.now(),
    });

    // حرکت به کارت بعدی
    setState((prev) => {
      const nextIndex = prev.index + 1;
      const finished = nextIndex >= prev.cards.length;

      console.log("📊 STATE TRANSITION", {
        prevIndex: prev.index,
        nextIndex,
        finished,
      });

      return {
        ...prev,
        index: finished ? prev.index : nextIndex,
        finished,
      };
    });

    resetCardUI();
  }, [selected, card?.id, user?.id, deckKey]);

  // ======================
  // SESSION COMPLETED
  // ======================
  useEffect(() => {
    if (!state.finished) return;
    if (sessionCompletedRef.current) return;
    console.log("🏁 SESSION COMPLETED");
    sessionCompletedRef.current = true;
  }, [state.finished]);

  // ======================
  // ABANDONED
  // ======================
  useEffect(() => {
    return () => {
      if (sessionCompletedRef.current) return;
      if (sessionAbandonedRef.current) return;
      if (state.finished) return;

      const currentCard = state.cards[state.index];
      const snapshot = {
        userId: user?.id ?? null,
        deckKey: deckKey ?? null,
        cardId: currentCard?.id ?? null,
      };
      console.trace("⚠️ SESSION ABANDON CHECK", snapshot);
      if (!snapshot.userId || !snapshot.deckKey || !snapshot.cardId) return;
      sessionAbandonedRef.current = true;
    };
  }, [deckKey, state.index, state.cards, state.finished, user?.id]);

  // ======================
  // RESTART
  // ======================
  const startNewSession = useCallback(() => {
    console.log("🔄 SESSION RESTARTED");
    sessionStartedRef.current = false;
    sessionCompletedRef.current = false;
    sessionAbandonedRef.current = false;
    setState({
      index: 0,
      cards: buildSessionCards(cards, deckKey),
      finished: false,
    });
    resetCardUI();
  }, [cards, deckKey]);

  return {
    index: state.index,
    card,
    sessionCards: state.cards,
    showAnswer,
    setShowAnswer,
    selected,
    canNext,
    chooseAnswer,
    handleNext,
    sessionFinished: state.finished,
    startNewSession,
  };
}