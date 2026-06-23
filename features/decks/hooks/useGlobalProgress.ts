"use client";

import { useEffect, useState, useCallback } from "react";

import { clientState } from "@/shared/state/client/clientState";
import { computeScore } from "@/features/lib/globalprogressCore";
import { reviewLogStorage } from "@/shared/storage/local/reviewLogStorage";
import { buildProgressFromEvents } from "@/shared/storage/local/buildProgressFromEvents";

export function useGlobalProgress() {
  const state = clientState.useStore();

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [week, setWeek] = useState<boolean[]>([]);

  const [levelProgress, setLevelProgress] = useState({
    level: 1,
    from: 0,
    to: 150,
    progress: 0,
  });

  // ======================
  // LEVEL LOGIC
  // ======================
  const getScoreLevel = (score: number) => {
    if (score < 150) return 1;
    if (score < 500) return 2;
    return 3;
  };

  const getLevelProgress = (score: number) => {
    const level = getScoreLevel(score);

    const levelStart = level === 1 ? 0 : level === 2 ? 150 : 500;
    const levelEnd = level === 1 ? 150 : level === 2 ? 500 : 1000;

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
  };

  const computeWeek = (days: Set<string>) => {
    const today = new Date();
    const monday = new Date(today);

    const day = (today.getDay() + 6) % 7;
    monday.setDate(today.getDate() - day);

    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);

      return days.has(d.toDateString());
    });
  };

  // ======================
  // MAIN DERIVATION
  // ======================
  const load = useCallback(() => {
    const progress = state.progress || {};

    console.log("🧱 [BASELINE STATE]", state.progress);

    const allCards = Object.values(progress).flatMap((deck) =>
      Object.values(deck || {})
    );

    console.log("🃏 [ALL CARDS]", allCards);

    console.log(
      "🃏 [CARD STREAKS]",
      allCards.map((c: any) => ({
        cardId: c.cardId,
        streak: c.streak,
      }))
    );

    const scoreValue = computeScore(allCards as any);

    console.log("🎯 [SCORE CALC]", scoreValue);

    setScore(scoreValue);
    setLevelProgress(getLevelProgress(scoreValue));

    let streakSum = 0;
    const days = new Set<string>();

    for (const deck of Object.values(progress)) {
      for (const card of Object.values(deck || {})) {
        const c = card as any;

        streakSum += c?.streak ?? 0;

        if (c?.updatedAt) {
          days.add(new Date(c.updatedAt).toDateString());
        }
      }
    }

    setStreak(streakSum);
    setWeek(computeWeek(days));

    console.log("📊 [FINAL GLOBAL PROGRESS]", {
      score: scoreValue,
      streak: streakSum,
      week: Array.from(days),
    });
  }, [state.progress]);

  // ======================
  // REACTIVE TRIGGER
  // ======================
  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    console.log("📈 SCORE STATE UPDATED:", score);
  }, [score]);

  useEffect(() => {
    console.log("🔥 GLOBAL PROGRESS MOUNT");

    const logsByDeck = reviewLogStorage.getAll();
    const allLogs = Object.values(logsByDeck).flat();

    console.log("🔥 MANUAL RELOAD TRIGGER:", allLogs.length);

    const progress = buildProgressFromEvents(allLogs);

    console.log(
      "🔥 BUILD RESULT SIZE:",
      Object.keys(progress).length
    );
  }, []);

  // ======================
  // DEBUG STATE (TEMP ONLY)
  // ======================
  const debug = {
    rawProgress: state.progress,
    cards: Object.values(state.progress || {}).flatMap((deck) =>
      Object.values(deck || {})
    ),
    score,
  };

  // ======================
  // OUTPUT
  // ======================
  return {
    score,
    streak,
    week,
    scoreLevel: levelProgress.level,
    levelProgress,
    debug,
  };
}