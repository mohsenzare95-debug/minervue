"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { selectCardsForSession } from "@/features/flashcards/lib/cardSelection";
import { applyAnswerScore } from "@/features/flashcards/lib/scoreMath";
import { getDeckStatus } from "@/features/flashcards/lib/deckStatusRecognition";

import { Progress } from "@/shared/supabase/progress";
import { useAuthSession } from "@/features/auth/hooks/useAuthSession";
import { analytics } from "@/features/analytics/events";

import { progressRepository } from "@/shared/repository/progressRepository";
import { reviewRepository } from "@/shared/repository/reviewRepository";

import type { Card } from "@/shared/types/card";
import type { AnswerType } from "@/shared/types/review";

type SessionState = {
  index: number;
  cards: Card[];
  finished: boolean;
};

function buildSessionCards(cards: Card[], deckKey: string): Card[] {
  // ⚠️ still uses storageClient directly (acceptable if no repository exists for read-only here)
  const progress = progressRepository.getDeck(deckKey);
  return selectCardsForSession(cards, progress);
}

export function useSessionFlow({
  deckKey,
  cards,
  userId,
}: {
  deckKey: string;
  cards: Card[];
  userId: string | null;
}) {
  const { user } = useAuthSession();

  const [state, setState] = useState<SessionState>(() => ({
    index: 0,
    cards: buildSessionCards(cards, deckKey),
    finished: false,
  }));

  const [showAnswer, setShowAnswer] = useState(false);
  const [selected, setSelected] = useState<AnswerType | null>(null);

  // ======================
  // guards
  // ======================
  const sessionStartedRef = useRef(false);
  const sessionCompletedRef = useRef(false);
  const sessionAbandonedRef = useRef(false);

  const card = state.cards[state.index] ?? null;
  const canNext = selected !== null;

  const progress = progressRepository.getDeck(deckKey);
  const allMastered = getDeckStatus(progress) === "MASTERED";

  function resetCardUI() {
    setShowAnswer(false);
    setSelected(null);
  }

  // ======================
  // SESSION START
  // ======================
  useEffect(() => {
    if (sessionStartedRef.current) return;
    if (!state.cards.length) return;

    sessionStartedRef.current = true;

    analytics.sessionStarted(deckKey, state.cards.length);
  }, [deckKey, state.cards.length]);

  // ======================
  // ANSWER
  // ======================
  const chooseAnswer = useCallback(
    (answer: AnswerType) => {
      if (!card) return;
      if (!user?.id) return;

      const timestamp = Date.now();

      const current = progressRepository.getDeck(deckKey);
      const updated = applyAnswerScore(current, card.id, answer);

      const nextProgress = updated[card.id];

      // ✅ replaced direct storageClient + outbox
      progressRepository.updateCard(user.id, deckKey, card.id, nextProgress);

      reviewRepository.add(user.id, deckKey, {
        cardId: card.id,
        result: answer,
        timestamp,
      });

      setSelected(answer);
      setShowAnswer(true);
    },
    [card, deckKey, user]
  );

  // ======================
  // NEXT CARD
  // ======================
  const handleNext = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.index + 1;
      const finished = nextIndex >= prev.cards.length;

      return {
        ...prev,
        index: finished ? prev.index : nextIndex,
        finished,
      };
    });

    resetCardUI();
  }, []);

  // ======================
  // SESSION COMPLETED
  // ======================
  useEffect(() => {
    if (!state.finished) return;
    if (sessionCompletedRef.current) return;

    sessionCompletedRef.current = true;

    analytics.sessionCompleted(
      deckKey,
      state.cards.length,
      state.cards.length
    );
  }, [state.finished, deckKey, state.cards.length]);

  // ======================
  // ABANDONED
  // ======================
  useEffect(() => {
    return () => {
      if (sessionCompletedRef.current) return;
      if (sessionAbandonedRef.current) return;
      if (state.finished) return;

      const currentCard = state.cards[state.index];
      if (!currentCard) return;

      sessionAbandonedRef.current = true;

      analytics.sessionAbandoned(deckKey, state.index, currentCard.id);
    };
  }, [deckKey, state.index, state.cards, state.finished]);

  // ======================
  // RESTART
  // ======================
  const startNewSession = useCallback(() => {
    sessionStartedRef.current = false;
    sessionCompletedRef.current = false;
    sessionAbandonedRef.current = false;

    const newCards = buildSessionCards(cards, deckKey);

    setState({
      index: 0,
      cards: newCards,
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
    allMastered,

    startNewSession,
  };
}