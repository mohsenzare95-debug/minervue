export type AnswerType = "Correct" | "Almost" | "Wrong";

// ======================
// BASE EVENT
// ======================

export type BaseEvent = {
  id: string;
  userId: string | null;
  deckKey: string;
  cardId: string;
  timestamp: number;
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
// RESET EVENT (PER CARD MODEL)
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