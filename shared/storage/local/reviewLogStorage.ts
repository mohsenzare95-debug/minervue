// shared/storage/local/reviewLogStorage.ts
// TOTAL ACTIVITY / STATS RESOURCE

import { clientState } from "@/shared/state/client/clientState";

export type Activitylog = {
  deckKey: string;
  cardId: string;
  timestamp: number;
  result: "Correct" | "Wrong" | "Almost";
};

const KEY = "review_logs";

// ======================
// INTERNAL HELPERS
// ======================

function getAll(): Record<string, Activitylog[]> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function saveAll(data: Record<string, Activitylog[]>) {
  if (typeof window === "undefined") return;

  localStorage.setItem(KEY, JSON.stringify(data));
}

// ======================
// STORAGE API
// ======================

export const reviewLogStorage = {
  // ======================
  // GET ALL
  // ======================
  getAll() {
    return getAll();
  },

  // ======================
  // GET SINGLE DECK
  // ======================
  get(deckKey: string): Activitylog[] {
    return getAll()[deckKey] || [];
  },

  // ======================
  // ADD EVENT
  // ======================
  add(deckKey: string, event: Omit<Activitylog, "deckKey">) {
    const all = getAll();

    if (!all[deckKey]) {
      all[deckKey] = [];
    }

    all[deckKey].push({
      deckKey,
      ...event,
    });

    saveAll(all);

    // 🔥 IMPORTANT: sync reactive state
    clientState.setReviewLogs(all);
  },

  // ======================
  // CLEAR DECK
  // ======================
  clear(deckKey: string) {
    const all = getAll();

    delete all[deckKey];

    saveAll(all);

    // 🔥 sync UI
    clientState.setReviewLogs(all);
  },

  // ======================
  // CLEAR ALL
  // ======================
  clearAll() {
    const empty: Record<string, Activitylog[]> = {};

    saveAll(empty);

    // 🔥 sync UI
    clientState.setReviewLogs(empty);
  },
};