// shared/storage/sync/fetchReviewEvents.ts
import { supabase } from "@/shared/supabase/client";

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

export async function fetchReviewEvents(
  userId: string
): Promise<ReviewEventRow[]> {
  const start = performance.now();

  console.log("[fetchReviewEvents] START userId:", userId);

  const query = supabase
    .from("review_events")
    .select("*")
    .eq("user_id", userId)
    .order("timestamp", { ascending: true })
    .order("seq", { ascending: true });

  const { data, error, status, statusText } = await query;

  // =========================
  // 1. RAW SUPABASE DEBUG
  // =========================
  console.log("[fetchReviewEvents] SUPABASE STATUS:", status, statusText);
  console.log("[fetchReviewEvents] SUPABASE ERROR:", error);
  console.log("[fetchReviewEvents] RAW DATA:", data);
  console.log("[fetchReviewEvents] RAW LENGTH:", data?.length ?? 0);

  // =========================
  // 2. HARD FAILURE CHECK
  // =========================
  if (error) {
    console.error("[fetchReviewEvents] THROWING ERROR:", error);
    throw error;
  }

  // =========================
  // 3. EMPTY DATA WARNING (critical for your case)
  // =========================
  if (!data || data.length === 0) {
    console.warn(
      "[fetchReviewEvents] EMPTY RESULT - possible RLS / filter mismatch / missing rows"
    );
  }

  // =========================
  // 4. TRANSFORM LAYER (with safety logging)
  // =========================
  const mapped = (data ?? []).map((e: any, index: number) => {
    const row = {
      user_id: e.user_id,
      client_event_id: e.client_event_id,
      event_type: e.event_type,
      deck_key: e.deck_key,
      card_id: e.card_id,
      result: e.result,
      timestamp: Number(e.timestamp),
      seq: e.seq,
    };

    // detect schema anomalies early
    if (!e.user_id || !e.client_event_id) {
      console.warn("[fetchReviewEvents] BAD ROW AT INDEX:", index, e);
    }

    return row;
  });

  const end = performance.now();

  console.log("[fetchReviewEvents] FINAL MAPPED LENGTH:", mapped.length);
  console.log("[fetchReviewEvents] DURATION(ms):", end - start);

  return mapped;
}