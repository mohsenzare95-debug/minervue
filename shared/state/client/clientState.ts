"use client";
import { useSyncExternalStore } from "react";
import { storageClient } from "@/shared/storage/core/storageClient";

type State = {
  progress: any;
  reviewLogs: any;
};

let state: State = {
  progress: {},
  reviewLogs: {},
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

  setProgress(next: any) {
    state = { ...state, progress: next };
    emit();
  },

  setReviewLogs(next: any) {
    state = { ...state, reviewLogs: next };
    emit();
  },

  hydrateFromStorage() {
    state = {
      progress: storageClient.progress.getAll(),
      reviewLogs: storageClient.reviewLog.getAll(),
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