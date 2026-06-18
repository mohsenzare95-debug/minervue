import { syncEngine } from "./syncEngine";

let userId: string | null = null;
let timer: any = null;

const DEBOUNCE_MS = 1500; // 1.5s debounce window

// ======================
// INIT USER CONTEXT
// ======================

export function initSyncScheduler(id: string) {
  userId = id;
}

// ======================
// REQUEST SYNC (DEBOUNCED)
// ======================

export function requestSync() {
  if (!userId) return;

  // reset previous scheduled sync
  if (timer) {
    clearTimeout(timer);
  }

  // schedule new sync
  timer = setTimeout(() => {
    syncEngine.sync(userId!);
    timer = null;
  }, DEBOUNCE_MS);
}