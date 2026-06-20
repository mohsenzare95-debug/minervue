//features\flashcards\hooks\useSessionFlow.ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { selectCardsForSession } from "@/features/flashcards/lib/cardSelection";
import { getDeckStatus } from "@/features/flashcards/lib/deckStatusRecognition";

import { useAuthSession } from "@/features/auth/hooks/useAuthSession";
import { analytics } from "@/features/analytics/events";

import { reviewRepository } from "@/shared/repository/reviewRepository";

import type { Card } from "@/shared/types/card";
import type { AnswerType } from "@/shared/types/events";

type SessionState = {
  index: number;
  cards: Card[];
  finished: boolean;
};

function buildSessionCards(cards: Card[]) {
  return cards;
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
    cards: buildSessionCards(cards),
    finished: false,
  }));

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
  // SESSION START
  // ======================
  useEffect(() => {
    if (sessionStartedRef.current) return;
    if (!state.cards.length) return;

    sessionStartedRef.current = true;
    analytics.sessionStarted(deckKey, state.cards.length);
  }, [deckKey, state.cards.length]);

  // ======================
  // ANSWER (EVENT ONLY WRITE)
  // ======================
  const chooseAnswer = useCallback(
    (answer: AnswerType) => {
      if (!card) return;

      const timestamp = Date.now();

      // ALWAYS write locally + optional sync
      reviewRepository.add(user?.id ?? null, deckKey, {
        cardId: card.id,
        result: answer,
        timestamp,
      });

      setSelected(answer);
      setShowAnswer(true);
    },
    [card, deckKey, user?.id]
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

    setState({
      index: 0,
      cards: buildSessionCards(cards),
      finished: false,
    });

    resetCardUI();
  }, [cards]);

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