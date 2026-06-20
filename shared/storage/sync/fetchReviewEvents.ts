// shared/storage/sync/fetchReviewEvents.ts

import { supabase } from "@/shared/supabase/client";

export type ReviewEventRow = {
  user_id: string;
  client_event_id: string;
  event_type: "REVIEW_EVENT" | "RESET_EVENT";
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

  return (data ?? []).map(e => ({
  ...e,
  timestamp: Number(e.timestamp),
}));
}