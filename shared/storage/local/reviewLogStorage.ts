// shared/storage/local/reviewLogStorage.ts
import type { AppEvent } from "@/shared/types/events";
import { outbox } from "@/shared/storage/local/outbox";

const KEY = "review_logs_v3";

// ======================
// NORMALIZATION LAYER (CANONICAL BOUNDARY)
// ======================
function normalizeEvent(e: any): AppEvent | null {
  if (!e) return null;

  const id = e.client_event_id;
  if (!id) {
    console.warn("[NORMALIZE DROP] missing id", e);
    return null;
  }

  const deckKey = e.deckKey ?? e.deck_key;
  const cardId = e.cardId ?? e.card_id;

  if (!deckKey) {
    console.warn("[NORMALIZE DROP] missing deckKey", e);
    return null;
  }

  // 🔥 DEBUG: بررسی نوع رویداد قبل از نرمال‌سازی
  console.log("NORMALIZE TYPE", {
    rawType: e.type,
    rawEventType: e.event_type,
    fullRaw: e,
  });

  const event: AppEvent = {
    client_event_id: id,

    type: e.type ?? "REVIEW",

    userId: e.userId ?? e.user_id ?? null,

    deckKey,
    cardId: cardId ?? "",

    timestamp: Number(e.timestamp ?? Date.now()),

    seq: e.seq,

    payload: e.payload ?? {
      result: e.result,
    },
  };

  // REVIEW must be valid
  if (event.type === "REVIEW" && !event.cardId) {
    console.warn("[NORMALIZE DROP] invalid REVIEW missing cardId", e);
    return null;
  }

  return event;
}

// ======================
// LOW LEVEL IO
// ======================
function readStream(): AppEvent[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed;
  } catch (e) {
    console.error("[reviewLogStorage] readStream ERROR:", e);
    return [];
  }
}

function writeStream(stream: AppEvent[]) {
  if (typeof window === "undefined") return;

  console.log("💾 [LOCAL WRITE]", {
    count: stream.length,
    sample: stream[stream.length - 1],
  });

  localStorage.setItem(KEY, JSON.stringify(stream));
}

// ======================
// STORE
// ======================
export const reviewLogStorage = {
  getStream(): AppEvent[] {
    const stream = readStream();

    console.log(
      "RAW RESETS IN STORAGE",
      stream.filter((e: any) => e.type === "RESET")
    );

    return stream
      .map(normalizeEvent)
      .filter(Boolean)
      .sort((a, b) => {
        if (a.timestamp !== b.timestamp) {
          return a.timestamp - b.timestamp;
        }
        return a.client_event_id.localeCompare(b.client_event_id);
      }) as AppEvent[];
  },

  getAll(): Record<string, AppEvent[]> {
    const stream = readStream();

    return stream
      .map(normalizeEvent)
      .filter(Boolean)
      .reduce<Record<string, AppEvent[]>>((acc, e) => {
        if (!acc[e.deckKey]) acc[e.deckKey] = [];
        acc[e.deckKey].push(e);
        return acc;
      }, {});
  },

  get(deckKey: string): AppEvent[] {
    const stream = readStream();

    return stream
      .map(normalizeEvent)
      .filter((e): e is AppEvent => !!e)
      .filter((e) => e.deckKey === deckKey);
  },

  add(event: AppEvent) {
    const stream = readStream();

    const normalized = normalizeEvent(event);
    if (!normalized) return;

    const exists = stream.some(
      (e) => e.client_event_id === normalized.client_event_id
    );

    if (exists) {
      console.log("[ADD SKIP DUPLICATE]", normalized.client_event_id);
      return;
    }

    const next = [...stream, normalized];

writeStream(next);

console.log(
  "RESETS AFTER WRITE",
  next.filter(e => e.type === "RESET")
);

    console.log(
      "RESETS AFTER WRITE",
      next.filter(e => e.type === "RESET")
    );

    console.log("✅ [LOCAL ADD]", {
      id: normalized.client_event_id,
      deckKey: normalized.deckKey,
    });
  },

  // ======================
  // SYNC PIPELINE (PURE MERGE)
  // ======================
  mergeServerEvents(serverEvents: any[]): AppEvent[] {
    const safeLocal = outbox
      .getPendingEvents()
      .map(normalizeEvent)
      .filter(Boolean) as AppEvent[];

    const safeServer = serverEvents
      .map(normalizeEvent)
      .filter(Boolean) as AppEvent[];

    const map = new Map<string, AppEvent>();

    for (const e of safeLocal) {
      map.set(e.client_event_id, e);
    }

    for (const e of safeServer) {
      map.set(e.client_event_id, e);
    }

    return Array.from(map.values());
  },

  replaceLocalOnly(events: AppEvent[]) {
    console.log("💾 [LOCAL REPLACE ONLY]");

    const normalized = events
      .map(normalizeEvent)
      .filter(Boolean);

    console.log(
      "RESET EVENTS IN REPLACE:",
      normalized.filter(e => e.type === "RESET").length
    );

    console.log(
      normalized.filter(e => e.type === "RESET")
    );

    writeStream(normalized as AppEvent[]);
  },

  clear(deckKey: string) {
    const stream = readStream();

    const next = stream.filter((e) => e.deckKey !== deckKey);

    writeStream(next);
  },

  clearAll() {
    console.log("[reviewLogStorage] CLEAR ALL");
    writeStream([]);
  },
};