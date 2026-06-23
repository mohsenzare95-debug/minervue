// shared/storage/sync/hydrateRead.ts

import { fetchReviewEvents } from "./fetchReviewEvents";
import { reviewLogStorage } from "@/shared/storage/local/reviewLogStorage";
import { buildProgressFromEvents } from "@/shared/storage/local/buildProgressFromEvents";
import { clientState } from "@/shared/state/client/clientState";

export async function hydrateRead(userId: string) {
  console.log("🔥 [HYDRATE] START", { userId });

  try {
    clientState.setState({ syncStatus: "syncing" });

    // ======================
    // 1. FETCH SERVER EVENTS
    // ======================
    const serverRows = await fetchReviewEvents(userId);

    console.log("🔥 [HYDRATE] server rows:", serverRows.length);

    // ======================
    // 2. MERGE (LOCAL + SERVER) PURE
    // ======================
    const merged = reviewLogStorage.mergeServerEvents(serverRows);

    console.log("🔥 [HYDRATE] merged events:", merged.length);

    // ======================
    // 3. BUILD PROGRESS (PURE REDUCTION)
    // ======================
    const nextProgress = buildProgressFromEvents(merged);

    console.log("🔥 [HYDRATE] progress built");

    // ======================
    // 4. PERSIST MERGED STREAM LOCALLY
    // ======================
    reviewLogStorage.replaceLocalOnly(merged);

    // ======================
    // 5. UPDATE CLIENT STATE
    // ======================
    clientState.setState({
      progress: structuredClone(nextProgress),
      lastSyncAt: Date.now(),
      syncStatus: "idle",
    });

    console.log("🔥 [HYDRATE] DONE SUCCESS");
  } catch (err) {
    console.error("🔥 [HYDRATE] ERROR", err);

    clientState.setState({
      syncStatus: "error",
    });
  }
}