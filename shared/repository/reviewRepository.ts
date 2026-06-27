// shared/repository/reviewRepository.ts

import { outbox } from "@/shared/storage/local/outbox";
import { reviewLogStorage } from "@/shared/storage/local/reviewLogStorage";
import { clientState } from "@/shared/state/client/clientState";
import type { AnswerType, AppEvent } from "@/shared/types/events";
import { requestSync } from "@/shared/storage/sync/syncScheduler";
export const reviewRepository = {
  get(deckKey: string) {
    return reviewLogStorage.get(deckKey);
  },

  getAll() {
    return reviewLogStorage.getAll();
  },

  add(
    userId: string | null,
    deckKey: string,
    payload: {
      cardId: string;
      result: AnswerType;
      timestamp: number;
    }
  ) {
    // ======================
    // 🔥 DEBUG 1: RAW INPUT
    // ======================
    console.log("📥 [REPO INPUT]", {
      userId,
      deckKey,
      payload,
    });

    if (!deckKey || !payload?.cardId) {
      console.warn("[reviewRepository:add] invalid event (missing deckKey/cardId)");
      return;
    }

    const client_event_id = crypto.randomUUID();

    const event: AppEvent = {
      client_event_id,

      type: "REVIEW",

      userId: userId ?? null,
      deckKey,
      cardId: payload.cardId,
      timestamp: payload.timestamp,

      payload: {
        result: payload.result,
      },
    };

    // ======================
    // 🔥 DEBUG 2: AFTER BUILD
    // ======================
    console.log("🧱 [REPO EVENT BUILT]", event);

    if (!event.deckKey || !event.cardId || !event.userId) {
      console.error("[REVIEW REJECTED INVALID EVENT]", event);
      return;
    }

    // ======================
    // 🔥 DEBUG 3: BEFORE WRITE
    // ======================
    const before = reviewLogStorage.get(deckKey);
    console.log("💾 [REPO STORAGE BEFORE WRITE]", {
      deckKey,
      existingCount: before?.length ?? 0,
    });

    // ======================
    // 🟠 OUTBOX LOG
    // ======================
    console.count("🟠 OUTBOX ADD");
    console.log({
      eventId: event.client_event_id,
      cardId: event.cardId,
    });

    reviewLogStorage.add(event);

    // ✅ PATCH LOCAL PROGRESS IMMEDIATELY
    clientState.applyReviewEvent(event);

    outbox.add(event);
    requestSync();
    

    console.log("✅ [REPO WRITE DONE]", {
      client_event_id: event.client_event_id,
      deckKey: event.deckKey,
    });
  },

  reset(userId: string | null, deckKey: string, cardId: string) {
    console.log("📥 [REPO RESET INPUT]", {
      userId,
      deckKey,
      cardId,
    });

    if (!deckKey || !cardId) {
      console.warn("[reviewRepository:reset] invalid event (missing deckKey/cardId)");
      return;
    }

    const client_event_id = crypto.randomUUID();

    const event: AppEvent = {
      client_event_id: crypto.randomUUID(),

      type: "RESET",

      userId: userId ?? null,
      deckKey,
      cardId,
      timestamp: Date.now(),

      payload: {
        reason: "user_action",
      },
    };

    console.log("🧱 [REPO RESET EVENT BUILT]", event);

    // 🔥 DEBUG: بررسی وضعیت event قبل از اعتبارسنجی
    console.log("EVENT BEFORE VALIDATION", event);

    if (!event.deckKey || !event.cardId || !event.userId) {
      console.error("[REVIEW REJECTED INVALID EVENT]", event);
      return;
    }

    reviewLogStorage.add(event);
    console.log("1");

    // ✅ PATCH LOCAL PROGRESS IMMEDIATELY
    clientState.applyReviewEvent(event);
    console.log("2");

    outbox.add(event);
    requestSync();
    console.log("3");

    console.log("4");

    console.log("✅ [REPO RESET DONE]", {
      client_event_id: event.client_event_id,
      deckKey,
    });
  },
};