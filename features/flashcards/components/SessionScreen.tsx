// features/flashcards/components/SessionScreen.tsx
"use client";

import { useAuthSession } from "@/features/auth/hooks/useAuthSession";
import AnswerControls from "./AnswerControls";
import SessionEnd from "./SessionFinished";
import CardView from "./CardView";
import DeckMastered from "./DeckMastered";
import { useSessionFlow } from "@/features/flashcards/hooks/useSessionFlow";

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

  // ======================
  // RESET / RESTART SESSION (UI-ONLY)
  // ======================
  const handleStartOver = () => {
    startNewSession();
  };

  // ======================
  // STATES
  // ======================

  if (sessionFinished) {
    return (
      <SessionEnd
        onNewSession={startNewSession}
        deckKey={deckKey}
        totalSeen={index + 1}
        totalCards={sessionCards.length}
      />
    );
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
            chooseAnswer={chooseAnswer}
            canNext={canNext}
            handleNext={handleNext}
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