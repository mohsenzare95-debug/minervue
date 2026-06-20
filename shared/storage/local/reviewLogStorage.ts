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
  // ======================
  // READ (SORTED VIEW)
  // ======================
  getStream(): AppEvent[] {
    return readStream().sort((a, b) => {
      return (a.client_event_id ?? "").localeCompare(
        b.client_event_id ?? ""
      );
    });
  },

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

  // ======================
  // WRITE (IDEMPOTENT)
  // ======================
  add(event: AppEvent) {
    const stream = readStream();

    const eventId = event.client_event_id;
    if (!eventId) return;

    const exists = stream.some(
      (e) => e.client_event_id === eventId
    );

    if (exists) return;

    writeStream([...stream, event]);
  },

  // ======================
  // SYNC (RECONCILIATION)
  // ======================
  replaceFromServer(events: AppEvent[]): AppEvent[] {
    console.log("🔥 Z_SYNC START");
    console.log("[Z_SYNC] server input:", events.length);

    const localBefore = readStream();
    console.log("[Z_SYNC] local BEFORE:", localBefore.length);

    const normalize = (e: any): AppEvent => ({
      id: e?.client_event_id ?? "",
      client_event_id: e?.client_event_id ?? "",

      type:
        e?.type ??
        (e?.event_type === "RESET_EVENT"
          ? "RESET"
          : "REVIEW"),

      userId: e?.user_id ?? null,
      deckKey: e?.deck_key ?? "",
      cardId: e?.card_id ?? "",

      timestamp: Number(e?.timestamp ?? Date.now()),

      payload: e?.payload ?? {
        result: e?.result,
      },
    });

    const map = new Map<string, AppEvent>();

    const combined = [...localBefore, ...events];

    for (const e of combined) {
      const ne = normalize(e);

      const key = ne.client_event_id;
      if (!key) continue;

      map.set(key, ne);
    }

    const merged = Array.from(map.values()).sort((a, b) => {
      return (a.client_event_id ?? "").localeCompare(
        b.client_event_id ?? ""
      );
    });

    console.log("[Z_SYNC] merged:", merged.length);

    writeStream(merged);

    const localAfter = readStream();
    console.log("[Z_SYNC] local AFTER:", localAfter.length);

    console.log("🔥 Z_SYNC END");

    return merged;
  },

  // ======================
  // CLEAR
  // ======================
  clear(deckKey: string) {
    const stream = readStream();
    writeStream(
      stream.filter((e) => e.deckKey !== deckKey)
    );
  },

  clearAll() {
    writeStream([]);
  },
};