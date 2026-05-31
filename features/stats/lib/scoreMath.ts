//features\stats\lib\scoreMath.ts
import type { AllProgress } from "@/shared/types/progress";

export function calculateScore(allProgress: AllProgress): number {
  let score = 0;

  for (const deck of Object.values(allProgress)) {
    for (const card of Object.values(deck)) {
      score += card.streak || 0;
    }
  }

  return score;
}