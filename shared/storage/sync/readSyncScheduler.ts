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

      console.log("[SYNC] serverEvents raw:", serverEvents);
      console.log("[SYNC] serverEvents length:", serverEvents?.length);

      // 2. LOCAL snapshot
      const localEvents = reviewLogStorage.getStream();

      console.log("[SYNC] localEvents length:", localEvents.length);
      console.log("[SYNC] local sample:", localEvents.slice(0, 3));

      console.log(
        "[SYNC] server vs local overlap:",
        serverEvents.filter((se) =>
          localEvents.some((le) => le.id === se.id)
        ).length
      );

      // 3. merge ONLY in-memory (no storage mutation)
      const mergedEvents = [...localEvents, ...serverEvents];

      // 4. duplicate check
      const ids = mergedEvents.map((e) => e.id);
      const uniqueIds = new Set(ids);

      console.log("[SYNC] total:", ids.length);
      console.log("[SYNC] unique:", uniqueIds.size);
      console.log("[SYNC] duplicates:", ids.length - uniqueIds.size);

      // 5. build projection
      const progress = buildProgressFromEvents(mergedEvents);

      // 6. hydrate UI
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