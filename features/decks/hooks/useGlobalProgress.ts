// features/decks/hooks/useGlobalProgress.ts

"use client";

import { useEffect, useState, useCallback } from "react";

import { storageClient } from "@/shared/storage/core/storageClient";
import type { CardProgress } from "@/shared/types/progress";

import { reviewLogStorage } from "@/shared/storage/local/reviewLogStorage";

import {
  computeScore,
  getScoreLevel,
  getScoreDots,
  computeStreak,
  computeWeek,
  extractActivityDaysFromLogs,
} from "@/features/decks/lib/globalprogressMath";

export function useGlobalProgress() {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [week, setWeek] = useState<boolean[]>([]);

  const load = useCallback(() => {
    // ======================
    // LOAD FROM PROGRESS CACHE
    // ======================

    const allDecks = storageClient.progress.getAll();

    // ======================
    // FLATTEN TO CardProgress[]
    // ======================

    const allCards = Object.values(allDecks)
      .flatMap((deck) => Object.values(deck || {})) as CardProgress[];

    // ======================
    // SCORE
    // ======================

    const scoreValue = computeScore(allCards as any);
    setScore(scoreValue);

    // ======================
    // LOG SOURCE (FIX)
    // ======================

    const logsByDeck = reviewLogStorage.getAll();
    const allLogs = Object.values(logsByDeck).flat();

    const days = extractActivityDaysFromLogs(allLogs);

    // ======================
    // STREAK
    // ======================

    setStreak(computeStreak(days));

    // ======================
    // WEEK
    // ======================

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
    scoreLevel: getScoreLevel(score),
    scoreDots: getScoreDots(getScoreLevel(score)),
  };
}