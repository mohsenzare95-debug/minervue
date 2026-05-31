"use client";

import { useEffect, useState, useCallback } from "react";

import { storageClient } from "@/shared/storage/core/storageClient";
import type { CardProgress } from "@/shared/types/progress";

import { reviewLogStorage } from "@/shared/storage/local/reviewLogStorage";

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
    const allDecks = storageClient.progress.getAll();

    const allCards = Object.values(allDecks)
      .flatMap((deck) => Object.values(deck || {})) as CardProgress[];

    const scoreValue = computeScore(allCards as any);

    setScore(scoreValue);

    // 🔥 مهم: مستقیم از scoreValue استفاده کن (نه state)
    const lp = getLevelProgress(scoreValue);

    console.log("LP DEBUG:", lp);

    setLevelProgress(lp);

    const logsByDeck = reviewLogStorage.getAll();
    const allLogs = Object.values(logsByDeck).flat();

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