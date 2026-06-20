// shared/storage/local/buildProgressFromEvents.ts

import type { AppEvent } from "@/shared/types/events";
import type { AllProgress } from "@/shared/types/progress";

export function buildProgressFromEvents(events: AppEvent[]): AllProgress {
  const state: AllProgress = {};

  const clamp = (n: number) => Math.max(0, Math.min(3, n));

  const sorted = [...events].sort((a, b) => a.timestamp - b.timestamp);

  for (const e of sorted) {
    if (e.type === "RESET") {
      if (!state[e.deckKey]) {
        state[e.deckKey] = {};
      }

      // safer reset (not full wipe blindly)
      state[e.deckKey] = {};
      continue;
    }

    if (e.type === "REVIEW") {
      const { deckKey, cardId, timestamp, payload } = e;

      if (!state[deckKey]) state[deckKey] = {};

      if (!state[deckKey][cardId]) {
        state[deckKey][cardId] = {
          cardId,
          streak: 0,
          seen: false,
          mastered: false,
          updatedAt: 0,
          derivedFrom: "local",
        };
      }

      const card = state[deckKey][cardId];

      card.seen = true;

      switch (payload.result) {
        case "Correct":
          card.streak = clamp(card.streak + 1);
          break;

        case "Wrong":
          card.streak = 0;
          break;

        case "Almost":
          card.streak = clamp(card.streak - 1);
          break;
      }

      card.mastered = card.streak >= 3;
      card.updatedAt = Math.max(card.updatedAt, timestamp);
    }
  }

  return state;
}