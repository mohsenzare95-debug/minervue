// shared/supabase/progress.ts

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

    const result: Record<
      string,
      {
        streak: number;
        seen: boolean;
        mastered: boolean;
      }
    > = {};

    data.forEach((item) => {
      const key = makeKey(
        item.deck_key,
        item.card_id
      );

      result[key] = {
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
    progress: {
      streak: number;
      seen: boolean;
      mastered: boolean;
    }
  ) => {
    const auth = await Auth.getUser();
    const user = auth?.user;

    if (!user) return;

    const {
      streak,
      seen,
      mastered,
    } = progress;

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
          updated_at:
            new Date().toISOString(),
        },
        {
          onConflict:
            "user_id,deck_key,card_id",
        }
      );

    if (error) {
      throw error;
    }

    return makeKey(
      deckKey,
      cardId
    );
  },
};