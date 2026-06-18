"use client";

import { useEffect, useMemo, useState } from "react";
import { calculateScore } from "../lib/scoreMath";
import {
  getDailyActivity,
  getDeckDistribution,
  getDailyActivityScale,
  getSeenCards,
} from "../lib/statsMath";

import { clientState } from "@/shared/state/client/clientState";
import { supabase } from "@/shared/supabase/client";

type ReviewEvent = {
  user_id: string;
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

  const { progress } = clientState.useStore();

  const [events, setEvents] = useState<ReviewEvent[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("review_events")
        .select(
          "user_id, client_event_id, deck_key, card_id, result, timestamp, seq"
        )
        .order("seq", { ascending: true });

      if (error) {
        console.error("review_events fetch error:", error);
        return;
      }

      setEvents((data ?? []) as ReviewEvent[]);
    };

    load();
  }, []);

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

  const seenCards = useMemo(() => {
    const now = Date.now();
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

  const masteredCards = useMemo(() => {
    let count = 0;

    for (const deck of Object.values(progress)) {
      for (const card of Object.values(deck as any)) {
        if ((card as any)?.mastered) count++;
      }
    }

    return count;
  }, [progress]);

  const score = useMemo(() => {
    return calculateScore(progress ?? {});
  }, [progress]);

  const dailyActivity = useMemo(() => {
    return getDailyActivity(logs, monthOffset);
  }, [logs, monthOffset]);

  const dailyActivityScale = useMemo(() => {
    return getDailyActivityScale(dailyActivity);
  }, [dailyActivity]);

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