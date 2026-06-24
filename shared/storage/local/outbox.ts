// shared/storage/local/outbox.ts

import type { AppEvent } from "@/shared/types/events";

const KEY = "outbox_v2";

// ======================
// OUTBOX EVENT TYPE
// ======================

export type OutboxEvent = {
  id: string;
  seq: number;

  event: AppEvent;

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
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(data));
}

// ======================
// OUTBOX CORE
// ======================

export const outbox = {
  // ======================
  // ADD EVENT (UNIFIED)
  // ======================
  add(event: AppEvent) {
    if (!event.userId) {
      throw new Error("INVALID EVENT: missing userId");
    }

    const all = getAll();
    const lastSeq = all.length ? Math.max(...all.map((e) => e.seq)) : 0;

    const newEvent: OutboxEvent = {
      id: event.client_event_id, // IMPORTANT

      seq: lastSeq + 1,

      event: {
        ...event,
      },

      status: "pending",
      retryCount: 0,
      createdAt: Date.now(),
    };

    all.push(newEvent);
    saveAll(all);
  },

  // ======================
  // GET PENDING (SYNC QUEUE)
  // ======================
  getPending(): OutboxEvent[] {
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

  // ======================
  // GET PENDING EVENTS (CONVENIENCE)
  // ======================
  getPendingEvents(): AppEvent[] {
    return this.getPending().map((e) => e.event);
  },

  // ======================
  // MARK SENT
  // ======================
  markSent(id: string) {
    const all = getAll();

    const updated = all.map((e) =>
      e.id === id
        ? {
            ...e,
            status: "sent" as const,
            retryCount: 0,
            lastAttemptAt: Date.now(),
          }
        : e
    );

    saveAll(updated);
  },

  // ======================
  // MARK RETRY
  // ======================
  markRetry(id: string) {
    const all = getAll();

    const updated = all.map((e) => {
      if (e.event.client_event_id !== id) return e;

      return {
        ...e,
        retryCount: e.retryCount + 1,
        lastAttemptAt: Date.now(),
      };
    });

    saveAll(updated);
  },

  // ======================
  // CLEAR
  // ======================
  clear() {
    saveAll([]);
  },
};