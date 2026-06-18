const KEY = "outbox_v1";

export type OutboxEvent = {
  id: string;
  user_id: string;
  client_event_id: string;
  seq: number;

  type: "REVIEW_EVENT" | "PROGRESS_UPDATE";
  payload: any;

  status: "pending" | "sent";

  retryCount: number;
  lastAttemptAt?: number;

  createdAt: number;
};

// ======================
// INTERNAL HELPERS
// ======================

function getAll(): OutboxEvent[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function saveAll(data: OutboxEvent[]) {
  console.log("[OUTBOX SAVE]", data);
  localStorage.setItem(KEY, JSON.stringify(data));
}

// ======================
// API
// ======================

export const outbox = {
  add(
    event: Omit<
      OutboxEvent,
      "id" | "seq" | "status" | "createdAt" | "retryCount" | "lastAttemptAt"
    >
  ) {
    if (!event.user_id || !event.client_event_id) {
      console.error("[OUTBOX ADD] Missing user_id or client_event_id", event);
      return;
    }

    const all = getAll();
    const lastSeq = all.length > 0 ? Math.max(...all.map((e) => e.seq)) : 0;

    const newEvent: OutboxEvent = {
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
    };

    console.log("[OUTBOX ADD]", newEvent);

    all.push(newEvent);
    saveAll(all);
  },

  // ======================
  // RETRY-AWARE PENDING FETCH
  // ======================

  getPending(): OutboxEvent[] {
    const now = Date.now();

    return getAll().filter((e) => {
      if (e.status !== "pending") return false;

      // 🔥 exponential backoff
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
      e.id === id
        ? {
            ...e,
            status: "sent",
          }
        : e
    );

    saveAll(updated);
  },

  // ======================
  // RETRY TRACKING
  // ======================

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