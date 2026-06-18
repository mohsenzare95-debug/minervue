"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { selectCardsForSession } from "@/features/flashcards/lib/cardSelection";
import { storageClient } from "@/shared/storage/core/storageClient";
import { applyAnswerScore } from "@/features/flashcards/lib/scoreMath";
import { getDeckStatus } from "@/features/flashcards/lib/deckStatusRecognition";

import { outbox } from "@/shared/storage/local/outbox";
import { reviewLogStorage } from "@/shared/storage/local/reviewLogStorage";

import { Progress } from "@/shared/supabase/progress";
import { useAuthSession } from "@/features/auth/hooks/useAuthSession";

import { analytics } from "@/features/analytics/events";

import type { Card } from "@/shared/types/card";
import type { AnswerType } from "@/shared/types/review";

type SessionState = {
  index: number;
  cards: Card[];
  finished: boolean;
};

function buildSessionCards(cards: Card[], deckKey: string): Card[] {
  const progress = storageClient.progress.getDeckProgress(deckKey);
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
  // guards (CRITICAL)
  // ======================
  const sessionStartedRef = useRef(false);
  const sessionCompletedRef = useRef(false);
  const sessionAbandonedRef = useRef(false);

  const card = state.cards[state.index] ?? null;
  const canNext = selected !== null;
  const progress = storageClient.progress.getDeckProgress(deckKey);
  const allMastered = getDeckStatus(progress) === "MASTERED";

  function resetCardUI() {
    setShowAnswer(false);
    setSelected(null);
  }

  // ======================
  // SESSION START (SAFE)
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

      const timestamp = Date.now();

      const current = storageClient.progress.getDeckProgress(deckKey);
      const updated = applyAnswerScore(current, card.id, answer);

      storageClient.progress.saveCardProgress(
        deckKey,
        card.id,
        updated[card.id]
      );

      if (user?.id) {
        Progress.save(deckKey, card.id, updated[card.id]).catch((err) =>
          console.error("Failed to save progress:", err)
        );
      }

      reviewLogStorage.add(deckKey, {
        cardId: card.id,
        result: answer,
        timestamp,
      });

      if (userId) {
        outbox.add({
          user_id: userId,
          client_event_id: crypto.randomUUID(),
          type: "REVIEW_EVENT",
          payload: { deckKey, cardId: card.id, result: answer, timestamp },
        });
      }

      setSelected(answer);
      setShowAnswer(true);
    },
    [card, deckKey, userId, user]
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
  // SESSION COMPLETED (ROBUST)
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
  // ABANDONED (STRICT FIX)
  // ======================
  useEffect(() => {
    return () => {
      // already completed → NO abandon
      if (sessionCompletedRef.current) return;
      if (sessionAbandonedRef.current) return;

      const currentCard = state.cards[state.index];
      if (!currentCard) return;

      // if session already finished → NO abandon
      if (state.finished) return;

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