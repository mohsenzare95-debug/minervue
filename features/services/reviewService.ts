//C:\Users\DOR CO\flashcards-app\features\services\reviewService.ts
import { reviewLogStorage } from "@/shared/storage/local/reviewLogStorage";
import { outbox } from "@/shared/storage/local/outbox";

export function submitReview(event: any, userId: string | null) {
  // local log (fast, always works)
  reviewLogStorage.add(event.deckKey, event);

  // cloud sync via outbox (NOT direct supabase)
  if (!userId) return;

  outbox.add({
    user_id: userId,
    client_event_id: crypto.randomUUID(),
    type: "REVIEW_EVENT",
    payload: {
      deckKey: event.deckKey,
      cardId: event.cardId,
      result: event.result,
      timestamp: event.timestamp,
    },
  });
}