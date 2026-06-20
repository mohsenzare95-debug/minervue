import { settingsStorage } from "../local/settingsStorage";
import { userStorage } from "../local/userStorage";
import { unlockedDecksStorage } from "../local/unlockedDecksStorage";
import { reviewLogStorage } from "../local/reviewLogStorage";

export const storageClient = {
  settings: settingsStorage,
  user: userStorage,
  unlockedDecks: unlockedDecksStorage,
  reviewLog: reviewLogStorage,
} as const;