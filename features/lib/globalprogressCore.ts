// features/decks/lib/globalprogressCore.ts

export function computeScore(allCards: any[]) {
  return allCards.reduce((acc, c) => {
    return acc + (c.streak ?? 0);
  }, 0);
}