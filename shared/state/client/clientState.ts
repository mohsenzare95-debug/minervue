// shared/state/client/clientState.ts
"use client";

import { useSyncExternalStore } from "react";

type State = {
  syncStatus: "idle" | "syncing" | "error";
  lastSyncAt?: number;
};

let state: State = {
  syncStatus: "idle",
  lastSyncAt: undefined,
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

  useStore() {
    return useSyncExternalStore(
      this.subscribe,
      this.getSnapshot,
      this.getSnapshot
    );
  },
};