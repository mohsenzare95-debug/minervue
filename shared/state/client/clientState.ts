// shared/state/client/clientState.ts

"use client";

import { useSyncExternalStore } from "react";
import type { AllProgress } from "@/shared/types/progress";
import type { AppEvent } from "@/shared/types/events";

const PROGRESS_CACHE_KEY = "progress_cache_v1";

type SyncStatus = "idle" | "syncing" | "error";

type State = {
  syncStatus: SyncStatus;
  lastSyncAt?: number;

  // 🔥 CORE DATA LAYER
  progress: AllProgress;
};

function loadProgress(): AllProgress {
  if (typeof window === "undefined") return {};

  try {
    return JSON.parse(
      localStorage.getItem(PROGRESS_CACHE_KEY) || "{}"
    );
  } catch {
    return {};
  }
}

let state: State = {
  syncStatus: "idle",
  lastSyncAt: undefined,
  progress: loadProgress(),
};

const listeners = new Set<() => void>();

function emit() {
  console.log("📣 EMIT FIRED");
  listeners.forEach((l) => l());
}

// ======================
// STORE
// ======================
export const clientState = {
  // ----------------------
  // SNAPSHOT
  // ----------------------
  getSnapshot(): State {
    return state;
  },

  // ----------------------
  // SUBSCRIBE (REACTIVE CORE)
  // ----------------------
  subscribe(fn: () => void) {
    listeners.add(fn);

    return () => {
      listeners.delete(fn);
    };
  },

  // ----------------------
  // STATE UPDATE (IMMUTABLE ENFORCED)
  // ----------------------
  setState(next: Partial<State>) {
    console.log("📥 [SET STATE INPUT]", next);

    console.trace("🚨 SET STATE CALLED FROM");

    console.log("📥 [SET STATE INPUT]", {
      hasProgress: !!next.progress,
      decks: next.progress
        ? Object.keys(next.progress).length
        : 0,
      cards: next.progress
        ? Object.values(next.progress).reduce(
            (acc, deck) => acc + Object.keys(deck || {}).length,
            0
          )
        : 0,
    });

    const prev = state;

    state = {
      ...state,
      ...next,
      progress: next.progress
        ? Object.freeze(structuredClone(next.progress))
        : Object.freeze(structuredClone(state.progress)),
    };

    // Persist progress to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(
        PROGRESS_CACHE_KEY,
        JSON.stringify(state.progress)
      );
    }

    console.log("📤 [SET STATE OUTPUT]", {
      decks: Object.keys(state.progress || {}).length,
      cards: Object.values(state.progress || {}).reduce(
        (acc, deck) => acc + Object.keys(deck || {}).length,
        0
      ),
    });

    console.log("🧬 [STATE DIFF CHECK]");
    console.log("PREV.progress ref:", prev.progress);
    console.log("NEXT.progress ref:", state.progress);
    console.log("SAME REF?", prev.progress === state.progress);

    emit();
  },

  // ----------------------
  // LOCAL PROGRESS PATCH
  // ----------------------
  applyReviewEvent(event: AppEvent) {
    const progress = structuredClone(state.progress);

    if (!progress[event.deckKey]) {
      progress[event.deckKey] = {};
    }

    if (!progress[event.deckKey][event.cardId]) {
      progress[event.deckKey][event.cardId] = {
        cardId: event.cardId,
        streak: 0,
        seen: false,
        mastered: false,
        updatedAt: 0,
        derivedFrom: "local",
      };
    }

    const card = progress[event.deckKey][event.cardId];

    card.seen = true;

    switch (event.payload.result) {
      case "Correct":
        card.streak = Math.min(3, card.streak + 1);
        break;

      case "Wrong":
        card.streak = 0;
        break;

      case "Almost":
        card.streak = Math.max(0, card.streak - 1);
        break;
    }

    card.mastered = card.streak >= 3;
    card.updatedAt = event.timestamp;

    state = {
      ...state,
      progress,
    };

    // Persist progress to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(
        PROGRESS_CACHE_KEY,
        JSON.stringify(progress)
      );
    }

    emit();
  },

  // ======================
  // REACT HOOK
  // ======================
  useStore() {
    return useSyncExternalStore(
      this.subscribe,
      this.getSnapshot,
      this.getSnapshot
    );
  },

  // ======================
  // SELECTORS (IMPORTANT)
  // ======================
  selectors: {
    getDeckProgress(deckKey: string) {
      return state.progress?.[deckKey] || {};
    },

    getAllProgress() {
      return state.progress;
    },

    getSyncStatus() {
      return state.syncStatus;
    },
  },
};