// shared/storage/local/outbox.ts

const KEY = "outbox_v1";

export type OutboxEvent = {
  id: string;
  user_id: string;
  client_event_id: string;
  seq: number;

  type: "REVIEW_EVENT" | "PROGRESS_UPDATE";

  payload: any;

  status: "pending" | "sent";
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
    event: Omit<OutboxEvent, "id" | "seq" | "status" | "createdAt">
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
      createdAt: Date.now(),
    };

    console.log("[OUTBOX ADD]", newEvent);

    all.push(newEvent);
    saveAll(all);
  },

  getPending(): OutboxEvent[] {
    return getAll().filter((e) => e.status === "pending");
  },

  markSent(id: string) {
    const all = getAll();
    const updated = all.map((e) =>
      e.id === id ? { ...e, status: "sent" } : e
    );
    saveAll(updated);
  },

  clear() {
    saveAll([]);
  },
};