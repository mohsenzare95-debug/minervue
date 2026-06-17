"use client";

import { useEffect, useRef } from "react";
import { useAuthSession } from "@/features/auth/hooks/useAuthSession";
import AnswerControls from "./AnswerControls";
import SessionEnd from "./SessionFinished";
import CardView from "./CardView";
import DeckMastered from "./DeckMastered";
import { useSessionFlow } from "@/features/flashcards/hooks/useSessionFlow";
import { resetDeckLifecycle } from "@/features/deckDomain/deckLifecycle";

import { analytics } from "@/features/analytics/events";

type Props = {
  cards: any[];
  deckKey?: string;
};

export default function SessionScreen({
  cards,
  deckKey = "default",
}: Props) {
  const { user } = useAuthSession();

  const {
    index,
    showAnswer,
    setShowAnswer,

    selected,
    canNext,

    card,
    sessionCards,

    chooseAnswer,
    handleNext,

    sessionFinished,
    allMastered,

    startNewSession,
  } = useSessionFlow({
    cards,
    deckKey,
    userId: user?.id,
  });

  const hasStarted = useRef(false);
  const lastCardId = useRef<string | null>(null);

  const lastStateRef = useRef({
    index: 0,
    cardId: null as string | null,
  });

  const handleStartOver = () => {
    resetDeckLifecycle(deckKey);
    startNewSession();
  };

  // ======================
  // SESSION START
  // ======================
  useEffect(() => {
    if (!card || hasStarted.current) return;

    hasStarted.current = true;

    analytics.sessionStarted(deckKey, sessionCards.length);
  }, [card, deckKey, sessionCards.length]);

  // ======================
  // CARD VIEW
  // ======================
  useEffect(() => {
    if (!card) return;
    if (lastCardId.current === card.id) return;

    lastCardId.current = card.id;

    analytics.cardViewed(deckKey, card.id, index);
  }, [card, deckKey, index]);

  // ======================
  // SESSION END
  // ======================
  useEffect(() => {
    if (!sessionFinished) return;

    analytics.sessionCompleted(
      deckKey,
      index + 1,
      sessionCards.length
    );
  }, [sessionFinished, deckKey, index, sessionCards.length]);

  // ======================
  // SESSION ABANDONED (IMPORTANT)
  // ======================
  useEffect(() => {
    return () => {
      // اگر session تموم نشده و کاربر خارج شد
      if (!sessionFinished && card) {
        analytics.sessionAbandoned(
          deckKey,
          index,
          card.id
        );
      }
    };
  }, [sessionFinished, deckKey, index, card]);

  // ======================
  // STATES
  // ======================
  if (sessionFinished) {
    return <SessionEnd onNewSession={startNewSession} />;
  }

  if (allMastered) {
    return <DeckMastered onReset={handleStartOver} />;
  }

  if (!card) {
    return <div>Loading cards...</div>;
  }

  // ======================
  // UI
  // ======================
  return (
    <div style={styles.page}>
      <div style={styles.counter}>
        Card {index + 1} / {sessionCards.length}
      </div>

      <div
        style={styles.cardContainer}
        onClick={() => setShowAnswer(true)}
      >
        <CardView card={card} showAnswer={showAnswer} />
      </div>

      {showAnswer && (
        <div style={styles.controls}>
          <AnswerControls
            selected={selected}
            chooseAnswer={(answer) => {
              analytics.cardAnswered(deckKey, card.id, answer);
              chooseAnswer(answer);
            }}
            canNext={canNext}
            handleNext={() => {
              analytics.cardNext(deckKey, card.id);
              handleNext();
            }}
          />
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  cardContainer: {
    width: "100%",
  },

  controls: {
    width: "100%",
  },

  counter: {
    textAlign: "center",
    marginBottom: 8,
    color: "#666",
  },
};