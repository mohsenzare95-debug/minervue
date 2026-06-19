//shared\storage\sync\syncTriggers.ts
import { requestSync, initSyncScheduler } from "./syncScheduler";

let userId: string | null = null;

// ======================
// INIT TRIGGERS
// ======================

export function initSyncTriggers(id: string) {
  userId = id;

  // initialize scheduler context
  initSyncScheduler(id);

  // ======================
  // TAB VISIBILITY TRIGGER
  // ======================
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      requestSync();
    }
  });

  // ======================
  // NETWORK RECOVERY TRIGGER
  // ======================
  window.addEventListener("online", () => {
    requestSync();
  });
}