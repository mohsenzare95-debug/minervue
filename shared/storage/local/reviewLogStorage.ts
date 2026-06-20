//shared\storage\local\reviewLogStorage.ts
import type { AppEvent } from "@/shared/types/events";

const KEY = "review_logs_v3";

// ======================
// INTERNAL HELPERS
// ======================

function readStream(): AppEvent[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(KEY);

    if (!raw) return [];

    const parsed = JSON.parse(raw);

    // safety guard
    if (!Array.isArray(parsed)) return [];

    return parsed;
  } catch {
    return [];
  }
}

function writeStream(stream: AppEvent[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(stream));
}

// ======================
// STORE
// ======================

export const reviewLogStorage = {
  // FULL STREAM
  getStream(): AppEvent[] {
    return readStream().sort((a, b) => {
      if (a.timestamp !== b.timestamp) {
        return a.timestamp - b.timestamp;
      }

      // FIX: deterministic ordering
      if (a.seq != null && b.seq != null) {
        return a.seq - b.seq;
      }

      return (a.id ?? "").localeCompare(b.id ?? "");
    });
  },

  // DERIVED VIEW
  getAll(): Record<string, AppEvent[]> {
    const stream = readStream();

    return stream.reduce<Record<string, AppEvent[]>>((acc, e) => {
      if (!acc[e.deckKey]) acc[e.deckKey] = [];
      acc[e.deckKey].push(e);
      return acc;
    }, {});
  },

  get(deckKey: string): AppEvent[] {
    return readStream().filter((e) => e.deckKey === deckKey);
  },

  // WRITE
  add(event: AppEvent) {
    const stream = readStream();

    const exists = stream.some((e) => e.id === event.id);
    if (exists) return;

    writeStream([...stream, event]);
  },

  // SERVER SYNC (RECONCILIATION)
  replaceFromServer(events: AppEvent[]) {
    const local = readStream();

    const combined = [...local, ...events];

    const normalize = (e: any): AppEvent => {
      if (e.id) return e;

      return {
        id: e.client_event_id,
        type: e.event_type === "RESET_EVENT" ? "RESET" : "REVIEW",
        userId: e.user_id ?? null,
        deckKey: e.deck_key,
        cardId: e.card_id,
        timestamp: e.timestamp,
        payload:
          e.event_type === "RESET_EVENT"
            ? { reason: "user_action" }
            : { result: e.result },
      } as AppEvent;
    };

    const map = new Map<string, AppEvent>();

    const key = (e: AppEvent) => `${e.userId ?? "null"}:${e.id}`;

    for (const e of combined) {
      const n = normalize(e);
      map.set(key(n), n);
    }

    const merged = Array.from(map.values()).sort((a, b) => {
      if (a.timestamp !== b.timestamp) return a.timestamp - b.timestamp;

      if (a.seq != null && b.seq != null) return a.seq - b.seq;

      // FIX: tie-breaker stability
      if (a.userId !== b.userId) {
        return (a.userId || "").localeCompare(b.userId || "");
      }

      return a.id.localeCompare(b.id);
    });

    writeStream(merged);
  },

  // DELETE SCOPE
  clear(deckKey: string) {
    const stream = readStream();
    writeStream(stream.filter((e) => e.deckKey !== deckKey));
  },

  clearAll() {
    writeStream([]);
  },
};