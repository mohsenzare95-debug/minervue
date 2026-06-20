// shared/storage/local/reviewLogStorage.ts

import type { AppEvent } from "@/shared/types/events";

const KEY = "review_logs_v3";

// ======================
// INTERNAL HELPERS
// ======================

function getAll(): Record<string, AppEvent[]> {
  if (typeof window === "undefined") return {};

  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function saveAll(data: Record<string, AppEvent[]>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(data));
}

// ======================
// EVENT STORE (SINGLE SOURCE)
// ======================

export const reviewLogStorage = {
  getAll(): Record<string, AppEvent[]> {
    return getAll();
  },

  getStream(): AppEvent[] {
    return Object.values(getAll()).flat();
  },

  get(deckKey: string): AppEvent[] {
    return getAll()[deckKey] || [];
  },

  // ======================
  // WRITE EVENT (ONLY PATH)
  // ======================

  add(event: AppEvent) {
    const all = getAll();

    if (!all[event.deckKey]) {
      all[event.deckKey] = [];
    }

    const exists = all[event.deckKey].some((e) => e.id === event.id);
    if (exists) return;

    all[event.deckKey].push(event);
    saveAll(all);
  },

  // ======================
  // SERVER REPLACE (MERGE SAFE)
  // ======================

  replaceFromServer(events: AppEvent[]) {
    const all = getAll();

    for (const e of events) {
      if (!all[e.deckKey]) {
        all[e.deckKey] = [];
      }

      const exists = all[e.deckKey].some((x) => x.id === e.id);
      if (!exists) {
        all[e.deckKey].push(e);
      }
    }

    saveAll(all);
  },

  clear(deckKey: string) {
    const all = getAll();
    delete all[deckKey];
    saveAll(all);
  },

  clearAll() {
    saveAll({});
  },
};