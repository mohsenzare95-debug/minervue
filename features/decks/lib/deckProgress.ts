import { reviewLogStorage } from "@/shared/storage/local/reviewLogStorage";

export type Deck = {
  key: string;
  cards: { id: string }[];
};

export function getDeckProgress(deck: Deck) {
  const logs = reviewLogStorage.get(deck.key);

  const total = deck.cards.length;

  // ======================
  // BUILD MEMORY FROM LOGS
  // ======================
  const memory: Record<string, any> = {};

  for (const log of logs) {
    if (!memory[log.cardId]) {
      memory[log.cardId] = {
        seen: true,
        streak: 0,
      };
    }

    // optional: streak logic placeholder (if you already set elsewhere)
    memory[log.cardId].streak += 1;
  }

  // ======================
  // KEEP YOUR ORIGINAL FORMULA (UNCHANGED)
  // ======================

  const sumStreak = deck.cards.reduce(
    (acc, c) => {
      return acc + (memory[c.id]?.streak ?? 0);
    },
    0
  );

  const max = total * 3;

  const percent = max > 0
    ? Math.round((sumStreak / max) * 100)
    : 0;

  return {
    total,
    percent,
    sumStreak,
  };
}