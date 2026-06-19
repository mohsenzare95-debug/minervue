export type AnswerType = "Correct" | "Almost" | "Wrong";

// ======================
// EVENT MODEL (NEW)
// ======================

export type ReviewEvent =
  | {
      type: "ANSWER";
      deckKey: string;
      cardId: string;
      result: AnswerType;
      timestamp: number;
    }
  | {
      type: "RESET_DECK";
      deckKey: string;
      timestamp: number;
    };