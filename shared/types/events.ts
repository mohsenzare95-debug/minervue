export type AnswerType = "Correct" | "Almost" | "Wrong";

// ======================
// BASE EVENT
// ======================

export type BaseEvent = {
  id: string; // = client_event_id (canonical identity)

  client_event_id: string; // 👈 فقط برای clarity / DB mapping

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