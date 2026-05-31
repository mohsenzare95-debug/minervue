// shared/storage/local/progresscache.ts
// CURRENT LEARNING STATE

import type {
  AllProgress,
  DeckProgress,
  CardProgress,
} from "../../types/progress";

const STORAGE_KEY = "progress_v2";

export const progresscache = {

  // ======================
  // GET ALL
  // ======================

  getAll(): AllProgress {
    if (typeof window === "undefined") return {};

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  },

  // ======================
  // GET DECK
  // ======================

  getDeckProgress(deckKey: string): DeckProgress {
    return this.getAll()[deckKey] || {};
  },

  // ======================
  // GET CARD
  // ======================

  getCardProgress(deckKey: string, cardId: string): CardProgress | null {
    return this.getDeckProgress(deckKey)[cardId] || null;
  },

  // ======================
  // SAVE CARD STATE
  // ======================

  saveCardProgress(
    deckKey: string,
    cardId: string,
    progress: Omit<CardProgress, "cardId">
  ): void {

    if (typeof window === "undefined") return;

    const all = this.getAll();

    if (!all[deckKey]) {
      all[deckKey] = {};
    }

    all[deckKey][cardId] = {
  cardId,
  streak: progress.streak,
  mastered: progress.mastered,
  seen: progress.seen,
};

    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  },

  // ======================
  // RESET DECK
  // ======================

  resetDeck(deckKey: string): void {
    if (typeof window === "undefined") return;

    const all = this.getAll();
    delete all[deckKey];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  },

  // ======================
  // CLEAR ALL
  // ======================

  clearAll(): void {
    if (typeof window === "undefined") return;

    localStorage.removeItem(STORAGE_KEY);
  },
};