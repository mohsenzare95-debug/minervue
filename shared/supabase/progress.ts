import { supabase } from "@/shared/supabase/client";
import { Auth } from "@/shared/supabase/auth";
import type { AllProgress, CardProgress } from "@/shared/types/progress";

export const Progress = {
  // ======================
  // GET ALL USER PROGRESS
  // ======================
  getAll: async (): Promise<AllProgress> => {
    const auth = await Auth.getUser();
    const user = auth?.user;
    if (!user) return {};

    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", user.id);

    if (error || !data) return {};

    const result: AllProgress = {};

    data.forEach((item) => {
      if (!result[item.deck_key]) result[item.deck_key] = {};

      result[item.deck_key][item.card_id] = {
        cardId: item.card_id,
        streak: item.streak ?? 0,
        seen: item.seen ?? false,
        mastered: item.mastered ?? false,
      };
    });

    return result;
  },

  // ======================
  // SAVE OR UPDATE ONE CARD
  // ======================
  save: async (
    deckKey: string,
    cardId: string,
    progress: CardProgress
  ) => {
    const auth = await Auth.getUser();
    const user = auth?.user;
    if (!user) return;

    const { streak, seen, mastered } = progress;

    const { error } = await supabase
      .from("user_progress")
      .upsert(
        {
          user_id: user.id,
          deck_key: deckKey,
          card_id: cardId,
          streak,
          seen,
          mastered,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,deck_key,card_id" }
      );

    if (error) throw error;

    return progress; // ✅ برمی‌گردد progress اصلی، نه کلید ترکیبی
  },
};