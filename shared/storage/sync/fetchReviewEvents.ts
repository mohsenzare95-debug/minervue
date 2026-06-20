//shared\storage\sync\fetchReviewEvents.ts
import { supabase } from "@/shared/supabase/client";
import type { ReviewEvent, ResetEvent } from "@/shared/types/events";

export type ReviewEventRow = {
  user_id: string;
  client_event_id: string;
  event_type: "REVIEW" | "RESET";
  deck_key: string;
  card_id: string;
  result: "Correct" | "Wrong" | "Almost" | "Reset";
  timestamp: number;
  seq: number;
};

export async function fetchReviewEvents(userId: string): Promise<ReviewEventRow[]> {
  const { data, error } = await supabase
    .from("review_events")
    .select("*")
    .eq("user_id", userId)
    .order("timestamp", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((e) => ({
    user_id: e.user_id,
    client_event_id: e.client_event_id,
    event_type: e.event_type,
    deck_key: e.deck_key,
    card_id: e.card_id,
    result: e.result,
    timestamp: Number(e.timestamp),
    seq: e.seq,
  }));
}