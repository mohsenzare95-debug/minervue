import { clientState } from "@/shared/state/client/clientState";
import { syncEngine } from "@/shared/storage/sync/syncEngine";
import { storageClient } from "@/shared/storage/core/storageClient";

export async function bootstrap(userId: string) {
  console.log("[BOOTSTRAP] start");

  // 1. load local instantly
  const localProgress = storageClient.progress.getAll();
  const localLogs = storageClient.reviewLog.getAll();

  clientState.setProgress(localProgress);
  clientState.setReviewLogs(localLogs);

  // 2. pull server via sync
  await syncEngine.sync(userId);

  console.log("[BOOTSTRAP] done");
}