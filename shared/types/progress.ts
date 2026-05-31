//shared\types\progress.ts
export type CardProgress = {
  cardId: string;
  streak: number;
  seen: boolean;
  mastered: boolean;
  };

export type DeckProgress = {
  [cardId: string]: CardProgress;
};

export type AllProgress = {
  [deckKey: string]: DeckProgress;
};

export type SupabaseCardProgress =
  CardProgress & {
    user_id: string;
    deck_key: string;
    updated_at: string;
  };