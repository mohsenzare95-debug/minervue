// features/lib/globalprogressCore.ts

///Score Caluculation///
export function computeScore(allCards: any[]) {
  return allCards.reduce((acc, c) => {
    return acc + (c.streak ?? 0);
  }, 0);
}

///Day Streak///
export function computeDayStreak(allCards: any[]) {
  const days = new Set<string>();

  for (const c of allCards) {
    if (c?.updatedAt) {
      const d = new Date(c.updatedAt).toDateString();
      days.add(d);
    }
  }

  // تبدیل به آرایه مرتب
  const sorted = Array.from(days)
    .map(d => new Date(d))
    .sort((a, b) => a.getTime() - b.getTime());

  if (sorted.length === 0) return 0;

  let streak = 1;

  for (let i = sorted.length - 1; i > 0; i--) {
    const diff =
      (sorted[i].getTime() - sorted[i - 1].getTime()) /
      (1000 * 60 * 60 * 24);

    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}