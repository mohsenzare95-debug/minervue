import type { Activitylog } from "@/shared/storage/core/storageClient";

export function rebuildProgress(events: Activitylog[]) {
  const state: any = {};

  for (const log of events) {
    const dk = log.deckKey;
    const cid = log.cardId;

    if (!state[dk]) state[dk] = {};

    if (!state[dk][cid]) {
      state[dk][cid] = {
        cardId: cid,
        streak: 0,
        seen: false,
        mastered: false,
        updatedAt: 0,
      };
    }

    const card = state[dk][cid];

    card.seen = true;

    if (log.result === "Correct") {
      card.streak += 1;
    } else {
      card.streak = 0;
    }

    if (card.streak >= 5) {
      card.mastered = true;
    } else {
      card.mastered = false;
    }

    card.updatedAt = log.timestamp;
  }

  return state;
}