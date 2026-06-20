//shared\storage\local\reviewLogStorage.ts
import type { AppEvent } from "@/shared/types/events";
import { getEventId } from "@/shared/utils/getEventId";

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
      return getEventId(a).localeCompare(getEventId(b));
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

    const normalize = (e: any): AppEvent => ({
      id: e.client_event_id, // FIX: strict canonical server id
      type: e.type ?? (e.event_type === "RESET_EVENT" ? "RESET" : "REVIEW"),
      userId: e.userId ?? e.user_id ?? null,
      deckKey: e.deckKey ?? e.deck_key,
      cardId: e.cardId ?? e.card_id,
      timestamp: e.timestamp,
      payload: e.payload ?? {
        result: e.result,
      },
    });

    const map = new Map<string, AppEvent>();

    const key = (e: any) =>
      `${e.userId ?? e.user_id}:${getEventId(e)}`;

    for (const e of combined) {
      const ne = normalize(e);
      map.set(getEventId(ne), ne);
    }

    const merged = Array.from(map.values()).sort((a, b) => {
      return getEventId(a).localeCompare(getEventId(b));
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