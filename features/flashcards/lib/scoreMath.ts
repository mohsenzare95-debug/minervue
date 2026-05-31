//features\flashcards\lib\cardMemoryEngine.ts
import type { AnswerType } from "@/shared/types/review";

export type CardMemory = {
  streak: number;
  seen: boolean;
  mastered: boolean;
};

export type DeckMemory = Record<string, CardMemory>;

export function applyAnswerScore(
  memory: DeckMemory,
  cardId: string,
  answer: AnswerType
): DeckMemory {
  const current = memory[cardId] ?? {
    streak: 0,
    seen: false,
    mastered: false,
  };

  let streak = current.streak;

  if (answer === "Correct") streak += 1;
  if (answer === "Almost") streak -= 1;
  if (answer === "Wrong") streak = 0;

  streak = Math.max(0, Math.min(3, streak));

  return {
    ...memory,
    [cardId]: {
      streak,
      seen: true,
      mastered: streak >= 3,
    },
  };
}