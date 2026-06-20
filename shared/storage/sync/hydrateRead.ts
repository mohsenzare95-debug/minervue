import { fetchReviewEvents } from "./fetchReviewEvents";
import { reviewLogStorage } from "@/shared/storage/local/reviewLogStorage";
import { buildProgressFromEvents } from "@/shared/storage/local/buildProgressFromEvents";
import { clientState } from "@/shared/state/client/clientState";

export async function hydrateRead(userId: string) {
  clientState.setState({ syncStatus: "syncing" });

  const serverRows = await fetchReviewEvents(userId);

  // deterministic merge inside storage
  const merged = reviewLogStorage.replaceFromServer(serverRows as any);

  // safety check (important)
  if (!merged || !Array.isArray(merged)) {
    console.error("[HYDRATE] invalid merge result");
    clientState.setState({ syncStatus: "error" });
    return;
  }

  const progress = buildProgressFromEvents(merged);

  clientState.setState({
    ...progress,
    syncStatus: "idle",
    lastSyncAt: Date.now(),
  });
}