"use client";

import { useSyncExternalStore } from "react";

type State = {
  progress: any;
  syncStatus: "idle" | "syncing" | "error";
  lastSyncAt?: number;
};

let state: State = {
  progress: {},
  syncStatus: "idle",
};

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export const clientState = {
  getSnapshot() {
    return state;
  },

  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },

  setState(next: Partial<State>) {
    state = {
      ...state,
      ...next,
    };
    emit();
  },

  // ======================
  // HYDRATE FROM LOCAL STORAGE
  // ======================
  hydrate() {
    if (typeof window === "undefined") return;

    const progress = JSON.parse(
      localStorage.getItem("progress_v2") || "{}"
    );

    state = {
      ...state,
      progress,
    };

    emit();
  },

  useStore() {
    return useSyncExternalStore(
      this.subscribe,
      this.getSnapshot,
      this.getSnapshot
    );
  },
};