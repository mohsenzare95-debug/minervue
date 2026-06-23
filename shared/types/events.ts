//shared\types\events.ts
export type AnswerType = "Correct" | "Almost" | "Wrong";

// ======================
// BASE EVENT
// ======================

export type BaseEvent = {
  client_event_id: string;
  userId: string | null;
  deckKey: string;
  cardId: string;
  timestamp: number;

  seq?: number;
};

// ======================
// REVIEW EVENT
// ======================

export type ReviewEvent = BaseEvent & {
  type: "REVIEW";
  payload: {
    result: AnswerType;
  };
};

// ======================
// RESET EVENT
// ======================

export type ResetEvent = BaseEvent & {
  type: "RESET";
  payload: {
    reason?: "user_action";
  };
};

// ======================
// UNION
// ======================

export type AppEvent = ReviewEvent | ResetEvent;