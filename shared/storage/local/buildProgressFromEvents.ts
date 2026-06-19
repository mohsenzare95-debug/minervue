//shared\storage\local\buildProgressFromEvents.ts
import type { ReviewEvent } from "@/shared/types/review";
import type { AllProgress } from "@/shared/types/progress";

export function buildProgressFromEvents(events: ReviewEvent[]): AllProgress {
  const state: AllProgress = {};

  const sorted = [...events].sort((a, b) => {
    return a.timestamp - b.timestamp;
  });

  for (const e of sorted) {
    // ======================
    // RESET (TYPE-BASED)
    // ======================
    if (e.type === "RESET_DECK") {
      state[e.deckKey] = {};
      continue;
    }

    // ======================
    // RESET (RESULT-BASED)
    // ======================
    if (e.result === "Reset") {
      state[e.deckKey] = {};
      continue;
    }

    // ======================
    // ANSWER EVENT
    // ======================
    const { deckKey, cardId, timestamp, result } = e;

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

    // mark seen
    card.seen = true;

    // deterministic transition
    switch (result) {
      case "Correct":
        card.streak += 1;
        break;

      case "Wrong":
        card.streak = 0;
        break;

      case "Almost":
        card.streak = Math.max(0, card.streak - 1);
        break;
    }

    // derived state
    card.mastered = card.streak >= 3;

    // last write wins
    card.updatedAt = Math.max(card.updatedAt, timestamp);
  }

  return state;
}