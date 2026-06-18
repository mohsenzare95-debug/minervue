import { supabase } from "@/shared/supabase/client";
import type { AllProgress, CardProgress } from "@/shared/types/progress";

// ======================
// GET ALL USER PROGRESS
// ======================

export const Progress = {
  async getAll(userId: string): Promise<AllProgress> {
    if (!userId) return {};

    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId);

    if (error || !data) return {};

    const result: AllProgress = {};

    for (const item of data) {
      if (!result[item.deck_key]) {
        result[item.deck_key] = {};
      }

      result[item.deck_key][item.card_id] = {
        cardId: item.card_id,
        streak: item.streak ?? 0,
        seen: item.seen ?? false,
        mastered: item.mastered ?? false,
        updatedAt: item.updated_at
          ? new Date(item.updated_at).getTime()
          : 0,
      };
    }

    return result;
  },

  // ======================
  // SAVE PROGRESS
  // ======================

  async save(
    userId: string,
    deckKey: string,
    cardId: string,
    progress: CardProgress
  ) {
    if (!userId) return;

    const { streak, seen, mastered, updatedAt } = progress;

    const { error } = await supabase.from("user_progress").upsert(
      {
        user_id: userId,
        deck_key: deckKey,
        card_id: cardId,
        streak,
        seen,
        mastered,
        updated_at: new Date(updatedAt).toISOString(),
      },
      {
        onConflict: "user_id,deck_key,card_id",
      }
    );

    if (error) throw error;

    return progress;
  },
};