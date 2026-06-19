// shared/state/bootstrap.ts

import { clientState } from "@/shared/state/client/clientState";
import { syncEngine } from "@/shared/storage/sync/syncEngine";
import { Progress } from "@/shared/supabase/progress";

export async function bootstrap(userId: string) {
  console.log("[BOOTSTRAP] start");

  try {
    // 1. اول UI را وارد حالت loading کن
    clientState.setState({
      syncStatus: "syncing",
      progress: {},
    });

    // 2. مستقیم از سرور بگیر (SOURCE OF TRUTH)
    const serverProgress = await Progress.getAll(userId);

    // 3. ست اولیه UI از سرور (نه local)
    clientState.setState({
      progress: serverProgress,
    });

    // 4. sync (outbox + reconciliation)
    await syncEngine.sync(userId);

    // 5. بعد از sync دوباره state نهایی از clientState syncEngine
    // (syncEngine خودش باید clientState.progress را آپدیت کند)

    clientState.setState({
      syncStatus: "idle",
      lastSyncAt: Date.now(),
    });

    console.log("[BOOTSTRAP] done");
  } catch (e) {
    console.error("[BOOTSTRAP] error", e);

    clientState.setState({
      syncStatus: "error",
    });
  }
}