// shared/storage/core/storageClient.ts
import { progresscache } from "../local/progresscache";
import { settingsStorage } from "../local/settingsStorage";
import { userStorage } from "../local/userStorage";
import { unlockedDecksStorage } from "../local/unlockedDecksStorage";
import { reviewLogStorage } from "../local/reviewLogStorage";
export type { Activitylog } from "../local/reviewLogStorage";

export const storageClient = {
  progress: progresscache,
  settings: settingsStorage,
  user: userStorage,
  unlockedDecks: unlockedDecksStorage,
  reviewLog: reviewLogStorage,
} as const;

