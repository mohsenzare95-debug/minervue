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
  // SERVER REPLACE (FULL RECONCILIATION)
  // ======================

  replaceFromServer(events: AppEvent[]) {
    const grouped: Record<string, AppEvent[]> = {};

    // 1. group server events by deck
    for (const e of events) {
      if (!grouped[e.deckKey]) {
        grouped[e.deckKey] = [];
      }
      grouped[e.deckKey].push(e);
    }

    // 2. load local snapshot
    const local = getAll();

    // 3. merge per deck with FULL REBUILD
    for (const deckKey of Object.keys(grouped)) {
      const serverDeckEvents = grouped[deckKey] ?? [];
      const localDeckEvents = local[deckKey] ?? [];

      // 4. combine
      const combined = [...localDeckEvents, ...serverDeckEvents];

      // 5. deduplicate by event.id
      const map = new Map<string, AppEvent>();

      for (const e of combined) {
        map.set(e.id, e);
      }

      // 6. rebuild ordered stream
      const merged = Array.from(map.values()).sort(
        (a, b) => a.timestamp - b.timestamp
      );

      local[deckKey] = merged;
    }

    // 7. write snapshot
    saveAll(local);
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