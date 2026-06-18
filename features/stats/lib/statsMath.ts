import type { Activitylog } from "@/shared/storage/core/storageClient";
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
// STEP 1 — NORMALIZE TIMESTAMP (UTC SAFE)
// ======================

function toUTCDate(ts: number) {
  const d = new Date(ts);
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
}

// ======================
// DAILY ACTIVITY (month-based timeline)
// ======================

export function getDailyActivity(
  logs: Activitylog[],
  monthOffset = 0
) {
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

  for (const log of logs) {
    const d = new Date(log.timestamp);

    if (d.getFullYear() === year && d.getMonth() === month) {
      result[d.getDate() - 1].value += 1;
    }
  }

  return result;
}

// ======================
// DAILY ACTIVITY SCALE (FIXED)
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
// DECK DISTRIBUTION (SAFE VERSION)
// ======================

export function getDeckDistribution(
  logs: Activitylog[],
  range: Range
) {
  const filtered = filterLogsByRange(logs, range);

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
// SEEN CARDS (EVENT-BASED)
// ======================

export function getSeenCards(
  logs: any[],
  fromTs: number,
  toTs: number
) {
  const set = new Set();

  for (const log of logs) {
    if (log.timestamp >= fromTs && log.timestamp <= toTs) {
      set.add(log.cardId);
    }
  }

  return set.size;
}