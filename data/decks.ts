// data/decks.ts

import { trialCards } from "./trial";
import { cataractCards } from "./cataract";
import { retinaCards } from "./retina";
import { uveitisCards } from "./uveitis";
import { glaucomaCards } from "./glaucoma";

export const decks = [
  
  {
    key: "glaucoma",
    name: "Glaucoma",
    isFree: false,
    cards: glaucomaCards,
  },
  
  {
    key: "cataract",
    name: "Cataract",
    isFree: false,
    cards: cataractCards,
  },

  {
    key: "uveitis",
    name: "Uveitis",
    isFree: false,
    cards: uveitisCards,
  },
] as const;

// optional compatibility
export const deckRegistry = Object.fromEntries(
  decks.map((d) => [d.key, d.cards])
);

export type DeckKey =
  keyof typeof deckRegistry;