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
// DAILY ACTIVITY SCALE (WITH SMART PADDING)
// ======================

export function getDailyActivityScale(
  data: { value: number }[]
) {
  const values = data
    .map(d => d.value)
    .filter(v => typeof v === "number" && !isNaN(v));

  const maxValue = Math.max(...values, 1);

  // padding خیلی قوی‌تر + حداقل فاصله ثابت
  let paddedMax = Math.ceil(maxValue * 1.35);     // 35% فضا
  paddedMax = Math.max(paddedMax, maxValue + 5); // حداقل ۵ واحد فاصله

  const normalize = (v: number) => {
    return paddedMax === 0 ? 0 : v / paddedMax;
  };

  const ticks = [1, 0.75, 0.5, 0.25].map(r =>
    Math.round(paddedMax * r)
  );

  return {
    maxScale: paddedMax,
    ticks,
    normalize,
  };
}
// ======================
// DECK DISTRIBUTION (unchanged)
// ======================

export function getDeckDistribution(
  logs: Activitylog[],
  range: Range
) {
  const filtered = filterLogsByRange(logs, range);

  const map: Record<string, number> = {};

  for (const log of filtered) {
    const deck = log.deckKey || "etc";
    map[deck] = (map[deck] || 0) + 1;
  }

  return Object.entries(map).map(([name, value]) => ({
    name,
    value,
  }));
}