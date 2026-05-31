"use client";

import AnswerControls from "./AnswerControls";
import SessionEnd from "./SessionFinished";
import CardView from "./CardView";
import DeckMastered from "./DeckMastered";
import { useSessionFlow } from "@/features/flashcards/hooks/useSessionFlow";
import { resetDeckLifecycle } from "@/features/deckDomain/deckLifecycle";

// ======================
// TYPES
// ======================

type Props = {
  cards: any[];
  deckKey?: string;
};

// ======================
// COMPONENT
// ======================

export default function SessionScreen({
  cards,
  deckKey = "default",
}: Props) {
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
  });

  const handleStartOver = () => {
    resetDeckLifecycle(deckKey);
    startNewSession();
  };

  // ======================
  // END STATE
  // ======================

  if (allMastered) {
    return (
      <DeckMastered
        onReset={handleStartOver}
      />
    );
  }

  if (sessionFinished) {
    return (
      <SessionEnd
        onNewSession={startNewSession}
      />
    );
  }

  // ======================
  // EMPTY STATE
  // ======================

  if (!card) {
    return <div style={styles.loading}>Loading cards...</div>;
  }

  // ======================
  // MAIN UI
  // ======================

  return (
    <div style={styles.container}>
      {/* ======================
          COUNTER
      ====================== */}
      <div style={styles.counter}>
        Card {index + 1} / {sessionCards.length}
      </div>

      {/* ======================
          CARD VIEW (PURE UI)
      ====================== */}
      <div onClick={() => setShowAnswer(true)}>
        <CardView card={card} showAnswer={showAnswer} />
      </div>

      {/* ======================
          ANSWER CONTROLS
      ====================== */}
      {showAnswer && (
        <AnswerControls
          selected={selected}
          chooseAnswer={chooseAnswer}
          canNext={canNext}
          handleNext={handleNext}
        />
      )}
    </div>
  );
}

// ======================
// STYLES
// ======================

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: 16,
    maxWidth: 600,
    margin: "0 auto",
  },

  counter: {
    textAlign: "center",
    marginBottom: 16,
    color: "#666",
  },

  loading: {
    padding: 40,
    textAlign: "center",
    color: "#777",
  },
};