//features\services\reviewService.ts
import { reviewLogStorage } from "@/shared/storage/local/reviewLogStorage";
import { supabase } from "@/shared/supabase/client";

export async function submitReview(event: any, userId: string | null) {
  // local log (fast, always works)
  reviewLogStorage.add(event.deckKey, event);

  // cloud sync (optional)
  if (!userId) return;

  await supabase.from("review_events").insert({
    user_id: userId,
    deck_key: event.deckKey,
    card_id: event.cardId,
    result: event.result,
    timestamp: event.timestamp,
  });
}