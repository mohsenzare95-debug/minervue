// features/stats/hooks/useStatistics.ts
"use client";

import { useEffect, useMemo, useState } from "react";

import {
  getDailyActivity,
  getDeckDistribution,
  getDailyActivityScale,
  getSeenCards,
} from "../lib/statsMath";

import { storageClient } from "@/shared/storage/core/storageClient";
import { buildProgressFromEvents } from "@/shared/storage/local/buildProgressFromEvents";
import { computeScore } from "@/features/decks/lib/globalprogressMath";

type ReviewEvent = {
  user_id: string | null;
  client_event_id: string;
  deck_key: string;
  card_id: string;
  result: "Correct" | "Wrong" | "Almost";
  timestamp: number;
  seq: number;
};

export function useStatistics() {
  const [range, setRange] = useState<"day" | "week" | "month" | "year">(
    "month"
  );

  const [monthOffset, setMonthOffset] = useState(0);

  const [events, setEvents] = useState<ReviewEvent[]>([]);

  // ======================
  // LOAD FROM LOCAL STORAGE (SOURCE OF TRUTH)
  // ======================
  useEffect(() => {
    const load = () => {
      const local = storageClient.reviewLog.getAll();

      const logs: ReviewEvent[] = Object.values(local)
        .flat()
        .map((e: any) => ({
          user_id: e.userId ?? null,
          client_event_id: e.id,
          deck_key: e.deckKey,
          card_id: e.cardId,
          result: e.payload?.result,
          timestamp: e.timestamp,
          seq: 0,
        }));

      setEvents(logs);
    };

    load();
  }, []);

  // ======================
  // DERIVED LOGS (UI FORMAT)
  // ======================
  const logs = useMemo(() => {
    return events.map((e) => ({
      userId: e.user_id,
      clientEventId: e.client_event_id,
      deckKey: e.deck_key,
      cardId: e.card_id,
      timestamp: e.timestamp,
      result: e.result,
      seq: e.seq,
    }));
  }, [events]);

  // ======================
  // BUILD PROGRESS FROM EVENTS (NEW ARCHITECTURE)
  // ======================
  const progressFromEvents = useMemo(() => {
    const grouped = storageClient.reviewLog.getAll();
    const allLogs = Object.values(grouped).flat();

    return buildProgressFromEvents(allLogs);
  }, [events]);

  const allCards = useMemo(() => {
    return Object.values(progressFromEvents)
      .flatMap((deck: any) => Object.values(deck || {}));
  }, [progressFromEvents]);

  // ======================
  // SCORE (FIXED)
  // ======================
  const score = useMemo(() => {
    return computeScore(allCards as any);
  }, [allCards]);

  // ======================
  // SEEN CARDS
  // ======================
  const seenCards = useMemo(() => {
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - monthOffset,
      1
    ).getTime();

    const endOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - monthOffset + 1,
      0
    ).getTime();

    return getSeenCards(logs, startOfMonth, endOfMonth);
  }, [logs, monthOffset]);

  // ======================
  // MASTERED CARDS (still from progress logic)
  // ======================
  const masteredCards = useMemo(() => {
    let count = 0;

    for (const deck of Object.values(progressFromEvents)) {
      for (const card of Object.values(deck as any)) {
        if ((card as any)?.mastered) count++;
      }
    }

    return count;
  }, [progressFromEvents]);

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
  // MONTH LABEL
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

  return {
    dailyActivity,
    dailyActivityScale,
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