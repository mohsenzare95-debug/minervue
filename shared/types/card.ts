// shared/types/card.ts

export type Card = {
  id: string;
  q: string;
  a: string;

  topic?: string;

  questionImage?: string;
  answerImage?: string;
};