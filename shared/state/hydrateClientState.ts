import { clientState } from "./clientState";
import { storageClient } from "@/shared/storage/core/storageClient";

let hydrated = false;

export function hydrateClientState() {
  if (hydrated) return;

  const progress = storageClient.progress.getAll();
  const reviewLogs = storageClient.reviewLog.getAll();

  clientState.setState({
    progress,
    reviewLogs,
    syncStatus: "idle",
  });

  hydrated = true;
}