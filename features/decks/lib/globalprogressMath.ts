//features/decks/lib/globalprogressMath.ts

import type { CardProgress } from "@/shared/types/progress";
import type { Activitylog } from "@/shared/storage/local/reviewLogStorage";

// ======================
// SCORE
// ======================

export function computeScore(allCards: CardProgress[]): number {
  return allCards.reduce((acc, c) => {
    return acc + (c.streak ?? 0);
  }, 0);
}

// ======================
// SCORE LEVEL
// ======================

export function getScoreLevel(score: number): number {
  if (score < 150) return 1;
  if (score < 500) return 2;
  return 3;
}

// ======================
// LEVEL PROGRESS (NEW ONLY)
// ======================

export function getLevelProgress(score: number) {
  const level = getScoreLevel(score);

  const levelStart =
    level === 1 ? 0 :
    level === 2 ? 150 :
    500;

  const levelEnd =
    level === 1 ? 150 :
    level === 2 ? 500 :
    1000;

  const progress =
    levelEnd === levelStart
      ? 1
      : (score - levelStart) / (levelEnd - levelStart);

  return {
    level,
    from: levelStart,
    to: levelEnd,
    progress: Math.max(0, Math.min(progress, 1)),
  };
}
// ======================
// EXTRACT DAYS (FROM LOGS)
// ======================

export function extractActivityDaysFromLogs(
  logs: Activitylog[]
): Set<string> {
  const days = new Set<string>();

  for (const l of logs) {
    const date = new Date(l.timestamp);
    days.add(date.toDateString());
  }

  return days;
}

// ======================
// STREAK
// ======================

export function computeStreak(days: Set<string>): number {
  let streak = 0;
  const d = new Date();

  while (days.has(d.toDateString())) {
    streak++;
    d.setDate(d.getDate() - 1);
  }

  return streak;
}

// ======================
// WEEK MAP
// ======================

export function computeWeek(days: Set<string>): boolean[] {
  const today = new Date();
  const monday = new Date(today);

  const day = (today.getDay() + 6) % 7;
  monday.setDate(today.getDate() - day);

  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);

    return days.has(d.toDateString());
  });
}