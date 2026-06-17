import posthog from "./posthog";

export const analytics = {
  sessionStarted: (deckKey: string, totalCards: number) => {
    posthog.capture("session_started", {
      deck_key: deckKey,
      total_cards: totalCards,
    });
  },

  cardViewed: (deckKey: string, cardId: string, index: number) => {
    posthog.capture("card_viewed", {
      deck_key: deckKey,
      card_id: cardId,
      index,
    });
  },

  cardAnswered: (
    deckKey: string,
    cardId: string,
    answer: "Correct" | "Almost" | "Wrong"
  ) => {
    posthog.capture("card_answered", {
      deck_key: deckKey,
      card_id: cardId,
      answer,
    });
  },

  cardNext: (deckKey: string, cardId: string) => {
    posthog.capture("card_next", {
      deck_key: deckKey,
      card_id: cardId,
    });
  },

  sessionCompleted: (
    deckKey: string,
    totalSeen: number,
    totalCards: number
  ) => {
    posthog.capture("session_completed", {
      deck_key: deckKey,
      total_seen: totalSeen,
      total_cards: totalCards,
    });
  },

  sessionAbandoned: (
    deckKey: string,
    lastIndex: number,
    lastCardId?: string | null
  ) => {
    posthog.capture("session_abandoned", {
      deck_key: deckKey,
      last_index: lastIndex,
      last_card_id: lastCardId ?? null,
    });
  },
};