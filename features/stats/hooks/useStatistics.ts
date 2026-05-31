//features\stats\hooks\useStatistics.ts
"use client";

import { useMemo, useState } from "react";
import { storageClient } from "@/shared/storage/core/storageClient";
import { calculateScore } from "../lib/scoreMath";
import { progresscache } from "@/shared/storage/local/progresscache";
import {
  getDailyActivity,
  getDeckDistribution,
} from "../lib/statsMath";

export function useStatistics() {
  const [range, setRange] = useState<
    "day" | "week" | "month" | "year"
  >("month");

  // ======================
  // LOAD LOGS
  // ======================

  const logsByDeck = storageClient.reviewLog.getAll();
  const logs = Object.values(logsByDeck).flat();

    // ======================
  // STATS
  // ======================

  // یونیک کارت‌ها (seen unique)
  const seenCards = new Set(logs.map(l => l.cardId)).size;

  // progress (بدون memo)
  const allProgress = progresscache.getAll();

  const masteredCards = Object.values(allProgress)
    .flatMap(deck => Object.values(deck))
    .filter(card => card?.mastered === true).length;

  // score (بر اساس streak)
  const score = useMemo(() => {
    return calculateScore(allProgress);
  }, [allProgress]);

  // ======================
  // DAILY ACTIVITY
  // ======================

  const [monthOffset, setMonthOffset] = useState(0);

  const dailyActivity = useMemo(() => {
    return getDailyActivity(logs, monthOffset);
  }, [logs, monthOffset]);

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

  return {
    dailyActivity,
    distribution,

    seenCards,
    masteredCards,
    score,

    range,
    setRange,

    monthOffset,
    setMonthOffset,
    monthLabel,
  };
}