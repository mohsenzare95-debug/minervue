// shared/state/bootstrap.ts

import { clientState } from "@/shared/state/client/clientState";
import { syncEngine } from "@/shared/storage/sync/syncEngine";
import { storageClient } from "@/shared/storage/core/storageClient";

export async function bootstrap(userId: string) {
  console.log("[BOOTSTRAP] start");

  const localProgress = storageClient.progress.getAll();
  const localLogs = storageClient.reviewLog.getAll();

  clientState.setState({
    progress: localProgress,
    reviewLogs: localLogs,
    syncStatus: "syncing",
  });

  await syncEngine.sync(userId);

  clientState.setState({
    syncStatus: "idle",
    lastSyncAt: Date.now(),
  });

  console.log("[BOOTSTRAP] done");
}