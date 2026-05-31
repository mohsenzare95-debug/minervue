import type { Activitylog } from "@/shared/storage/core/storageClient";

export type Range = "day" | "week" | "month" | "year";

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function startOfWeek(d: Date) {
  const x = new Date(d);
  const day = x.getDay(); // Sunday = 0
  x.setDate(x.getDate() - day);
  x.setHours(0, 0, 0, 0);
  return x;
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function startOfYear(d: Date) {
  return new Date(d.getFullYear(), 0, 1);
}

export function getRangeStart(range: Range, now = new Date()) {
  switch (range) {
    case "day":
      return startOfDay(now);
    case "week":
      return startOfWeek(now);
    case "month":
      return startOfMonth(now);
    case "year":
      return startOfYear(now);
  }
}

export function filterLogsByRange(
  logs: Activitylog[],
  range: Range
) {
  const now = new Date();
  const start = getRangeStart(range, now).getTime();

  return logs.filter(l => l.timestamp >= start);
}