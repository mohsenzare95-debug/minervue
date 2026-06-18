import type { Activitylog } from "@/shared/storage/local/reviewLogStorage";

export function rebuildProgress(logs: Activitylog[]) {
  const result: Record<string, any> = {};

  for (const log of logs) {
    const { deckKey, cardId, result: res } = log;

    if (!result[deckKey]) {
      result[deckKey] = {};
    }

    if (!result[deckKey][cardId]) {
      result[deckKey][cardId] = {
        cardId,
        streak: 0,
        seen: false,
        mastered: false,
        updatedAt: 0,
      };
    }

    const card = result[deckKey][cardId];

    card.seen = true;

    if (res === "Correct") {
      card.streak += 1;
    } else {
      card.streak = 0;
    }

    if (card.streak >= 5) {
      card.mastered = true;
    }

    card.updatedAt = log.timestamp;
  }

  return result;
}