// shared/supabase/progress.ts

// shared/types/progress.ts

export type CardProgress = {
  cardId: string;

  streak: number;
  seen: boolean;
  mastered: boolean;

  updatedAt: number;

  // فقط برای debug / reconciliation
  derivedFrom?: "local" | "server";
};

export type DeckProgress = Record<string, CardProgress>;

export type AllProgress = Record<string, DeckProgress>;

/**
 * ❌ مهم: این نوع را “projection boundary” نگه می‌داریم
 * یعنی Supabase نباید اینجا entity مستقل بسازد
 */
export type SupabaseProgressRow = {
  user_id: string;
  deck_key: string;
  card_id: string;

  result: "Correct" | "Wrong" | "Almost" | "Reset";
  timestamp: number;
};