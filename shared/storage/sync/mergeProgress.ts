import type { AllProgress } from "@/shared/types/progress";

export function mergeProgress(local, server) {
  const result = { ...local };

  for (const deckKey in server) {
    if (!result[deckKey]) {
      result[deckKey] = {};
    }

    for (const cardId in server[deckKey]) {
      const localCard = result[deckKey][cardId];
      const serverCard = server[deckKey][cardId];

      // 🔥 CORE RULE: last write wins by timestamp
      if (
        !localCard ||
        serverCard.updatedAt > localCard.updatedAt
      ) {
        result[deckKey][cardId] = serverCard;
      }
    }
  }

  return result;
}