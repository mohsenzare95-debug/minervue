//shared\supabase\progressMapper.ts
import type { AllProgress } from "@/shared/types/progress";

export function fromSupabase(data: any[]): AllProgress {
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
      updatedAt: Number(item.updated_at),
    };
  }

  return result;
}