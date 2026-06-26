// shared/storage/local/buildProgressFromEvents.ts

import type { AppEvent } from "@/shared/types/events";
import type { AllProgress } from "@/shared/types/progress";

export function buildProgressFromEvents(events: AppEvent[]): AllProgress {
  console.group("🔥 BUILD_PROGRESS TRACE");

  console.log("EVENT COUNT:", events.length);
  console.log("SAMPLE EVENT:", events[0]);

  console.trace("CALL STACK");

  const badEvents = events.filter(
    e => !e.deckKey || !e.userId
  );

  if (badEvents.length) {
    console.warn("🚨 BAD EVENTS DETECTED:", badEvents.slice(0, 10));
  }

  console.groupEnd();

  console.log(
    "[TRACE buildProgress INPUT SAMPLE]",
    events.slice(0, 5)
  );

  console.trace("[TRACE buildProgress CALLED FROM]");

  console.log("🚀 [buildProgress] START");
  console.log("[buildProgress] input events:", events.length);

  const state: AllProgress = {};

  const clamp = (n: number) => Math.max(0, Math.min(3, n));

  // ======================
  // 1. TYPE DISTRIBUTION
  // ======================
  const typeStats = events.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log("[buildProgress] type distribution:", typeStats);

  // ======================
  // 2. SORT STABILITY CHECK
  // ======================
  const sorted = [...events].sort((a, b) => {
  if (a.timestamp !== b.timestamp) {
    return a.timestamp - b.timestamp;
  }

  // HARD TIE BREAKER: RESET always first if same timestamp
  if (a.type !== b.type) {
    if (a.type === "RESET") return -1;
    if (b.type === "RESET") return 1;
  }

  return a.client_event_id.localeCompare(b.client_event_id);
});

  console.log("[buildProgress] after sort:", sorted.length);

  // ======================
// LAST RESET OF EACH DECK
// ======================
const lastReset = new Map<string, number>();

for (const e of sorted) {
  if (e.type !== "RESET") continue;

  lastReset.set(e.deckKey, e.timestamp);
}

console.log("LAST RESET MAP", Object.fromEntries(lastReset));

console.log(
  "ALL RESET EVENTS",
  sorted
    .filter(e => e.type === "RESET")
    .map(e => ({
      deck: e.deckKey,
      ts: e.timestamp,
      card: e.cardId,
    }))
);

  // ======================
  // 3. PROCESS EVENTS (STRICT FILTERING)
  // ======================
  let resetCount = 0;
  let reviewCount = 0;
  let skipped = 0;
  let cardsTouched = 0;

  for (const e of sorted) {
    // ❌ HARD FILTER: only REVIEW affects progress
    if (e.type !== "REVIEW" && e.type !== "RESET") {
      skipped++;
      continue;
    }

    // ======================
    // RESET HANDLING (ISOLATED)
    // ======================
    if (e.type === "RESET") {
  resetCount++;
  continue;
}

    // ======================
    // REVIEW HANDLING
    // ======================
    reviewCount++;

    const { deckKey, cardId, timestamp, payload } = e;

    const resetAt = lastReset.get(deckKey);

    console.log("REVIEW VS RESET", {
  deck: deckKey,
  card: cardId,
  review: timestamp,
  reset: resetAt,
  ignored: !!resetAt && timestamp < resetAt,
});

if (resetAt && timestamp < resetAt) {
  continue;
}

    // ❌ STRICT VALIDATION
    if (!deckKey || !cardId) {
      console.warn("[buildProgress] SKIP invalid REVIEW event:", e);
      skipped++;
      continue;
    }

    if (!state[deckKey]) {
      state[deckKey] = {};
    }

    if (!state[deckKey][cardId]) {
      state[deckKey][cardId] = {
        cardId,
        streak: 0,
        seen: false,
        mastered: false,
        updatedAt: 0,
        derivedFrom: "local",
      };

      cardsTouched++;
    }

    const card = state[deckKey][cardId];

    card.seen = true;

    switch (payload.result) {
      case "Correct":
        card.streak = clamp(card.streak + 1);
        break;

      case "Wrong":
        card.streak = 0;
        break;

      case "Almost":
        card.streak = clamp(card.streak - 1);
        break;

      default:
        console.warn("[buildProgress] UNKNOWN result:", payload?.result);
    }

    card.mastered = card.streak >= 3;
    card.updatedAt = timestamp;
    card.derivedFrom = e.userId ? "server" : "local";
  }

  // ======================
  // 4. FINAL STATE SUMMARY
  // ======================
  const decks = Object.keys(state).length;

  let cards = 0;
  for (const d of Object.values(state)) {
    cards += Object.keys(d).length;
  }

  console.log("🔥 [buildProgress] DONE");
  console.log({
    resetCount,
    reviewCount,
    skipped,
    decks,
    cards,
    cardsTouched,
  });

  console.log("🧪 [BUILD OUTPUT SAMPLE]", {
    decks: Object.keys(state).length,
    firstDeck: Object.keys(state)[0],
    sampleDeckState: Object.values(state)[0],
  });

  console.log(
  "FINAL BUILD STATE",
  JSON.parse(JSON.stringify(state))
);

  return structuredClone(state);
}