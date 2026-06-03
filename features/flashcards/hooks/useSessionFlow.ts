// features/flashcards/hooks/useSessionFlow.ts
"use client";

import { useCallback, useState } from "react";

import { selectCardsForSession } from "@/features/flashcards/lib/cardSelection";
import { storageClient } from "@/shared/storage/core/storageClient";
import { applyAnswerScore } from "@/features/flashcards/lib/scoreMath";
import { getDeckStatus } from "@/features/flashcards/lib/deckStatusRecognition";

import { outbox } from "@/shared/storage/local/outbox";
import { reviewLogStorage } from "@/shared/storage/local/reviewLogStorage";

import type { Card } from "@/shared/types/card";
import type { AnswerType } from "@/shared/types/review";

type SessionState = {
  index: number;
  cards: Card[];
  finished: boolean;
};

function buildSessionCards(
  cards: Card[],
  deckKey: string
): Card[] {
  const progress =
    storageClient.progress.getDeckProgress(deckKey);

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
  const [state, setState] = useState<SessionState>(() => ({
    index: 0,
    cards: buildSessionCards(cards, deckKey),
    finished: false,
  }));

  const [showAnswer, setShowAnswer] = useState(false);
  const [selected, setSelected] =
    useState<AnswerType | null>(null);

  function resetCardUI() {
    setShowAnswer(false);
    setSelected(null);
  }

  const card = state.cards[state.index] ?? null;

  const canNext = selected !== null;

  const progress =
    storageClient.progress.getDeckProgress(deckKey);

  const allMastered =
    getDeckStatus(progress) === "MASTERED";

  const chooseAnswer = useCallback(
    async (answer: AnswerType) => {
      if (!card) return;

      const timestamp = Date.now();

      // 1. update progress state
      const current =
        storageClient.progress.getDeckProgress(
          deckKey
        );

      const updated = applyAnswerScore(
        current,
        card.id,
        answer
      );

      storageClient.progress.saveCardProgress(
        deckKey,
        card.id,
        updated[card.id]
      );

      // 2. analytics log
      reviewLogStorage.add(deckKey, {
        cardId: card.id,
        result: answer,
        timestamp,
      });

      // 3. outbox event
      if (userId) {
        outbox.add({
          user_id: userId,
          client_event_id: crypto.randomUUID(),

          type: "REVIEW_EVENT",

          payload: {
            deckKey,
            cardId: card.id,
            result: answer,
            timestamp,
          },
        });
      }

      // 4. UI update
      setSelected(answer);
      setShowAnswer(true);
    },
    [card, deckKey, userId]
  );

  const handleNext = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.index + 1;
      const finished =
        nextIndex >= prev.cards.length;

      return {
        ...prev,
        index: finished
          ? prev.index
          : nextIndex,
        finished,
      };
    });

    resetCardUI();
  }, []);

  const startNewSession = useCallback(() => {
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
    allMastered,

    startNewSession,
  };
}