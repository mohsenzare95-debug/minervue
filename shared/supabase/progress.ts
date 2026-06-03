import { supabase } from "@/shared/supabase/client";
import { Auth } from "@/shared/supabase/auth";

const makeKey = (deckKey: string, cardId: string) =>
  `${deckKey}_${cardId}`;

export const Progress = {
  // ======================
  // GET ALL USER PROGRESS
  // ======================

  getAll: async () => {
    const auth = await Auth.getUser();
    const user = auth?.user;

    if (!user) return {};

    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", user.id);

    if (error || !data) return {};

    const result: Record<string, { level: number }> = {};

    data.forEach((item) => {
      const key = makeKey(item.deck_key, item.card_id);

      result[key] = {
        level: item.level ?? 0,
      };
    });

    return result;
  },

  // ======================
  // SAVE ONE CARD
  // ======================

  save: async (
    deckKey: string,
    cardId: string,
    level: number
  ) => {
    const auth = await Auth.getUser();
    const user = auth?.user;

    if (!user) return;

    const key = makeKey(deckKey, cardId);

    await supabase.from("user_progress").upsert({
      user_id: user.id,
      deck_key: deckKey,
      card_id: cardId,
      level,
      updated_at: new Date().toISOString(),
    });

    return key;
  },
};