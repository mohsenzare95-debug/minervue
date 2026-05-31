// features/flashcards/lib/deckStatusRecognition.ts

// ======================
// TYPES
// ======================

export type DeckStatus =
  | "ACTIVE"
  | "MASTERED";

type CardProgress = {
  streak?: number;
  seen?: boolean;
};

type ProgressMap = Record<string, CardProgress>;

// ======================
// HELPERS
// ======================

function isMastered(
  card: CardProgress
) {
  return (card.streak ?? 0) >= 3;
}

// ======================
// DECK STATUS
// ======================

export function getDeckStatus(
  progress: ProgressMap
): DeckStatus {
  const cards =
    Object.values(progress);

  if (cards.length === 0) {
    return "ACTIVE";
  }

  const allMastered =
    cards.every(isMastered);

  return allMastered
    ? "MASTERED"
    : "ACTIVE";
}