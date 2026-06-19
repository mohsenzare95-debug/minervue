//features\decks\hooks\useGlobalProgress.ts
"use client";

import { useEffect, useState, useCallback } from "react";

import { reviewLogStorage } from "@/shared/storage/local/reviewLogStorage";
import { buildProgressFromEvents } from "@/shared/storage/local/buildProgressFromEvents";

import {
  computeScore,
  getLevelProgress,
  computeStreak,
  computeWeek,
  extractActivityDaysFromLogs,
} from "@/features/decks/lib/globalprogressMath";

export function useGlobalProgress() {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [week, setWeek] = useState<boolean[]>([]);

  const [levelProgress, setLevelProgress] = useState({
    level: 1,
    from: 0,
    to: 150,
    progress: 0,
  });

  const load = useCallback(() => {
    // ======================
    // SOURCE OF TRUTH (EVENTS)
    // ======================
    const logsByDeck = reviewLogStorage.getAll();
    const allLogs = Object.values(logsByDeck).flat();

    // ======================
    // DERIVE PROGRESS FROM EVENTS
    // ======================
    const progress = buildProgressFromEvents(allLogs);

    const allCards = Object.values(progress)
      .flatMap((deck) => Object.values(deck || {}));

    // ======================
    // SCORE
    // ======================
    const scoreValue = computeScore(allCards as any);
    setScore(scoreValue);

    const lp = getLevelProgress(scoreValue);
    setLevelProgress(lp);

    // ======================
    // ACTIVITY (from logs)
    // ======================
    const days = extractActivityDaysFromLogs(allLogs);

    setStreak(computeStreak(days));
    setWeek(computeWeek(days));
  }, []);

  useEffect(() => {
    load();

    window.addEventListener("progress-update", load);
    window.addEventListener("focus", load);

    return () => {
      window.removeEventListener("progress-update", load);
      window.removeEventListener("focus", load);
    };
  }, [load]);

  return {
    score,
    streak,
    week,
    scoreLevel: levelProgress.level,
    levelProgress,
  };
}