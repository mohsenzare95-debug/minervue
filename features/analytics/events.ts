// features/analytics/events.ts

import posthog from "./posthog";

export const analytics = {
  pageViewed: () => {
    posthog.capture("page_viewed");
  },

  deckSelected: () => {
  posthog.capture("deck_selected");
},

  authVerified: () => {
  posthog.capture("auth_verified");
},

  sessionStarted: (deckKey: string, totalCards: number) => {
    posthog.capture("session_started", {
      deck_key: deckKey,
      total_cards: totalCards,
    });
  },

  cardViewed: () => {
    posthog.capture("card_viewed");
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