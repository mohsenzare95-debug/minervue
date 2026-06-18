"use client";

import { useMemo, useState } from "react";
import { calculateScore } from "../lib/scoreMath";
import {
  getDailyActivity,
  getDeckDistribution,
  getDailyActivityScale,
} from "../lib/statsMath";

import { clientState } from "@/shared/state/client/clientState";

export function useStatistics() {
  const [range, setRange] = useState<"day" | "week" | "month" | "year">(
    "month"
  );

  const [monthOffset, setMonthOffset] = useState(0);

  // ======================
  // STATE
  // ======================
  const { progress, reviewLogs } = clientState.useStore();

  // ======================
  // LOGS (FLATTENED)
  // ======================
  const logs = useMemo(() => {
    return Object.values(reviewLogs).flat();
  }, [reviewLogs]);

  // ======================
  // BASIC STATS
  // ======================
  const seenCards = useMemo(() => {
    return new Set(logs.map((l) => l.cardId)).size;
  }, [logs]);

  const masteredCards = useMemo(() => {
    return Object.values(progress)
      .flatMap((deck) => Object.values(deck))
      .filter((card) => card?.mastered === true).length;
  }, [progress]);

  const score = useMemo(() => {
    return calculateScore(progress);
  }, [progress]);

  // ======================
  // DAILY ACTIVITY
  // ======================
  const dailyActivity = useMemo(() => {
    return getDailyActivity(logs, monthOffset);
  }, [logs, monthOffset]);

  const dailyActivityScale = useMemo(() => {
    return getDailyActivityScale(dailyActivity);
  }, [dailyActivity]);

  // ======================
  // LABEL
  // ======================
  const monthLabel = useMemo(() => {
    const now = new Date();

    const target = new Date(
      now.getFullYear(),
      now.getMonth() - monthOffset,
      1
    );

    return target.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  }, [monthOffset]);

  // ======================
  // DISTRIBUTION
  // ======================
  const distribution = useMemo(() => {
    return getDeckDistribution(logs, range);
  }, [logs, range]);

  // ======================
  // RETURN (CLEAN API SURFACE)
  // ======================
  return {
    // chart data
    dailyActivity,
    dailyActivityScale,

    // other stats
    distribution,
    seenCards,
    masteredCards,
    score,

    // UI state
    range,
    setRange,

    monthOffset,
    setMonthOffset,
    monthLabel,
  };
}