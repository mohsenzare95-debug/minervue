import { supabase } from "@/shared/supabase/client";
import { buildProgressFromEvents } from "@/shared/storage/projection/rebuildProgress";
import type { Activitylog } from "@/shared/storage/local/reviewLogStorage";

export const Progress = {
  async getFromEvents(userId: string) {
    const { data } = await supabase
      .from("review_events")
      .select("*")
      .eq("user_id", userId);

    if (!data) return {};

    const events: Activitylog[] = data.map((e) => ({
      deckKey: e.deck_key,
      cardId: e.card_id,
      result: e.result,
      timestamp: e.timestamp,
    }));

    return buildProgressFromEvents(events);
  },
};