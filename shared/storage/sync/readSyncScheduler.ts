//shared\storage\sync\readSyncScheduler.ts
import { fetchReviewEvents } from "./fetchReviewEvents";
import { reviewLogStorage } from "@/shared/storage/local/reviewLogStorage";
import { buildProgressFromEvents } from "@/shared/storage/local/buildProgressFromEvents";
import { clientState } from "@/shared/state/client/clientState";

let userId: string | null = null;
let timer: any = null;

export function initReadSyncScheduler(id: string) {
  userId = id;
}

export function requestReadSync(id?: string) {
  const uid = id || userId;
  if (!uid) return;

  if (timer) clearTimeout(timer);

  timer = setTimeout(async () => {
    try {
      clientState.setState({ syncStatus: "syncing" });

      // 1. fetch server events
      const serverEvents = await fetchReviewEvents(uid);

      // 2. replace local event store
      reviewLogStorage.replaceFromServer(serverEvents);

      // 3. rebuild projection
      const events = reviewLogStorage.getStream();
      const progress = buildProgressFromEvents(events);

      // 4. hydrate UI
      clientState.setState({
        ...progress,
        syncStatus: "idle",
        lastSyncAt: Date.now(),
      });

    } catch (e) {
      console.error("[READ SYNC ERROR]", e);
      clientState.setState({ syncStatus: "error" });
    }
  }, 1200);
}