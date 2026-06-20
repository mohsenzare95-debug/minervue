// features/stats/lib/statsMath.ts

import type { AppEvent } from "@/shared/types/events";
import { filterLogsByRange } from "./timeRanges";

// ======================
// CONSTANTS
// ======================

const RANGE_DAYS = {
  day: 1,
  week: 7,
  month: 30,
  year: 365,
} as const;

type Range = keyof typeof RANGE_DAYS;

// ======================
// INTERNAL NORMALIZER
// ======================

function toStatsEvent(e: AppEvent) {
  return {
    timestamp: e.timestamp,
    deckKey: e.deckKey,
    cardId: e.cardId,
  };
}

// ======================
// DAILY ACTIVITY (month-based timeline)
// ======================

export function getDailyActivity(
  logs: AppEvent[],
  monthOffset = 0
) {
  const events = logs.map(toStatsEvent);

  const today = new Date();

  const target = new Date(
    today.getFullYear(),
    today.getMonth() - monthOffset,
    1
  );

  const year = target.getFullYear();
  const month = target.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const result = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    value: 0,
  }));

  for (const log of events) {
    const d = new Date(log.timestamp);

    if (d.getFullYear() === year && d.getMonth() === month) {
      result[d.getDate() - 1].value += 1;
    }
  }

  return result;
}

// ======================
// DAILY ACTIVITY SCALE
// ======================

export function getDailyActivityScale(data: { value: number }[]) {
  const values = data.map(d => d.value);

  const maxValue = Math.max(...values, 1);

  const paddedMax =
    maxValue <= 5
      ? maxValue + 2
      : Math.ceil(maxValue * 1.2);

  const ticks = [1, 0.75, 0.5, 0.25].map(r =>
    Math.round(paddedMax * r)
  );

  return {
    maxScale: paddedMax,
    ticks,
    normalize: (v: number) =>
      paddedMax === 0 ? 0 : Math.min(1, v / paddedMax),
  };
}

// ======================
// DECK DISTRIBUTION
// ======================

export function getDeckDistribution(
  logs: AppEvent[],
  range: Range
) {
  const events = logs.map(toStatsEvent);

  const filtered = filterLogsByRange(events as any, range);

  const map: Record<string, number> = Object.create(null);

  for (const log of filtered) {
    if (!log.deckKey) continue;

    map[log.deckKey] = (map[log.deckKey] || 0) + 1;
  }

  return Object.entries(map).map(([name, value]) => ({
    name,
    value,
  }));
}

// ======================
// SEEN CARDS
// ======================

export function getSeenCards(
  logs: AppEvent[],
  fromTs: number,
  toTs: number
) {
  const events = logs.map(toStatsEvent);

  const set = new Set<string>();

  for (const log of events) {
    if (log.timestamp >= fromTs && log.timestamp <= toTs) {
      set.add(log.cardId);
    }
  }

  return set.size;
}