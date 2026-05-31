// shared/storage/local/unlockedDecksStorage.ts

const KEY = "unlocked_decks";
const DEV_KEY = "dev_mode_enabled";

// ======================
// ENV FEATURE FLAG
// ======================

function isGlobalUnlock(): boolean {
  return process.env.NEXT_PUBLIC_DEV_UNLOCK_ALL === "true";
}

// ======================
// DEV MODE
// ======================

function isDevMode(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(DEV_KEY) === "true";
}

// ======================
// STORAGE CORE
// ======================

function getAll(): Record<string, boolean> {
  if (typeof window === "undefined") return {};

  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function save(data: Record<string, boolean>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(data));
}

// ======================
// MAIN API
// ======================

export const unlockedDecksStorage = {
  getAll,

  isUnlocked(deckKey: string) {
    // 1) GLOBAL ENV OVERRIDE (MVP / LAUNCH MODE)
    if (isGlobalUnlock()) return true;

    // 2) LOCAL DEV MODE (browser override)
    if (isDevMode()) return true;

    // 3) ALWAYS FREE CONTENT
    if (deckKey === "trial") {
      return true;
    }

    // 4) USER UNLOCKS
    return Boolean(getAll()[deckKey]);
  },

  unlock(deckKey: string) {
    const all = getAll();
    all[deckKey] = true;
    save(all);
  },

  lock(deckKey: string) {
    const all = getAll();
    delete all[deckKey];
    save(all);
  },

  // ======================
  // DEV UTILITIES
  // ======================

  devUnlockAll() {
    if (typeof window === "undefined") return;

    const all = getAll();
    Object.keys(all).forEach((k) => {
      all[k] = true;
    });

    save(all);
  },

  devReset() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(KEY);
  },

  enableDevMode() {
    if (typeof window === "undefined") return;
    localStorage.setItem(DEV_KEY, "true");
  },

  disableDevMode() {
    if (typeof window === "undefined") return;
    localStorage.setItem(DEV_KEY, "false");
  },
};