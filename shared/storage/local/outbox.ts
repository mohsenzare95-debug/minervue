const KEY = "outbox_v2";

// ======================
// EVENT TYPES
// ======================

export type ReviewOutboxEvent =
  | {
      id: string;
      user_id: string;
      client_event_id: string;
      seq: number;

      type: "REVIEW_EVENT";

      payload: {
        deckKey: string;
        cardId: string;
        result: "Correct" | "Wrong" | "Almost";
        timestamp: number;
      };

      status: "pending" | "sent";

      retryCount: number;
      lastAttemptAt?: number;

      createdAt: number;
    }
  | {
      id: string;
      user_id: string;
      client_event_id: string;
      seq: number;

      type: "RESET_DECK_EVENT";

      payload: {
        deckKey: string;
        timestamp: number;
      };

      status: "pending" | "sent";

      retryCount: number;
      lastAttemptAt?: number;

      createdAt: number;
    };

// ======================
// INTERNAL HELPERS
// ======================

function getAll(): ReviewOutboxEvent[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function saveAll(data: ReviewOutboxEvent[]) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

// ======================
// OUTBOX CORE
// ======================

export const outbox = {
  add(
    event: Omit<
      ReviewOutboxEvent,
      "id" | "seq" | "status" | "createdAt" | "retryCount" | "lastAttemptAt"
    >
  ) {
    if (!event.user_id || !event.client_event_id) {
      console.error("[OUTBOX ADD] Missing required fields", event);
      return;
    }

    const all = getAll();
    const lastSeq = all.length > 0 ? Math.max(...all.map((e) => e.seq)) : 0;

    const newEvent: ReviewOutboxEvent = {
      id: crypto.randomUUID(),
      user_id: event.user_id,
      client_event_id: event.client_event_id,
      seq: lastSeq + 1,
      type: event.type,
      payload: event.payload,

      status: "pending",
      retryCount: 0,
      lastAttemptAt: undefined,

      createdAt: Date.now(),
    } as ReviewOutboxEvent;

    all.push(newEvent);
    saveAll(all);
  },

  // ======================
  // RETRY-AWARE PENDING FETCH
  // ======================

  getPending(): ReviewOutboxEvent[] {
    const now = Date.now();

    return getAll().filter((e) => {
      if (e.status !== "pending") return false;

      const backoff = Math.min(30000, 1000 * Math.pow(2, e.retryCount));

      if (e.lastAttemptAt && now - e.lastAttemptAt < backoff) {
        return false;
      }

      return true;
    });
  },

  markSent(id: string) {
    const all = getAll();

    const updated = all.map((e) =>
      e.id === id ? { ...e, status: "sent" } : e
    );

    saveAll(updated);
  },

  markRetry(id: string) {
    const all = getAll();

    const updated = all.map((e) => {
      if (e.id !== id) return e;

      return {
        ...e,
        retryCount: e.retryCount + 1,
        lastAttemptAt: Date.now(),
      };
    });

    saveAll(updated);
  },

  clear() {
    saveAll([]);
  },
};