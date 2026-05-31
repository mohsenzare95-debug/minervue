// data/decks.ts

import { trialCards } from "./trial";
import { glaucomaCards } from "./glaucoma";
import { retinaCards } from "./retina";

export const decks = [
  {
    key: "trial",
    name: "Trial Deck",
    isFree: true,
    cards: trialCards,
  },

  {
    key: "glaucoma",
    name: "Glaucoma",
    isFree: false,
    cards: glaucomaCards,
  },

  {
    key: "retina",
    name: "Retina",
    isFree: false,
    cards: retinaCards,
  },
] as const;

// optional compatibility
export const deckRegistry = Object.fromEntries(
  decks.map((d) => [d.key, d.cards])
);

export type DeckKey =
  keyof typeof deckRegistry;