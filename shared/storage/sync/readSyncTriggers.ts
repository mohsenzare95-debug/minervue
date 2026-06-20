import { requestReadSync } from "./readSyncScheduler";

export function initReadSyncTriggers(userId: string) {
  if (typeof window === "undefined") return;

  // tab focus
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      requestReadSync(userId);
    }
  });

  // reconnect
  window.addEventListener("online", () => {
    requestReadSync(userId);
  });

  // periodic light sync
  setInterval(() => {
    requestReadSync(userId);
  }, 30000);
}