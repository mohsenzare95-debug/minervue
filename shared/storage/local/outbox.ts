//shared\storage\local\outbox.ts

const KEY = "outbox_v1";

export type OutboxEvent = {
  id: string;
  user_id: string;
  client_event_id: string;
  seq: number;

  type: "REVIEW_EVENT";
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
  localStorage.setItem(KEY, JSON.stringify(data));
}

// ======================
// API
// ======================

export const outbox = {
  add(
    event: Omit<
      OutboxEvent,
      "id" | "seq" | "status" | "createdAt"
    >
  ) {
    const all = getAll();

    const lastSeq =
      all.length > 0
        ? Math.max(...all.map((e) => e.seq))
        : 0;

    all.push({
      id: crypto.randomUUID(),

      user_id: event.user_id,
      client_event_id: event.client_event_id,
      seq: lastSeq + 1,

      type: event.type,
      payload: event.payload,

      status: "pending",
      createdAt: Date.now(),
    });

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